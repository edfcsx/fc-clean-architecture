import Customer from '@domain/customer/entity/customer'
import Address from '@domain/customer/value-object/address'
import { InputFindCustomerDTO, OutputFindCustomerDTO } from '@usecase/customer/find/find.customer.dto'
import FindCustomerUseCase from './find.customer.usecase'

const makeCustomer = (): Customer => {
  const customer = new Customer('123', 'John Doe')
  const address = new Address('Street', '1', '00000-000', 'New York')
  customer.changeAddress(address)

  return customer
}

const makeMockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(makeCustomer())),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test find customer use case', () => {
  it('should find a customer', async () => {
    const customerRepository = makeMockRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

    const useCaseInput: InputFindCustomerDTO = { id: '123' }
    const useCaseOutput: OutputFindCustomerDTO = {
      id: '123',
      name: 'John Doe',
      address: {
        street: 'Street',
        city: 'New York',
        number: '1',
        zip: '00000-000'
      }
    }

    const result = await usecase.handle(useCaseInput)
    expect(result).toStrictEqual(useCaseOutput)
  })

  it('should not find a customer', async () => {
    const customerRepository = makeMockRepository()
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found')
    })

    const usecase = new FindCustomerUseCase(customerRepository)

    expect(() => {
      return usecase.handle({ id: '123' })
    }).rejects.toThrow('Customer not found')
  })
})
