import { Rules, XibNode } from "./types";
import { lowerFirstletter } from "./Utils";

const rules: Rules = {
    label: {
        adjustsFontSizeToFit: 'adjustsFontSizeToFitWidth',
    },
    button: {},
    view: {},
    stackView: {},
    slider: {
        minValue: 'minimumValue',
        maxValue: 'maximumValue',
    },
    tableView: {},
    collectionView: {
        multipleTouchEnabled: 'isMultipleTouchEnabled',
    },
    imageView: {},
    pageControl: {},
    common: {
        opaque: 'isOpaque',
        userInteractionEnabled: 'isUserInteractionEnabled',
    }
}

export const ignoredTags: string[] = []

export function resolveRule(tag: string, key: string): string {
    return rules[tag][key] != undefined ? rules[tag][key] : rules['common'][key] ?? undefined;
}

export const defaultRules: any = {
    opaque: 'isOpaque = false',
    userInteractionEnabled: 'isUserInteractionEnabled = false',
}

export function shouldIgnoreRule(tag: string, key: string): boolean {
    const propertyToIgnore: any = {
        label: ['minimumFontSize'],
        button: ['buttonType', 'lineBreakMode'],
        imageView: ['catalog'],
        tableView: ['style'],
        collectionView: ['dataMode'],
        common: ['horizontalHuggingPriority', 'verticalHuggingPriority', 'fixedFrame', 'id',  'clipsSubviews', 'adjustsLetterSpacingToFitWidth'],
    }
    let ignoredRules =  propertyToIgnore['common'] + propertyToIgnore[tag];
    return ignoredRules.includes(key);
}
    

export function resolveResultRule(result: string, property: string): string {
    
    const propertyToResolve: any = {
        'text': () => { return `"${result}"`; },
        'lineBreakMode': () => {
            switch (result) {
                case 'wordWrap':
                    return '.byWordWrapping';
                case 'tailTruncation':
                    return '.byTruncatingTail';
                case 'headTruncation':
                    return '.byTruncatingHead';
                case 'middleTruncation':
                    return '.byTruncatingMiddle';
                case 'charWrap':
                    return '.byCharWrapping';
                case 'clip':
                    return '.byClipping';
                default:
                    return '.byWordWrapping'
            };
        },
        'default': () => {
            switch (result) {
                case "NO":
                    return "false";
                case "YES":
                    return "true";
                default:
                    return /\d/.test(result) ? result : `.${lowerFirstletter(result)}`;
            }
        },
    }
    return propertyToResolve[property] != undefined ? propertyToResolve[property]() : propertyToResolve['default']();
}