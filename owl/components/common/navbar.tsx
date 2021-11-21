import { Search } from "react-iconly";
import { Logo } from "./logo";
import styles from "../../styles/components/common/Navbar.module.scss";
import { PrimaryButton, RegularButton } from "./buttons";
import Link from "next/link";

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
      <Link href="/explore">
        <a>
          <TextNavItem text="Explore" />
        </a>
      </Link>
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
