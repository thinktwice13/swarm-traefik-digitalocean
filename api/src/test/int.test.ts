import { getConnection } from 'typeorm'

describe('Integration test', () => {
  it('Works', () => {
    const conn = getConnection('test')
    expect(conn.isConnected).toBe(true)
  })
})
