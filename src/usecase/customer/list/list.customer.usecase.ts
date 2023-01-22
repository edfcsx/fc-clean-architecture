import { InputListCustomerDTO, OutputListCustomerDTO } from './list.customer.dto'
import CustomerRepositoryInterface from '@domain/customer/repository/customer-repository.interface'
import Customer from '@domain/customer/entity/customer'

export default class ListCustomerUseCase {
  private repository: CustomerRepositoryInterface

  constructor (repository: CustomerRepositoryInterface) {
    this.repository = repository
  }

  async handle (input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
    const customers = await this.repository.findAll()
    return OutputMapper.toOutput(customers)
  }
}

class OutputMapper {
  static toOutput (customer: Customer[]): OutputListCustomerDTO {
    return {
      customers: customer.map((c) => ({
        id: c.id,
        name: c.name,
        address: {
          street: c.Address.street,
          number: c.Address.number,
          city: c.Address.city,
          zip: c.Address.zip
        }
      }))
    }
  }
}
