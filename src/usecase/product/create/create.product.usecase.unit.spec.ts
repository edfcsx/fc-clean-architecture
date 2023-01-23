import CreateProductUseCase from './create.product.usecase'

const makeMockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test create product use case', () => {
  it('should create a product', async () => {
    const input = {
      type: 'a',
      name: 'valid product',
      price: 10.99
    }

    const repository = makeMockRepository()
    const output = await new CreateProductUseCase(repository).handle(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  })

  it('should throw error when name is missing', async () => {
    const input = {
      type: 'a',
      name: '',
      price: 10.99
    }

    const repository = makeMockRepository()

    await expect(new CreateProductUseCase(repository).handle(input))
      .rejects.toThrowError('Name is required')
  })

  it('should throw error when price is less than 0', async () => {
    const input = {
      type: 'a',
      name: 'valid product',
      price: -1
    }

    const repository = makeMockRepository()

    await expect(new CreateProductUseCase(repository).handle(input))
      .rejects.toThrowError('Price must be great than zero')
  })

  it('should throw error when product type invalid', async () => {
    const input = {
      type: 'c',
      name: 'valid product',
      price: 10.99
    }

    const repository = makeMockRepository()

    await expect(new CreateProductUseCase(repository).handle(input))
      .rejects.toThrowError('Product type not supported')
  })
})
