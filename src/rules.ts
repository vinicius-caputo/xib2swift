export const rules: any = {
    label: {
        opaque: 'opaque',
        userInteractionEnabled: 'userInteractionEnabled',
        contentMode: 'contentMode',
        horizontalHuggingPriority: 'horizontalHuggingPriority',
        verticalHuggingPriority: 'verticalHuggingPriority',
        text: 'text',
        textAlignment: 'textAlignment',
        lineBreakMode: 'lineBreakMode',
        numberOfLines: 'numberOfLines',
        baselineAdjustment: 'baselineAdjustment',
        adjustsLetterSpacingToFitWidth: 'adjustsLetterSpacingToFitWidth',
        adjustsFontSizeToFit: 'adjustsFontSizeToFit',
        translatesAutoresizingMaskIntoConstraints: 'translatesAutoresizingMaskIntoConstraints',
       
    }
}

export function resolveResultRule(result: string): string {
    switch (result) {
        case "NO":
            return "false";
        case "YES":
            return "true";
        default:
            return /\d/.test(result) ? result : `.${result}`;
    }
}