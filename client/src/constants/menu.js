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
// ];
const currentUser = JSON.parse(localStorage.getItem('user'))
const Admin = [
  {
    id: "skills_page",
    icon: "iconsminds-three-arrow-fork",
    label: "menu.skills",
    to: "/app/skills",
  },
  {
    id: "teams_page",
    icon: "iconsminds-library",
    label: "menu.teams",
    to: "/app/teams/all",

  },
  {
    id: "blankpage",
    icon: "iconsminds-bucket",
    label: "menu.profile",
    to: "/app/profile/me",
  },
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
console.log(currentUser)
const data = currentUser.roles.some(role => role.name === "Admin") ? Admin : currentUser.roles.some(role => role.name === "Student") ? Student : Standard

export default data;
