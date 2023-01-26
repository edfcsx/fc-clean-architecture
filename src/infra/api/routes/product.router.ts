import express from 'express'
import FindProductUseCase from '@usecase/product/find/find.product.usecase'
import ProductRepository from '@infra/product/sequelize/repository/product.repository'
import CreateProductUseCase from '@usecase/product/create/create.product.usecase'
import ListProductUsecase from '@usecase/product/list/list.product.usecase'
import UpdateProductUseCase from '@usecase/product/update/update.product.usecase'

export const productRouter = express.Router()

productRouter.get('/', async (req: express.Request, res: express.Response) => {
  const usecase = new ListProductUsecase(new ProductRepository())

  try {
    const products = await usecase.handle({})
    res.status(200).send(products)
  } catch (err) {
    res.status(500).send(err)
  }
})
productRouter.get('/:id', async (req: express.Request, res: express.Response) => {
  const usecase = new FindProductUseCase(new ProductRepository())

  try {
    const { id } = req.params
    const product = await usecase.handle({ id })
    res.status(200).json(product)
  } catch (err) {
    res.status(404).send(err)
  }
})

productRouter.post('/', async (req: express.Request, res: express.Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository())

  try {
    const { type, name, price } = req.body
    const product = await usecase.handle({ type, name, price })
    res.status(200).send(product)
  } catch (err) {
    res.status(500).send(err)
  }
})

productRouter.put('/', async (req: express.Request, res: express.Response) => {
  const usecase = new UpdateProductUseCase(new ProductRepository())

  try {
    const { id, name, price } = req.body
    const product = await usecase.handle({ id, name, price })
    res.status(200).send(product)
  } catch (err) {
    res.status(500).send(err)
  }
})
