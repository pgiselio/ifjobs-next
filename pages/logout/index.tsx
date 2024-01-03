import { useEffect } from "react";
import CircularProgressFluent from "../../components/General/circular-progress-fluent";
import { useAuth } from "../../hooks/useAuth";
import { AccessGlobalStyle, StyledAccess } from "../../styles/LoginSignupStyle";

export default function LogoutPage() {
  const auth = useAuth();
  useEffect(() => {
    auth.logout();
    if (!auth.email) {
      window.location.href = "/entrar";
    }
  });

  return (
    <StyledAccess>
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
        <AccessGlobalStyle />
      </div>
    </StyledAccess>
  );
}
