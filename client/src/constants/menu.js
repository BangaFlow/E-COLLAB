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
    id: "gogo",
    icon: "iconsminds-library",
    label: "menu.gogo",
    to: "/app/gogo",
    subs: [
      {
        icon: "simple-icon-paper-plane",
        label: "menu.start",
        to: "/app/gogo/start"
      }     
    ]
  },
  {
  id: "Quiz",
    icon: " iconsminds-livejournal",
    label: "menu.Quiz",
    to: "/app/Quiz",
    subs: [
      {
        icon: "simple-icon-paper-plane",
        label: "menu.Quizzes",
        to: "/app/Quiz/quizzes"
      }     
    ]
  },
  
  {
    id: "event",
    icon: "iconsminds-calendar-1",
    label: "Event",
    to: "/app/Event",
    subs: [
      {
        icon: "simple-icon-note",
        label: "Events",
        to: "/app/Event/events"
      } ,
      {
        icon: "simple-icon-star",
        label: "Workshops ",
        to: "/app/Event/workshops"
      } ,
      {
        icon: "simple-icon-paper-clip",
        label: "Mettings ",
        to: "/app/Event/meetings"
      } 

    ]
  },
  {
    id: "secondmenu",
    icon: "iconsminds-three-arrow-fork",
    label: "menu.second-menu",
    to: "/app/second-menu",
    subs: [
      {
        icon: "simple-icon-paper-plane",
        label: "menu.second",
        to: "/app/second-menu/second"
      }
    ]
  },
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
    id: "Calendar",
    icon: "iconsminds-calendar-4",
    label: "menu.Calendar",
    to: "/app/myClendar"
  },
  {
    id: "docs",
    icon: "iconsminds-library",
    label: "menu.docs",
    to: "https://gogo-react-docs.coloredstrategies.com/",
    newWindow:true
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
    to: "/app/gogo"
  },
]
console.log(currentUser)
const data = currentUser.roles.some(role => role.name === "Admin") ? Admin : currentUser.roles.some(role => role.name === "Student") ? Student : Standard

export default data;
