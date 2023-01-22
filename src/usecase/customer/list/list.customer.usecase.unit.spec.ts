import CustomerFactory from '@domain/customer/factory/customer.factory'
import Address from '@domain/customer/value-object/address'
import ListCustomerUseCase from './list.customer.usecase'

const customer1 = CustomerFactory.createWithAddress(
  'John Doe',
  new Address('Main St', '123', '000', 'New York')
)

const customer2 = CustomerFactory.createWithAddress(
  'Jane Doe',
  new Address('Main St', '123', '000', 'New York')
)

const makeMockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test customer listing use case', () => {
  it('should list a customer', async () => {
    const repository = makeMockRepository()
    const useCase = new ListCustomerUseCase(repository)
    const result = await useCase.handle({})

    expect(result.customers.length).toBe(2)
    expect(result.customers[0].id).toBe(customer1.id)
    expect(result.customers[0].name).toBe(customer1.name)
    expect(result.customers[0].address.street).toBe(customer1.Address.street)
    expect(result.customers[1].id).toBe(customer2.id)
    expect(result.customers[1].name).toBe(customer2.name)
    expect(result.customers[1].address.street).toBe(customer2.Address.street)
  })
})
