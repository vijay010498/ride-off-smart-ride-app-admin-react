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

import { get } from "http";
// import { StatusCell } from "../StatusCell/StatusCell.js";
import IdCell from "/pagesComponents/users/all-users/components/IdCell";
import DefaultCell from "/pagesComponents/users/all-users/components/DefaultCell";
import StatusCell from "/pagesComponents/users/all-users/components/StatusCell";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDTypography from "/components/MDTypography";
import Icon from "@mui/material/Icon";
import Switch from "@mui/material/Switch";

const getUsers = async () => {
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
      const users = data.data.map((user) => ({
        id: user.id,
        fname: user.firstName,
        lname: user.lastName,
        email: user.email,
        utype: user.userType,
        status: user.isBlocked ? "Blocked" : "Active",
      }));
      return users;
    } else {
      const data = await res.json();
      const message = data.message;
      console.log(`${message}`);
    }
  } catch (error) {
    console.log("Error fetching users:", error);
    throw error;
  }
};

const resetPassword = async (id) => {
  if (confirm(`Reset password for user?`)) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/admin/user/${id}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (res.status === 201) {
        alert("Password reset successfully");
      } else {
        const data = await res.json();
        const message = data.message;
        alert(`${message}`);
      }
    } catch (error) {
      console.log("Error resetting password:", error);
    }
  }
};

const dataTableData = async () => {
  const users = await getUsers();
  const dataTableDataa = {
    columns: [
      {
        Header: "first name",
        accessor: "fname",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      {
        Header: "last name",
        accessor: "lname",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      {
        Header: "email",
        accessor: "email",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      {
        Header: "user type",
        accessor: "utype",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      {
        Header: "status",
        accessor: "status",
        Cell: ({ value }) => {
          let status;
          if (value) {
            status = <StatusCell icon="done" color="success" status="Active" />;
          } else {
            status = <StatusCell icon="close" color="error" status="Blocked" />;
          }
          return status;
        },
      },
      {
        Header: "Reset Password",
        accessor: "id",
        Cell: ({ value }) => {
          // display button with id as value
          return (
            <MDButton
              variant="gradient"
              color="dark"
              size="small"
              circular
              onClick={() => resetPassword(value)}
            >
              <Icon sx={{ fontWeight: "bold" }}>redo</Icon>
            </MDButton>
          );
        },
      },
    ],
    rows: users,
  };
  return dataTableDataa;
};

export default dataTableData;

// const getUsers = async () => {
//   try {
//     const res = await fetch(
//       "http://localhost:3000/api/admin/admin/user?page=1&limit=10",
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       }
//     );
//     if (res.status === 200) {
//       const data = await res.json();
//       let users = data.data;
//       console.log("usersA:", users, typeof users);
//       let usersArray = Object.values(users);
//       console.log("usersB:", usersArray, typeof usersArray);
//       users.forEach((user) => {
//         user.fname = user.firstName;
//         user.lname = user.lastName;
//         user.email = user.email;
//         user.utype = user.userType;
//         user.blocked = user.isBlocked ? "yes" : "no";
//       });
//       return usersArray;
//     }
//   } catch (error) {
//     console.log("Error fetching users:", error);
//   }
// };

// const dataTableData = {
//   columns: [
//     { Header: "first name", accessor: "fname", width: "20%" },
//     { Header: "last name", accessor: "lname", width: "25%" },
//     { Header: "email", accessor: "email" },
//     { Header: "user type", accessor: "utype", width: "15%" },
//     { Header: "is blocked", accessor: "blocked" },
//   ],

//   rows: getUsers(),
// };

// export default dataTableData;
