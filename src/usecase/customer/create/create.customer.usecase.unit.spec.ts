import CreateCustomerUseCase from './create.customer.usecase'

const makeMockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

const input = {
  name: 'John',
  address: {
    street: 'Street',
    number: '0',
    zip: 'zipcode',
    city: 'New York'
  }
}

describe('Unit test create customer use case', () => {
  it('should create a customer', async () => {
    const repository = makeMockRepository()
    const output = await new CreateCustomerUseCase(repository).handle(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city
      }
    })
  })

  it('should throw an error when name is missing', async () => {
    const repository = makeMockRepository()

    input.name = ''

    await expect(new CreateCustomerUseCase(repository).handle(input)).rejects
      .toThrow('Customer: name is required')
  })

  it('should throw an error when street is missing', async () => {
    const repository = makeMockRepository()

    input.address.street = ''

    await expect(new CreateCustomerUseCase(repository).handle(input)).rejects
      .toThrow('Street is required')
  })
})
