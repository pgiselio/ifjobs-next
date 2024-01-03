import CircularProgressFluent from "../circular-progress-fluent";
import styles from "./styles.module.scss";

export function LoadingPage() {
  return (
    <div className={styles["loadingPageStyle"]}>
      <CircularProgressFluent
        color="var(--accent-color)"
        height="50px"
        width="50px"
      />
    </div>
  );
}
