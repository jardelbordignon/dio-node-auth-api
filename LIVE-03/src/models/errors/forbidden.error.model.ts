
export class ForbiddenError extends Error {

  constructor(
    public message: string,
    public error = 401
  ) {
    super(message)
  }
}
