const signUp = async (name, email, password) => {
  try {
    // Make the GraphQL request to the backend server
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation Mutation($user: UserInput) {
          signUp(user: $user) {
            Email
            Password
            Role
            UserName
          }
        }`,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error registering user:", error);
    throw error;
  }
};

const signIn = async (email, password) => {
  console.log("signIn in authService.js");
  const signInQuery = `
  query Query($email: String, $password: String) {
    signIn(Email: $email, Password: $password) {
      UserName
      Role
      Password
      Email
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
        signInQuery,
      }),
    });
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error signing in user:", error);
    throw error;
  }
};

export default { signUp, signIn };
