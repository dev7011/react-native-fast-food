♦️ https://zustand.docs.pmnd.rs/learn
  npm install zustand
  mkdir src/store
  touch auth.store.ts


♦️ zum test habe ich festgestellt api.ts

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