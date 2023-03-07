import { UIDeclarationsGen } from './classes/UIDeclarationsGen';
import { ViewHierachyGen } from './classes/ViewHierachyGen';
import { ConstraintsDeclaritonsGen } from './classes/ConstraintsDeclaritonsGen';
import { Xib } from './classes/XibManipulator';

export function xib2swift(xibFile: string): string {

    const xib = new Xib(xibFile);

    const uiDeclarationsGen = new UIDeclarationsGen();
    const viewHierchyGen = new ViewHierachyGen();
    const constraintsDeclarationsGen = new ConstraintsDeclaritonsGen();
    
    let uiDeclarations = '';
    for (const subview of xib.subviews) {
        uiDeclarations+= uiDeclarationsGen.generateUIDeclarations(subview.content);
    }

    let constraintsDeclarations = constraintsDeclarationsGen.generateConstraintsDeclarations(xib.constraints);
    
    let viewHierachy = '';
    for (const subview of xib.subviews.reverse()) {
        viewHierachy += viewHierchyGen.generateViewHierachy(subview);
    }
    
    return uiDeclarations + '\n----------------------------\n' + viewHierachy + '\n----------------------------\n' + constraintsDeclarations;
}

