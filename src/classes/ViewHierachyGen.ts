import { rules } from "../rules";
import { XibNode } from "../types";
import { resolveIdToPropetyName } from "../Utils";

export class ViewHierachyGen {
    public generateViewHierachy(subview: XibNode){
        const aceptedTags = Object.keys(rules);
        let fatherId = subview.father?.attrs.id;
        if (!fatherId) { return; }
        for (const node of subview.content) {
            if (aceptedTags.includes(node.tag)) {
                console.log(`${resolveIdToPropetyName(fatherId)}.addSubview(${resolveIdToPropetyName(node.attrs.id)})`);
            }
        }
    }
}