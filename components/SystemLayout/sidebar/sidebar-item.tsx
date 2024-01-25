import Link from "next/link";
import { useAppOptions } from "../../../hooks/useAppOptions";
import { useRouter } from "next/router";

type Item = {
  to: string;
  icon: string;
  label: string;
  title?: string;
  className?: string;
  end?: boolean;
};



export function SidebarItem({ to, icon, label, title, className, end }: Item) {
  const appOptions = useAppOptions();
  const router = useRouter();
  function ToggleSidebar() {
    if (!window.matchMedia("(min-width: 766px)").matches) {
      appOptions.toggleSidebar();
    }
  }
  function checkIfIsPartOfPath(url: string) {
    const splitedPath = url.split("/");
    const includes = router.asPath.includes(url);
    return url == router.asPath || (includes && splitedPath.length > 2);
  }
  return (
    <li>
      <Link
        href={`${to}`}
        passHref
        className={className + (checkIfIsPartOfPath(to) ? " active" : "")}
        title={title || label}
        onClick={ToggleSidebar}>

        <i className={icon}></i>
        <span>{label}</span>

      </Link>
    </li>
  );
}
