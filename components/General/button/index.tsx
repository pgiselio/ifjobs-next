import React from "react";
import styled from "./styles.module.scss";

export const Button = React.forwardRef(function Button(
  {
    type,
    className,
    children,
    ...props
  }: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      {...(type ? "" : { type: "button" })}
      {...props}
      className={
        styled.button + (className ? " " + className : "")
      }
    >
      {children}
    </button>
  );
});
