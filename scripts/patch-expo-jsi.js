const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..', 'node_modules', 'expo-modules-jsi', 'apple', 'Sources', 'ExpoModulesJSI');

const patches = [
  {
    file: path.join(base, 'Contexts', 'HostFunctionContext.swift'),
    from: 'class HostFunctionContext: Sendable {',
    to:   'class HostFunctionContext: @unchecked Sendable {',
  },
  {
    file: path.join(base, 'Contexts', 'HostObjectContext.swift'),
    from: 'class HostObjectContext: Sendable {',
    to:   'class HostObjectContext: @unchecked Sendable {',
  },
  {
    file: path.join(base, 'Runtime', 'JavaScriptPropNameID.swift'),
    from: 'class JavaScriptPropNameID: JavaScriptType {',
    to:   'class JavaScriptPropNameID: JavaScriptType, @unchecked Sendable {',
  },
  {
    file: path.join(base, 'Runtime', 'Values', 'JavaScriptValue.swift'),
    from: 'class JavaScriptValue: JavaScriptType, Equatable, Escapable, Error {',
    to:   'class JavaScriptValue: JavaScriptType, @unchecked Sendable, Equatable, Escapable, Error {',
  },
];

for (const { file, from, to } of patches) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes(to)) continue; // already patched
  if (!content.includes(from)) continue; // already different version
  fs.writeFileSync(file, content.replace(from, to), 'utf8');
  console.log('Patched:', path.basename(file));
}

// Clear xcframework cache so it rebuilds with patches
const cacheDir = path.join(__dirname, '..', 'node_modules', 'expo-modules-jsi', 'apple');
for (const dir of ['.DerivedData', '.build', 'Products', '.xcframework-slices']) {
  const p = path.join(cacheDir, dir);
  if (fs.existsSync(p)) {
    fs.rmSync(p, { recursive: true });
    console.log('Cleared cache:', dir);
  }
}
