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
import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/pagesComponents/layouts/DashboardLayout";
import DashboardNavbar from "/pagesComponents/layouts/DashboardNavbar";
import Footer from "/pagesComponents/layouts/Footer";
// import DataTable from "/pagesComponents/users/all-users/DataTable";
import DataTable from "/pagesComponents/users/all-users/components/DataTable";

// Data
import dataTableData from "/pagesComponents/users/all-users/data/dataTableData";
import RidersData from "/pagesComponents/users/all-users/data/ridersData";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function AllUsersDataTable() {
  const [tableData, setTableData] = useState(null);
  const [ridersData, setRidersData] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(localStorage.getItem("userId") || null);
    const fetchData = async () => {
      const data = await dataTableData();
      setTableData(data);
      const ridersData = await RidersData();
      setRidersData(ridersData);
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar userId={userId} />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              All Riders
            </MDTypography>
            <MDTypography variant="button" color="text">
              List of all riders
            </MDTypography>
          </MDBox>
          {ridersData && <DataTable table={ridersData} canSearch />}
        </Card>
      </MDBox>
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              All Users
            </MDTypography>
            <MDTypography variant="button" color="text">
              List of all users
            </MDTypography>
          </MDBox>
          {tableData && <DataTable table={tableData} canSearch />}
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AllUsersDataTable;
