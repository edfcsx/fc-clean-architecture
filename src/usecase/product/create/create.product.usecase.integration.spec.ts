import ProductModel from '@infra/product/sequelize/model/product.model'
import ProductRepository from '@infra/product/sequelize/repository/product.repository'
import { Sequelize } from 'sequelize-typescript'
import CreateProductUseCase from './create.product.usecase'

describe('Integration test create product use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const input = {
      type: 'a',
      name: 'valid product',
      price: 10.99
    }

    const repository = new ProductRepository()
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

    const repository = new ProductRepository()

    await expect(new CreateProductUseCase(repository).handle(input))
      .rejects.toThrowError('Product: name is required')
  })

  it('should throw error when price is less than 0', async () => {
    const input = {
      type: 'a',
      name: 'valid product',
      price: -1
    }

    const repository = new ProductRepository()

    await expect(new CreateProductUseCase(repository).handle(input))
      .rejects.toThrowError('Product: price must be great than zero')
  })

  it('should throw error when product type invalid', async () => {
    const input = {
      type: 'c',
      name: 'valid product',
      price: 10.99
    }

    const repository = new ProductRepository()

    await expect(new CreateProductUseCase(repository).handle(input))
      .rejects.toThrowError('Product type not supported')
  })
})
