import { Xib } from "../classes/XibManipulator";

export function capitalizeFirstLetter(string: string): string  {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function resolveIdToPropetyName(id: string): string {
    let xib = Xib.getInstance();
    return xib.tableIDtoName[id] != undefined ? xib.tableIDtoName[id] : "error";
}