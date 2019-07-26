import {
  Controller,
  post,
  getWithRoute,
  postWithRoute,
  putWithRoute,
  deleteWithRoute
} from '../../../../src'

@Controller()
class RestController {
  @getWithRoute('/')
  list(_req, res) {
    res.json({ list: true })
  }

  @postWithRoute('/')
  create(_req, res) {
    res.json({ create: true })
  }

  @getWithRoute('/:id')
  get(_req, res) {
    res.json({ get: true })
  }

  @putWithRoute('/:id')
  update(_req, res) {
    res.json({ update: true })
  }

  @deleteWithRoute('/:id')
  remove(_req, res) {
    res.json({ remove: true })
  }

  @post()
  notify(_req, res) {
    res.json({ notify: true })
  }
}
export default RestController
