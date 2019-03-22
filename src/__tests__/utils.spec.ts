import { makePath } from '../utils'

describe('utils', () => {
  it('should convert to HTTP paths', () => {
    expect(makePath('FooController')).toMatchSnapshot('controller')
    expect(makePath('index')).toMatchSnapshot('index')
    expect(makePath('FooBarController')).toMatchSnapshot('kebab')
    expect(makePath('indexFoobar')).toMatchSnapshot('non-index')
    expect(makePath('hello')).toMatchSnapshot('normal')
  })
})
