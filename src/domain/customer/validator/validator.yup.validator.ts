import * as yup from 'yup'
import ValidatorInterface from '@domain/@shared/validator/validator.interface'
import Customer from '@domain/customer/entity/customer'

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
  validate (entity: Customer): void {
    try {
      yup.object().shape({
        id: yup.string().required('id is required'),
        name: yup.string().required('name is required')
      }).validateSync({
        id: entity.id,
        name: entity.name
      }, { abortEarly: false })
    } catch (err) {
      const e = err as yup.ValidationError
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: 'Customer',
          message: error
        })
      })
    }
  }
}
