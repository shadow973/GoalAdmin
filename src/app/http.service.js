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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var HTTPService = (function () {
    function HTTPService(_http) {
        this._http = _http;
    }
    HTTPService.prototype.getCurrentTime = function () {
        return this._http.get('http://date.jsontest.com');
    };
    HTTPService.prototype.postJSON = function () {
        var json = JSON.stringify({ 'var': 'test', 'var1': 1 });
        var params = 'json=' + json;
        // var headers =  new Headers();
        // headers.append('Content-type', 'application/x-www-from-urlencoded');
        return this._http.post('http://validate.jsontest.com/?' + params, { 'var': 'test', 'var1': 1 });
    };
    HTTPService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HTTPService);
    return HTTPService;
}());
exports.HTTPService = HTTPService;
//# sourceMappingURL=http.service.js.map