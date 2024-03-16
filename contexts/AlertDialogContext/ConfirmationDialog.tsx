import * as React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "../../components/General/button";

export interface ConfirmationOptions {
  catchOnCancel?: boolean;
  variant?: "danger" | "info";
  title?: string;
  description?: string;
}

interface ConfirmationDialogProps extends ConfirmationOptions {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  variant,
  description,
  onSubmit,
  onClose,
}) => {
  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">
            {title ? title : "Confirmação"}
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            {description ? description : ""}
          </AlertDialog.Description>
          <div
            className="alert-buttons AlertDialogActions"
            data-reach-alert-dialog-actions
          >
            {variant === "danger" || !variant && (
              <>
                <AlertDialog.Cancel asChild>
                  <Button className="secondary less-radius" onClick={onClose}>
                    CANCELAR
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <Button className="red less-radius" onClick={onSubmit}>
                    Confirmar
                  </Button>
                </AlertDialog.Action>
              </>
            )}

            {variant === "info" && (
              <AlertDialog.Action asChild>
                <Button onClick={onSubmit}>OK</Button>
              </AlertDialog.Action>
            )}
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
