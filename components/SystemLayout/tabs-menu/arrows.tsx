import React from "react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";
import styles from "./styles.module.scss";

function Arrow({
  children,
  disabled = true,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
  ariaLabel?: string;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={styles["arrows"]}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export function LeftArrow() {
  const {
    isFirstItemVisible,
    scrollPrev,
    visibleItemsWithoutSeparators,
    initComplete
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollPrev()} ariaLabel="Rolar menu de abas à esquerda">
      <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
      <label hidden ></label>
    </Arrow>
  );
}

export function RightArrow() {
  const {
    isLastItemVisible,
    scrollNext,
    visibleItemsWithoutSeparators,
    initComplete
  } = React.useContext(VisibilityContext);

  // console.log({ isLastItemVisible });
  const [disabled, setDisabled] = React.useState(
    !initComplete || !visibleItemsWithoutSeparators.length && isLastItemVisible
  );
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollNext()} ariaLabel="Rolar menu de abas à direita">
      <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
    </Arrow>
  );
}
