import React from "react";
import { useParams } from "react-router";
import { Avatar, Button } from "@mui/material";
const Profile = () => {
  const { id } = useParams();
  return (
    <div className="py-10 w-[70%]">
      <div className="rounded-md ">
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-md"
            src="https://cdn.pixabay.com/photo/2019/08/08/11/42/butterfly-4392802_640.jpg"
          />
        </div>

        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
            src="https://cdn.pixabay.com/photo/2021/11/09/15/54/mens-fashion-6781827_640.jpg"
          />

          <Button>Edit Profile</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
