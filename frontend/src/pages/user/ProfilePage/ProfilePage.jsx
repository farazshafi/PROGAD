import React, { useEffect } from "react";
import ProfileHeader from "../../../components/ProfileHeader/ProfileHeader";
import Header from "../../../components/Header/Header";
import BreadCrums from "../../../components/BreadCrums";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../features/user/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { component } = useParams();

  const breadcrumbPath = [
    { label: "Home", url: "/" },
    { label: "Profile", url: "/profile" },
    { label: component, url: `/profile/${component}` },
  ];
  const user = useSelector(selectedUser);


  useEffect(() => {
    if (!user) {
      toast.error("Please login to view your profile");
      return navigate("/login");
    }else{
      if(!user.isVerified){
        toast.error("Please verify your email to proceed");
        navigate("/")
      }
    }
  }, []);
  return (
    <>
      <Header />
      <BreadCrums path={breadcrumbPath}/>
      <ProfileHeader component={component}/>
    </>
  );
};

export default ProfilePage;
