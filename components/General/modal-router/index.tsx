import { ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Box, BoxContent, BoxTitle } from "../box";
import styled from "../modal/style.module.scss";
import { Dialog } from "@reach/dialog";

export function ModalRouter({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  let navigate = useRouter();
  let buttonRef = useRef<HTMLButtonElement>(null);
  let closeRef = useRef<HTMLButtonElement>(null);
  const [closeClassNames, setCloseClassNames] = useState("");
  
  const preventDataLost = (event: any) => {
    event.preventDefault();
    event.returnValue = "";
  };
  useEffect(() => {
    window.addEventListener("beforeunload", preventDataLost);
    return () => {
      window.removeEventListener("beforeunload", preventDataLost);
    };
  }, []);
  function onDismiss() {
    navigate.back();
  }
  function attentionToX() {
    closeRef.current?.focus();
    setCloseClassNames("attention");
    setTimeout(() => setCloseClassNames(""), 1000);
  }

  return (
    <Dialog
      aria-labelledby="label"
      initialFocusRef={buttonRef}
      onDismiss={attentionToX}
    >
      <BoxTitle className="box-title">
        <h2>{title}</h2>
        <div>
          <button
            aria-label="Close"
            className="close-button"
            ref={closeRef}
            onClick={onDismiss}
          >
            <i className={`fas fa-times ${closeClassNames}`}></i>
          </button>
        </div>
      </BoxTitle>

      <BoxContent>
        {children}
      </BoxContent>
    </Dialog>
  );
}
