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

export const seedUsers = [
  {
    id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    firstName: 'Diana',
    lastName: 'Marquez',
    email: 'diana.marquez@example.com',
    createdAt: new Date('2023-09-16T08:00:00Z'),
    updatedAt: new Date('2023-09-16T08:30:00Z')
  },
  {
    id: 'c0ec8857-e5bf-4b0a-bcef-6fa04277460e',
    firstName: 'Carlos',
    lastName: 'Santana',
    email: 'carlos.santana@example.com',
    createdAt: new Date('2023-09-15T14:45:00Z'),
    updatedAt: new Date('2023-09-15T15:15:00Z')
  },
  {
    id: '2c1e5b17-4f68-4b25-9b45-787c5c16ea99',
    firstName: 'Alejandro',
    lastName: 'Valentino',
    email: 'alejandro.valentino@example.com',
    createdAt: new Date('2023-09-14T12:30:00Z'),
    updatedAt: new Date('2023-09-14T13:00:00Z')
  },
  {
    id: '3a7d3a0e-ec84-4a07-bd1d-4d7b31d7d61c',
    firstName: 'Eva',
    lastName: 'Gonzalez',
    email: 'eva.gonzalez@example.com',
    createdAt: new Date('2023-09-13T18:15:00Z'),
    updatedAt: new Date('2023-09-13T18:45:00Z')
  },
  {
    id: 'fa02de74-8240-4e08-b4eb-7d90fda4b7f1',
    firstName: 'Diego',
    lastName: 'Rodriguez',
    email: 'diego.rodriguez@example.com',
    createdAt: new Date('2023-09-12T09:30:00Z'),
    updatedAt: new Date('2023-09-12T10:00:00Z')
  }
];