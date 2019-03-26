---
to: package.json
inject: true
before: dependencies
skip_if: start
---
    "scripts": {"start": "yarn ts-node server.ts"},