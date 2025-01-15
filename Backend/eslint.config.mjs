import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.node, // Puisque c'est un projet backend, on utilise node au lieu de browser
      },
    },
  },
  ...tseslint.configs.recommended,
  {
    ignores: ["dist/**", "node_modules/**"], // Ignore les fichiers compilés et node_modules
  },
];
