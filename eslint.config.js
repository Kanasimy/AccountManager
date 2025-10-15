// eslint.config.js
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier' // 🆕
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default [
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked, // <- типовая конфигурация
    ...vue.configs['flat/recommended'],
    eslintConfigPrettier,
    {
        files: ['**/*.{js,ts,vue}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: ['./tsconfig.eslint.json']
            }
        },
        settings: {
            'import/resolver': {
                alias: {
                    map: [['@', path.resolve(__dirname, 'src')]],
                    extensions: ['.ts', '.js', '.vue']
                }
            }
        },
        plugins: { prettier },
        rules: {
            'prettier/prettier': 'error',
            // Шумные Vue-правила форматирования — пусть Prettier рулит
            'vue/max-attributes-per-line': 'off',
            'vue/html-closing-bracket-newline': 'off',
            // Остальное по вкусу:
            'vue/multi-word-component-names': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
        },
        ignores: ['**/dist/**', '**/node_modules/**', '**/.vite/**', '**/coverage/**']
    }
]
