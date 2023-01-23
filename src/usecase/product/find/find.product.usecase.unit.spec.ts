import Product from '@domain/product/entity/product'
import FindProductUseCase from './find.product.usecase'

const makeMockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

const makeProduct = (): Product => {
  const product = new Product('123', 'valid product', 10.99)
  return product
}

const product = makeProduct()

describe('Unit test find product use case', () => {
  it('should find a product', async () => {
    const repository = makeMockRepository()
    const usecase = new FindProductUseCase(repository)

    expect(await usecase.handle({ id: '123' })).toEqual({
      id: product.id,
      name: product.name,
      price: product.price
    })
  })

  it('should not find a product', async () => {
    const repository = makeMockRepository()
    repository.find.mockImplementation(() => {
      throw new Error('Product not found')
    })

    const usecase = new FindProductUseCase(repository)
    expect(() => {
      return usecase.handle({ id: '123' })
    }).rejects.toThrow('Product not found')
  })
})
