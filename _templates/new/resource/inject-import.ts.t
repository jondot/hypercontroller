---
to: server.ts
inject: true
after: import
skip_if: import <%= Name %>Controller from
---
import <%= Name %>Controller from './controllers/<%= name %>'