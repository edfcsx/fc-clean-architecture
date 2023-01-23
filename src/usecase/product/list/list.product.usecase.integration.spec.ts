import ProductRepository from '@infra/product/sequelize/repository/product.repository'
import { Sequelize } from 'sequelize-typescript'
import ProductFactory from '@domain/product/factory/product.factory'
import ListProductUsecase from './list.product.usecase'
import ProductModel from '@infra/product/sequelize/model/product.model'

const product1 = ProductFactory.create('a', 'product one', 10.99)
const product2 = ProductFactory.create('a', 'product two', 10.99)

describe('Unit test list product use case', () => {
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

  it('should list a products', async () => {
    const repository = new ProductRepository()
    repository.create(product1)
    repository.create(product2)

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
