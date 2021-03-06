const testDb = require('./connection')
const users = require('../../../server/db/users')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

test('createUser inserts a single user', () => {
  let expected = 1

  return users.createUser({ username: 'new_user', password: 's3cr3t', email_address: 'new@user.com', contact_details: '123456789' }, testDb)
    .then(ids => {
      let actual = ids.length

      expect(actual).toEqual(expected)
    })
})

test('userExists finds existing user', () => {
  let expected = true

  return users.userExists('admin', testDb)
    .then(result => {
      let actual = result

      expect(actual).toEqual(expected)
    })
})

test('userExists does not find non-existant user', () => {
  let expected = false

  return users.userExists('not-a-username', testDb)
    .then(result => {
      let actual = result

      expect(actual).toEqual(expected)
    })
})

test('getUserByUsername finds existing user', () => {
  let expected = 'Ring the bell ;)'

  return users.getUserByUsername('admin', testDb)
    .then(user => {
      let actual = user.contact_details

      expect(actual).toEqual(expected)
    })
})
