import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useState,
} from "react";
import styled from "./input.module.scss";

interface input extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  icon?: string;
  isLabelholder?: boolean;
}

export const Input = React.forwardRef(function Input(
  { name, type = "text", icon, placeholder, isLabelholder = true, style, className,...props }: input, ref : React.ForwardedRef<HTMLInputElement>
) {
  const [showPassword, setShowPassword] = useState(false);

  if (type.match("password")) {
    return (
      <div className={styled["inputContainer"]}>
        <input
          className={(className ? className + " ": "") + styled.inputStyled}
          style={{
            ...style,
            paddingRight: "35px",
            ...(icon ? { paddingLeft: "40px" } : {}),
            ...(placeholder && isLabelholder
              ? { paddingTop: "20px", paddingBottom: "10px" }
              : {}),
          }}
          type={showPassword ? "text" : "password"}
          name={name}
          {...ref && {ref: ref} }
          {...props}
          title={placeholder}
        />
        {icon && <i className={icon}></i>}
        {placeholder && (
          <span
            className={(isLabelholder ? "toLabel " : "") + styled.placeholder}
          >
            {placeholder}
          </span>
        )}
        <button
          tabIndex={-1}
          type="button"
          title={showPassword ? "Ocultar senha" : "Mostrar senha"}
          className={
            (showPassword ? "active " : "") + styled["show-password-button"]
          }
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        ></button>
      </div>
    );
  } else {
    return (
      <div className={styled.inputContainer}>
        <input
          className={(className ? className + " ": "") + styled.inputStyled}
          style={{
            ...style,
            ...(icon ? { paddingLeft: "40px" } : {}),
            ...(placeholder && isLabelholder
              ? { paddingTop: "20px", paddingBottom: "10px" }
              : {}),
          }}
          type={type}
          name={name}
          {...ref && {ref: ref} }
          title={placeholder}
          {...props}
        />
        {icon && <i className={icon}></i>}
        {placeholder && (
          <span
            className={(isLabelholder ? "toLabel " : "") + styled.placeholder}
          >
            {placeholder}
          </span>
        )}
      </div>
    );
  }
});
