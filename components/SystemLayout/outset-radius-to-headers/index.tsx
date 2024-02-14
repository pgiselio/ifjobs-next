import React from "react";
import styled from "./style.module.scss";

export function OutsetHeadersCornerRadius({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div className={styled["outset-header-corner"] + (className ? " "+ className : "")} {...props}>
      {children}
    </div>
  );
}
