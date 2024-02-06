import CircularProgressFluent from "../circular-progress-fluent";
import styles from "./styles.module.scss";

export function LoadingPage({reason}: {reason?: string}) {
  return (
    <div className={styles["loadingPageStyle"]}>
      <CircularProgressFluent
        color="var(--accent-color)"
        height="50px"
        width="50px"
      />
      {reason && <p>{reason}</p>}
    </div>
  );
}
