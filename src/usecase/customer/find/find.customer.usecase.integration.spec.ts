import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '@infra/customer/sequelize/model/customer.model'
import CustomerRepository from '@infra/customer/sequelize/repository/customer.repository'
import Customer from '@domain/customer/entity/customer'
import Address from '@domain/customer/value-object/address'
import { InputFindCustomerDTO, OutputFindCustomerDTO } from '@usecase/customer/find/find.customer.dto'
import FindCustomerUseCase from './find.customer.usecase'

describe('Test find customer use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a customer', async () => {
    const customer = new Customer('123', 'John Doe')
    const address = new Address('Street', '1', '00000-000', 'New York')
    customer.changeAddress(address)

    const customerRepository = new CustomerRepository()
    const customerCreated = await customerRepository.create(customer)


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

    const result = usecase.handle(useCaseInput)
    expect(result).toStrictEqual(useCaseOutput)
  })
})
