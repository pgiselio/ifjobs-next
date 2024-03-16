import { useContext } from "react";
import { AlertDialogContext } from "../contexts/AlertDialogContext";


export const useAlertDialog = () => {
    const context = useContext(AlertDialogContext);
    
    return context;
}