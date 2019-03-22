import { Controller, get, postWithRoute } from 'hypercontroller'

const database = () =>
  new Promise((resolve, _reject) => {
    setTimeout(() => resolve({ saved: true }), 1000)
  })

// const accountParams = requireParams('account', ['name'])
@Controller()
class AccountController {
  @get()
  index(_req, res) {
    res.json({ name: 'Homer Simpson' })
  }

  @postWithRoute('/')
  async update(req, res) {
    // const params = accountParams(req.body)
    const record = await database()
    res.json(record)
  }
}
export default AccountController
