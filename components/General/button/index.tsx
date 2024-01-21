import React from "react";
import { ButtonHTMLAttributes } from "react";
import styled from "./styles.module.scss";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
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
