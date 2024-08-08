import * as React from "react";
import styled from "./style.module.scss";

interface TabSelectorProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isActive: boolean;
  vertical?: boolean;
}
export const TabSelector = ({
  isActive,
  children,
  vertical,
  className,
  ...rest
}: TabSelectorProps) => (
  <button
    type="button"
    className={
      styled["tab-selector"] +
      (className ? " " + className : "") +
      (vertical ? " " + styled.vertical : "") +
      (isActive ? " "+ styled.active : "")
    }
    {...rest}
  >
    {children}
  </button>
);
