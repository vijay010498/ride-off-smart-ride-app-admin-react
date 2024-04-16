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

import Swal from "sweetalert2";

const getUsers = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/user?page=1&limit=10`,
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
      Swal.fire({
        title: "Unable to fetch riders",
        text: `${message}`,
        icon: "error",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Unable to fetch riders",
      text: `${error}`,
      icon: "error",
    });
  }
};
const resetPassword = async (id) => {
  Swal.fire({
    title: `Reset password?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `Yes, reset`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Please wait...",
        html: "Resetting password",
        allowOutsideClick: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/user/${id}/reset-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (res.status === 201) {
          Swal.fire({
            title: "Password reset successful",
            icon: "success",
          });
        } else {
          const data = await res.json();
          const message = data.message;
          Swal.fire({
            title: "Unable to reset password",
            text: `${message}`,
            icon: "error",
          });
        }
      } catch (error) {
        console.log("Error resetting password:", error);
      }
    }
  });
};

// const resetPassword = async (id) => {
//   Swal.fire({
//     title: `Reset password?`,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: `Yes, reset`,
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/admin/user/${id}/reset-password`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             },
//           }
//         );
//         if (res.status === 201) {
//           Swal.fire({
//             title: "Password reset successful",
//             icon: "success",
//           });
//         } else {
//           const data = await res.json();
//           const message = data.message;
//           Swal.fire({
//             title: "Unable to reset password",
//             text: `${message}`,
//             icon: "error",
//           });
//         }
//       } catch (error) {
//         console.log("Error resetting password:", error);
//       }
//     }
//   });
// };

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
