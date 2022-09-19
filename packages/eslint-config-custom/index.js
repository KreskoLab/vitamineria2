module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: [
		"@vue/typescript/recommended",
		"plugin:vue/vue3-recommended",
		"plugin:vue/vue3-strongly-recommended",
		"plugin:vue/vue3-essential",
		"prettier",
	],
	rules: {
		"no-tabs": ["error", { "allowIndentationTabs": true }],
		"@typescript-eslint/indent": ["error", "tab"],
		"vue/multi-word-component-names": "off",
		"vue/no-multi-spaces": ["error", {
			"ignoreProperties": false
		}],
		"vue/singleline-html-element-content-newline": ["error", {
			"ignoreWhenNoAttributes": true,
			"ignoreWhenEmpty": true,
			"ignores": ["pre", "textarea"]
		}],
		"vue/html-indent": ["error", "tab"]
	}
};