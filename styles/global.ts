import { createGlobalStyle } from "styled-components";

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
    --navs-border: ${(props) => props.theme.colors.systemMenu.border};
    --danger-color: #F44336;
    --danger-color-opacity: #F4433650;
    --danger-color-dark: #D32F2F;
    --danger-color-dark-opacity: #D32F2F50;
  }
`;
