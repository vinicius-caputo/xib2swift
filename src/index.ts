/*
TODO:
[x] Work with subviews inside views
[] Work with non viewController components, like tableViewcell (base View)
[] need to make the diference beteween the conjuction of default rules e rules
[x] need to make constraints more modular because theathes it one pair of constraints 
[x] fix constraints variations like multiplier enqualToConstant
*/

import { UIDeclarationsGen } from './classes/UIDeclarationsGen';
import { ViewHierachyGen } from './classes/ViewHierachyGen';
import { ConstraintsDeclaritonsGen } from './classes/ConstraintsDeclaritonsGen';
import { Xib } from './classes/XibManipulator';


function main() {

    const fs = require('fs')
    let xibFile = fs.readFileSync('samples/GameViewController.xib', 'utf-8')

    const xib = Xib.getInstance();
    xib.create(xibFile);

    const uiDeclarationsGen = new UIDeclarationsGen();
    const viewHierchyGen = new ViewHierachyGen();
    const constraintsDeclarationsGen = new ConstraintsDeclaritonsGen();
    
    for (const subview of xib.subviews) {
        uiDeclarationsGen.generateUIDeclarations(subview.content);
    }

    console.log('----------------------------');

    let constraintsDeclarations = '';
    
    for (const constraint of xib.constraints) {
        constraintsDeclarations += constraintsDeclarationsGen.genertaeConstraintsDeclarations(constraint.content);
    }
    console.log(constraintsDeclarations);
    
    console.log('----------------------------');
    
    for (const subview of xib.subviews.reverse()) {
        viewHierchyGen.generateViewHierachy(subview);
    }
}

main()




