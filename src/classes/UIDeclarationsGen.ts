import { XibNode } from "../types";
import { rules, resolveResultRule } from "../rules";
import { capitalizeFirstLetter, resolveIdToPropetyName } from "../Utils";

export class UIDeclarationsGen {

    constructor() { }

    public generateUIDeclarations(nodes: XibNode[]): string[] {
        const aceptedTags = Object.keys(rules);
        let uiDeclarations: string[] = [];
        for (const node of nodes) {
            if (aceptedTags.includes(node.tag)) {
                let attributes = node.attrs;
                let property: string = '\n';
                for (const key in attributes) {
                    if (rules[node.tag][key] != undefined) {
                        property += `\t${node.tag}.${rules[node.tag][key]} = ${resolveResultRule(attributes[key])}\n`;
                    } else {
                      //  property += `\t$//${node.tag}.${key} = ${resolveResultRule(attributes[key])}\n`;
                    }
                }
                property += `${this.doAditionalConfiguration(node.tag, node.content)}`;
                let declaration = `lazy var ${resolveIdToPropetyName(node.attrs.id)}: UI${capitalizeFirstLetter(node.tag)} = {\n\tlet ${node.tag} = UI${capitalizeFirstLetter(node.tag)}()${property}\treturn ${node.tag}\n}() `;
                uiDeclarations.push(declaration);
                console.log(declaration);
            }
        }
        return uiDeclarations;
    }

    private doAditionalConfiguration(tag: string,nodes: XibNode[]): string {
        let property: string = '';
        for (const node of nodes) {
            if (node.tag == 'color') {
                property += `\t${tag}.backgroundColor = .${node.attrs.systemColor.replace('Color','')}\n`
            }
        }
        return property;
    }
}