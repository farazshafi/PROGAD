import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgottPasswordApi, resetPasswordApi } from "../../api/userApi";
import { toast } from "react-toastify";

const ForgottPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await forgottPasswordApi(email);
    if (result.response) {
      const { status } = result.response;
      if (status === 400 || status === 500) {
        toast.error(result.response.data.message || "Error while sending Otp");
        setLoading(false);
        return;
      }
    }
    toast.success(result.data.message);
    localStorage.setItem("passForget", JSON.stringify(true));
    localStorage.setItem("passForgetEmail", JSON.stringify(email));
    setLoading(false);
    navigate("/otp");
    setStep(2);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    const passForgetEmail = JSON.parse(localStorage.getItem("passForgetEmail"));
    const PasswordData = {
      newPassword,
      confirmPassword,
      email: passForgetEmail,
    };
    const result = await resetPasswordApi(PasswordData);
    if (result.response) {
      const { status } = result.response;
      if (status === 400 || status === 500) {
        toast.error(result.response.data.message || "server error");
        setLoading(false);
        return;
      }
    }
    localStorage.removeItem("passForget");
    localStorage.removeItem("passForgetEmail");
    toast.success(result?.data?.message || "Password Reseted Success");
    setLoading(false);
    navigate("/login");
  };

  useEffect(() => {
    const passForget = JSON.parse(localStorage.getItem("passForget"));
    if (passForget) {
      setStep(2);
    } else {
      setStep(1);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#262626] font-poppins text-black">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url("https://faraz-project-bucket.s3.eu-north-1.amazonaws.com/headphone+white+bg.jpg")`,
          zIndex: -1,
        }}
      ></div>

      <div className="w-full max-w-md p-6 rounded-lg bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h1>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Enter your email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@domain.com"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className={`w-full bg-[#ff7f11] text-white font-medium py-2 rounded transition flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Send Email"
              )}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handlePasswordReset}>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className={`w-full bg-[#ff7f11] text-white font-medium py-2 rounded transition flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm">
          <Link to={"/login"}>
            <p className="text-gray-500 hover:underline hover:text-gray-900 ">
              Back to Login?
            </p>
          </Link>
        </div>

        <div className="absolute top-4 left-4 text-white font-bold text-xl">
          Progad
        </div>
      </div>
    </div>
  );
};

export default ForgottPassword;
