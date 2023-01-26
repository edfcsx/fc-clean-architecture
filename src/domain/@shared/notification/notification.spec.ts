import Notification, { NotificationErrorProps } from './notification'

describe('Unit tests for notifications', () => {
  it('should create errors', () => {
    const notification = new Notification()

    const error: NotificationErrorProps = {
      message: 'error message',
      context: 'customer'
    }

    notification.addError(error)
    expect(notification.messages('customer')).toBe('customer: error message')

    notification.addError({
      message: 'error message 2',
      context: 'customer'
    })

    expect(notification.messages('customer'))
      .toBe('customer: error message, customer: error message 2')

    notification.addError({
      message: 'order error message',
      context: 'order'
    })

    expect(notification.messages('customer'))
      .toBe('customer: error message, customer: error message 2')

    expect(notification.messages())
      .toBe('customer: error message, customer: error message 2, order: order error message')
  })

  it('should check if notification has at least one error', () => {
    const notification = new Notification()

    const error: NotificationErrorProps = {
      message: 'error message',
      context: 'customer'
    }

    notification.addError(error)
    expect(notification.hasErrors()).toBe(true)
  })

  it('should check if notification no contain errors', () => {
    const notification = new Notification()
    expect(notification.hasErrors()).toBe(false)
  })

  it('should get all errors props', () => {
    const notification = new Notification()
    const error: NotificationErrorProps = {
      message: 'error message',
      context: 'customer'
    }

    notification.addError(error)
    expect(notification.getErrors()).toStrictEqual([error])
  })
})
