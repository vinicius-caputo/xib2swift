import { XibNode, Constraint, Constraints } from "../types";
import { resolveIdToPropetyName } from "./XibManipulator";

export class ConstraintsDeclaritonsGen {

    private constraints: Constraints 

    public constructor() {
        this.constraints =  {};
    }

    public generateConstraintsDeclarations(nodes: XibNode[]): string {
        for (const constraint of nodes) {
            this.resolveConstraintsDeclarations(constraint.content);
        }
        return `NSLayoutConstraint.activate([${this.organizeConstraintsDeclarations()}])\n`;
    }

    private resolveConstraintsDeclarations(nodes: XibNode[]): void {

        for (const node of nodes) { 
            
            let grandFather = node.father?.father;
            if (grandFather == undefined) { console.log('\nerror\n'); continue; }

            let parameters = node.attrs.constant != undefined ? `, constant: ${node.attrs.constant}` : '';
            parameters += node.attrs.multiplier != undefined ? `, multiplier: ${node.attrs.multiplier.replace(':','/')}` : '';
            
            if ((node.attrs.firstAttribute == 'width' || node.attrs.firstAttribute == 'height') && node.attrs.secondItem == undefined) {
                this.generateConstraintWithConstant(
                /*   element  */    resolveIdToPropetyName(grandFather.attrs.id),
                /*    anchor  */    node.attrs.firstAttribute,
                /*   constant  */   node.attrs.constant );
            }
            else if (node.attrs.firstItem == undefined) {
                this.generateConstraint(
                /*   element  */    resolveIdToPropetyName(grandFather.attrs.id),
                /*    anchor  */    node.attrs.firstAttribute,
                /* secondElement */ resolveIdToPropetyName(node.attrs.secondItem),
                /* secondAnchor  */ node.attrs.secondAttribute.replace('Margin', ''),
                /*   parameters  */ parameters );
            }
            else {
                this.generateConstraint(
                /*   element  */    resolveIdToPropetyName(node.attrs.firstItem),
                /*    anchor  */    node.attrs.firstAttribute,
                /* secondElement */ resolveIdToPropetyName(node.attrs.secondItem),
                /* secondAnchor  */ node.attrs.secondAttribute.replace('Margin', ''),
                /*   parameters  */ parameters );
            }
        }
    }

    private generateConstraint(element: string, anchor: string, secondElement: string, secondAnchor: string, parameters: string): void {
        if (anchor == 'bottom' || anchor == 'trailing') {
            this.pushConstraint(secondElement, {
                anchor: secondAnchor,
                declaration: `\t${secondElement}.${secondAnchor}Anchor.constraint(equalTo: ${element}.${anchor}Anchor${parameters.replace('constant: ', 'constant: -')}),\n`
            });
            return
        }
        this.pushConstraint(element, {
            anchor: anchor,
            declaration: `\t${element}.${anchor}Anchor.constraint(equalTo: ${secondElement}.${secondAnchor}Anchor${parameters}),\n`
        });
    }

    private generateConstraintWithConstant(element: string, anchor: string, constant: string): void {
        this.pushConstraint(element, {
            anchor: anchor,
            declaration: `\t${element}.${anchor}Anchor.constraint(equalToConstant: ${constant}),\n`
        });
    }

    private pushConstraint(element: string, constraint: Constraint): void {
        this.constraints[element] = this.constraints[element] || [];
        this.constraints[element].push(constraint);
    }

    private organizeConstraintsDeclarations(): string {
        let declarations = '\n';
        for (const key in this.constraints) {
            let constraints = this.orderWithAnchor(this.constraints[key]);
            for (const constraint of constraints) {
                declarations += constraint.declaration;
            }
            declarations += '\n';
        }
        return declarations;
    }

    private orderWithAnchor(constraints: Constraint[]): Constraint[] {
        let order = ['top', 'bottom', 'leading', 'trailing', 'centerX', 'centerY', 'width', 'height'];
        let orderedConstraints: Constraint[] = [];
        for (const anchor of order) {
            for (const constraint of constraints) {
                if (constraint.anchor == anchor) {
                    orderedConstraints.push(constraint);
                }
            }
        }
        return orderedConstraints;
    }
}