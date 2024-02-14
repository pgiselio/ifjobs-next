import React from "react";
import styled from "./styles.module.scss";

interface skeletonType extends React.HTMLAttributes<HTMLSpanElement> {
  variant: "text" | "circle" | "square";
  height?: string;
  width?: string;
}

export function Skeleton({
  variant,
  height,
  width,
  className,
  ...rest
}: skeletonType) {
  return (
    <span
      className={styled["skeleton"] + (className ? " " + className : "")}
      style={{
        height: height || "",
        width: width || "",
        marginTop: variant === "square" ? "8px" : "0px",
        marginBottom: 0,
        transformOrigin:
          variant === "circle"
            ? "55%"
            : variant === "text"
            ? "0 55%"
            : variant === "square"
            ? "0"
            : "",
        transform:
          variant === "circle"
            ? "scale(0.9)"
            : variant === "text"
            ? "scale(1, 0.6)"
            : variant === "square"
            ? "scale(1)"
            : "",
        borderRadius:
          variant === "circle"
            ? "50%"
            : variant === "text"
            ? "5px"
            : variant === "square"
            ? "5px"
            : "",
      }}
      {...rest}
    ></span>
  );
}
