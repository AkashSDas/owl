import { Search } from "react-iconly";
import { Logo } from "../components/svgs/logo";

const Index = () => {
  return (
    <main>
      <nav
        style={{ borderBottom: "1px solid hsla(0, 0%, 0%, 0.05)" }}
        className="w-full px-5 py-4 bg-primary flex flex-row justify-between items-center"
      >
        <Logo />
        <Actions />
      </nav>
    </main>
  );
};

const Actions = () => {
  return (
    <div className="flex space-x-8 items-center">
      <span className="text-mobile-body-main text-grey3 font-bold">
        Explore
      </span>
      <span className="text-mobile-body-main text-grey3 font-bold">
        Teacher
      </span>
      <Search />
      <RegularButton text="Login" />
      <ImportantButton text="Sign up" />
    </div>
  );
};

const RegularButton = ({ text, onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      style={{ height: "45px", padding: "12px 20px 14px 20px" }}
      className="w-max rounded-full bg-grey1 text-btn-17 text-grey3 font-bold flex items-center justify-center"
    >
      {text}
    </button>
  );
};

const ImportantButton = ({ text, onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      style={{ height: "45px", padding: "12px 20px 14px 20px" }}
      className="w-max rounded-full bg-gradient-to-r from-purple2 to-purple3 text-btn-17 text-grey0 font-bold flex items-center justify-center"
    >
      {text}
    </button>
  );
};

export default Index;
