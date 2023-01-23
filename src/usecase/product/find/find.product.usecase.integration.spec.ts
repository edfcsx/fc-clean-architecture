import { Sequelize } from 'sequelize-typescript'
import ProductRepository from '@infra/product/sequelize/repository/product.repository'
import Product from '@domain/product/entity/product'
import ProductModel from '@infra/product/sequelize/model/product.model'
import FindProductUseCase from './find.product.usecase'

const makeProduct = (): Product => {
  const product = new Product('123', 'valid product', 10.99)
  return product
}

const product = makeProduct()

describe('Unit test find product use case', () => {
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

  it('should find a product', async () => {
    const repository = new ProductRepository()
    const usecase = new FindProductUseCase(repository)
    repository.create(product)

    expect(await usecase.handle({ id: '123' })).toEqual({
      id: product.id,
      name: product.name,
      price: product.price
    })
  })
})
