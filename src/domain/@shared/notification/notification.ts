export type NotificationErrorProps = {
  message: string
  context: string
}

export default class Notification {
  private errors: NotificationErrorProps[] = []

  public getErrors (): NotificationErrorProps[] {
    return this.errors
  }

  public addError (error: NotificationErrorProps) {
    this.errors.push(error)
  }

  public messages (context?: string): string {
    let errors: NotificationErrorProps[] = this.errors

    if (context) {
      errors = [...this.errors.filter((err) => err.context === context)]
    }

    return this.writeMessages(errors)
  }

  public hasErrors (): boolean {
    return !!this.errors.length
  }

  private writeMessages (errors: NotificationErrorProps[]): string {
    let message = ''

    for (const [index, err] of Object.entries(errors)) {
      if (index === '0') {
        message = `${err.context}: ${err.message}`
        continue
      }

      message = `${message}, ${err.context}: ${err.message}`
    }

    return message
  }
}
