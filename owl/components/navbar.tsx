import { Search } from "react-iconly";
import styles from "../styles/scss/components/Navbar.module.scss";
import { Logo } from "./svgs/logo";
import { PrimaryButton, RegularButton } from "../components/buttons";

/**
 * Navbar
 *
 * @todo
 * - Make it responsive for tablet and mobile
 */
export const Navbar = () => {
  return (
    <nav className={styles["navbar"]}>
      <div className="cursor-pointer">
        <Logo />
      </div>
      <Actions />
    </nav>
  );
};

/**
 * Action items on the left side of navbar
 */
const Actions = () => {
  return (
    <div className="flex space-x-8 items-center">
      <TextNavItem text="Explore" />
      <TextNavItem text="Teacher" />
      <div className="cursor-pointer">
        <Search />
      </div>
      <RegularButton text="Login" onClick={() => {}} />
      <PrimaryButton text="Sign up" onClick={() => {}} />
    </div>
  );
};

const TextNavItem = ({ text }) => {
  return (
    <span className="text-mobile-body-main text-grey3 font-bold cursor-pointer">
      {text}
    </span>
  );
};
