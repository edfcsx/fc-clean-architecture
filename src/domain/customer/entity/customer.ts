import Address from '../value-object/address'
import CustomerInterface from './customer.interface'

export default class Customer implements CustomerInterface {
  private _id: string
  private _name: string
  private _address!: Address
  private _active: boolean = true
  private _rewardPoints: number = 0

  constructor (id: string, name: string) {
    this._id = id
    this._name = name

    this.validate()
  }

  get id (): string {
    return this._id
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
    if (this._name.length === 0) {
      throw new Error('Name is required')
    }

    if (this._id.length === 0) {
      throw new Error('Id is required')
    }
  }

  isActive (): boolean {
    return this._active
  }

  activate () {
    if (!this._address) {
      throw new Error('Address is mandatory to active a customer')
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
