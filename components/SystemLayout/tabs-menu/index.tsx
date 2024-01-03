import React, { useEffect } from 'react';
import Link from "next/link";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { CSSProperties } from "styled-components";
import { TabsMenuItemStyle, TabsMenuStyle } from "./styles";
import { useRouter } from "next/router";
import { LeftArrow, RightArrow } from "./arrows";
import 'react-horizontal-scrolling-menu/dist/styles.css';

type TabsMenuType = {
  isOntop?: boolean;
  children?: any;
  style?: CSSProperties;
  sticky?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
  items: TabsMenuItemType[];
};
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
  items
}: TabsMenuType) {
  const scrollRef = React.useRef({} as scrollVisibilityApiType);
  const router = useRouter();
  return (
    <TabsMenuStyle isOnTop={isOntop} sticky={sticky} size={size} style={style}>
      {!isOntop && <div className="spacer"></div>}

      <div className={`tabs-menu-container ${className}`}>
        <ul>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            apiRef={scrollRef}
            onInit={(scroll) => {
              let item = scroll.getItemById(`item-${router.asPath}`);
              scroll.scrollToItem(item);
            }}
          >{items.map((item) => {
            return (
              <TabsMenuItem
                key={`item-${item.to}`}
                itemID={`item-${item.to}`}
                to={item.to}
                title={item.title}
                highlighted={item.highlighted}
              />
            );
          })}</ScrollMenu>
        </ul>
        
      </div>
    </TabsMenuStyle>
  );
}

export function TabsMenuItem({
  to,
  title,
  highlighted,
}: TabsMenuItemType) {
  const key = `item-${title}`;
  const router = useRouter();
  return (
    <TabsMenuItemStyle key={key} itemID={key}>
      <Link href={to} tabIndex={0}  className={(router.asPath == to ? " active" : "")} passHref >
        {title}
        {highlighted && <span>{highlighted}</span>}

      </Link>
    </TabsMenuItemStyle>
  );
}
