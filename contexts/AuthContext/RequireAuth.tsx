import { usePathname, useRouter } from "next/navigation";
import { LoadingPageLogo } from "../../components/General/loadingPage/logo";
import { useAuth } from "../../hooks/useAuth";
import { JSX } from "react";


export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useRouter();
  const pathname = usePathname()
  const auth = useAuth();
  if (!auth.email && !auth.loadingUserFromLocalStorage) {
    location.push("/entrar?error=needsLogin" + (pathname ? "&next=" + pathname : ""));
  }
  if (auth.loadingUserFromLocalStorage || !auth.userInfo?.id || !auth.authorities?.length) {
    return (
      <LoadingPageLogo/>
    );
  }

  return children;
}
