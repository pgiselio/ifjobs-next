import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ScrollToTop() {
  const location = useRouter();

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}
