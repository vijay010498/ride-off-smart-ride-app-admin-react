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
      // console.log("data:", data);
      const ridersData = data.data.map((rider) => ({
        id: rider.id,
        fname: rider.firstName,
        lname: rider.lastName,
        email: rider.email,
        status: rider.isBlocked ? "Blocked" : "Active",
      }));
      riders = ridersData;
      return riders;
    }
  } catch (error) {
    console.log("Error fetching riders:", error);
    throw error;
  }
};

const toggleBlockUser = async (userId) => {
  let user = riders.find((user) => user.id === userId);
  // console.log("user:", user);
  let toggle = user.status === "Active" ? "block" : "unblock";
  if (confirm(`Confirm ${toggle}?`)) {
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
        // getRiders();
        alert(`User ${toggle}ed successfully`);
        // reload page
        window.location.reload();
      } else {
        console.log("res:", res);
        alert("Error blocking user");
      }
    } catch (error) {
      console.log("Error blocking user:", error);
      throw error;
    }
  }
};

const ridersDataTable = async () => {
  const riders = await getRiders();
  // console.log("riders:", riders);
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
          // display button with id as value                 {/* {visible ? "Super-Admin" : "Standard Admin"} */}
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

            // <MDButton
            //   variant="gradient"
            //   color="dark"
            //   size="small"
            //   circular
            //   onClick={() => toggleBlockUser(value)}
            // >
            //   <Icon sx={{ fontWeight: "bold" }}>block</Icon>
            //   <Icon sx={{ fontWeight: "bold" }}>done</Icon>
            // </MDButton>
          );
        },
      },
    ],
    rows: riders,
  };
  return ridersData;
};

export default ridersDataTable;
