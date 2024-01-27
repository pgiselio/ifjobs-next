import { ReactNode, useRef } from "react";
import { BoxContent, BoxTitle } from "../box";
import { Button } from "../button";
import styled from "./style.module.scss";
import { Dialog } from "@reach/dialog";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: ReactNode;
  open?: boolean;
  handleClose?: () => void;
  toForm?: string;
}
export function Modal({
  title,
  open = true,
  children,
  handleClose,
  toForm,
  className,
  ...rest
}: ModalProps) {
  let buttonRef = useRef<HTMLButtonElement>(null);
  let closeRef = useRef<HTMLButtonElement>(null);
  function onDismiss() {
    if (handleClose) {
      handleClose();
    }
  }

  return (
    <Dialog
      isOpen={open}
      aria-labelledby="label"
      initialFocusRef={buttonRef}
      onDismiss={onDismiss}
      className={styled["modal-style"] + (className ? " " + className : "")}
      {...rest}
    >
      <BoxTitle className={styled["box-title"]}>
        <h2>{title}</h2>
        <div>
          <button
            aria-label="Close"
            className={styled["close-button"]}
            ref={closeRef}
            onClick={onDismiss}
          >
            <i className={`fas fa-times`}></i>
          </button>
        </div>
        {toForm && (
          <div>
            <Button
              type="submit"
              style={{ padding: "6px 16px" }}
              form={toForm}
              ref={buttonRef}
            >
              Criar
            </Button>
          </div>
        )}
      </BoxTitle>

      <BoxContent
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        {children}
      </BoxContent>
    </Dialog>
  );
}

export function ModalBottom(
 { className,
  children,
...rest}: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  return (
    <div
      className={styled["modal-bottom"] + (className ? " " + className : "")}
      {...rest}
    >
      {children}
    </div>
  );
}
