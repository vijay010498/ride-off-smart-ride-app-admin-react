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
import Autocomplete from "@mui/material/Autocomplete";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDAlert from "/components/MDAlert";

// Settings page components
import FormField from "/pagesComponents/settings/components/FormField";

// Data
import selectData from "/pagesComponents/settings/components/BasicInfo/data/selectData";

import { useState, useEffect } from "react";

function BasicInfo() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("Super-Admin");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleUpdateDetails = async () => {
    //validate inputs
    if (!firstName || !lastName || !email) {
      setError("All fields are required");
      return;
    } else if (!emailRegex.test(email)) {
      setError("Invalid email");
      return;
    } else {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/user/${userId}/update-user`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
            }),
          }
        );
        if (res.status === 200) {
          alert("Details updated successfully");
          window.location.reload();
        } else {
          const data = await res.json();
          const errorMessage = data.message;
          setError(`${errorMessage}`);
        }
      } catch (error) {
        console.log("Error updating details:", error);
        setError("Error updating details");
      }
    }
  };

  useEffect(() => {
    setUserId(localStorage.getItem("userId") || null);
  }, []);

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <MDBox p={3}>
        <MDTypography variant="h5">Basic Info</MDTypography>
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
            <Autocomplete
              defaultValue="Super-Admin"
              options={selectData.userType}
              renderInput={(params) => (
                <FormField
                  {...params}
                  label="Type"
                  InputLabelProps={{ shrink: true }}
                />
              )}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <MDBox display="flex" justifyContent="center" alignItems="center">
              <MDBox ml="auto">
                <MDButton
                  variant="gradient"
                  color="dark"
                  size="small"
                  onClick={handleUpdateDetails}
                >
                  UPDATE
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

export default BasicInfo;
