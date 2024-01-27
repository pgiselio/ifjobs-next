import { LiHTMLAttributes } from "react";
import styled from "./style.module.scss";

export const PillList = ({
  children,
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>) => {
  return (
    <ul
      className={styled["pill-list"] + (className ? " " + className : "")}
      {...rest}
    >
      {children}
    </ul>
  );
};

export function PillItem({
  className,
  children,
  ...rest
}: React.DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>) {
  return (
    <li
      className={styled["pill-item"] + (className ? " " + className : "")}
      {...rest}
    >
      {children}
    </li>
  );
}
