/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
	pluginSearchDirs: false,
	plugins: [
		require('@ianvs/prettier-plugin-sort-imports'),
	],
	tailwindConfig: './tailwind.config.js',
	arrowParens: 'always',
	bracketSameLine: false,
	bracketSpacing: true,
	embeddedLanguageFormatting: 'auto',
	htmlWhitespaceSensitivity: 'css',
	singleAttributePerLine: true,
	insertPragma: false,
	jsxSingleQuote: true,
	printWidth: 80,
	proseWrap: 'always',
	quoteProps: 'as-needed',
	requirePragma: false,
	semi: true,
	singleQuote: true,
	tabWidth: 2,
	useTabs: true,
	trailingComma: 'all',
	importOrder: [
		'<THIRD_PARTY_MODULES>',
		'',
		'^[~/]',
		'',
		'^[./]',
	],
	importOrderBuiltinModulesToTop: true,
	importOrderCaseInsensitive: true,
	importOrderParserPlugins: ['typescript', 'jsx'],
	importOrderMergeDuplicateImports: true,
	importOrderCombineTypeAndValueImports: true,
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	importOrderGroupNamespaceSpecifiers: true,
};
