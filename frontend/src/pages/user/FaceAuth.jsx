import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { faceLoginApi, faceRegisterApi } from "../../api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { selectedUser, setUser } from "../../features/user/userSlice";
import Header from "../../components/Header/Header";

const FaceAuth = ({ mode }) => {
  const user = useSelector(selectedUser);
  const videoRef = useRef(null);
  const streamRef = useRef(null); // Store the video stream
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadModels = async () => {
      try {
        console.log("Loading face-api models...");
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        console.log("Models loaded successfully!");
        startVideo();
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    if ((mode === "register" && user) || (mode === "login" && !user)) {
      loadModels();
    } else {
      navigate(mode === "login" ? "/" : "/register");
    }

    return () => {
      stopVideo(); // Stop camera when component unmounts
    };
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        streamRef.current = stream; // Save the stream reference
      })
      .catch((err) => console.error(err));
  };

  const stopVideo = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop()); // Stop all video tracks
    }
  };

  const handleFaceAuth = async () => {
    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detections) {
      toast.error("Face not detected! Try again.");
      return;
    }

    const faceData = detections.descriptor;

    if (mode === "register") {
      const data = await faceRegisterApi({ faceData, email: user?.email });
      if (data.response) {
        toast.error(data.response.data.message);
        navigate("/");
        return;
      }
      toast.success(data.message);
      dispatch(setUser({ ...user, faceData: true }));
      stopVideo();
      navigate("/");
    } else {
      const response = await faceLoginApi(faceData);
      if (!response.response) {
        dispatch(setUser({ ...response.user }));
        toast.success("Login Successful");
        stopVideo();
        navigate("/");
      } else {
        toast.error(response?.response?.data?.message || "Face not recognized! Try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center text-white">
        <p className="font-poppins text-center text-3xl mb-8">
          {mode === "register" ? "Register Face" : "Login with Face"}
        </p>
        <div className="mb-4">
          <video
            className="rounded-full border-4 border-[#ff7711] w-72 h-72 object-cover shadow-lg"
            ref={videoRef}
            autoPlay
            muted
          ></video>
        </div>
        <button
          className="bg-[#ff7711] hover:bg-[#ff9c42] transition-all duration-200 text-white py-2 px-6 rounded font-semibold"
          onClick={handleFaceAuth}
        >
          {mode === "register" ? "Register Face" : "Login with Face"}
        </button>
      </div>
    </>
  );
};

export default FaceAuth;
