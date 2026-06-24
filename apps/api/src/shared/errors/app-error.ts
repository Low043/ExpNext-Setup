// Tipos personalizados de erros (tratados em middlewares/error-handler)
// São convertidos em mensagens de erro personalizadas para o cliente

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  public readonly errors: Record<string, string>;

  constructor(errors: Record<string, string>) {
    super(422, 'Validation failed');
    this.errors = errors;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
