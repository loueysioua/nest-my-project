import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dateIn = Date.now();
    console.log('request created at: ', dateIn.toString());
    return next.handle().pipe(
      tap(() => {
        const dateOut = Date.now();
        console.log(`request ended at: ${dateOut.toString()}`);
        console.log(`request duration: ${dateOut - dateIn} ms`);
      }),
    );
  }
}
