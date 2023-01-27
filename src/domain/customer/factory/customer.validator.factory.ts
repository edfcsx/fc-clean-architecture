import ValidatorInterface from '@domain/@shared/validator/validator.interface'
import Customer from '@domain/customer/entity/customer'
import CustomerYupValidator from '@domain/customer/validator/validator.yup.validator'

export default class CustomerValidatorFactory {
  static create (): ValidatorInterface<Customer> {
    return new CustomerYupValidator()
  }
}
