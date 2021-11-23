import { useRouter } from "next/dist/client/router";

export const BaseSidebar = () => {
  const router = useRouter();

  if (router.route === "/course/create") {
    return (
      <div
        style={{ width: "250px", marginTop: "72px" }}
        className="bg-grey1 h-screen fixed"
      ></div>
    );
  }

  return null;
};
