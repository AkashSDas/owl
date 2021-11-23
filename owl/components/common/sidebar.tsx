import { useRouter } from "next/dist/client/router";
import { Document, Play } from "react-iconly";
import btnStyle from "../../styles/components/sidebar/SidebarButton.module.scss";
import sidebarStyle from "../../styles/components/sidebar/Sidebar.module.scss";

export const BaseSidebar = () => {
  const router = useRouter();

  const routes = ["/course/create", "/course/my"];
  if (routes.filter((r) => r === router.route).length !== 0) {
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
        />
      </div>
    );
  }

  return null;
};

const SidebarButton = ({
  route,
  icon,
  text,
}: {
  route: string;
  icon: JSX.Element;
  text: string;
}) => {
  const router = useRouter();

  return (
    <button
      className={`p-4 rounded-2xl flex justify-start items-center space-x-2 ${
        router.route !== route ? "bg-grey1" : "bg-secondary"
      } ${
        router.route !== route ? btnStyle["sidebar-btn"] : ""
      } cursor-pointer`}
      onClick={() => router.push(route)}
    >
      <div>{icon}</div>
      <div
        className={`${
          router.route !== route ? "text-grey4" : "text-grey0"
        } font-medium`}
      >
        {text}
      </div>
    </button>
  );
};
