import { InputUpdateCustomerDTO, OutputUpdateCustomerDTO } from './update.customer.dto'
import CustomerRepositoryInterface from '@domain/customer/repository/customer-repository.interface'
import Address from '@domain/customer/value-object/address'

export default class UpdateCustomerUseCase {
  private repository: CustomerRepositoryInterface

  constructor (repository: CustomerRepositoryInterface) {
    this.repository = repository
  }

  async handle (input: InputUpdateCustomerDTO): Promise<OutputUpdateCustomerDTO> {
    const customer = await this.repository.find(input.id)
    customer.changeName(input.name)

    const { street, number, zip, city } = input.address
    customer.changeAddress(new Address(street, number, zip, city))
    await this.repository.update(customer)

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
