import React, { useEffect } from "react";
import ProfileHeader from "../../../components/ProfileHeader/ProfileHeader";
import Header from "../../../components/Header/Header"
import BreadCrums from "../../../components/BreadCrums";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {
  const user = useSelector(selectedUser)
  
  const navigate = useNavigate()

  useEffect(()=>{
    if(!user){
      return navigate("/login")
    }
    console.log("user in profile page",user)
  },[])
  return (
    <>
      <Header />
      <BreadCrums text={"Details"}/>
      <ProfileHeader />
    </>
  );
};

export default ProfilePage;
