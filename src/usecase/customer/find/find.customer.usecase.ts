import UseCaseInterface from '@usecase/@shared/usecase-interface'
import { InputFindCustomerDTO, OutputFindCustomerDTO } from './find.customer.dto'
import CustomerRepositoryInterface from '@domain/customer/repository/customer-repository.interface'

export default class FindCustomerUseCase implements UseCaseInterface<InputFindCustomerDTO, Promise<OutputFindCustomerDTO>> {
  private repository: CustomerRepositoryInterface

  constructor (repository: CustomerRepositoryInterface) {
    this.repository = repository
  }

  async handle (input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
    const customer = await this.repository.find(input.id)

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
