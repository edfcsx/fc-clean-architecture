import ValidatorInterface from '@domain/@shared/validator/validator.interface'
import ProductInterface from '@domain/product/entity/product.interface'
import ProductYupValidator from '@domain/product/validator/validator.yup.validator'

export default class ProductValidatorFactory {
  static create (): ValidatorInterface<ProductInterface> {
    return new ProductYupValidator()
  }
}
