import { UIDeclarationsGen } from './classes/UIDeclarationsGen';
import { ViewHierachyGen } from './classes/ViewHierachyGen';
import { ConstraintsDeclaritonsGen } from './classes/ConstraintsDeclaritonsGen';
import { Xib } from './classes/XibManipulator';

export function xib2swift(xibFile: string): string {

    const xib = new Xib(xibFile);

    const uiDeclarationsGen = new UIDeclarationsGen();
    const viewHierchyGen = new ViewHierachyGen();
    const constraintsDeclarationsGen = new ConstraintsDeclaritonsGen();
    
    let uiDeclarations =  uiDeclarationsGen.generateUIDeclarations(xib.subviews);
    let constraintsDeclarations = constraintsDeclarationsGen.generateConstraintsDeclarations(xib.constraints);
    
    let viewHierachy = '';
    for (const subview of xib.subviews.reverse()) {
        viewHierachy += viewHierchyGen.generateViewHierachy(subview);
    }

    let baseViewDeclaration = uiDeclarationsGen.genereteBaseViewProperties(xib.baseView);
    
    return '\n<------------- UI Elements --------------->\n' + uiDeclarations + 
    '\n<------------- View Hierachy --------------->\n' + viewHierachy +  
    '\n<------------- Constrains --------------->\n' + constraintsDeclarations +
    '\n<------------- Base View Properties --------------->\n' + baseViewDeclaration;
}

