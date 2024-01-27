import styled from "styled-components";

export const SidebarOverlay = styled.div`
  body.toggle-sidemenu & {
    background: hsla(0, 0%, 0%, 0.33);
    position: fixed;
    top: calc(var(--top-bar-height) + 1px);
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 19;
    animation: fade 0.2s ease;
  }
  @media (min-width: 768px) {
    display: none;
    pointer-events: none;
  }
`;
export const SidebarAside = styled.aside`
  //Sidebar List
  grid-area: menu;
  height: calc(100% - var(--top-bar-height));
  max-height: calc(100vh - var(--top-bar-height));
  background-color: var(--navs-bg);
  border-right: 1px solid ${(props) => props.theme.colors.systemMenu.border};
  position: fixed;
  top: var(--top-bar-height);
  z-index: 20;
  width: 280px;
  max-width: 100vw;
  transition: width 0.3s, transform 0.5s, padding 0.3s linear;
  transform: translateX(calc(-100vw - 280px));
  &::after {
    content: " ";
    position: fixed;
    top: 0;
    left: 280px;
    height: 10px;
    width: 10px;
    border-left: 1px solid;
    border-top: 1px solid;
    border-color: var(--navs-border);
    border-top-left-radius: 10px;
    box-shadow: -4px -3px 0 2px var(--navs-bg);
    box-shadow: -4px -3px 0 2px var(--navs-bg);
    z-index: 20;
    pointer-events: none;
  }

  body.toggle-sidemenu & {
    transform: translateX(0);
  }
  body.toggle-sidemenu & .sidebar-scroller {
    padding: 0 10px;
    transition: padding 0.3s linear;
  }

  .sidebar-scroller {
    position: relative;
    margin-top: 15px;
    z-index: 21;
    overflow: overlay;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
  }

  .side-bar-container {
    padding-top: 20px;
  }

  .min-perfil {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: gap 0.3s ease;
  }

  .profile-pic {
    width: 65px;
    height: 65px;
    border-radius: 100%;
    transition: height 0.3s, width 0.3s ease;
  }
  .min-perfil-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .min-perfil-name,
  .min-perfil .min-perfil-detail {
    color: var(--text-a);
    width: 100%;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-transform: capitalize;
    padding: 0 10px;
    font-size: 15px;
    font-weight: 500;
    opacity: 1;
    transition: height 0.5s, opacity 0.5s, padding 0.5s ease;
  }
  .min-perfil .min-perfil-detail {
    color: var(--text-b);
    font-size: 13px;
    text-transform: none;
    padding: 0;
  }

  .sidebar-items {
    margin-top: 30px;
  }

  .sidebar-items ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    padding-bottom: 20px;
  }

  .sidebar-items .menu-separator {
    border-bottom: 1px solid var(--outline-color);
    margin: 5px 0;
  }

  .sidebar-items .menu-separator ~ li {
    position: sticky;
    bottom: 15px;
    margin-top: 25px;
    padding: 10px 0;
    padding-top: 10px;
    background-color: var(--navs-bg);
    a:first-child {
      box-shadow: 0px -10px 29px 17px var(--navs-bg);
      -webkit-box-shadow: -10px -20px 29px 17px var(--navs-bg);
      -moz-box-shadow: 0px -10px 29px 17px var(--navs-bg);
    }
  }

  @media (min-width: 766px) {
    position: sticky;
    transition: padding 0.3s ease;
    border-right: none;
    transform: initial;
    .sidebar-scroller {
      padding: 0 10px;
    }
    &::after {
      display: none;
    }
    & .sidebar-scroller::-webkit-scrollbar {
      width: 8px;
      transition: all 0.3s linear;
    }

    & .sidebar-scroller::-webkit-scrollbar-thumb {
      background: transparent;
      border-radius: 20px;
      -webkit-background-clip: content-box;
      background-clip: content-box;
      border: 2px solid transparent;
    }
    & .sidebar-scroller:hover::-webkit-scrollbar-thumb {
      background-color: #a3a3a3d5;
    }

    & .sidebar-scroller::-webkit-scrollbar-thumb:hover {
      background-color: #838383d5;
      border-width: 1px;
    }
    & .sidebar-scroller::-webkit-scrollbar-thumb:active {
      background-color: #707070d5;
      border-width: 1px;
    }
    body.toggle-sidemenu & {
      width: 80px;
    }
    body.toggle-sidemenu & .sidebar-scroller {
      padding: 0 10px;
    }

    body.toggle-sidemenu & .min-perfil {
      gap: 0;
    }

    body.toggle-sidemenu & .profile-pic {
      width: 60px;
      height: 60px;
    }

    body.toggle-sidemenu & .min-perfil-name,
    body.toggle-sidemenu & .min-perfil .min-perfil-detail {
      opacity: 0;
      height: 0;
      padding: 0;
    }
  }

  // ------- Sidebar Item --------
  .sidebar-items ul li {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    font-size: 14px;

    a {
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;
      height: 40px;
      text-decoration: none;
      font-weight: 500;
      color: var(--text-a);
      padding: 10px 15px;
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
      border-radius: 30px;
      transition: border-radius 0.5s, margin 0.5s ease;
      span {
        opacity: 1;
        margin-left: 15px;
        width: calc(100% - 45px);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        transition: opacity 0.5s ease;
      }
      i {
        width: 30px;
        color: var(--text-b);
        text-align: center;
        font-size: 16px;
      }
      &:hover {
        background-color: /*#dfdfdf*/ var(--secondary-bg);
      }

      &:active {
        background-color: /*#cecece*/ var(--primary-bg);
      }

      &.active {
        background-color: var(--accent-color);
        color: var(--inside-accent-color);
        margin-right: 0;
      }
      &.active i {
        color: var(--inside-accent-color);
      }

      &.sair:hover i {
        color: #b3001e !important;
      }
    }

    @media (min-width: 766px) {
      body.toggle-sidemenu & a {
        padding: 15px 15px;
        border-radius: 30px;
      }

      body.toggle-sidemenu & a span {
        opacity: 0;
        display: none;
      }

      body.toggle-sidemenu & a i {
        display: flex;
        justify-content: center;
        width: 100%;
      }
    }
  }
`;
