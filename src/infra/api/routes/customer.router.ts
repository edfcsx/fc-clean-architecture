import express, { Request, Response } from 'express'
import CreateCustomerUseCase from '@usecase/customer/create/create.customer.usecase'
import CustomerRepository from '@infra/customer/sequelize/repository/customer.repository'
import ListCustomerUseCase from '@usecase/customer/list/list.customer.usecase'

export const customerRoute = express.Router()

customerRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository())

  try {
    const customerDTO = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city
      }
    }

    const output = await usecase.handle(customerDTO)
    res.status(200).send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

customerRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository())

  try {
    const output = await usecase.handle({})
    res.status(200).send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})