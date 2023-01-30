export const rules: any = {
    label: {
        opaque: 'isOpaque',
        userInteractionEnabled: 'isUserInteractionEnabled',
        contentMode: 'contentMode',
        text: 'text',
        textAlignment: 'textAlignment',
        numberOfLines: 'numberOfLines',
        baselineAdjustment: 'baselineAdjustment',
        adjustsLetterSpacingToFitWidth: 'adjustsLetterSpacingToFitWidth',
        adjustsFontSizeToFit: 'adjustsFontSizeToFitWidth',
        translatesAutoresizingMaskIntoConstraints: 'translatesAutoresizingMaskIntoConstraints',
    },
    button: {
        opaque: 'isOpaque',
        contentMode: 'contentMode',
        contentHorizontalAlignment: 'contentHorizontalAlignment',
        contentVerticalAlignment: 'contentVerticalAlignment',
        translatesAutoresizingMaskIntoConstraints: 'translatesAutoresizingMaskIntoConstraints',
    },
    view: {
        opaque: 'isOpaque',
        userInteractionEnabled: 'isUserInteractionEnabled',
        contentMode: 'contentMode',
        translatesAutoresizingMaskIntoConstraints: 'translatesAutoresizingMaskIntoConstraints',
    },
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