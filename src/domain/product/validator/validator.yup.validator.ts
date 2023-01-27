import * as yup from 'yup'
import ValidatorInterface from '@domain/@shared/validator/validator.interface'
import ProductInterface from '@domain/product/entity/product.interface'

export default class ProductYupValidator implements ValidatorInterface<ProductInterface> {
  validate (entity: ProductInterface): void {
    try {
      yup.object().shape({
        id: yup.string().required('id is required'),
        name: yup.string().required('name is required'),
        price: yup.number().moreThan(0, 'price must be great than zero')
      }).validateSync({
        id: entity.id,
        name: entity.name,
        price: entity.price
      }, { abortEarly: false })
    } catch (err) {
      const e = err as yup.ValidationError
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: 'Product',
          message: error
        })
      })
    }
  }
}
