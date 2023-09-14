export const mockUsers = [
  {
    id: 'hello123-321olleh-hello123-321olleh',
    firstName: 'Mylena',
    lastName: 'Vendramini',
    email: 'i_smile@live.co.uk',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'hello456-654olleh-hello456-654olleh',
    firstName: 'Thiago',
    lastName: 'Los',
    email: 'cruisin@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export const updateUserInput = {
  id: mockUsers[0].id,
  firstName: mockUsers[1].firstName,
  lastName: mockUsers[1].lastName,
  email: mockUsers[1].email
}

export const updatedUser = {
  ...updateUserInput,
  createdAt: mockUsers[0].createdAt,
  updatedAt: new Date()
}