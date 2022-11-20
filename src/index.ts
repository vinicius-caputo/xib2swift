import { parser } from 'posthtml-parser'
import { XibNode, Outlet } from './types';
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

function navigate(nodes: XibNode[]): void {
    for (const node of nodes) {
        if ('outlet' == node.tag) {
            outlets.push({
                property: node.attrs.property,
                id: node.attrs.id
            });
        }
        if ('objects' == node.tag) {
            objects = node.content;
        }


        navigate(node.content);
    }
}

/**
 * Precisa mudar !!!
 * @param tag 
 * @param nodes 
 * @returns 
 */
function navigateToFirst(tag: string, nodes: XibNode[]): XibNode[] {
    let result: XibNode[] = [];
    for (const node of nodes) {
        if (tag == node.tag) {
            result.push(node);
        }
        result = result.concat(navigateToFirst(tag, node.content));
        if (result.length > 0) {
            break;
        }
    }
    return result;
}


function generateUIDeclarations(nodes: XibNode[]): void {
    for (const node of nodes) {
        if (AceptedTags.includes(node.tag)) {

            let attributes = node.attrs;
            let property: string = '\n';
            for (const key in attributes) {
                if (Object.prototype.hasOwnProperty.call(attributes, key)) {
                    property += `\t${node.tag}.${rules[node.tag][key]} = ${resolveResultRule(attributes[key])}\n`;
                }
            }
            let declaration = `lazy var ${node.tag}: UI${capitalizeFirstLetter(node.tag)} = {${property}}() `;
            console.log(declaration);

        }
    }
}


let objects: XibNode[] = [];
let outlets: Outlet[] = [];

let UIDeclarations: string[] = [];


let AceptedTags = ["label"]

function main() {
    const fs = require('fs')
    let xib = fs.readFileSync('samples/GameViewController.xib', 'utf-8')

    xib = parser(xib, { xmlMode: true });
    xib = clearEmptyNodes(xib);
    navigate(xib);


    let baseView = navigateToFirst('subviews', objects)[0];
    generateUIDeclarations(baseView.content);
    //console.log(baseView);


}

main()




