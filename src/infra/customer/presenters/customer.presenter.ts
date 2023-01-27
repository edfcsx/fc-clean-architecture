import { toXML } from 'jstoxml'
import { OutputListCustomerDTO } from '@usecase/customer/list/list.customer.dto'

export default class CustomerPresenter {
  static toXML (data: OutputListCustomerDTO): string {
    const xmlOption = {
      header: true,
      indent: '  ',
      newline: '\n',
      allowEmpty: true
    }

    const customersCollection = data.customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city
      }
    }))

    return toXML({ customers: { customer: customersCollection } }, xmlOption)
  }
}
