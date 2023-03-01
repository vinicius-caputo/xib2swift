import { XibNode } from "../types";
import { resolveIdToPropetyName } from "../Utils";

export class ConstraintsDeclaritonsGen {
    public genertaeConstraintsDeclarations(nodes: XibNode[]): string {
        let propertys: string = '\n';
        
        for (const node of nodes) {
            
            if ((node.attrs.secondAttribute == 'width' || node.attrs.secondAttribute == 'height') && node.attrs.multiplier != undefined) {
                let grandFather = node.father?.father;
                if (grandFather == undefined) {  console.log('error');
                 continue; }
    
                propertys += `\t${resolveIdToPropetyName(grandFather.attrs.id)}.${node.attrs.firstAttribute}Anchor.constraint(equalTo: ${resolveIdToPropetyName(node.attrs.secondItem)}.${node.attrs.secondAttribute.replace('Margin','')}Anchor, multiplier: ${node.attrs.multiplier.replace(':','/')}),\n`;
                continue
            }

            if ((node.attrs.firstAttribute == 'width' || node.attrs.firstAttribute == 'height') && node.attrs.secondItem == undefined) {
                let grandFather = node.father?.father;
                if (grandFather == undefined) { 
                    console.log('error2');
                    continue; }
                propertys += `\t${resolveIdToPropetyName(grandFather.attrs.id)}.${node.attrs.firstAttribute}Anchor.constraint(equalToConstant: ${node.attrs.constant}),\n`;
                continue
            }

            let constant = node.attrs.constant != undefined ? `, constant: ${node.attrs.constant}` : '';
            if (node.attrs.firstItem == undefined ) {
                let grandFather = node.father?.father;
                if (grandFather == undefined) { 
                    console.log('error3');
                    continue; }

                propertys += `\t${resolveIdToPropetyName(grandFather.attrs.id)}.${node.attrs.firstAttribute}Anchor.constraint(equalTo: ${resolveIdToPropetyName(node.attrs.secondItem)}.${node.attrs.secondAttribute.replace('Margin','')}Anchor${constant}),\n`;
                continue;
            }
    
           
            if (node.attrs.multiplier != undefined) {
                constant += `, multiplier: ${node.attrs.multiplier}`;
            }
            propertys += `\t${resolveIdToPropetyName(node.attrs.firstItem)}.${node.attrs.firstAttribute}Anchor.constraint(equalTo: ${resolveIdToPropetyName(node.attrs.secondItem)}.${node.attrs.secondAttribute.replace('Margin','')}Anchor${constant}),\n`;
        }
        return `NSLayoutConstraint.activate([${propertys}])\n`;
    }
}