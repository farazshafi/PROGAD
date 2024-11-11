import React, { useEffect } from "react";
import ProfileHeader from "../../../components/ProfileHeader/ProfileHeader";
import Header from "../../../components/Header/Header";
import BreadCrums from "../../../components/BreadCrums";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const breadcrumbPath = [
    { label: "Home", url: "/" },
    { label: "Profile", url: "/profile" },
  ];
  const user = useSelector(selectedUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("user Indo", user);
      return navigate("/login");
    }
  }, []);
  return (
    <>
      <Header />
      <BreadCrums path={breadcrumbPath}/>
      <ProfileHeader />
    </>
  );
};

export default ProfilePage;
