import { useEffect } from "react";
import CircularProgressFluent from "../../components/General/circular-progress-fluent";
import { useAuth } from "../../hooks/useAuth";
import styled from "../../styles/LoginSignupStyle.module.scss";
import { AccessGlobalStyle } from "../../styles/_Pages/Cadastro/AccessGlobalStyle";


export default function LogoutPage() {
  const auth = useAuth();
  useEffect(() => {
    auth.logout();
    if (!auth.email) {
      window.location.href = "/entrar";
    }
  });

  return (
    <main className={styled.StyledAccess}>
      <AccessGlobalStyle/>
      <div
        className="access-container"
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          color: "#dbdbdb",
        }}
      >
        <CircularProgressFluent
          color="white"
          height="60px"
          width="60px"
          duration="1.5s"
        />
      </div>
    </main>
  );
}
