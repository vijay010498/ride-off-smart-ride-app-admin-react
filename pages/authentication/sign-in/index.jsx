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

import { useState } from "react";

import Link from "next/link";

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

// Images
import bgImage from "/assets/images/bg-sign-in-cover.jpeg";

import signIn from "/services/authService";

function Cover() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    console.log("submitting form");
    e.preventDefault();
    if (!email || password === "") {
      setError("All fields are required");
      return;
    }
    try {
      const user = signIn(email, password);
      console.log("user::", user);
    } catch (error) {
      setError("Error signing in user");
    }

    setError("");
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
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
              >
                sign in
              </MDButton>
              {/* <Link href="/dashboard/home">
                <MDButton variant="gradient" color="dark" fullWidth>
                  sign in
                </MDButton>
              </Link> */}
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <Link href="/authentication/sign-up">
                  <MDTypography
                    variant="button"
                    color="dark"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign up
                  </MDTypography>
                </Link>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
