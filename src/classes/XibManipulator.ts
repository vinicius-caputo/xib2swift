import { XibNode, IDtoName, Outlet } from '../types';
import { parser } from 'posthtml-parser'

export class Xib {
    public static instace: Xib;

    private xibNodes: XibNode[] = [];
    private outlets: Outlet[] = [];

    public baseView: XibNode | undefined;
    public constraints: XibNode[] = [];
    public subviews: XibNode[] = [];
    public tableIDtoName: IDtoName = {};
   
    public constructor(xib: string) {
        this.xibNodes = parser(xib, { xmlMode: true }) as XibNode[];
        this.xibNodes = this.clearEmptyNodes(this.xibNodes);
        this.navigateGettingInterestPoints(this.xibNodes);
        Xib.instace = this;
    }   

    private clearEmptyNodes(nodes: XibNode[], father?: XibNode): XibNode[] {
        let result: XibNode[] = [];
        if (Array.isArray(nodes)) {
            for (const node of nodes) {
                if ('object' == typeof node) {
                    node.father = father;
                    node.content = this.clearEmptyNodes(node.content, node);
                    if (node.tag == 'outlet') {
                        this.outlets.push({
                            property: node.attrs.property,
                            id: node.attrs.destination
                        });
                    }
                    result.push(node);
                }
            }
        }
        return result;
    }

    /**
     * navigateGettingInterestPoints to xib AST and get all points of interest, like outlets, subvies and constraints
     * @param nodes xib AST 
     */
    private navigateGettingInterestPoints(nodes: XibNode[]): void {
        for (const node of nodes) {
            this.tableIDtoName[node.attrs?.id] = node.tag + '__' + node?.attrs?.id?.replaceAll('-', '_');

            switch (node.tag) {
                case 'constraints':
                    this.constraints.push(node);
                    break;
                case 'subviews':
                    if (this.subviews.length == 0) this.resolveBaseView(node);
                    this.subviews.push(node);
                    break;
                case 'viewLayoutGuide':
                    this.tableIDtoName[node.attrs.id] = "view.safeAreaLayoutGuide"
                    break;
                default:
                    break;
            }
            for (const outlet of this.outlets) {
                if (outlet.id == node?.attrs?.id) {
                    this.tableIDtoName[node.attrs.id] = outlet.property;
                }
            }
            this.navigateGettingInterestPoints(node.content);
        }
    }    

    private resolveBaseView(node: XibNode): void {
        let father = node.father;
        if (father == undefined) return;
        this.baseView = father;
        if (father.attrs.id == undefined ){
            this.baseView = father.father;
            father.attrs.id = father.father?.attrs.id ?? 'baseView';
        }
        if (father.attrs.key != undefined ){
            this.tableIDtoName[father.attrs.id] = father.attrs.key;
        }
    }
    
}

export function resolveIdToPropetyName(id: string): string {
    return Xib.instace.tableIDtoName[id];
}

