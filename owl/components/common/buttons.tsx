import styles from "../../styles/components/common/Buttons.module.scss";

/**
 * Regular btn
 * @remarks - Used for most of the work
 */
export const RegularButton = ({ text, onClick }) => {
  return (
    <button className={styles["regular-btn"]} onClick={onClick}>
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
    <button className={styles["primary-btn"]} onClick={onClick}>
      {text}
    </button>
  );
};
