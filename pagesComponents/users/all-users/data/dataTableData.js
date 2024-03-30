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

const dataTableData = {
  columns: [
    { Header: "first name", accessor: "fname", width: "20%" },
    { Header: "last name", accessor: "lname", width: "25%" },
    { Header: "email", accessor: "email" },
    { Header: "user type", accessor: "utype", width: "15%" },
    { Header: "is blocked", accessor: "blocked" },
  ],

  rows: [
    {
      fname: "Hanny Baniard",
      lname: "Data Coordiator",
      email: "Baorixile",
      utype: "Super Admin",
      blocked: "No",
    },
  ],
};

export default dataTableData;
