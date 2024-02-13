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
    { Header: "name", accessor: "name", width: "20%" },
    { Header: "position", accessor: "position", width: "25%" },
    { Header: "office", accessor: "office" },
    { Header: "age", accessor: "age", width: "7%" },
    { Header: "start date", accessor: "startDate" },
    { Header: "salary", accessor: "salary" },
  ],

  rows: [
    {
      name: "Hanny Baniard",
      position: "Data Coordiator",
      office: "Baorixile",
      age: 42,
      startDate: "4/11/2021",
      salary: "$474,978",
    },

    {
      name: "Lara Puleque",
      position: "Payment Adjustment Coordinator",
      office: "Cijangkar",
      age: 47,
      startDate: "8/2/2021",
      salary: "$387,287",
    },
    {
      name: "Torie Repper",
      position: "Administrative Officer",
      office: "Montpellier",
      age: 25,
      startDate: "4/21/2021",
      salary: "$94,780",
    },
    {
      name: "Nat Gair",
      position: "Help Desk Technician",
      office: "Imider",
      age: 57,
      startDate: "12/6/2020",
      salary: "$179,177",
    },
    {
      name: "Maggi Slowan",
      position: "Help Desk Technician",
      office: "Jaunpils",
      age: 56,
      startDate: "11/7/2020",
      salary: "$440,874",
    },
    {
      name: "Marleah Snipe",
      position: "Account Representative II",
      office: "Orekhovo-Borisovo Severnoye",
      age: 31,
      startDate: "7/18/2021",
      salary: "$404,983",
    },
    {
      name: "Georgia Danbury",
      position: "Professor",
      office: "Gniezno",
      age: 50,
      startDate: "10/1/2020",
      salary: "$346,576",
    },
    {
      name: "Bev Castan",
      position: "Design Engineer",
      office: "Acharnés",
      age: 19,
      startDate: "1/14/2021",
      salary: "$445,171",
    },
    {
      name: "Reggi Westney",
      position: "Financial Advisor",
      office: "Piuí",
      age: 56,
      startDate: "3/21/2021",
      salary: "$441,569",
    },
    {
      name: "Bartholomeus Prosh",
      position: "Project Manager",
      office: "Kelīshād va Sūdarjān",
      age: 28,
      startDate: "5/27/2021",
      salary: "$336,238",
    },
  ],
};

export default dataTableData;
