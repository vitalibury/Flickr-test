module.exports = {
    trailingComma: 'all',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    bracketSpacing: true,
    printWidth: 120,
    useTabs: false,
    overrides: [
        {
            files: '*.component.html',
            option: { parser: 'angular' },
        },
        {
            files: '*.ts',
            options: {
                singleQuote: true,
                trailingComma: 'all',
            },
        },
    ],
};
