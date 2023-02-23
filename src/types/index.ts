/**
 * Interface thats represent a tag with his attributes from xib 
 */
export interface XibNode {
    tag: string,
    attrs: {
        [key: string]: string
    }
    content: XibNode[],
    father?: XibNode
}

export interface Outlet {
    property: string,
    id: string
}

export interface IDtoName {
    [id: string]: string
}

export interface Rules {
    [tag: string]: {
        [key: string]: string
    }
}
export interface aditionalConfiguration {
    [tag: string]: {
        [key: string]: () => string
    }
}