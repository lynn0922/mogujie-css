module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

        'prettier/prettier': [
            'error',
            {
                printWidth: 100,
                singleQuote: true, // 使用单引号
                semi: false, // 末尾使用分号
                tabWidth: 4,
                trailingComma: 'none',
                arrowParens: 'avoid',
                bracketSpacing: true,
                htmlWhitespaceSensitivity: 'ignore',
                proseWrap: 'always', // 代码超出是否要换行 preserve保留
                vueIndentScriptAndStyle: false,
                quoteProps: 'as-needed',
                jsxBracketSameLine: false,
                jsxSingleQuote: false,
                insertPragma: false,
                requirePragma: false,
                endOfLine: 'crlf'
            }
        ]
    }
}
