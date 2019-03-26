---
to: controllers/<%= controller %>.ts
inject: true
after: Controller {
skip_if: <%= name %>
---
    @get()
    <%= name %>(_req: any, res: any){
        res.json({ok: "<%= name %>"})
    }
