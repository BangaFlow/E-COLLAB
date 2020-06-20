const data = [

  {
    id: "gogo",
    icon: "iconsminds-air-balloon-1",
    label: "menu.gogo",
    to: "/app/gogo",
    subs: [
      {
        icon: "simple-icon-paper-plane",
        label: "menu.start",
        to: "/app/gogo/start"
      }  ,{
        icon: "simple-icon-paper-plane",
        label: "menu.start",
        to: "/app/gogo/Projects"
      }     
    ]
  },
  {
    id: "projects",
    icon: "iconsminds-library",
    label: "projects",
    to: "/app/projects",
    subs: [
      {
        icon: "simple-icon-list",
        label: "Categories",
        to: "/app/projects/categories"
      } ,
      {
        icon: "simple-icon-check",
        label: "Projects",
        to: "/app/projects/Projects"
      } ,
      {
        icon: "simple-icon-control-play",
        label: "Subjects",
        to: "/app/projects/Subjects"
      } ,
     
        
    ]
  },
  {
    id: "Files",
    icon: "iconsminds-three-arrow-fork",
    label: "File Management",
    to: "/app/FileManagement/Files",
    
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
    id: "docs",
    icon: "iconsminds-library",
    label: "menu.docs",
    to: "https://gogo-react-docs.coloredstrategies.com/",
    newWindow:true
  }
];
export default data;
