---
to: tsconfig.json
inject: true
after: compilerOptions
skip_if: "    experimentalDecorators"
---
    "experimentalDecorators": true,