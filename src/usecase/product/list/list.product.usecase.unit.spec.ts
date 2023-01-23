import ProductFactory from '@domain/product/factory/product.factory'
import ListProductUsecase from './list.product.usecase'

const product1 = ProductFactory.create('a', 'product one', 10.99)
const product2 = ProductFactory.create('a', 'product two', 10.99)

const makeMockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test list product use case', () => {
  it('should list a products', async () => {
    const repository = makeMockRepository()
    const useCase = new ListProductUsecase(repository)
    const result = await useCase.handle({})

    expect(result.products.length).toBe(2)
    expect(result.products[0].id).toBe(product1.id)
    expect(result.products[0].name).toBe(product1.name)
    expect(result.products[0].price).toBe(product1.price)
    expect(result.products[1].id).toBe(product2.id)
    expect(result.products[1].name).toBe(product2.name)
    expect(result.products[1].price).toBe(product2.price)
  })
})
