import React, { useEffect } from "react";
import ProfileHeader from "../../../components/ProfileHeader/ProfileHeader";
import Header from "../../../components/Header/Header";
import BreadCrums from "../../../components/BreadCrums";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../features/user/userSlice";
import { useNavigate, useParams } from "react-router-dom";

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
      return navigate("/login");
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
