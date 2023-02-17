import { XibNode } from "../types";
import { resolveRule, resolveResultRule, shouldIgnoreRule, aceptedTags, defaultRules } from "../rules";
import { capitalizeFirstLetter, resolveIdToPropetyName } from "../Utils";

export class UIDeclarationsGen {

    public generateUIDeclarations(nodes: XibNode[]): string {
        let uiDeclarations: string = '';
        for (const node of nodes) {
            if (aceptedTags.includes(node.tag)) {
                let attributes = node.attrs;
                let property: string = '\n';
                for (const key in attributes) {
                    if (shouldIgnoreRule(node.tag, key)) continue;

                    if (resolveRule(node.tag, key) != undefined) {
                        let attributeDeclarion = `\t${node.tag}.${resolveRule(node.tag, key)} = ${resolveResultRule(attributes[key], key)}\n`;
                        if (attributeDeclarion ==  `\t${node.tag}.${defaultRules[key]}\n`) continue; 
                    
                        property += attributeDeclarion;
                    } else {
                       property += `\t${node.tag}.${key} = ${resolveResultRule(attributes[key], key)}\n`;
                    }
                }
                property += `${this.doAditionalConfiguration(node.tag, node.content)}`;
                uiDeclarations += `lazy var ${resolveIdToPropetyName(node.attrs.id)}: UI${capitalizeFirstLetter(node.tag)} = {\n\tlet ${node.tag} = UI${capitalizeFirstLetter(node.tag)}()${property}\treturn ${node.tag}\n}()\n`;
            }
        }
        return uiDeclarations;
    }

    private doAditionalConfiguration(tag: string, nodes: XibNode[]): string {
        let property: string = '';


        for (const node of nodes) {
            if (node.tag == 'color') {
                property += `\t${tag}.backgroundColor = .${node.attrs.systemColor.replace('Color','')}\n`
            } 
            else if (node.tag == 'fontDescription') {
                property += `\t${tag}.font = .systemFont(ofSize: ${node.attrs.pointSize})\n`
            }
            else if (node.tag == 'state') {
                property += `\t${tag}.setTitle("${node.attrs.title}", for: .${node.attrs.key})\n`
            } 
            else if (node.tag == 'rect') {
                property += `\t${tag}.frame = CGRect(x: ${node.attrs.x}, y: ${node.attrs.y}, width: ${node.attrs.width}, height: ${node.attrs.height})\n`
            }
        }
        return property;
    }
}