import ProductRepositoryInterface from '@domain/product/repository/product-repository.interface'
import UseCaseInterface from '@usecase/@shared/usecase-interface'
import { InputFindProductDTO, OutputFindProductDTO } from './find.product.dto'

export default class FindProductUseCase implements UseCaseInterface<InputFindProductDTO, Promise<OutputFindProductDTO>> {
  private repository: ProductRepositoryInterface

  constructor (repository: ProductRepositoryInterface) {
    this.repository = repository
  }

  async handle (input: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const product = await this.repository.find(input.id)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
