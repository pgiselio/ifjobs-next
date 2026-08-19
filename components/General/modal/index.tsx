import { ReactNode, useRef } from "react";
import { BoxContent, BoxTitle } from "../box";
import { Button } from "../button";
import styled from "./style.module.scss";
import * as Dialog from "@radix-ui/react-dialog";

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
    <Dialog.Root open={open} onOpenChange={(nextOpen) => !nextOpen && onDismiss()}>
      <Dialog.Portal>
        <Dialog.Overlay className={styled.overlay} />
        <Dialog.Content
          className={styled["modal-style"] + (className ? " " + className : "")}
          onOpenAutoFocus={(event) => {
            if (toForm) {
              event.preventDefault();
              buttonRef.current?.focus();
            }
          }}
          {...rest}
        >
          <BoxTitle className={styled["box-title"]}>
            <Dialog.Title asChild>
              <h2>{title}</h2>
            </Dialog.Title>
            <div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className={styled["close-button"]}
                  ref={closeRef}
                >
                  <i className={`fas fa-times`}></i>
                </button>
              </Dialog.Close>
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
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
