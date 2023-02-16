import { XibNode, IDtoName, Outlet } from '../types';
import { parser } from 'posthtml-parser'

/**
 * Singleton class responsible for manipulate the xib file
 */
export class Xib {
    public static instace: Xib;

    public xibNodes: XibNode[] = [];
    public outlets: Outlet[] = [];
    public constraints: XibNode[] = [];
    public subviews: XibNode[] = [];
    public tableIDtoName: IDtoName = {};


    private constructor() {}   
    
    public static getInstance(): Xib {
        if (Xib.instace == undefined) {
            Xib.instace = new Xib();
        }
        return Xib.instace;
    }

    public create(xib: string): void {
        this.xibNodes = parser(xib, { xmlMode: true }) as XibNode[];
        this.xibNodes = this.clearEmptyNodes(this.xibNodes);
        this.navigateGettingInterestPoints(this.xibNodes);
    }

    private clearEmptyNodes(nodes: XibNode[], father?: XibNode): XibNode[] {
        let result: XibNode[] = [];
        if (Array.isArray(nodes)) {
            for (const node of nodes) {
                if ('object' == typeof node) {
                    node.father = father;
                    node.content = this.clearEmptyNodes(node.content, node);
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
                case 'outlet':
                    this.outlets.push({
                        property: node.attrs.property,
                        id: node.attrs.destination
                    });
                    break;
                case 'constraints':
                    this.constraints.push(node);
                    break;
                case 'subviews':
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
}

