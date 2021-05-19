import { IAction } from "../interfaces/action.interface";
import { IIpcAction } from "../interfaces/ipc-action.interface";

export function ipcActionToAction({ actionType, actionProps }: IIpcAction): IAction {
    return { ...actionProps, type: actionType };
};
