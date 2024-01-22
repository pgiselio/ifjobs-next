import React from "react";
import styled from "./styles.module.scss";

interface HamburgerButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  active?: boolean;
}
export function HamburgerBars({ active, ...props }: HamburgerButtonProps) {
  return (
    <div
      {...props}
      className={
        (active ? styled["active"] + " " : "") +
        styled["ham-button"] +
        (props.className ? " " + props.className : "")
      }
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
