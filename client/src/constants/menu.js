// const data = [
//   {
//     id: "gogo",
//     icon: "iconsminds-air-balloon-1",
//     label: "menu.gogo",
//     to: "/app/gogo",
//     subs: [
//       {
//         icon: "simple-icon-paper-plane",
//         label: "menu.start",
//         to: "/app/gogo/start"
//       }     
//     ]
//   },
//   {
//     id: "secondmenu",
//     icon: "iconsminds-three-arrow-fork",
//     label: "menu.second-menu",
//     to: "/app/second-menu",
//     subs: [
//       {
//         icon: "simple-icon-paper-plane",
//         label: "menu.second",
//         to: "/app/second-menu/second"
//       }
//     ]
//   },
//   {
//     id: "blankpage",
//     icon: "iconsminds-bucket",
//     label: "menu.blank-page",
//     to: "/app/blank-page"
//   },
//   {
//     id: "users",
//     icon: "iconsminds-bucket",
//     label: "menu.users",
//     to: "/app/users"
//   },
//   {
//     id: "docs",
//     icon: "iconsminds-library",
//     label: "menu.docs",
//     to: "https://gogo-react-docs.coloredstrategies.com/",
//     newWindow:true
//   }
// ];
const currentUser = JSON.parse(localStorage.getItem('user'))
const Admin = [
  {
    id: "users",
    icon: "iconsminds-bucket",
    label: "menu.users",
    to: "/app/users"
  },
  {
    id: "roles",
    icon: "iconsminds-bucket",
    label: "menu.roles",
    to: "/app/roles"
  },
]
const Student = [
  {
    id: "workspace",
    icon: "iconsminds-air-balloon-1",
    label: "menu.workspace",
    to: "/app/workspace",
  },
]
const Standard = [
  {
    id: "blankpage",
    icon: "iconsminds-bucket",
    label: "menu.app",
    to: "/app/blank-page"
  },
]
const data = currentUser.roles.some(role => role.name === "Admin") ? Admin : currentUser.roles.some(role => role.name === "Student") ? Student : Standard
export default data;
