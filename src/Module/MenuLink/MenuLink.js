const MenuLink = [
  {
    id: 1,
    url: "/",
    title: "Home",
    icon: <ion-icon name="home-outline"></ion-icon>,
  },
  {
    id: 2,
    url: "/listposts",
    title: "List Posts",
    icon: <ion-icon name="book-outline"></ion-icon>,
  },
  {
    id: 3,
    url: "/Introduce",
    title: "Introduce",
    icon: <ion-icon name="receipt-outline"></ion-icon>,
  },
  {
    id: 4,
    url: "/accountManagement",
    title: "Account management",
    icon: <ion-icon name="brush-outline"></ion-icon>,
  },
  {
    id: 5,
    url: "/favorite_list",
    title: "favorite blog list",
    icon: <ion-icon name="clipboard-outline"></ion-icon>,
  },
];

export const MenuAccount = [
  {
    id: 1,
    url: "/AccountManagement/user",
    title: "User information",
    icon: <ion-icon name="person-circle"></ion-icon>,
  },
  {
    id: 2,
    url: "/AccountManagement/createpost",
    title: "Create post",
    icon: <ion-icon name="create"></ion-icon>,
  },
  {
    id: 3,
    url: "/AccountManagement/post-list",
    title: "List post user",
    icon: <ion-icon name="newspaper"></ion-icon>,
  },
  {
    id: 4,
    url: "/AccountManagement/create-category",
    title: "Create category",
    icon: <ion-icon name="layers"></ion-icon>,
  },
];
export default MenuLink;
