import { css } from "glamor";
import styles from "../../styles/components/text_roll/TextRoll.module.scss";

export const TextRoll = ({ text, color }: { text: string; color: string }) => {
  const colorStyle = css({
    "::after": { color: color },
    "::before": { color: color },
  });

  return (
    <span className={styles["roller"]}>
      <span data-text={text} className={`${colorStyle}`}>
        {text}
      </span>
    </span>
  );
};
