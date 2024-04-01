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
        fname: user.firstName,
        lname: user.lastName,
        email: user.email,
        utype: user.userType,
        status: user.isBlocked ? "BLOCKED" : "ACTIVE",
      }));
      return users;
    }
  } catch (error) {
    console.log("Error fetching users:", error);
    throw error;
  }
};

const dataTableData = async () => {
  const users = await getUsers();
  const dataTableDataa = {
    columns: [
      { Header: "first name", accessor: "fname", width: "20%" },
      { Header: "last name", accessor: "lname", width: "25%" },
      { Header: "email", accessor: "email" },
      { Header: "user type", accessor: "utype", width: "15%" },
      {
        Header: "status",
        accessor: "status",
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
