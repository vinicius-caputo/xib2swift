/**
 * Interface thats represent a tag with his attributes from xib 
 */
export interface XibNode {
    tag: string,
    attrs: {
        [key: string]: string
    }
    content: XibNode[]
}

export interface Outlet {
    property: string,
    id: string
}

export interface UIitem {
    tag: string,
    id: string
}

export interface uiItems{
    [key: string]: UIitem
}