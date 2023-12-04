import { UIDeclarationsGen } from './classes/UIDeclarationsGen';
import { ViewHierachyGen } from './classes/ViewHierachyGen';
import { ConstraintsDeclaritonsGen } from './classes/ConstraintsDeclaritonsGen';
import { Xib } from './classes/XibManipulator';
import { Declarations } from './classes/Declarations';

export function xib2swift(xibFile: string): Declarations {

    const xib = new Xib(xibFile);

    const uiDeclarationsGen = new UIDeclarationsGen();
    const viewHierchyGen = new ViewHierachyGen();
    const constraintsDeclarationsGen = new ConstraintsDeclaritonsGen();
    
    let uiDeclarations =  uiDeclarationsGen.generateUIDeclarations(xib.subviews);
    let constraintsDeclarations = constraintsDeclarationsGen.generateConstraintsDeclarations(xib.constraints);
    
    let viewHierachy = '';
    for (const subview of xib.subviews) {
        viewHierachy += viewHierchyGen.generateViewHierachy(subview);
    }

    let baseViewDeclaration = uiDeclarationsGen.genereteBaseViewProperties(xib.baseView);
    
    return new Declarations(
      uiDeclarations,
      viewHierachy,
      constraintsDeclarations,
      baseViewDeclaration.replaceAll("\t", "")
    );
}
