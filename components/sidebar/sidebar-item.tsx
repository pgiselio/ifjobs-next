import Link from "next/link";
import { useAppOptions } from "../../hooks/useAppOptions";

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
  function ToggleSidebar() {
    if (!window.matchMedia("(min-width: 766px)").matches) {
      appOptions.toggleSidebar();
    }
  }
  return (
    <li>
      <Link href={`/sys/${to}`}  passHref>
        <a className={className} title={title || label} onClick={ToggleSidebar}>
          <i className={icon}></i>
          <span>{label}</span>
        </a>
      </Link>
    </li>
  );
}
