import request from 'supertest'
import { app, sequelize } from '../express'

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: 'Main St',
          number: '123',
          zip: '10100-255',
          city: 'New York'
        }
      })

    expect(response.status).toBe(200)
    expect(response.body.name).toEqual('John Doe')
    expect(response.body.address.street).toEqual('Main St')
    expect(response.body.address.number).toEqual('123')
    expect(response.body.address.zip).toEqual('10100-255')
    expect(response.body.address.city).toEqual('New York')
  })

  it('should not create a customer', async () => {
    const response = await request(app).post('/customer')
      .send({ name: 'John Doe' })

    expect(response.status).toBe(500)
  })

  it('should list all customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: 'Main St',
          number: '123',
          zip: '10100-255',
          city: 'New York'
        }
      })

    const response2 = await request(app)
      .post('/customer')
      .send({
        name: 'Jane Doe',
        address: {
          street: 'Main St',
          number: '123',
          zip: '10100-255',
          city: 'New York'
        }
      })

    expect(response.status).toBe(200)
    expect(response2.status).toBe(200)

    const listResponse = await request(app).get('/customer').send()
    expect(listResponse.status).toBe(200)
    expect(listResponse.body.customers.length).toBe(2)

    const customer = listResponse.body.customers[0]
    expect(customer.name).toBe('John Doe')
    const customer2 = listResponse.body.customers[1]
    expect(customer2.name).toBe('Jane Doe')
  })
})
