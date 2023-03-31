import { Rules } from "./types";

export const ignoredTags: string[] = []

export const defaultRules: any = {
    opaque: 'isOpaque = false',
    userInteractionEnabled: 'isUserInteractionEnabled = false',
    customClass: 'customClass = ',
}

export function shouldIgnoreProperty(tag: string, key: string): boolean {
    const propertyToIgnore: any = {
        label: ['minimumFontSize'],
        button: ['buttonType', 'lineBreakMode'],
        imageView: ['catalog'],
        tableView: ['style'],
        collectionView: ['dataMode'],
        common: ['horizontalHuggingPriority', 'verticalHuggingPriority', 'fixedFrame', 'id', 'adjustsLetterSpacingToFitWidth'],
    }
    let ignoredRules =  propertyToIgnore['common'] + propertyToIgnore[tag];
    return ignoredRules.includes(key);
}


export const rules: Rules = {
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
        directionalLockEnabled: 'isDirectionalLockEnabled',
        pagingEnabled: 'isPagingEnabled',
        prefetchingEnabled: 'isPrefetchingEnabled',
    },
    imageView: {},
    pageControl: {},
    common: {
        clipSubviews: 'clipsToBounds',
        opaque: 'isOpaque',
        userInteractionEnabled: 'isUserInteractionEnabled',
    }
}