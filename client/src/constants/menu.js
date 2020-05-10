const data = [
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
    id: "blankpage",
    icon: "iconsminds-bucket",
    label: "menu.blank-page",
    to: "/app/blank-page"
  },
  {
    id: "Calendar",
    icon: "iconsminds-calendar-4",
    label: "menu.Calendar",
    to: "/calendar"
  },
  {
    id: "docs",
    icon: "iconsminds-library",
    label: "menu.docs",
    to: "https://gogo-react-docs.coloredstrategies.com/",
    newWindow:true
  }
];
export default data;
