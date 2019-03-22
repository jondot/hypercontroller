import { replace, kebabCase } from 'lodash'

const makePath = (name: string) => {
  if (name === 'index') {
    return ''
  }
  const controllerOrPath = replace(name, /Controller$/, '')
  if (controllerOrPath === 'Index') {
    return ''
  }

  return kebabCase(controllerOrPath)
}
const leadingSlash = (mountedPath: string) =>
  mountedPath.startsWith('/') ? mountedPath : `/${mountedPath}`

export { makePath, leadingSlash }
