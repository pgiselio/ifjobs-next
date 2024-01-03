import styled from "styled-components";
import styles from "./styles.module.scss";

interface CircularProgressProps {
  className?: string;
  color?: string;
  width?: number | string;
  height?: number | string;
  duration?: string;
}

export default function CircularProgressFluent({
  className = "",
  color = "#1d8c37",
  width = "50px",
  height = width,
  style,
  duration = "1s",
  ...rest
}: CircularProgressProps & React.SVGProps<SVGSVGElement>) {
  return (
    <b className={`${styles["CircularProgressFluentB"]}`}
      style={{
        ...style,
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        animationDuration: duration,
      }}
    >
      <svg
        {...rest}
        crossOrigin="anonymous"
        viewBox="25 25 50 50"
        className={`${styles["circular-progress-circle-fluent-svg"]} ${className}`}
      >
        <circle
          className={styles["circular-progress-circle-fluent"]}
          style={{animationDuration: `calc(${duration} * 3)`, stroke: color}}
          cx="50"
          cy="50"
          r="20"
        ></circle>
      </svg>
    </b>
  );
}