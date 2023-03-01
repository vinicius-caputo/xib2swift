import { aceptedTags } from "../rules";
import { XibNode } from "../types";
import { resolveIdToPropetyName } from "../Utils";

export class ViewHierachyGen {
    public generateViewHierachy(subview: XibNode){
        let heriachyDeclaration: string = '';
        let fatherId = subview.father?.attrs.id;
        console.log(subview.father);
        
        if (!fatherId) { return; }
        for (const node of subview.content) {
            if (aceptedTags.includes(node.tag)) {
                heriachyDeclaration += `${resolveIdToPropetyName(fatherId)}.addSubview(${resolveIdToPropetyName(node.attrs.id)})\n`;
                console.log(heriachyDeclaration);
                
                //console.log(`${resolveIdToPropetyName(fatherId)}.addSubview(${resolveIdToPropetyName(node.attrs.id)})`);
            }
        }
        return heriachyDeclaration;
    }
}