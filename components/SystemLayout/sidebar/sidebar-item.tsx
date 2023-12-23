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
  return (
    <li>
      <Link
        href={`${to}`}
        passHref
        className={className + (router.asPath == to ? " active" : "")}
        title={title || label}
        onClick={ToggleSidebar}>

        <i className={icon}></i>
        <span>{label}</span>

      </Link>
    </li>
  );
}
