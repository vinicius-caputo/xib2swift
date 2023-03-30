import { XibNode } from "../types";


export class Resolve {

    public static Color(node: XibNode): string {
        let declaration: string = '';
        if (node.attrs.customColorSpace == 'genericGamma22GrayColorSpace') {
            declaration = `UIColor(cgColor: CGColor(genericGrayGamma2_2Gray: ${node.attrs.white}, alpha: ${node.attrs.alpha}))`;
        }
        else if (node.attrs.customColorSpace == 'sRGB') {
            declaration = `UIColor(cgColor: CGColor(srgbRed: ${node.attrs.red}, green: ${node.attrs.green}, blue: ${node.attrs.blue}, alpha: ${node.attrs.alpha}))`
        }
        else if (node.attrs.customColorSpace == 'displayP3') {
            declaration = `UIColor(displayP3Red: ${node.attrs.red}, green: ${node.attrs.green}, blue: ${node.attrs.blue}, alpha: ${node.attrs.alpha})`
        }
        else if (node.attrs.customColorSpace == 'calibratedWhite') {
            declaration = `UIColor(white: ${node.attrs.white}, alpha: ${node.attrs.alpha})`
        }
        else if (node.attrs.customColorSpace == 'calibratedRGB') {
            declaration = `UIColor(red: ${node.attrs.red}, green: ${node.attrs.green}, blue: ${node.attrs.blue}, alpha: ${node.attrs.alpha})`
        }
        else if (node.attrs.systemColor != undefined)  {
            declaration = `.${node.attrs.systemColor.replace('Color', '')}`
        }
        else if (node.attrs.name != undefined) {
            declaration = `UIColor(named: "${node.attrs.name}")`
        }
 
        return declaration;
    }

    public static Image(node: XibNode): string {
        let declaration: string = '';
        if (node.attrs.backgroundImage != undefined) {
            declaration =  node.attrs.catalog == 'system' ? `UIImage(systemName: "${node.attrs.backgroundImage}")` : `UIImage(named: "${node.attrs.backgroundImage}")`
        }
        else if (node.attrs.catalog == 'system') {
            declaration = `UIImage(systemName: "${node.attrs.image}")`
        }
        else if (node.attrs.name != undefined) {
            declaration = `UIImage(named: "${node.attrs.name}")`
        }
        else if (node.attrs.image != undefined) {
            declaration = `UIImage(named: "${node.attrs.image}")`
        }
      
        return declaration;
    }

   
}