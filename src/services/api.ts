import {User} from "../../interfaces";
import dummyData from "../../lib/data";


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

export const getMenu = async () => {
  return Promise.resolve(dummyData.menu)
}