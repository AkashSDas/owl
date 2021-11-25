import { useRouter } from "next/dist/client/router";
import { Document, Folder, Play } from "react-iconly";
import btnStyle from "../../styles/components/sidebar/SidebarButton.module.scss";
import sidebarStyle from "../../styles/components/sidebar/Sidebar.module.scss";
import { useContext, useEffect, useState } from "react";
import { CourseEditorSidebarContext } from "../../lib/context/sidebar";

export const BaseSidebar = () => {
  const router = useRouter();

  const routes1 = ["/course/create", "/course/my", "/course/[courseId]/update"];
  const routes2 = [
    "/course/[courseId]/chapter",
    "/course/[courseId]/chapter/create",
  ];

  const isSidebar1 = routes1.filter((r) => r === router.route).length !== 0;
  const isSidebar2 = routes2.filter((r) => r === router.route).length !== 0;

  if (isSidebar1) return <Sidebar1 />;
  if (isSidebar2) return <Sidebar2 />;

  return null;
};

const Sidebar1 = () => {
  const router = useRouter();

  return (
    <div
      style={{ width: "250px", marginTop: "72px" }}
      className={`bg-grey1 h-screen fixed flex flex-col p-4 ${sidebarStyle["sidebar"]}`}
    >
      <SidebarButton
        icon={
          <Document
            primaryColor={
              router.route !== "/course/my" ? "hsla(0, 0%, 19%, 1)" : "white"
            }
          />
        }
        text="My Courses"
        route="/course/my"
        routePattern="/course/my"
      />
      <SidebarButton
        icon={
          <Play
            primaryColor={
              router.route !== "/course/create"
                ? "hsla(0, 0%, 19%, 1)"
                : "white"
            }
          />
        }
        text="Create a course"
        route="/course/create"
        routePattern="/course/create"
      />
    </div>
  );
};

const Sidebar2 = () => {
  const router = useRouter();
  const { sidebar } = useContext(CourseEditorSidebarContext);

  return (
    <div
      style={{ width: "250px", marginTop: "72px" }}
      className={`bg-grey1 h-screen fixed flex flex-col p-4 ${sidebarStyle["sidebar"]}`}
    >
      <SidebarButton
        icon={<Play primaryColor={false ? "white" : "hsla(0, 0%, 19%, 1)"} />}
        text="Course Look"
        routePattern="/no-match"
        route="#"
      />
      <SidebarButton
        icon={
          <Folder
            primaryColor={
              router.route !== "/course/[courseId]/chapter"
                ? "hsla(0, 0%, 19%, 1)"
                : "white"
            }
          />
        }
        text="Chapters"
        route={sidebar.courseId ? `/course/${sidebar.courseId}/chapter` : "#"}
        routePattern={"/course/[courseId]/chapter"}
      />
    </div>
  );
};

interface SidebarButtonProps {
  routePattern: string;
  route: string;
  icon: JSX.Element;
  text: string;
}

const SidebarButton = (props: SidebarButtonProps) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(router.route === props.routePattern);
  }, [router.route]);

  return (
    <button
      className={`p-4 rounded-2xl flex justify-start items-center space-x-2 ${
        !isActive ? "bg-grey1" : "bg-secondary"
      } ${!isActive ? btnStyle["sidebar-btn"] : ""} cursor-pointer`}
      onClick={() => router.push(props.route)}
    >
      <div>{props.icon}</div>
      <div className={`${!isActive ? "text-grey4" : "text-grey0"} font-medium`}>
        {props.text}
      </div>
    </button>
  );
};
