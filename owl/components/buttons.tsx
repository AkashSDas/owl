import btnStyles from "../styles/scss/components/Buttons.module.scss";

/**
 * Regular btn
 * @remarks - Used for most of the work
 */
export const RegularButton = ({ text, onClick }) => {
  return (
    <button className={btnStyles["regular-btn"]} onClick={onClick}>
      {text}
    </button>
  );
};

/**
 * Primary btn
 * @remarks - Used for important action btns where user's focus should go
 */
export const PrimaryButton = ({ text, onClick }) => {
  return (
    <button className={btnStyles["primary-btn"]} onClick={onClick}>
      {text}
    </button>
  );
};
