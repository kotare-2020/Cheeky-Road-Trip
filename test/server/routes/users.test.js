// jest.mock('../../server/db/connection', () => ({
//   createUser: (user_name, first_name, last_name, password) => Promise.resolve(
//     1
//   ),
//   userExists: (user_name) => Promise.resolve(
//     true
//   ),
//   getUserByUsername: (user_name) => Promise.resolve([
//     {id: 2, name: 'test user 2', email: 'test2@user.nz'},
//     {id: 4, name: 'test user 4', email: 'test4@user.nz'}
//   ])
// }))

test('', () => {
  expect(true).toBeTruthy()
})
