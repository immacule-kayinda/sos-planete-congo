import { FlatCompat } from '@eslint/eslintrc';

// Ce compat permet de faire le pont avec l'ancienne syntaxe `.eslintrc`
const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
});

const eslintConfig = [
    ...compat.config({
        extends: [
            'next/core-web-vitals',
            'next/typescript',
            'prettier',
        ],
        plugins: ['unused-imports', 'react'],
        rules: {
            '@typescript-eslint/no-unused-vars': 'error',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            'react/no-unescaped-entities': 'off', // Désactivée comme tu voulais
            '@typescript-eslint/no-explicit-any': 'warn',
            '@next/next/no-assign-module-variable': 'error',
            '@next/next/no-html-link-for-pages': [
                'error',
                'pages/',
            ],
            '@next/next/no-img-element': 'warn',
            '@next/next/no-sync-scripts': 'warn',
            '@next/next/no-css-tags': 'warn',
            '@next/next/no-document-import-in-page': 'warn',
            '@next/next/no-head-import-in-document': 'warn',
            '@next/next/no-page-custom-font': 'warn',
        },
    }),
];

export default eslintConfig;
