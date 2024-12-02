import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAction } from "../../Redux/Auth/auth.action";
import { useFormik } from "formik";
import { Avatar, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react"; // Import useEffect

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  outline: "none",
  overflow: "scroll-y",
  borderRadius: 3,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function ProfileModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state); // Destructure auth from state

  // UseEffect to update the form values when the auth state changes
  useEffect(() => {
    formik.setValues({
      firstName: auth.user.firstName || "",
      lastName: auth.user.lastName || "",
    });
  }, [auth.user.firstName, auth.user.lastName]); // Only re-run when user data changes

  const formik = useFormik({
    initialValues: {
      firstName: auth.user.firstName || "",
      lastName: auth.user.lastName || "",
    },
    onSubmit: (values) => {
      console.log("values", values);
      dispatch(updateProfileAction(values)); // Dispatch the action to update the profile

      // Close the modal after the form is successfully submitted
      handleClose();
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <p>Edit Profile</p>
              </div>
              <Button type="submit">Save</Button>
            </div>
            <div>
              <div className="h-[15rem]">
                <img
                  className="w-full h-full rounded-t-md"
                  src="https://cdn.pixabay.com/photo/2023/05/15/01/44/flower-7993995_640.jpg"
                  alt="Profile Background"
                />
              </div>
              <div className="pl-5">
                <Avatar
                  className="transform -translate-y-24"
                  sx={{ width: "10rem", height: "10rem" }}
                  src="https://cdn.pixabay.com/photo/2023/03/26/07/27/flower-7877708_640.jpg"
                  alt="Profile Avatar"
                />
              </div>
            </div>

            <div className="space-y-3">
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
