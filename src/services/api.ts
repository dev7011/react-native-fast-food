import {GetMenuParams, User} from "~/interfaces";
import dummyData from "~/lib/data";


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

export const getMenu = async ({ category, query }: GetMenuParams) => {
  let menu = dummyData.menu;

  if (query?.trim()) {
    menu = menu.filter((item) =>
      item.name.toLowerCase().includes(query.trim().toLowerCase())
    );
  }

  if (category) {
    menu = menu.filter((item) => item.category_name === category);
  }

  return Promise.resolve(menu)
};


export const getCategories = async () => {
  return Promise.resolve(dummyData.categories)
}