import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { log } from 'console';
import { Observable, tap } from 'rxjs';

export class LoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('interceptando ');
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    console.log(`requeste  ${method} ${url} - inicio da req`);

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`requeste  ${method} ${url} - ${Date.now() - now}`),
        ),
      );
  }
}
