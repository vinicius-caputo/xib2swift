/*
TODO:
[x] Work with subviews inside views
[] Work with non viewController components, like tableViewcell (base View)
[] need to make the diference beteween the conjuction of default rules e rules
[x] need to make constraints more modular because theathes it one pair of constraints 
[x] fix constraints variations like multiplier enqualToConstant
*/

import { parser } from 'posthtml-parser'
import { XibNode, Outlet,  IDtoName } from './types';
import { rules, resolveResultRule } from './rules';
import { capitalizeFirstLetter } from './Utils';

/**
 * Rercursive function to clear all the useless nodes.
 * 
 * As default postHTML-parser will parse the content of nodes thats are 
 * irrelevant for this implementation, like "\n" and " ", this function make a clean up and set
 * content of null nodes to empty array, making easier to navigate the tree.
 * @param nodes Array of XibNodes
 * @returns Array of XibNodes
 */
function clearEmptyNodes(nodes: XibNode[],  father?: XibNode ): XibNode[] {
    let result: XibNode[] = [];
    if (Array.isArray(nodes)) {
        for (const node of nodes) {
            if ('object' == typeof node) {
                node.father = father;
                node.content = clearEmptyNodes(node.content, node);
                result.push(node);
            }
        }
    }
    return result;
}

/**
 * Navigate to xib AST and get all points of interest, like outlets, subvies and constraints
 * @param nodes xib AST 
 */
function navigate(nodes: XibNode[]): void {
    for (const node of nodes) {
        tableIDtoName[node.attrs?.id] = node.tag + '__' + node?.attrs?.id?.replaceAll('-','_');
        switch (node.tag) {
            case 'outlet':
                outlets.push({
                    property: node.attrs.property,
                    id: node.attrs.destination
                });
                break;
            case 'constraints':
                constraints.push(node);
                break;
            case 'subviews':
                subviews.push(node);
                break;
            case 'viewLayoutGuide':
                tableIDtoName[node.attrs.id] = "view.safeAreaLayoutGuide"
                break;
            default:
                break;
        }
        for (const outlet of outlets) {
            if (outlet.id == node?.attrs?.id) {
               tableIDtoName[node.attrs.id] = outlet.property;
            }
        }
        navigate(node.content);
    }
}


function doAditionalConfiguration(tag: string,nodes: XibNode[]): string {
    let property: string = '';
    for (const node of nodes) {
        if (node.tag == 'color') {
            property += `\t${tag}.backgroundColor = .${node.attrs.systemColor.replace('Color','')}\n`
        }
    }
    return property;
}



/**
 * Generete UI declarations like buttons and labels with lazy var anottation.
 * @param nodes xib node wich contains the UI elements
 * @returns String array of declarations 
 */
function generateUIDeclarations(nodes: XibNode[]): string[] {
    const aceptedTags = Object.keys(rules);
    let uiDeclarations: string[] = [];
    for (const node of nodes) {
        if (aceptedTags.includes(node.tag)) {
            let attributes = node.attrs;
            let property: string = '\n';
            for (const key in attributes) {
                if (rules[node.tag][key] != undefined) {
                    property += `\t${node.tag}.${rules[node.tag][key]} = ${resolveResultRule(attributes[key])}\n`;
                   
                }
            }
            property += `${doAditionalConfiguration(node.tag, node.content)}`;
            let declaration = `lazy var ${resolveIdToPropetyName(node.attrs.id)}: UI${capitalizeFirstLetter(node.tag)} = {\n\tlet ${node.tag} = UI${capitalizeFirstLetter(node.tag)}()${property}\treturn ${node.tag}\n}() `;
            uiDeclarations.push(declaration);
            console.log(declaration);
        }
    }
    return uiDeclarations;
}

/**
 * Try to associate a id with a property name of UI element.
 * @param id 
 * @returns name of the property or tag name if not found
 */
function resolveIdToPropetyName(id: string): string {
    return tableIDtoName[id] != undefined ? tableIDtoName[id] : "error";
}


function genertaeConstraintsDeclarations(nodes: XibNode[]): string {
    let propertys: string = '\n';
    for (const node of nodes) {
        
        if ((node.attrs.secondAttribute == 'width' || node.attrs.secondAttribute == 'height') && node.attrs.multiplier != undefined) {
            let grandFather = node.father?.father;
            
            if (grandFather == undefined ) {
                continue;
            }
            propertys += `\t${resolveIdToPropetyName(grandFather.attrs.id)}.${node.attrs.firstAttribute}Anchor.constraint(equalTo: ${resolveIdToPropetyName(node.attrs.secondItem)}.${node.attrs.secondAttribute}Anchor, multiplier: ${node.attrs.multiplier.replace(':','/')}),\n`;
            continue
        }
        let constant = node.attrs.constant != undefined ? `, constant: ${node.attrs.constant}` : '';
        if (node.attrs.firstItem == undefined ) {
            let grandFather = node.father?.father;
            if (grandFather == undefined ) {
                continue;
            }
            propertys += `\t${resolveIdToPropetyName(grandFather.attrs.id)}.${node.attrs.firstAttribute}Anchor.constraint(equalTo: ${resolveIdToPropetyName(node.attrs.secondItem)}.${node.attrs.secondAttribute}Anchor${constant}),\n`;
            continue;
        }

       
        if (node.attrs.multiplier != undefined) {
            constant += `, multiplier: ${node.attrs.multiplier}`;
        }
        propertys += `\t${resolveIdToPropetyName(node.attrs.firstItem)}.${node.attrs.firstAttribute}Anchor.constraint(equalTo: ${resolveIdToPropetyName(node.attrs.secondItem)}.${node.attrs.secondAttribute}Anchor${constant}),\n`;
    }
    return `NSLayoutConstraint.activate([${propertys}])\n`;
}

function generateViewHierachy(subview: XibNode){
    const aceptedTags = Object.keys(rules);
    let fatherId = subview.father?.attrs.id;
    if (!fatherId) { return; }
    for (const node of subview.content) {
        if (aceptedTags.includes(node.tag)) {
            console.log(`${resolveIdToPropetyName(fatherId)}.addSubview(${resolveIdToPropetyName(node.attrs.id)})`);
        }
    }
    
}

let outlets: Outlet[] = [];
let constraints: XibNode[] = [];
let subviews: XibNode[] = [];
let tableIDtoName: IDtoName = {};


function main() {

    const fs = require('fs')
    let xib = fs.readFileSync('samples/GameViewController.xib', 'utf-8')

    xib = parser(xib, { xmlMode: true });
    xib = clearEmptyNodes(xib);
    navigate(xib);

    let baseView: XibNode | undefined = subviews[0].father
    console.log(`Base view: ${baseView?.attrs.id ?? ''} - ${baseView?.tag ?? ''}`);


    for (const subview of subviews) {
        generateUIDeclarations(subview.content);
    }

    console.log('----------------------------');

    let constraintsDeclarations = '';
    
    for (const constraint of constraints) {
        constraintsDeclarations += genertaeConstraintsDeclarations(constraint.content);
    }
    console.log(constraintsDeclarations);
    
    console.log('----------------------------');
    
    for (const subview of subviews.reverse()) {
        generateViewHierachy(subview);
    }
}

main()




