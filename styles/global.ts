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
    --text-a: ${(props) => props.theme.colors.textA};
    --text-b: ${(props) => props.theme.colors.textB};
    --text-c: ${(props) => props.theme.colors.textC};
    --navs-bg: ${(props) => props.theme.colors.systemMenu.background};
    --navs-bg-opacity: ${(props) => props.theme.colors.systemMenu.background}f5;
    --navs-border: ${(props) => props.theme.colors.systemMenu.border};
    --aside-link-active:${(props) => props.theme.colors.systemMenu.linkActive};
    --aside-link-hover: ${(props) => props.theme.colors.systemMenu.linkHover};
    --aside-link-onclick: ${(props) => props.theme.colors.systemMenu.linkOnClick};
    --primary-bg: ${(props) => props.theme.colors.primaryBg};
    --secondary-bg: ${(props) => props.theme.colors.secondaryBg};
  }
`;
