import {User} from "../../interfaces";

export const getCurrentUser = async () => {
  try {
    const currentUser: User = {
      name: "Nguyen",
      email: "tnle@gmail.com",
      avatar: "test"
    }

    return currentUser;
  } catch (e) {
    console.log(e);
  }
}