// import axios from "axios";
export async function saveUserinDB(user) {
  try {
    const USERDB = {
      email: user.email,
      name: user.given_name,
      userName: user.nickname,
    };
    const response = await fetch(
      `https://wineryback-production.up.railway.app/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(USERDB),
      }
    );

    await response.json();
  } catch (error) {
    console.log(error);
  }
}
