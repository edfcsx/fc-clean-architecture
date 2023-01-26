import { NotificationErrorProps } from '@domain/@shared/notification/notification'

export default class NotificationError extends Error {
  constructor (public errors: NotificationErrorProps[]) {
    super(errors.map((err) => `${err.context}: ${err.message}`).join(','))
  }
}
