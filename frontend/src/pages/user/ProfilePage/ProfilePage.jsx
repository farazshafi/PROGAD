import React from "react";
import ProfileHeader from "../../../components/ProfileHeader/ProfileHeader";
import Header from "../../../components/Header/Header"
import BreadCrums from "../../../components/BreadCrums";


const ProfilePage = () => {
  return (
    <>
      <Header />
      <BreadCrums text={"Details"}/>
      <ProfileHeader />
    </>
  );
};

export default ProfilePage;
