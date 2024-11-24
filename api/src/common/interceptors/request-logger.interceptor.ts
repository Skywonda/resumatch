// src/common/interceptors/request-logger.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const userAgent = request.get('user-agent') || 'unknown';

    const startTime = Date.now();
    const { method, originalUrl, ip } = request;

    this.logger.log(
      `${method} ${originalUrl} - Started - IP: ${ip} - UA: ${userAgent}`,
    );

    // Only log request body for non-GET methods and exclude sensitive paths
    const shouldLogBody =
      method !== 'GET' &&
      !originalUrl.includes('/auth') &&
      !originalUrl.includes('/password');

    if (shouldLogBody && request.body) {
      const sanitizedBody = this.sanitizeBody(request.body);
      this.logger.debug(`Request Body: ${JSON.stringify(sanitizedBody)}`);
    }

    return next.handle().pipe(
      tap((data) => {
        const processingTime = Date.now() - startTime;
        const statusCode = response.statusCode;

        // Log successful response
        this.logger.log(
          `${method} ${originalUrl} - ${statusCode} - ${processingTime}ms`,
        );

        // Log response data in debug mode if needed
        if (process.env.NODE_ENV === 'development' && data) {
          const sanitizedResponse = this.sanitizeBody(data);
          this.logger.debug(
            ` Response Body: ${JSON.stringify(sanitizedResponse)}`,
          );
        }
      }),
      catchError((error) => {
        const processingTime = Date.now() - startTime;
        const statusCode = error.status || 500;

        this.logger.error(
          `${method} ${originalUrl} - ${statusCode} - ${processingTime}ms - ${error.message}`,
          error.stack,
        );

        throw error;
      }),
    );
  }

  private sanitizeBody(data: any): any {
    if (!data) return data;

    const sensitiveFields = [
      'password',
      'token',
      'authorization',
      'secret',
      'key',
    ];

    const sanitized = { ...data };

    for (const field of sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = '[REDACTED]';
      }
    }

    return sanitized;
  }
}
