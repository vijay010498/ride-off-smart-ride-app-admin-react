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
import DashboardLayout from "/pagesComponents/Layouts/DashboardLayout";
import DashboardNavbar from "/pagesComponents/Layouts/DashboardNavbar";
import Footer from "/pagesComponents/Layouts/Footer";
// import DataTable from "/pagesComponents/users/all-users/DataTable";
import DataTable from "/pagesComponents/users/all-users/components/DataTable";

// Data
import dataTableData from "/pagesComponents/users/all-users/data/dataTableData";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function AllUsersDataTable() {
  const userId = localStorage.getItem("userId") || null;
  const [tableData, setTableData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await dataTableData();
      setTableData(data);
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
