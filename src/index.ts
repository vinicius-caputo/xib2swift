import { parser } from 'posthtml-parser'
import { XibNode, Outlet, UIitem } from './types';
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
function clearEmptyNodes(nodes: XibNode[]): XibNode[] {
    let result: XibNode[] = [];
    if (Array.isArray(nodes)) {
        for (const node of nodes) {
            if ('object' == typeof node) {
                node.content = clearEmptyNodes(node.content);
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
        switch (node.tag) {
            case 'outlet':
                outlets.push({
                    property: node.attrs.property,
                    id: node.attrs.id
                });
                break;
            case 'objects':
                objects = node.content;
                break;
            case 'constraints':
                constraints.push(node);
                break;
            case 'subviews':
                subviews.push(node);
                break;
            case 'viewLayoutGuide':
                viewLayoutGuide = {
                    id: node.attrs.id,
                    tag: node.tag
                };
            default:
                break;
        }
        navigate(node.content);
    }
}


function generateUIDeclarations(nodes: XibNode[]): string[] {
    const aceptedTags = Object.keys(rules);
    let uiDeclarations: string[] = [];
    for (const node of nodes) {
        if (aceptedTags.includes(node.tag)) {
            uiItems.push({
                tag: node.tag,
                id: node.attrs.id
            });
            let attributes = node.attrs;
            let property: string = '\n';
            for (const key in attributes) {
                if (Object.prototype.hasOwnProperty.call(attributes, key) && rules[node.tag][key]) {
                    property += `\t${node.tag}.${rules[node.tag][key]} = ${resolveResultRule(attributes[key])}\n`;
                }
            }
            let declaration = `lazy var ${node.tag}: UI${capitalizeFirstLetter(node.tag)} = {\n\tlet ${node.tag} = UI${capitalizeFirstLetter(node.tag)}()${property}\treturn ${node.tag}\n}() `;
            uiDeclarations.push(declaration);
            
        }
    }
    return uiDeclarations;
}

// function resolveIDtoProperty(id: string): string {

// }

function genertaeConstraintsDeclarations(nodes: XibNode[]): string[] {
    // console.log(nodes);
    let property: string = '\n';
    let constraintsDeclarations: string[] = [];
    for (const constraint of constraints) {
        property += `\t${constraint}\n`;


    }
    let declaration = `NSLayoutConstraint.activate([])`;
    constraintsDeclarations.push(declaration);
    return constraintsDeclarations;
}


let objects: XibNode[] = [];
let outlets: Outlet[] = [];
let uiItems: UIitem[] = [];
let constraints: XibNode[] = [];
let subviews: XibNode[] = [];
let viewLayoutGuide: UIitem;

function main() {
    const fs = require('fs')
    let xib = fs.readFileSync('samples/TesteViewController.xib', 'utf-8')

    xib = parser(xib, { xmlMode: true });
    xib = clearEmptyNodes(xib);

    navigate(xib);
    let baseView = subviews[0];
    generateUIDeclarations(baseView.content);
    //console.log(constraints);
    genertaeConstraintsDeclarations(constraints[0].content);

}

main()




