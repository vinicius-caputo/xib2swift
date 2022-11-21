export const rules: any = {
    label: {
        opaque: 'isOpaque',
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
    },
    button: {
        opaque: 'isOpaque',
        contentMode: 'contentMode',
        contentHorizontalAlignment: 'contentHorizontalAlignment',
        contentVerticalAlignment: 'contentVerticalAlignment',
        buttonType: 'buttonType',
        lineBreakMode: 'lineBreakMode',
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