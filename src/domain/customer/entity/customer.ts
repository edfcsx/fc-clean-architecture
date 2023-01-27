import Address from '../value-object/address'
import Entity from '@domain/@shared/entity/entity.abstract'
import NotificationError from '@domain/@shared/notification/notification.error'
import CustomerValidatorFactory from '@domain/customer/factory/customer.validator.factory'

export default class Customer extends Entity {
  private _name: string
  private _address!: Address
  private _active: boolean = true
  private _rewardPoints: number = 0

  constructor (id: string, name: string) {
    super()

    this._id = id
    this._name = name

    this.validate()

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
  }

  get name (): string {
    return this._name
  }

  get rewardPoints (): number {
    return this._rewardPoints
  }

  get Address (): Address {
    return this._address
  }

  changeName (name: string) {
    this._name = name
    this.validate()
  }

  changeAddress (address: Address) {
    this._address = address
  }

  validate () {
    CustomerValidatorFactory.create().validate(this)
  }

  isActive (): boolean {
    return this._active
  }

  activate () {
    if (!this._address) {
      this.notification.addError({ context: 'Customer', message: 'Address is mandatory to active a customer' })
      throw new NotificationError(this.notification.getErrors())
    }

    this._active = true
  }

  deactive () {
    this._active = false
  }

  addRewardPoints (points: number): void {
    this._rewardPoints += points
  }
}
