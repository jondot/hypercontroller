---
to: controllers/<%= name %>.ts
---
import {
  Controller,
  post,
  getWithRoute,
  postWithRoute,
  putWithRoute,
  deleteWithRoute
} from 'hypercontroller'

@Controller()
class <%= Name %>Controller {
  @getWithRoute('/')
  list(_req: any, res: any) {
    res.json({ list: true })
  }

  @postWithRoute('/')
  create(_req: any, res: any) {
    res.json({ create: true })
  }

  @getWithRoute('/:id')
  get(_req: any, res: any) {
    res.json({ get: true })
  }

  @putWithRoute('/:id')
  update(_req: any, res: any) {
    res.json({ update: true })
  }

  @deleteWithRoute('/:id')
  remove(_req: any, res: any) {
    res.json({ remove: true })
  }

  @post()
  notify(_req: any, res: any) {
    res.json({ notify: true })
  }
}
export default <%= Name %>Controller
