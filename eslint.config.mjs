import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    {
        ignores: [
            ".next/**",
            "out/**",
            "build/**",
            "node_modules/**",
            "dist/**",
            "next-env.d.ts"
        ],
    },
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/no-unknown-property": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-unused-expressions": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
        },
    },
];

export default eslintConfig;
