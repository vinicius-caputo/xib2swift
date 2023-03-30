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

export interface Constraints {
    [element: string]: Constraint[]
}

export interface Constraint {
    anchor: string,
    declaration: string
}

export interface uiDeclaraitonConfig {
    visibliityModifier: string,
    type: string,
    intializationMethod: string,
    beforeInstaceProperties: string,
}