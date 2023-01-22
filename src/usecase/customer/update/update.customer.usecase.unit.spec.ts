import CustomerFactory from '@domain/customer/factory/customer.factory'
import Customer from '@domain/customer/entity/customer'
import Address from '@domain/customer/value-object/address'
import UpdateCustomerUseCase from './update.customer.usecase'

const makeCustomer = (name = 'John'): Customer => {
  const address = new Address('Street', '1', '00000-000', 'New York')
  return CustomerFactory.createWithAddress(name, address)
}

const makeMockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

const customer = makeCustomer()

const input = {
  id: customer.id,
  name: 'John Updated',
  address: {
    street: 'Street Updated',
    city: 'City Updated',
    number: 'Number Updated',
    zip: 'Zip Updated'
  }
}

describe('Unit test customer update use case', () => {
  it('should update a customer', async () => {
    const repository = makeMockRepository()
    const usecase = new UpdateCustomerUseCase(repository)
    const output = await usecase.handle(input)
    expect(output).toEqual(input)
  })
})
