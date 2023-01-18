import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
/**
 * Interceptor that logs input/output requests
 */
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly ctxPrefix;
    private readonly logger;
    private userPrefix;
    /**
     * User prefix setter
     * ex. [MyPrefix - LoggingInterceptor - 200 - GET - /]
     */
    setUserPrefix(prefix: string): void;
    /**
     * Intercept method, logs before and after the request being processed
     * @param context details about the current request
     * @param call$ implements the handle method that returns an Observable
     */
    intercept(context: ExecutionContext, call$: CallHandler): Observable<unknown>;
    /**
     * Logs the request response in success cases
     * @param body body returned
     * @param context details about the current request
     */
    private logNext;
    /**
     * Logs the request response in success cases
     * @param error Error object
     * @param context details about the current request
     */
    private logError;
}
