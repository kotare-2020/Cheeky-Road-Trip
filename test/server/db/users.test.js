const testEnv = require('../setup-db')
const users = require('../../../server/db/users')

let testDb = null

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.initialise(testDb)
})

afterEach(() => testEnv.cleanup(testDb))

test('createUser inserts a single user', () => {
  let expected = 1

  return users.createUser('new_user', 'new@user.com', '123456789', 's3cr3t', testDb)
  .then(ids => {
    let actual = ids.length

    expect(actual).toEqual(expected)
  })
})

test('userExists finds existing user', () => {
  let expected = true

  return users.userExists('symesharr', testDb)
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

  return users.getUserByUsername('symesharr', testDb)
  .then(user => {
    let actual = user.contact_details

    expect(actual).toEqual(expected)
  })
})
