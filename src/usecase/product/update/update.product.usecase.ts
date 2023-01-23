import { InputUpdateProductDTO, OutputUpdateProductDTO } from './update.product.dto'
import UseCaseInterface from '@usecase/@shared/usecase-interface'
import ProductRepositoryInterface from '@domain/product/repository/product-repository.interface'

export default class UpdateProductUseCase implements UseCaseInterface<InputUpdateProductDTO, Promise<OutputUpdateProductDTO>> {
  private repository: ProductRepositoryInterface

  constructor (repository: ProductRepositoryInterface) {
    this.repository = repository
  }

  async handle (input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
    const product = await this.repository.find(input.id)
    product.changeName(input.name)
    product.changePrice(input.price)
    await this.repository.update(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
