import { createGlobalStyle } from "styled-components";
import { InputStyle } from "../components/General/input/styles";

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg-body: rgb(${(props) => props.theme.colors.bodyBackground});
    --accent-color: ${(props) => props.theme.colors.main};
    --accent-color-active: ${(props) => props.theme.colors.mainActive};
    --accent-color-opacity: ${(props) => props.theme.colors.main}26;
    --inside-accent-color: ${(props) => props.theme.colors.insideMain};
    --secondary-color: ${(props) => props.theme.colors.secondary};
    --outline-color: ${(props) => props.theme.colors.outlineColor};
    --info-msg-bg: #e6e6e69a;
    --info-msg-color: #363636;
    --info-msg-icon: #72727294;
    --text-a: ${(props) => props.theme.colors.textA};
    --text-b: ${(props) => props.theme.colors.textB};
    --text-c: ${(props) => props.theme.colors.textC};
    --navs-bg: ${(props) => props.theme.colors.systemMenu.background};
    --navs-bg-opacity: ${(props) => props.theme.colors.systemMenu.background}f5;
    --primary-bg: ${(props) => props.theme.colors.primaryBg};
    --secondary-bg: ${(props) => props.theme.colors.secondaryBg};
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }
  body {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
    color: var(--text-a);
    font-family: "Poppins", Arial, sans-serif;
    overflow-x: hidden;
    min-height: 100vh;
    background: var(--bg-body);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
 
  a {
    text-decoration: none;
    color: var(--accent-color);
  }

  html, body, #root{
    height: 100%;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  .section {
    text-align: center;
  }

  textarea, .textarea{
    ${InputStyle}
  }

  input[type="checkbox"] {
    all: unset;
    border: 2px solid #cccc;
    border-radius: 5px;
    width: 16px;
    height: 16px;
    display: inline-block;
    cursor: pointer;
    transition: 0.1s linear 0.2s;
    position: relative;
  }

  input[type="checkbox"]::after {
    content: "\f00c";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    -webkit-font-smoothing: antialiased;
    line-height: 16px !important;
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    text-align: center;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
    color: #fff;
    font-size: 10px;
    clip-path: circle(0px at 2px 50%);
    transition: clip-path 0.5s ease;
  }
  .inputs {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
  input[type="checkbox"]:checked {
    background: var(--accent-color);
    transition: 0.1s linear;
    border-color: var(--accent-color);
  }

  input[type="checkbox"]:checked::after {
    clip-path: circle(100% at 2px 50%);
    transition: clip-path 0.5s ease;
  }
  input[type="checkbox"]:focus-visible{
    box-shadow: 0 0 0 0.2rem rgba(45, 143, 65, 0.308);
    transition: none;
  }
  .chk {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #070707;
  }

  .chk label {
    font-size: 13px;
    margin-left: 8px;
    user-select: none;
    cursor: pointer;
  }
  .lbl {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .lbl label {
    font-size: 10pt;
    font-weight: 500;
    color: var(--text-b);
    padding: 3px 0;
    width: fit-content;
  }

  .lbl-icon {
    display: flex;
    flex-direction: row;
  }

  .lbl-icon label {
    text-align: center;
    padding: 0 10px;
  }
  .lbl-icon label i ~ *{
    padding-left: 10px;
  }

  .lbl-icon label {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-a);
    background: var(--outline-color);
    border: 1px solid var(--outline-color);
    border-right: none;
    border-radius: 5px 0 0 5px;
    font-size: 14px;
  }

  .lbl-icon input {
    border-radius: 0 5px 5px 0;
  }

  .info-message {
    display: flex;
    align-items: center;
    background: var(--info-msg-bg);
    padding: 10px;
    font-size: 13px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    color: var(--info-msg-color);
  }

  .info-message::before {
    content: "\f05a";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;

    padding-right: 10px;
    color: var(--info-msg-icon);
    height: 100%;
    font-size: 30px;
  }
  .info-message.error-msg{
    display: none;
  }
  .info-message.error-msg.show{
    display: flex;
  }

  .form-item-group{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .input-error{
    color: #c91f1f;
    padding: 0 3px;
    padding-top: 1px;
    font-size: 13px;
    font-weight: 500;
  }
  @media (max-width: 766px) {
    .form-item-group{
      grid-template-columns: 1fr;
      gap: 0;
    }
    input[type="checkbox"] {
      width: 20px;
      height: 20px;
    }

    input[type="checkbox"]::before {
      line-height: 20px !important;
      font-size: 12px;
    }
    .lbl-icon label {
      font-size: 11px;
    }
  }

`;
