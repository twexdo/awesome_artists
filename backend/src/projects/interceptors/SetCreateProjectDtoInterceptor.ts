// import {
//     CallHandler,
//     ExecutionContext,
//     Injectable,
//     NestInterceptor,
//   } from '@nestjs/common';
//   import { Observable } from 'rxjs';
  
//   @Injectable()
//   export class SetCreateProjectDtoInterceptor implements NestInterceptor {
//     intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//       const request = context.switchToHttp().getRequest();
//       request.createProjectDto = request.body; // Set `createProjectDto` on the request object
//       return next.handle();
//     }
//   }
  