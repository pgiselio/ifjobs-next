import { useState, createContext, useRef, JSX } from "react";
import { ConfirmationDialog, ConfirmationOptions } from "./ConfirmationDialog";

export const AlertDialogContext = createContext<(options: ConfirmationOptions) => Promise<void>
>(Promise.reject);

type PromiseResolver = {
  resolve: () => void;
  reject: () => void;
};

export function AlertDialogProvider({ children }: { children: JSX.Element }) {
  const [confirmationState, setConfirmationState] =
    useState<ConfirmationOptions | null>(null);

  const awaitingPromiseRef = useRef<PromiseResolver | null>(null);

  const openConfirmation = (options: ConfirmationOptions) => {
    setConfirmationState(options);
    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleClose = () => {
    if (confirmationState?.catchOnCancel && awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject();
    }

    setConfirmationState(null);
  };

  const handleSubmit = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve();
    }

    setConfirmationState(null);
  };

  return (
    <>
      <AlertDialogContext.Provider value={openConfirmation}>
        {children}
      </AlertDialogContext.Provider>

      <ConfirmationDialog
        open={Boolean(confirmationState)}
        onSubmit={handleSubmit}
        onClose={handleClose}
        {...confirmationState}
      />
    </>
  );
}
