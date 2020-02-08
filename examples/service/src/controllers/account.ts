import wrap from 'async-express-mw'
import { Controller, get, postWithRoute } from '../../../../dist'

const database = () =>
  new Promise((resolve, _reject) => {
    setTimeout(() => resolve({ saved: true }), 1000)
  })

// const accountParams = permitParams('account', ['name'])
@Controller()
class AccountController {
  @get()
  index(_req, res) {
    res.json({ name: 'Homer Simpson' })
  }

  @postWithRoute('/')
  async update(_req, res) {
    // const params = accountParams(req.body)
    const record = await database()
    res.json(record)
  }

  magic(_req, res) {
    res.send({ magic: 'foobar' })
  }

  _routes({ router }) {
    router.get('/magic', wrap(this.magic))
  }
}
export default AccountController
