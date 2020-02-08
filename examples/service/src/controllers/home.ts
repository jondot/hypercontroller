import { Controller, get, GetWithRoute } from '../../../../dist'

@Controller()
class IndexController {
  @get()
  index(_req, res) {
    res.json({ ok: true })
  }

  @GetWithRoute('/login')
  someCrazyLogin(_req, res) {
    res.json({ login: true })
  }
}
export default IndexController
