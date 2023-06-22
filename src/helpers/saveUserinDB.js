import axios from "axios"

export async function saveUserinDB(user) {
  try {
    const USERDB = {
      email: user.email,
      name: user.given_name,
      userName: user.nickname,
    };

    await axios.post("/users", USERDB)

    const userByEmail = (await axios.get("/users/email", {email: user.email})).data

    console.log(userByEmail)
     localStorage.setItem("usuario", JSON.stringify(userByEmail));


  } catch (error) {
    console.log(error);
  }
}
