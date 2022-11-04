import { LoadingPageLogo } from "../../components/loadingPage/logo";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";


export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useRouter();
  const auth = useAuth();
  if (!auth.email && !auth.loadingUserFromLocalStorage) {
    location.push("/entrar?error=needsLogin")
  }
  if (auth.loadingUserFromLocalStorage || !auth.userInfo?.id || !auth.authorities?.length) {
    return (
      <LoadingPageLogo/>
    );
  }

  return children;
}
