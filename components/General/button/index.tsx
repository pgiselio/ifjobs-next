import React from "react";
import styled from "./styles.module.scss";

export function Button(props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button
      {...props.type ? '' : {type:"button"}}
      {...props}
      className={
        styled.button + (props.className ? " " + props.className : "")
      }
    >
      {props.children}
    </button>
  );
}
