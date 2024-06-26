export function AccessGlobalStyle() {
    return(
        <style global jsx>{`  
         :root {
          --bg-login: #fcfcfc;
        }
        body{
          background: linear-gradient(
              45deg,
              rgba(6, 52, 15, 1) 0%,
              rgba(28, 136, 50, 1) 50%,
              rgba(147, 255, 169, 1) 100%
            ),
            rgb(6, 52, 15);
          background-attachment: fixed;
        }
      `}</style>
    );
}