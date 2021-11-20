
export class RepositoryError extends Error {

  constructor(
    public message: string,
    public error = 400
  ) {
    super(message)
  }
}
