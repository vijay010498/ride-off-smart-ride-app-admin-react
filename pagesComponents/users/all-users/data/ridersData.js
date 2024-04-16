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

import DefaultCell from "/pagesComponents/users/all-users/components/DefaultCell";
import StatusCell from "/pagesComponents/users/all-users/components/StatusCell";

import MDButton from "/components/MDButton";
import Icon from "@mui/material/Icon";
import MDTypography from "/components/MDTypography";
import Switch from "@mui/material/Switch";
import MDBox from "/components/MDBox";

import Swal from "sweetalert2";

let riders = [];

const getRiders = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ride/user?page=1&limit=10`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      const ridersData = data.data.map((rider) => ({
        id: rider.id,
        fname: rider.firstName,
        lname: rider.lastName,
        email: rider.email,
        status: rider.isBlocked ? "Blocked" : "Active",
      }));
      riders = ridersData;
      return riders;
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
    console.log("Error fetching riders:", error);
    throw error;
  }
};

const toggleBlockUser = async (userId) => {
  let user = riders.find((user) => user.id === userId);
  let toggle = user.status === "Active" ? "block" : "unblock";
  Swal.fire({
    title: `${toggle} user?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `Yes, ${toggle}`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Please wait...",
        html: `${toggle}ing user`,
        allowOutsideClick: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/ride/user/${userId}/${toggle}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (res.status === 200) {
          Swal.fire({
            title: `User ${toggle}ed successfully`,
            icon: "success",
          }).then(window.location.reload());
        } else {
          const data = await res.json();
          const message = data.message;
          Swal.fire({
            title: `Error ${toggle}ing user`,
            icon: "error",
            text: `${message}`,
          });
        }
      } catch (error) {
        Swal.fire({
          title: `Error ${toggle}ing user`,
          icon: "error",
          text: `${error}`,
        });
      }
    }
  });
};

const ridersDataTable = async () => {
  const riders = await getRiders();
  const ridersData = {
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
        Header: "status",
        accessor: "status",
        Cell: ({ value }) => {
          let status;
          if (value === "Active") {
            status = <StatusCell icon="done" color="success" status="Active" />;
          } else {
            status = <StatusCell icon="close" color="error" status="Blocked" />;
          }
          return status;
        },
      },
      {
        Header: "toggle status",
        accessor: "id",
        Cell: ({ value }) => {
          let rider = riders.find((rider) => rider.id === value);
          return (
            <MDBox>
              <MDTypography variant="caption" fontWeight="regular">
                {rider.status === "Active" ? "Block" : "Unblock"}
              </MDTypography>
              <MDBox ml={1}>
                <Switch
                  checked={rider.status === "Active"}
                  onChange={() => toggleBlockUser(value)}
                />
              </MDBox>
            </MDBox>
          );
        },
      },
    ],
    rows: riders,
  };
  return ridersData;
};

export default ridersDataTable;
