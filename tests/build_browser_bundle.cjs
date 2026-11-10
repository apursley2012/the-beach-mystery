/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Browser test harness                                   |
  | Purpose: Load the unchanged browser modules into isolated Chromium test    |
  |          documents.                                                        |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const outputPath = process.argv[2];
if (!outputPath) {
  throw new Error("Usage: node tests/build_browser_bundle.cjs OUTPUT_PATH");
}
function listModules(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((item) => {
    const filename = path.join(directory, item.name);
    return item.isDirectory() ? listModules(filename) : filename.endsWith(".js") ? [filename] : [];
  });
}
const modules = [...listModules(path.join(root, "js")), ...listModules(path.join(root, "assets/vendor"))];
const source = [
  '(function(){"use strict";const factories=Object.create(null);const loaded=Object.create(null);',
  'function requireModule(id){if(loaded[id])return loaded[id].exports;const factory=factories[id];',
  'if(!factory)throw new Error("Missing browser module: "+id);',
  'const module={exports:{}};loaded[id]=module;',
  'factory(module,module.exports,(relative)=>requireModule(new URL(relative,"https://tests.invalid/"+id).pathname.slice(1)));',
  'return module.exports;}',
];
for (const filename of modules) {
  const id = path.relative(root, filename).split(path.sep).join("/");
  const javascript = fs.readFileSync(filename, "utf8").replaceAll("import.meta.url", JSON.stringify(`https://tests.invalid/${id}`));
  const parsed = ts.createSourceFile(id, javascript, ts.ScriptTarget.ESNext, true, ts.ScriptKind.JS);
  if (parsed.parseDiagnostics.length > 0) {
    throw new Error(`Unparsable browser module: ${id}`);
  }
  const compiled = ts.transpileModule(javascript, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, allowJs: true },
  }).outputText;
  source.push(`factories[${JSON.stringify(id)}]=function(module,exports,require){${compiled}};`);
}
source.push('requireModule("js/main.js");})();');
fs.writeFileSync(outputPath, source.join("\n"), "utf8");
console.log(`Built isolated browser harness from ${modules.length} real modules.`);
