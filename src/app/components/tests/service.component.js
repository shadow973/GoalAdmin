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
var http_service_1 = require('../../http.service');
// import 'rx'
var TestServiceComponent = (function () {
    function TestServiceComponent(_httpService) {
        this._httpService = _httpService;
    }
    TestServiceComponent.prototype.onTestGet = function () {
        var _this = this;
        this._httpService.getCurrentTime().subscribe(function (data) { return _this.getData = JSON.stringify(data); }, function (error) { return alert(error); }, function () { return console.log('done'); });
    };
    TestServiceComponent.prototype.onTestPost = function () {
        var _this = this;
        this._httpService.postJSON().subscribe(function (data) { return _this.postData = JSON.stringify(data); }, function (error) { return alert(error); }, function () { return console.log('done'); });
    };
    TestServiceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-content',
            template: "\n        <button (click)=\"onTestGet()\">Test GET Request</button>\n        <p>Output: {{ getData }}</p>\n        <button (click)=\"onTestPost()\">Test Post Request</button>\n        <p>Output: {{ postData }}</p>\n    ",
            providers: [http_service_1.HTTPService]
        }), 
        __metadata('design:paramtypes', [http_service_1.HTTPService])
    ], TestServiceComponent);
    return TestServiceComponent;
}());
exports.TestServiceComponent = TestServiceComponent;
//# sourceMappingURL=service.component.js.map