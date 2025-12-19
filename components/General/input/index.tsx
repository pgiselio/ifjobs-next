import React, {
  useState,
  forwardRef,
  ForwardedRef,
  InputHTMLAttributes,
} from "react";
import styled from "./input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  isLabelholder?: boolean;
}

export const Input = forwardRef(function Input(
  {
    name,
    type = "text",
    icon,
    placeholder,
    isLabelholder = true,
    style,
    className,
    id = `input-${name}`,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const labelId = `input-${name}`;

  const computedStyle: React.CSSProperties = {
    ...style,
    ...(icon && { paddingLeft: "40px" }),
    ...(isLabelholder && placeholder && {
      paddingTop: "20px",
      paddingBottom: "10px",
    }),
    ...(isPassword && { paddingRight: "35px" }),
  };

  return (
    <div className={styled.inputContainer}>
      <input
        ref={ref}
        id={id}
        type={inputType}
        name={name}
        className={`${className ?? ""} ${styled.inputStyled}`.trim()}
        style={computedStyle}
        title={placeholder}
        aria-label={placeholder}
        {...props}
      />
      {icon && <i className={icon}></i>}
      {placeholder && (
        <label
          className={`${isLabelholder ? "toLabel" : ""} ${styled.placeholder}`.trim()}
          htmlFor={id}
        >
          {placeholder}
        </label>
      )}
      {isPassword && (
        <button
          type="button"
          tabIndex={-1}
          title={showPassword ? "Ocultar senha" : "Mostrar senha"}
          className={`${showPassword ? "active" : ""} ${styled["show-password-button"]}`.trim()}
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </div>
  );
});
