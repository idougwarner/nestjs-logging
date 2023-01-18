"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var testing_1 = require("@nestjs/testing");
var request = require("supertest");
var auth_module_1 = require("./test-app/auth/auth.module");
var cats_module_1 = require("./test-app/cats/cats.module");
var core_module_1 = require("./test-app/core/core.module");
describe('Logging interceptor', function () {
    var app;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var moduleRef;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        imports: [core_module_1.CoreModule, cats_module_1.CatsModule, auth_module_1.AuthModule]
                    }).compile()];
                case 1:
                    moduleRef = _a.sent();
                    app = moduleRef.createNestApplication();
                    app.useLogger(common_1.Logger);
                    return [4 /*yield*/, app.init()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app.close()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () {
        jest.clearAllMocks();
    });
    it('logs the input and output request details - OK status code', function () { return __awaiter(void 0, void 0, void 0, function () {
        var logSpy, url, ctx, resCtx, incomingMsg, outgoingMsg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logSpy = jest.spyOn(common_1.Logger.prototype, 'log');
                    url = "/cats/ok";
                    return [4 /*yield*/, request(app.getHttpServer()).get(url).expect(common_1.HttpStatus.OK)];
                case 1:
                    _a.sent();
                    ctx = "LoggingInterceptor - GET - ".concat(url);
                    resCtx = "LoggingInterceptor - 200 - GET - ".concat(url);
                    incomingMsg = "Incoming request - GET - ".concat(url);
                    outgoingMsg = "Outgoing response - 200 - GET - ".concat(url);
                    /**
                     * Info level
                     */
                    expect(logSpy).toBeCalledTimes(2);
                    expect(logSpy.mock.calls[0]).toEqual([
                        {
                            body: {},
                            headers: expect.any(Object),
                            message: incomingMsg,
                            method: "GET"
                        },
                        ctx,
                    ]);
                    expect(logSpy.mock.calls[1]).toEqual([
                        {
                            message: outgoingMsg,
                            body: "This action returns all cats"
                        },
                        resCtx,
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('logs the input and output auth/login(body: object) details - OK status code', function () { return __awaiter(void 0, void 0, void 0, function () {
        var logSpy, url, ctx, resCtx, incomingMsg, outgoingMsg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logSpy = jest.spyOn(common_1.Logger.prototype, 'log');
                    url = "/auth/login";
                    return [4 /*yield*/, request(app.getHttpServer()).post(url).send({
                            email: 'test@test.com',
                            password: 'test-password'
                        }).expect(common_1.HttpStatus.CREATED)];
                case 1:
                    _a.sent();
                    ctx = "LoggingInterceptor - POST - ".concat(url);
                    resCtx = "LoggingInterceptor - 201 - POST - ".concat(url);
                    incomingMsg = "Incoming request - POST - ".concat(url);
                    outgoingMsg = "Outgoing response - 201 - POST - ".concat(url);
                    /**
                     * Info level
                     */
                    expect(logSpy).toBeCalledTimes(2);
                    expect(logSpy.mock.calls[0]).toEqual([
                        {
                            body: {
                                email: 'test@test.com',
                                password: '****'
                            },
                            headers: expect.any(Object),
                            message: incomingMsg,
                            method: "POST"
                        },
                        ctx,
                    ]);
                    expect(logSpy.mock.calls[1]).toEqual([
                        {
                            message: outgoingMsg,
                            body: "This action returns auth object"
                        },
                        resCtx,
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('logs the input and output request details - BAD_REQUEST status code', function () { return __awaiter(void 0, void 0, void 0, function () {
        var logSpy, warnSpy, errorSpy, url, ctx, resCtx, incomingMsg, outgoingMsg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logSpy = jest.spyOn(common_1.Logger.prototype, 'log');
                    warnSpy = jest.spyOn(common_1.Logger.prototype, 'warn');
                    errorSpy = jest.spyOn(common_1.Logger.prototype, 'error');
                    url = "/cats/badrequest";
                    return [4 /*yield*/, request(app.getHttpServer()).get(url).expect(common_1.HttpStatus.BAD_REQUEST)];
                case 1:
                    _a.sent();
                    ctx = "LoggingInterceptor - GET - ".concat(url);
                    resCtx = "LoggingInterceptor - 400 - GET - ".concat(url);
                    incomingMsg = "Incoming request - GET - ".concat(url);
                    outgoingMsg = "Outgoing response - 400 - GET - ".concat(url);
                    /**
                     * Info level
                     */
                    expect(logSpy).toBeCalledTimes(1);
                    expect(logSpy.mock.calls[0]).toEqual([
                        {
                            body: {},
                            headers: expect.any(Object),
                            message: incomingMsg,
                            method: "GET"
                        },
                        ctx,
                    ]);
                    expect(warnSpy).toBeCalledTimes(1);
                    expect(warnSpy.mock.calls[0]).toEqual([
                        {
                            message: outgoingMsg,
                            method: 'GET',
                            url: '/cats/badrequest',
                            body: {},
                            error: expect.any(common_1.BadRequestException)
                        },
                        resCtx,
                    ]);
                    expect(errorSpy).not.toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it('logs the input and output request details - INTERNAL_SERVER_ERROR status code', function () { return __awaiter(void 0, void 0, void 0, function () {
        var logSpy, warnSpy, errorSpy, url, ctx, resCtx, incomingMsg, outgoingMsg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logSpy = jest.spyOn(common_1.Logger.prototype, 'log');
                    warnSpy = jest.spyOn(common_1.Logger.prototype, 'warn');
                    errorSpy = jest.spyOn(common_1.Logger.prototype, 'error');
                    url = '/cats/internalerror';
                    return [4 /*yield*/, request(app.getHttpServer()).get(url).expect(common_1.HttpStatus.INTERNAL_SERVER_ERROR)];
                case 1:
                    _a.sent();
                    ctx = "LoggingInterceptor - GET - ".concat(url);
                    resCtx = "LoggingInterceptor - 500 - GET - ".concat(url);
                    incomingMsg = "Incoming request - GET - ".concat(url);
                    outgoingMsg = "Outgoing response - 500 - GET - ".concat(url);
                    /**
                     * Info level
                     */
                    expect(logSpy).toBeCalledTimes(1);
                    expect(logSpy.mock.calls[0]).toEqual([
                        {
                            body: {},
                            headers: expect.any(Object),
                            message: incomingMsg,
                            method: "GET"
                        },
                        ctx,
                    ]);
                    expect(errorSpy).toBeCalledTimes(1);
                    expect(errorSpy.mock.calls[0]).toEqual([
                        {
                            message: outgoingMsg,
                            method: 'GET',
                            url: '/cats/internalerror',
                            body: {},
                            error: expect.any(common_1.InternalServerErrorException)
                        },
                        expect.any(String),
                        resCtx,
                    ]);
                    expect(warnSpy).not.toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
});
