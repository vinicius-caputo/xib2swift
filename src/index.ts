import { parser } from 'posthtml-parser'
import { XibNode, Outlet } from './types';

/**
 * Rercursive function to clear all the useless nodes. 
 * 
 * As default postHTML-parser will parse the content of nodes thats are 
 * irrelevant for this implementation, like "\n" and " ", this function make a clean up
 * @param nodes Array of XibNodes
 * @returns Array of XibNodes
 */
function clearEmptyNodes(nodes: XibNode[]): XibNode[] {
    let result: XibNode[] = [];
    if (Array.isArray(nodes)) {
        for (const node of nodes) {
            if (typeof node == 'object') {
                node.content = clearEmptyNodes(node.content);
                result.push(node);
            }
        }
    }
    return result;
}

function navigate(nodes: XibNode[]): void {
    for (const node of nodes) {
        if ('outlet' == node.tag ) {
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

let objects: XibNode[] = [];




let outlets: Outlet[] = [];
function main() {
    const fs = require('fs')
    let xib = fs.readFileSync('samples/TableViewCell.xib', 'utf-8')
    xib = parser(xib, { xmlMode: true });
    xib = clearEmptyNodes(xib);
    //console.log(xib);
    navigate(xib);
    // //console.log(outlets);
    console.log("Objects:", objects);
    
}

main()




