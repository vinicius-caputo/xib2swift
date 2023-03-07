import { aceptedTags } from "../rules";
import { XibNode } from "../types";
import { resolveIdToPropetyName } from "./XibManipulator"

export class ViewHierachyGen {
    public generateViewHierachy(subview: XibNode){
        let heriachyDeclaration: string = '';
        let fatherId = subview.father?.attrs.id;
        if (!fatherId) { return; }
        for (const node of subview.content) {
            if (aceptedTags.includes(node.tag)) {
                heriachyDeclaration += `${resolveIdToPropetyName(fatherId)}.addSubview(${resolveIdToPropetyName(node.attrs.id)})\n`;
            }
        }
        return heriachyDeclaration;
    }
}