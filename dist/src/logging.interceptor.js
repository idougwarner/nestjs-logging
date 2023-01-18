"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoggingInterceptor = void 0;
var common_1 = require("@nestjs/common");
var operators_1 = require("rxjs/operators");
/**
 * Interceptor that logs input/output requests
 */
var LoggingInterceptor = /** @class */ (function () {
    function LoggingInterceptor() {
        this.ctxPrefix = LoggingInterceptor_1.name;
        this.logger = new common_1.Logger(this.ctxPrefix);
        this.userPrefix = '';
    }
    LoggingInterceptor_1 = LoggingInterceptor;
    /**
     * User prefix setter
     * ex. [MyPrefix - LoggingInterceptor - 200 - GET - /]
     */
    LoggingInterceptor.prototype.setUserPrefix = function (prefix) {
        this.userPrefix = "".concat(prefix, " - ");
    };
    /**
     * Intercept method, logs before and after the request being processed
     * @param context details about the current request
     * @param call$ implements the handle method that returns an Observable
     */
    LoggingInterceptor.prototype.intercept = function (context, call$) {
        var _this = this;
        var req = context.switchToHttp().getRequest();
        var method = req.method, url = req.url, body = req.body, headers = req.headers;
        var ctx = "".concat(this.userPrefix).concat(this.ctxPrefix, " - ").concat(method, " - ").concat(url);
        var message = "Incoming request - ".concat(method, " - ").concat(url);
        var maskedBody;
        if (url === '/auth/login') {
            if (typeof body === 'object') {
                maskedBody = Object.keys(body).reduce(function (accumulator, currentValue) {
                    var _a;
                    return (__assign(__assign({}, accumulator), (_a = {}, _a[currentValue] = currentValue !== 'password' ? body[currentValue] : '****', _a)));
                }, {});
            }
            else {
                maskedBody = '****';
            }
        }
        else {
            maskedBody = body;
        }
        this.logger.log({
            message: message,
            method: method,
            body: maskedBody,
            headers: headers
        }, ctx);
        return call$.handle().pipe((0, operators_1.tap)({
            next: function (val) {
                _this.logNext(val, context);
            },
            error: function (err) {
                _this.logError(err, context);
            }
        }));
    };
    /**
     * Logs the request response in success cases
     * @param body body returned
     * @param context details about the current request
     */
    LoggingInterceptor.prototype.logNext = function (body, context) {
        var req = context.switchToHttp().getRequest();
        var res = context.switchToHttp().getResponse();
        var method = req.method, url = req.url;
        var statusCode = res.statusCode;
        var ctx = "".concat(this.userPrefix).concat(this.ctxPrefix, " - ").concat(statusCode, " - ").concat(method, " - ").concat(url);
        var message = "Outgoing response - ".concat(statusCode, " - ").concat(method, " - ").concat(url);
        this.logger.log({
            message: message,
            body: body
        }, ctx);
    };
    /**
     * Logs the request response in success cases
     * @param error Error object
     * @param context details about the current request
     */
    LoggingInterceptor.prototype.logError = function (error, context) {
        var req = context.switchToHttp().getRequest();
        var method = req.method, url = req.url, body = req.body;
        if (error instanceof common_1.HttpException) {
            var statusCode = error.getStatus();
            var ctx = "".concat(this.userPrefix).concat(this.ctxPrefix, " - ").concat(statusCode, " - ").concat(method, " - ").concat(url);
            var message = "Outgoing response - ".concat(statusCode, " - ").concat(method, " - ").concat(url);
            if (statusCode >= common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
                this.logger.error({
                    method: method,
                    url: url,
                    body: body,
                    message: message,
                    error: error
                }, error.stack, ctx);
            }
            else {
                this.logger.warn({
                    method: method,
                    url: url,
                    error: error,
                    body: body,
                    message: message
                }, ctx);
            }
        }
        else {
            this.logger.error({
                message: "Outgoing response - ".concat(method, " - ").concat(url)
            }, error.stack, "".concat(this.userPrefix).concat(this.ctxPrefix, " - ").concat(method, " - ").concat(url));
        }
    };
    var LoggingInterceptor_1;
    LoggingInterceptor = LoggingInterceptor_1 = __decorate([
        (0, common_1.Injectable)()
    ], LoggingInterceptor);
    return LoggingInterceptor;
}());
exports.LoggingInterceptor = LoggingInterceptor;
