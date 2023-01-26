import request from 'supertest'
import { app, sequelize } from '../express'

describe('E2E test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const product = {
      type: 'a',
      name: 'Paçoquita',
      price: 0.50
    }

    const response = await request(app).post('/product')
      .send(product)

    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({
      id: expect.any(String),
      name: 'Paçoquita',
      price: 0.50
    })
  })

  it('should not create a product', async () => {
    const response = await request(app).post('/product')
      .send({ name: 'Paçoquita', price: 10.99 })

    expect(response.status).toBe(500)
  })

  it('should get a product', async () => {
    const product = await request(app).post('/product')
      .send({
        type: 'a',
        name: 'Paçoquita',
        price: 0.50
      })

    expect(product.status).toBe(200)

    const response = await request(app).get(`/product/${product.body.id}`)
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({
      id: product.body.id,
      name: product.body.name,
      price: product.body.price
    })
  })

  it('should not find a product', async () => {
    const response = await request(app).get('/product/any-id')
    expect(response.status).toBe(404)
  })

  it('should list all product', async () => {
    const product = await request(app).post('/product')
      .send({ type: 'a', name: 'Paçoquita', price: 0.50 })
    expect(product.status).toBe(200)

    const product2 = await request(app).post('/product')
      .send({ type: 'a', name: 'Paçoquita Diet', price: 2.50 })
    expect(product2.status).toBe(200)

    const productList = await request(app).get('/product').send()
    expect(productList.status).toBe(200)
    expect(productList.body.products.length).toBe(2)
    expect(productList.body.products[0].name).toBe('Paçoquita')
    expect(productList.body.products[1].name).toBe('Paçoquita Diet')
  })

  it('should update product', async () => {
    const product = await request(app).post('/product')
      .send({ type: 'a', name: 'Paçoquita', price: 0.50 })

    expect(product.status).toBe(200)

    const productUpdate = await request(app).put('/product')
      .send({
        id: product.body.id,
        name: 'Paçoquita Diet',
        price: product.body.price
      })

    expect(productUpdate.status).toBe(200)
    expect(productUpdate.body.id).toBe(product.body.id)
    expect(productUpdate.body.price).toBe(0.50)
    expect(productUpdate.body.name).toBe('Paçoquita Diet')
  })

  it('should not update a product', async () => {
    const response = await request(app).put('/product')
      .send({
        id: 'invalid_id',
        name: 'Paçoquita Diet',
        price: 0.50
      })

    expect(response.status).toBe(500)
  })
})
