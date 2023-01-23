export default interface UseCaseInterface<Input, Output> {
  handle (input: Input): Output
}
