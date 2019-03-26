---
to: controllers/<%= name %>.ts
---
import { Controller, get } from 'hypercontroller'

@Controller()
class <%= Name %>Controller {
  @get()
  index(_req: any, res: any) {
    res.json({ ok: true})
  }
}
export default <%= Name %>Controller
