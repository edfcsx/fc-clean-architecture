import Product from '@domain/product/entity/product'
import ProductInterface from '@domain/product/entity/product.interface'
import UpdateProductUseCase from './update.product.usecase'

const makeProduct = (): ProductInterface => {
  return new Product('123', 'valid product', 10.99)
}

const product = makeProduct()

const makeMockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

const input = {
  id: product.id,
  name: 'Product Updated',
  price: 15.99
}

describe('Unit test update product use case', () => {
  it('should update a product', async () => {
    const repository = makeMockRepository()
    const usecase = new UpdateProductUseCase(repository)
    const output = await usecase.handle(input)
    expect(output).toEqual(input)
  })
})
