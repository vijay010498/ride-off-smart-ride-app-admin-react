// Function to fetch data from the backend server
const fetchData = async () => {
  const query = `query {
      employees {
        id
          FirstName
          LastName
          Age
          DateOfJoining
          Title
          Department
          EmployeeType
          CurrentStatus
        }
  }`;

  try {
    // Make the GraphQL request to the backend server
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchData;
