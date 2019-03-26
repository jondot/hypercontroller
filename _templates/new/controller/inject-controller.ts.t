---
to: server.ts
inject: true
after: = server.mount
skip_if: new <%= Name %>Controller()
---
    new <%= Name %>Controller(),