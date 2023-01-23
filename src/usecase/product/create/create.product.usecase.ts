import { InputCreateProductDTO, OutputCreateProductDTO } from './create.product.dto'
import UseCaseInterface from '@usecase/@shared/usecase-interface'
import ProductRepositoryInterface from '@domain/product/repository/product-repository.interface'
import ProductFactory from '@domain/product/factory/product.factory'

export default class CreateProductUseCase implements UseCaseInterface<InputCreateProductDTO, Promise<OutputCreateProductDTO>> {
  private repository: ProductRepositoryInterface

  constructor (repository: ProductRepositoryInterface) {
    this.repository = repository
  }

  async handle (input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    const product = ProductFactory.create(input.type, input.name, input.price)
    await this.repository.create(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
