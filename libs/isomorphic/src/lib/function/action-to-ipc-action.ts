import { IAction } from "../interfaces/action.interface";
import { IIpcAction } from "../interfaces/ipc-action.interface";

export function actionToIpcAction({ type, ...props }: IAction): IIpcAction {
    return { actionProps: { ...props }, actionType: type };
};
