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
import Checkbox from "@mui/material/Checkbox";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";
import MDAlert from "/components/MDAlert";

// Authentication layout components
import CoverLayout from "/pagesComponents/authentication/components/CoverLayout";

// Images
import bgImage from "/assets/images/bg-sign-up-cover.jpeg";

import signUp from "/services/authService";

function Cover() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    console.log("email:", email, "password:", password, "name:", name);
    e.preventDefault();
    if (!name || !email || password === "") {
      setError("All fields are required");
      return;
    }
    try {
      signUp(name, email, password).then((data) => {
        console.log(data);
      });
    } catch (error) {
      setError("Error registering user");
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
            SmartRide Admin
          </MDTypography>
          {/* <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register onSubmit={handleSubmit}
          </MDTypography> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                variant="standard"
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
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
                onClick={handleSubmit}
                variant="gradient"
                color="dark"
                fullWidth
              >
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <Link href="/authentication/sign-in">
                  <MDTypography
                    variant="button"
                    color="dark"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
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
