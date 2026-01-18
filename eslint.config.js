import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js, tseslint },
    extends: ["js/recommended", "tseslint/strict", "tseslint/stylistic"],
    languageOptions: { globals: { ...globals.node } },
  },
  eslintConfigPrettier,
]);
