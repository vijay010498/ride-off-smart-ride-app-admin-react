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

// @mui material components
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/pagesComponents/Layouts/DashboardLayout";
import DashboardNavbar from "/pagesComponents/Layouts/DashboardNavbar";
import Footer from "/pagesComponents/Layouts/Footer";
import ComplexStatisticsCard from "/pagesComponents/dashboard/Home/components/ComplexStatisticsCard";

// Data
import reportsBarChartData from "/pagesComponents/dashboard/Home/data/reportsBarChartData";
import reportsLineChartData from "/pagesComponents/dashboard/Home/data/reportsLineChartData";

// Chart configurations
import VerticalBarChart from "/pagesComponents/dashboard/Home/components/VerticalBarChart";
import verticalBarChartData from "/pagesComponents/dashboard/charts/data/verticalBarChartData";
import PieChart from "/pagesComponents/dashboard/Home/components/PieChart";
import pieChartData from "/pagesComponents/dashboard/charts/data/pieChartData";
import fetchData from "/services/userService";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { AuthGuard } from "/pages/dashboard/guard";

function Home() {
  const { sales, tasks } = reportsLineChartData;
  const router = useRouter();

  const userId = localStorage.getItem("userId") || null;
  if (userId === null) {
    router.replace("/authentication/sign-in");
  }

  const dataTableData = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/admin/admin/user?page=1&limit=10",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (res.status === 200) {
        const data = await res.json();
        console.log(data.data);
        let users = data.data;
        tableData = {
          columns: [
            { Header: "first name", accessor: "fname", width: "20%" },
            { Header: "last name", accessor: "lname", width: "25%" },
            { Header: "email", accessor: "email" },
            { Header: "user type", accessor: "utype", width: "15%" },
            { Header: "is blocked", accessor: "blocked" },
          ],
          rows: [],
        };
        for (let user of users) {
          let row = {
            fname: user["firstName"],
            lname: user["lastName"],
            email: user["email"],
            utype: user["userType"],
            blocked: user["isBlocked"],
          };
          tableData["rows"].push(row);
        }
        return tableData;
      }
    } catch (error) {
      throw new Error("Error signing in user", error);
    }
  };

  useEffect(() => {
    // getData();
  }, []);

  // Action buttons for the BookingCard
  const actionButtons = (
    <>
      <Tooltip title="Refresh" placement="bottom">
        <MDTypography
          variant="body1"
          color="primary"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">refresh</Icon>
        </MDTypography>
      </Tooltip>
      <Tooltip title="Edit" placement="bottom">
        <MDTypography
          variant="body1"
          color="dark"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">edit</Icon>
        </MDTypography>
      </Tooltip>
    </>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar userId={userId} />
      {/* {userId !== null && <DashboardNavbar />} */}
      <MDBox py={2}>
        <MDBox mt={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Total Rides"
                  count="100"
                  // count={employees ? employees.length : 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="info"
                  icon="leaderboard"
                  title="Riders"
                  count="50"
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="person_add"
                  title="Drivers"
                  count="20"
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        {/* ---Charts Start--- */}
        <MDBox mt={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <VerticalBarChart
                icon={{ color: "info", component: "leaderboard" }}
                title="Rides"
                description="Number of rides this week"
                chart={verticalBarChartData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PieChart
                icon={{ color: "success", component: "donut_small" }}
                title="Users"
                description="All users"
                chart={pieChartData}
              />
            </Grid>
          </Grid>
        </MDBox>
        {/* ---Charts End--- */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Home;
