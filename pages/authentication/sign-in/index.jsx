/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, use } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";
import MDAlert from "/components/MDAlert";

// Authentication layout components
import CoverLayout from "/pagesComponents/authentication/components/CoverLayout";

import { Dialog, DialogContent, CircularProgress } from "@mui/material";
// Images
import bgImage from "/assets/images/bg-sign-in-cover.jpeg";

import Swal from "sweetalert2";

function Cover() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/dashboard/home");
    } else {
      router.push("/authentication/sign-in");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || password === "") {
      setError("All fields are required");
      return;
    }
    try {
      setError("");
      setLoading(true);
      setOpenDialog(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      if (res.status === 201) {
        const data = await res.json();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", data.id);
        router.push("/dashboard/home");
      } else {
        if (res.status === 401) {
          const data = await res.json();
          const message = data.message;
          Swal.fire({
            title: "Error signing in",
            icon: "error",
            timer: 2000,
            text: `${message}`,
            timerProgressBar: true,
          });
          setError(`${message}`);
        } else {
          setError("An unexpected error occurred");
        }
      }
    } catch (error) {
      setError("Error signing in user");
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }

    // setError("");
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        {/* Dialog with loader animation */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogContent>
            <MDBox textAlign="center">
              <CircularProgress />
              <MDTypography variant="body1">Logging in...</MDTypography>
            </MDBox>
          </DialogContent>
        </Dialog>
        <MDBox
          variant="gradient"
          bgColor="dark"
          borderRadius="lg"
          coloredShadow="dark"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to Sign In
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                placeholder="john@example.com"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                placeholder="************"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox
              display="flex"
              alignItems="center"
              justifyContent="center"
              ml={-1}
            >
              {error && <MDAlert color="error">{error}</MDAlert>}
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleSubmit}
                color="dark"
                fullWidth
                disabled={loading}
              >
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
