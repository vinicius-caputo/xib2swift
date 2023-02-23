import { aditionalConfiguration, XibNode } from "../types";
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
                        if (attributeDeclarion == `\t${node.tag}.${defaultRules[key]}\n`) continue;

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
            property += this.resolveAdiionalConfiguration(tag, node);
        }
        return property;
    }

    private resolveAdiionalConfiguration(tag: string, node: XibNode) {
        const addAditionalConfiguration: aditionalConfiguration = {
            'button': {
                'state': () => {
                    let property = `\t${tag}.setTitle("${node.attrs.title}", for: .${node.attrs.key})\n`;
                    let children = node.content;
                    for (const child of children) {
                        if (child.tag == 'color') {
                            property += `\t${tag}.setTitleColor(${this.resolveColor(child)}, for: .${node.attrs.key})\n`
                        }
                    }
                    return property;
                },
                'color': () => { return `\t${tag}.${node.attrs.key} = ${this.resolveColor(node)}\n` },
            },
            'label': {
                'color': () => { return `\t${tag}.textColor = ${this.resolveColor(node)}\n` },
            },
            'common': {
                'fontDescription': () => { return `\t${tag}.font = .systemFont(ofSize: ${node.attrs.pointSize})\n` },
                'rect': () => { return `\t${tag}.frame = CGRect(x: ${node.attrs.x}, y: ${node.attrs.y}, width: ${node.attrs.width}, height: ${node.attrs.height})\n` }
            }
        }
        
        if (addAditionalConfiguration[tag] == undefined || addAditionalConfiguration[tag][node.tag] == undefined)  {
            return addAditionalConfiguration['common'][node.tag] != undefined ? addAditionalConfiguration['common'][node.tag]() : ''
        }
        return addAditionalConfiguration[tag][node.tag] != undefined ? addAditionalConfiguration[tag][node.tag]() : ''
    }

    private resolveColor(node: XibNode): string {
        let declarion: string = '';
        if (node.attrs.customColorSpace == 'genericGamma22GrayColorSpace') {
            declarion = `UIColor(cgColor: CGColor(genericGrayGamma2_2Gray: ${node.attrs.white}, alpha: ${node.attrs.alpha}))`;
        }
        else if (node.attrs.customColorSpace == 'sRGB') {
            declarion = `UIColor(cgColor: CGColor(srgbRed: ${node.attrs.red}, green: ${node.attrs.green}, blue: ${node.attrs.blue}, alpha: ${node.attrs.alpha}))`
        }
        else if (node.attrs.customColorSpace == 'displayP3') {
            declarion = `UIColor(displayP3Red: ${node.attrs.red}, green: ${node.attrs.green}, blue: ${node.attrs.blue}, alpha: ${node.attrs.alpha})`
        }
        else  {
            declarion = `.${node.attrs.systemColor.replace('Color', '')}`
        }
        return declarion;
    }
}