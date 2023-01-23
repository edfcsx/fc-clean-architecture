import Address from '@domain/customer/value-object/address'
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from './create.customer.dto'
import CustomerRepositoryInterface from '@domain/customer/repository/customer-repository.interface'
import CustomerFactory from '@domain/customer/factory/customer.factory'
import UseCaseInterface from '@usecase/@shared/usecase-interface'

export default class CreateCustomerUseCase implements UseCaseInterface<InputCreateCustomerDTO, Promise<OutputCreateCustomerDTO>> {
  private repository: CustomerRepositoryInterface

  constructor (repository: CustomerRepositoryInterface) {
    this.repository = repository
  }

  async handle (input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
    const { name, address } = input
    const customerAddress = new Address(address.street, address.number, address.zip, address.city)
    const customer = CustomerFactory.createWithAddress(name, customerAddress)
    await this.repository.create(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        city: customer.Address.city,
        zip: customer.Address.zip
      }
    }
  }
}
