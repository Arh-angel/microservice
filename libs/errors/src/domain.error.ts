import { ValidationError } from '@nestjs/common';

export class DomainError extends Error {
  constructor(error: ValidationError[], message?: string) {
    const _error: string[] = [];

    error.length &&
      error.forEach((err) => {
        err?.constraints &&
          Object.entries(err.constraints).forEach((element) => {
            _error.push(element[1]);
          });
      });

    super(
      `Errors: ${_error.join('; ')}${message ? `. Message: ${message}` : ''}`,
    );
    this.name = DomainError.name;
  }
}
