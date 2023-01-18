"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.CatsController = void 0;
var common_1 = require("@nestjs/common");
/**
 * Controller: /cats
 */
var CatsController = /** @class */ (function () {
    function CatsController() {
    }
    /**
     * Fetching cats ok
     */
    CatsController.prototype.ok = function () {
        return 'This action returns all cats';
    };
    /**
     * Fetching bad request
     */
    CatsController.prototype.badRequest = function () {
        throw new common_1.BadRequestException();
    };
    /**
     * Fetching internalerror
     */
    CatsController.prototype.internalerror = function () {
        throw new common_1.InternalServerErrorException();
    };
    __decorate([
        (0, common_1.Get)('ok'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", String)
    ], CatsController.prototype, "ok");
    __decorate([
        (0, common_1.Get)('badrequest'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", String)
    ], CatsController.prototype, "badRequest");
    __decorate([
        (0, common_1.Get)('internalerror'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", String)
    ], CatsController.prototype, "internalerror");
    CatsController = __decorate([
        (0, common_1.Controller)('cats')
    ], CatsController);
    return CatsController;
}());
exports.CatsController = CatsController;
