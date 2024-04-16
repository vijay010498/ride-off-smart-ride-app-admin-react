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

// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Autocomplete from "@mui/material/Autocomplete";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDAlert from "/components/MDAlert";
import MDInput from "/components/MDInput";

// Settings page components
import FormField from "/pagesComponents/settings/components/FormField";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/router";

function NewUserInfo() {
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const [visible, setVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setUserId(localStorage.getItem("userId") || null);
    setUserType(visible ? "Super-Admin" : "Standard Admin");
  }, [visible]);

  const handleSetVisible = () => {
    setVisible(!visible);
    setUserType(visible ? "Super-Admin" : "Standard Admin");
  };

  const handleCreateUser = async () => {
    //validate inputs
    if (!firstName || !lastName || !email) {
      setError("All fields are required");
      return;
    } else if (!emailRegex.test(email)) {
      setError("Invalid email");
      return;
    } else {
      setError("");
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              userType: userType,
            }),
          }
        );
        if (res.status === 201) {
          router.push("/users/all-users");
        } else {
          const data = await res.json();
          const errorMessage = data.message;
          setError(`${errorMessage}`);
        }
      } catch (error) {
        console.log("Error adding new user:", error);
        setError("Error adding new user");
      }
    }
  };

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <MDBox p={3}>
        <MDTypography variant="h5">Create New User</MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              label="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDBox
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
            >
              <MDTypography variant="caption" fontWeight="regular">
                {visible ? "Super-Admin" : "Standard Admin"}
              </MDTypography>
              <MDBox ml={1}>
                <Switch checked={visible} onChange={handleSetVisible} />
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12}>
            <MDBox display="flex" justifyContent="center" alignItems="center">
              <MDBox ml="auto">
                <MDButton
                  variant="gradient"
                  color="dark"
                  size="small"
                  onClick={handleCreateUser}
                >
                  CREATE
                </MDButton>
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            {error && <MDAlert color="error">{error}</MDAlert>}
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default NewUserInfo;
