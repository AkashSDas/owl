import { useRouter } from "next/dist/client/router";
import { Document, Folder, Play } from "react-iconly";
import btnStyle from "../../styles/components/sidebar/SidebarButton.module.scss";
import sidebarStyle from "../../styles/components/sidebar/Sidebar.module.scss";
import { useContext, useEffect, useState } from "react";
import { CourseEditorSidebarContext } from "../../lib/context/sidebar";
import { useCourseOverview } from "../../lib/hooks/sidebar";
import { Loader } from "./loader";
import overviewStyle from "../../styles/components/sidebar/Overview.module.scss";

export const BaseSidebar = () => {
  const router = useRouter();

  const routes1 = ["/course/create", "/course/my", "/course/[courseId]/update"];
  const routes2 = [
    "/course/[courseId]/chapter",
    "/course/[courseId]/chapter/create",
    "/course/[courseId]/chapter/[chapterId]",
    "/course/[courseId]/chapter/[chapterId]/update",
    "/course/[courseId]/chapter/[chapterId]/lesson/create",
    "/course/[courseId]/chapter/[chapterId]/lesson/[lessonId]",
    "/course/[courseId]/chapter/[chapterId]/lesson/[lessonId]/update",
    "/course/[courseId]",
  ];
  const route3 = ["/course/learn/[courseId]"];

  const isSidebar1 = routes1.filter((r) => r === router.route).length !== 0;
  const isSidebar2 = routes2.filter((r) => r === router.route).length !== 0;
  const isSidebar3 = route3.filter((r) => r === router.route).length !== 0;

  if (isSidebar1) return <Sidebar1 />;
  if (isSidebar2) return <Sidebar2 />;
  if (isSidebar3) return <Sidebar3 />;

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
        icon={
          <Play
            primaryColor={
              router.route === "/course/[courseId]"
                ? "white"
                : "hsla(0, 0%, 19%, 1)"
            }
          />
        }
        text="Course Look"
        routePattern="/course/[courseId]"
        route={sidebar.courseId ? `/course/${sidebar.courseId}` : "#"}
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

/**
 * Sidebar 3
 */

const Sidebar3 = () => {
  const { courseId, overview, loading } = useCourseOverview();

  // Since we've top 72px we have to give to height as 100% minus 72px (since
  // from top it is been translated by 72px). If this isn't done then in case of
  // overlow in y then items at the end of overflow won't be scrollabled or displayed
  // So that's why using height as calc(100% - translation from top in px i.e. 72px)
  // which solves this issue.
  //
  // The solution came up observing the Chrome Inspector where while using 100% height
  // the bottom position has -72px and from there it clicked to substract 72px from 100%
  // height of the sidebar
  return (
    <div
      style={{ width: "350px", top: "72px", height: "calc(100% - 72px)" }}
      className={`bg-grey1 fixed flex flex-col overflow-y-scroll p-4 ${sidebarStyle["sidebar"]}`}
    >
      {loading || !courseId || !overview ? (
        <Loader />
      ) : (
        <Overview overview={overview} />
      )}
    </div>
  );
};

const Overview = ({ overview }) => {
  return (
    <div className="space-y-4">
      {overview.chapters.map((c) => (
        <div className="space-y-4">
          <h4 className="text-mobile-h4">{c.chapter.name}</h4>
          {c.lessons.length > 0 ? (
            <div
              style={{ borderWidth: "1px" }}
              className="border-grey2 w-full"
            ></div>
          ) : null}
          {c.lessons.map((l) => (
            <div
              className={`flex items-start p-2 rounded-2xl space-x-4 ${overviewStyle["overview-lesson-card"]} group cursor-pointer`}
            >
              <div className="text-medium">💎</div>
              <div>
                <div className="text-medium text-grey4 font-bold group-hover:text-grey0">
                  {l.name}
                </div>
                <div className="text-small text-grey3 description group-hover:text-grey1 group-hover:opacity-60">
                  {l.description}
                </div>
              </div>
              <div className="bg-grey2 text-grey3 px-3 py-2 rounded-full text-small font-bold group-hover:bg-grey1 group-hover:opacity-60 group-hover:text-grey4">
                {l.videoDuration}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
