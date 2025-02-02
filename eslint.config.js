import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {     
    languageOptions: { 
      globals: {
        ...globals.node,
        ...globals.mocha,
        ...globals.browser,
        sinon: "readonly", 
        AdminJS: "readonly",
        beforeAll: "readonly", 
        afterAll: "readonly",
      }
    }, 
  },
  pluginJs.configs.recommended,
];