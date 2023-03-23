export const ignoredTags: string[] = []

export const defaultRules: any = {
    opaque: 'isOpaque = false',
    userInteractionEnabled: 'isUserInteractionEnabled = false',
}

export function shouldIgnoreProperty(tag: string, key: string): boolean {
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
    