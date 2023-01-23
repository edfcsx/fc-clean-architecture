import ProductRepositoryInterface from '@domain/product/repository/product-repository.interface'
import UseCaseInterface from '@usecase/@shared/usecase-interface'
import { InputListProductDTO, OutputListProductDTO } from './list.product.dto'

export default class ListProductUsecase implements UseCaseInterface<InputListProductDTO, Promise<OutputListProductDTO>> {
  private repository: ProductRepositoryInterface

  constructor (repository: ProductRepositoryInterface) {
    this.repository = repository
  }

  async handle (input: InputListProductDTO): Promise<OutputListProductDTO> {
    const productsList = await this.repository.findAll()

    return {
      products: productsList.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price
      }))
    }
  }
}
