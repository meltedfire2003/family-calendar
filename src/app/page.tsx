"use client";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { CiCalendar, CiCircleList, CiForkAndKnife, CiTrash } from "react-icons/ci";
import { useFullscreen } from "./fullscreen";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { PrimeReactProvider } from "primereact/api";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { GiPencil, GiTrashCan, GiVacuumCleaner } from "react-icons/gi";
import { OrderList } from "primereact/orderlist";
import { Checkbox } from "primereact/checkbox";
import { SpeedDial } from "primereact/speeddial";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "primereact/resources/themes/mira/theme.css";
import { GrUserAdd } from "react-icons/gr";
import { DataView } from "primereact/dataview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { get } from "http";
import UserTable from "./components/userTable";

import CustomWeekView from './components/menuCalendar'

const localizer = momentLocalizer(moment);

const events = [
  {
    start: new Date(2024, 0, 26, 13, 0, 0),
    end: new Date(2024, 0, 26, 14, 0, 0),
    title: "Some title",
  },
];

const menu = [
  {
    start: new Date(2024, 0, 29, 13, 0, 0),
    end: new Date(2024, 0, 29, 14, 0, 0),
    title: "Dirty Rice Casserole",
    allDay:true,
    resource:'https://www.cdkitchen.com/recipes/recs/1002/Dirty-Rice-Casserole73472.shtml'
    
  },
  {
    start: new Date(2024, 0, 30, 13, 0, 0),
    end: new Date(2024, 0, 30, 14, 0, 0),
    title: "Steak",
    allDay:true
    
  },
  {
    start: new Date(2024, 0, 31, 13, 0, 0),
    end: new Date(2024, 0, 31, 14, 0, 0),
    title: "Spaghetti",
    allDay:true
    
  },
  {
    start: new Date(2024, 1, 1, 13, 0, 0),
    end: new Date(2024, 1, 1, 14, 0, 0),
    title: "Pizza",
    allDay:true
    
  },
  {
    start: new Date(2024, 1, 2, 13, 0, 0),
    end: new Date(2024, 1, 2, 14, 0, 0),
    title: "Ribs",
    allDay:true
    
  },
  {
    start: new Date(2024, 1, 3, 13, 0, 0),
    end: new Date(2024, 1, 3, 14, 0, 0),
    title: "Arbys",
    allDay:true
    
  },
  
  
];

export default function Home() {
  const { fullscreenRef, enterFullscreen, exitFullscreen, fullscreenActive } = useFullscreen();
  const [selectedTab, setSelectedTab] = useState("calendar");
  

  const {views, ...otherProps} = useMemo(() => ({
    views: {
      month: true,
      week: CustomWeekView,
      day: true
    },
    selectable: true,
    localizer:localizer,
    defaultDate: new Date(),
    defaultView:'week',
    events: menu,
    style: {
      height:"80vh"
    }
    // ... other props
  }), [])
 
 

  const items = [
    {
      label: "Calendar",
      icon: "pi pi-pencil",
      command: () => {},
    },
    {
      label: "Todo",
      icon: "pi pi-refresh",
      command: () => {},
    },
    {
      label: "Menu",
      icon: "pi pi-trash",
      command: () => {},
    },
    {
      label: "Chores",
      icon: "",
      command: () => {
        alert("test");
      },
    },
  ];

  const todos = [
    { name: "Do Dishes", completed: false },
    { name: "Do Laundry", completed: false },
    { name: "Take a nap", completed: true },
  ];






  







  const itemTemplate = (item: any) => {
    return (
      <div style={{ display: "flex", flexDirection: "row", gap: 9, alignItems: "center" }}>
        <Checkbox onChange={(e) => (item.completed = e.checked)} checked={item.completed}></Checkbox>

        <span className="font-bold">{item.name}</span>
      </div>
    );
  };

  
  

  return (
    <PrimeReactProvider>
      <div className="flex justify-center flex-col">
        <SpeedDial  model={items} direction="down" style={{ top: 14, left: "calc(100% - 4rem)" }} />

        <div style={{ display: "flex", flexDirection: "row", gap: 12, padding: 12, alignSelf: "flex-end", marginRight: 70 }}>
          <Button  onClick={() => setSelectedTab("calendar")} pt={{ root: { style: { borderRadius: 50, padding: 10 } } }}>
            <CiCalendar size={24} />
          </Button>

          <Button   onClick={() => setSelectedTab("todo")} pt={{ root: { style: { borderRadius: 50, padding: 10 } } }}>
            <CiCircleList size={24} />
          </Button>

          <Button   onClick={() => setSelectedTab("menu")} pt={{ root: { style: { borderRadius: 50, padding: 10 } } }}>
            <CiForkAndKnife size={24} />
          </Button>

          <Button   onClick={() => setSelectedTab("chores")} pt={{ root: { style: { borderRadius: 50, padding: 10 } } }}>
            <GiVacuumCleaner size={24} />
          </Button>

          <Button  onClick={() => setSelectedTab("users")} pt={{ root: { style: { borderRadius: 50, padding: 10 } } }}>
            <GrUserAdd size={24} />
          </Button>
        </div>

         

        {selectedTab === "todo" && (
          <div className="flex justify-center">
            <OrderList dataKey="id" value={todos} itemTemplate={itemTemplate} header="Todos" pt={{ controls: { style: { display: "none" } } }}></OrderList>
          </div>
        )}

        {/* {selectedTab === "menu" && <div id="test"> <Calendar   views={views} {...otherProps}/></div>} */}

        {selectedTab === "calendar" && <Calendar  selectable localizer={localizer} defaultDate={new Date()} defaultView="month" events={events} style={{ height: "80vh" }} />}

        {selectedTab === "chores" && <p>chores</p>}

        {selectedTab === "users" && (
          <div className="my-8 mx-24">
          <UserTable></UserTable>
          </div>
        )}

        {/* {!fullscreenActive && <Button label="Enter Fullscreen" rounded onClick={enterFullscreen} />} */}
      </div>
    </PrimeReactProvider>
    // <PrimeReactProvider >
    // <main>
    //   <div  >
    //   <Button onClick={() => fetch("./api/users", {method:'POST'})} >add</Button>
    //   <Button onClick={() =>getUsers()} >
    //   <CiCircleList size={24} />
    //         </Button>

    //         <Calendar localizer={localizer} defaultDate={new Date()} defaultView="month" events={events} style={{ height: "80vh" }} />
    //     {/* <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
    //       Get started by editing&nbsp;
    //       <code className="font-mono font-bold">src/app/page.tsx</code>
    //     </p>
    //     <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
    //       <a
    //         className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
    //         href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         By{" "}
    //         <Image
    //           src="/vercel.svg"
    //           alt="Vercel Logo"
    //           className="dark:invert"
    //           width={100}
    //           height={24}
    //           priority
    //         />
    //       </a>
    //     </div>
    //   </div>

    //   <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
    //     <Image
    //       className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
    //       src="/next.svg"
    //       alt="Next.js Logo"
    //       width={180}
    //       height={37}
    //       priority
    //     />
    //   </div>

    //   <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
    //     <a
    //       href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Docs{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Find in-depth information about Next.js features and API.
    //       </p>
    //     </a>

    //     <a
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Learn{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Learn about Next.js in an interactive course with&nbsp;quizzes!
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Templates{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Explore starter templates for Next.js.
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Deploy{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
    //         Instantly deploy your Next.js site to a shareable URL with Vercel.
    //       </p>
    //     </a>
    //   </div> */}
    //   </div>
    // </main>
    // </PrimeReactProvider>
  );
}
