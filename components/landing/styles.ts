import styled, { createGlobalStyle } from "styled-components";

export const LandingGlobalStyle = createGlobalStyle`
  body{
    background-color: #ffffff;
  }
  *::selection{
    background-color: var(--accent-color-opacity);
  }
`;
export const LandingStyle = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 1280px;
  }
  main.landing-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 90px;
    section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      h1 {
        font-size: clamp(1.5rem, 2.5vw, 2.5em);
        font-weight: 500;
        font-family: "Roboto", sans-serif;
      }
      h2 {
        font-size: 1.2em;
        font-family: "Roboto", sans-serif;

        font-weight: 400;
      }
    }
    section.hello-section {
      margin-top: -20px;
      max-height: calc(100vh - 70px);
      min-height: 300px;
      height: 100vh;
      width: 100%;
      color: #333;
      text-align: center;
      background-size: cover;
      .container {
        height: 100%;
        padding: 30px;
        align-self: center;
      }
      .parallax {
        height: 100%;
        .layer-1 {
          display: flex;
          justify-content: center;
        }
      }

      h2 {
        max-width: 75%;
      }
      p {
        text-align: center;
        max-width: clamp(70%, 400px, 500px);
        font-size: clamp(0.8rem, 1.5vw, 1em);
        color: #666;
      }
    }
    section.cursos-section {
      background-image: url(images/waves.svg);
      background-position: center center;
      background-size: cover;
      background-blend-mode: color-burn;
      background-color: #33313d;
      height: 500px;
      width: 100%;
      padding: 20px;
      h1 {
        color: #f1f1f1;
        margin-top: -20px;
        margin-bottom: 40px;
      }
    }
    section.aderir-section {
      background-color: var(--accent-color-opacity);
      width: 100%;
      padding: 100px 30px;
      .img-job-hunt {
        height: 150px;
        margin-bottom: 20px;
      }
      .options {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        column-gap: 100px;
        .option {
          position: relative;
          margin-top: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .option:first-child::after {
          content: " ";
          height: 100%;
          width: 2px;
          background-color: var(--accent-color-opacity);
          position: absolute;
          right: -30%;
        }
      }
    }
    section.contatos-section {
      padding: 100px 30px;
      width: 100%;
      background-color: #f1f1f1;
      min-height: 345px;
      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 50px;
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        li {
          display: flex;
          align-items: center;
          gap: 10px;
          span,
          i {
            font-size: 16px;
            color: var(--text-b);
          }
        }
      }
    }
    section.equipe-section {
      padding: 60px 30px;
      min-height: 550px;
      width: 100%;
      h1 {
        margin-bottom: 60px;
        text-align: center;
        background-color: #333;
        border-radius: 5px;
        overflow: hidden;
        color: #fff;
        padding: 5px 10px;

        strong {
          font-weight: 500;
          color: var(--accent-color);
        }
      }
      .equipe {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 100px;
        flex-wrap: wrap;
        .pessoa {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          .picture {
            height: 120px;
            border-radius: 50%;
          }
          .info {
            display: flex;
            flex-direction: column;
            align-items: center;
            h3 {
              font-size: 16px;
              color: #333;
            }
            span {
              font-size: 14px;
              color: var(--text-b);
            }
            a {
              margin-top: 5px;
              font-size: 18px;
              color: var(--text-b);
              :hover {
                color: var(--text-a);
              }
            }
          }
        }
      }
    }
  }

  footer.landing-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 50px;
    column-gap: 50px;
    flex-wrap: wrap;
    display: flex;
    background: #33313d;
    border-bottom: green 5px solid;
    img {
      height: 45px;
      &.coex {
        height: 35px;
      }
    }
  }
  .custom-bg {
    height: 100%;
  }

  .backshadow {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    z-index: 1;
  }
  .backshadow.active {
    display: block;
  }
  @media (max-width: 532px) {
    .options .option:first-child::after {
      height: 2px !important;
      width: 100% !important;
      bottom: -30%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;
