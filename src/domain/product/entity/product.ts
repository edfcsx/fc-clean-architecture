import ProductInterface from './product.interface'
import NotificationError from '@domain/@shared/notification/notification.error'
import Entity from '@domain/@shared/entity/entity.abstract'
import ProductValidatorFactory from '@domain/product/factory/product.validator.factory'

export default class Product extends Entity implements ProductInterface {
  private _name: string
  private _price: number

  constructor (id: string, name: string, price: number) {
    super()
    this._id = id
    this._name = name
    this._price = price

    this.validate()

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
  }

  validate () {
    ProductValidatorFactory.create().validate(this)
  }

  changeName (name: string) {
    this._name = name
    this.validate()
  }

  changePrice (price: number) {
    this._price = price
    this.validate()
  }

  get id (): string {
    return this._id
  }

  get name (): string {
    return this._name
  }

  get price (): number {
    return this._price
  }

  protected _id: string
}
