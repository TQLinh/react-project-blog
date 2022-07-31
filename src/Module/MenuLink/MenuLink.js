const MenuLink = [
  {
    id: 1,
    url: "/",
    title: "Home",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ),
  },
  {
    id: 2,
    url: "/listposts",
    title: "List Posts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      </svg>
    ),
  },
  {
    id: 3,
    url: "/Introduce",
    title: "Introduce",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
      </svg>
    ),
  },
  {
    id: 4,
    url: "/accountManagement",
    title: "Account management",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
      </svg>
    ),
  },
  {
    id: 5,
    url: "/favorite_list",
    title: "favorite blog list",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
      </svg>
    ),
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
  {
    id: 5,
    url: "/AccountManagement/message",
    title: "Message Admin",
    icon: <ion-icon name="chatbox-ellipses-sharp"></ion-icon>,
  },
  {
    id: 6,
    url: "/",
    title: "Home",
    icon: <ion-icon name="home"></ion-icon>,
  },
  {
    id: 7,
    url: "/signInPage",
    title: "Log Out",
    icon: <ion-icon name="log-out"></ion-icon>,
    onClick: () => {},
  },
];
export default MenuLink;
