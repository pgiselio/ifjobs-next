import React from "react";
import styled from "./styles.module.scss";
import CircularProgressFluent from "../circular-progress-fluent";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean;
  isLoadingText?: string;
}

export const Button = React.forwardRef(function Button(
  {
    type,
    className,
    children,
    isLoading,
    isLoadingText,
    ...props
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      {...(type ? { type: type } : { type: "button" })}
      {...(ref && { ref: ref })}
      {...props}
      className={styled.button + (className ? " " + className : "")}
    >
      {isLoading ? (
        <span className="d-flex align-items-center justify-content-between gap-2">
          <CircularProgressFluent
            color="white"
            height="20px"
            width="20px"
            duration=".8s"
          />
          <span>{isLoadingText || "Carregando..."}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
});
