import React from "react";
import { ButtonHTMLAttributes } from "react";
import styled from "./styles.module.scss";

interface FabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  size?: string;
}

export function FabButton(props: FabButtonProps) {
  return (
    <button
      {...(props.type ? "" : { type: "button" })}
      {...props}
      style={{
        ...props.style,
        backgroundColor: props.color,
        width: props.size,
        height: props.size,
        borderColor: props.color,
      }}
      className={styled.fabutton + (props.className ? " " + props.className : "")}
    >
      {props.children}
    </button>
  );
}
