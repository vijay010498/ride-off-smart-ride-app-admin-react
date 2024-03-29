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
  try {
    const response = await fetch(
      process.env.ADMIN_API_URL + "/admin/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error signing in user:", error);
    throw new Error("Error signing in user");
  }
};

export default { signUp, signIn };
