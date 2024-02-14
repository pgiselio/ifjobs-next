import React, { useEffect } from "react";
import Link from "next/link";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { useRouter } from "next/router";
import { LeftArrow, RightArrow } from "./arrows";
import styled from "./styles.module.scss";
import "react-horizontal-scrolling-menu/dist/styles.css";

interface TabsMenuType extends React.HTMLAttributes<HTMLDivElement> {
  isOntop?: boolean;
  sticky?: boolean;
  size?: "small" | "medium" | "large";
  items: TabsMenuItemType[];
}
type TabsMenuItemType = {
  to: string;
  title: string;
  highlighted?: string;
  itemID?: string;
};

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

export function TabsMenu({
  isOntop,
  style,
  sticky,
  size,
  className,
  items,
  ...rest
}: TabsMenuType) {
  const scrollRef = React.useRef({} as scrollVisibilityApiType);
  const router = useRouter();

  return (
    <div
      className={styled["tabs-menu"] + (isOntop ? " " + styled["ontop"] : "")}
      style={{ ...style, position: (sticky ? "sticky" : "initial") }}
      {...rest}
    >
      {!isOntop && <div className={styled["spacer"]}></div>}

      <div
        className={
          styled["tabs-menu-container"] +
          (size ? " " + styled[size] : "") +
          " " +
          className
        }
      >
        <ul>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            apiRef={scrollRef}
            onInit={(scroll) => {
              let item = scroll.getItemById(`item-${router.asPath}`);
              scroll.scrollToItem(item);
            }}
          >
            {items.map((item) => {
              return (
                <TabsMenuItem
                  key={`item-${item.to}`}
                  itemID={`item-${item.to}`}
                  to={item.to}
                  title={item.title}
                  highlighted={item.highlighted}
                />
              );
            })}
          </ScrollMenu>
        </ul>
      </div>
    </div>
  );
}

export function TabsMenuItem({ to, title, highlighted }: TabsMenuItemType) {
  const key = `item-${title}`;
  const router = useRouter();
  return (
    <li key={key} itemID={key} className={styled["tabs-menu-item"]}>
      <Link
        href={to}
        tabIndex={0}
        className={router.asPath == to ? " active" : ""}
        passHref
      >
        {title}
        {highlighted && <span>{highlighted}</span>}
      </Link>
    </li>
  );
}
