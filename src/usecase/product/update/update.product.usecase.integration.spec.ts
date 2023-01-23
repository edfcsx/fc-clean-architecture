import { Sequelize } from 'sequelize-typescript'
import ProductRepository from '@infra/product/sequelize/repository/product.repository'
import Product from '@domain/product/entity/product'
import ProductInterface from '@domain/product/entity/product.interface'
import UpdateProductUseCase from './update.product.usecase'
import ProductModel from '@infra/product/sequelize/model/product.model'

const makeProduct = (): ProductInterface => {
  return new Product('123', 'valid product', 10.99)
}

const product = makeProduct()

const input = {
  id: product.id,
  name: 'Product Updated',
  price: 15.99
}

describe('Integration test update product use case', () => {
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

  it('should update a product', async () => {
    const repository = new ProductRepository()
    repository.create(product)
    const usecase = new UpdateProductUseCase(repository)
    const output = await usecase.handle(input)
    expect(output).toEqual(input)
  })
})
