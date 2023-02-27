/*
TODO:
[x] Work with subviews inside views
[x] Work with non viewController components, like tableViewcell (base View)
[x] need to make the diference beteween the conjuction of default rules e rules
[x] need to make constraints more modular because theathes it one pair of constraints 
[x] fix constraints variations like multiplier enqualToConstant
*/

import { UIDeclarationsGen } from './classes/UIDeclarationsGen';
import { ViewHierachyGen } from './classes/ViewHierachyGen';
import { ConstraintsDeclaritonsGen } from './classes/ConstraintsDeclaritonsGen';
import { Xib } from './classes/XibManipulator';


export function xib2viewcode(xibFile: string): string {

    const xib = Xib.getInstance();
    xib.create(xibFile);

    const uiDeclarationsGen = new UIDeclarationsGen();
    const viewHierchyGen = new ViewHierachyGen();
    const constraintsDeclarationsGen = new ConstraintsDeclaritonsGen();
    
    let uiDeclarations = '';
    for (const subview of xib.subviews) {
        uiDeclarations+= uiDeclarationsGen.generateUIDeclarations(subview.content);
    }

    let constraintsDeclarations = '';
    for (const constraint of xib.constraints) {
        constraintsDeclarations += constraintsDeclarationsGen.genertaeConstraintsDeclarations(constraint.content);
    }
    
    let viewHierachy = '';
    for (const subview of xib.subviews.reverse()) {
        viewHierachy += viewHierchyGen.generateViewHierachy(subview);
    }
    
    return uiDeclarations + '\n----------------------------\n' + viewHierachy + '\n----------------------------\n' + constraintsDeclarations;
}


const fs = require('fs');
let xibFile = fs.readFileSync('./samples/GameViewController.xib', 'utf8');
console.log(xib2viewcode(xibFile));

