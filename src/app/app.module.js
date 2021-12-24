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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var app_component_1 = require('./app.component');
var dashboard_component_1 = require('./components/dashboard/dashboard.component');
var login_component_1 = require('./components/login/login.component');
var menu_component_1 = require('./components/menu/menu.component');
var header_component_1 = require('./components/header/header.component');
var notfound_component_1 = require('./components/notfound/notfound.component');
var service_component_1 = require('./components/tests/service.component');
var appRoutes = [
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'test-service', component: service_component_1.TestServiceComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', component: notfound_component_1.NotfoundComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, router_1.RouterModule.forRoot(appRoutes, { enableTracing: true })],
            declarations: [app_component_1.AppComponent, dashboard_component_1.DashboardComponent,
                login_component_1.LoginComponent, notfound_component_1.NotfoundComponent, service_component_1.TestServiceComponent,
                menu_component_1.MenuComponent, header_component_1.HeaderComponent],
            bootstrap: [app_component_1.AppComponent, menu_component_1.MenuComponent, header_component_1.HeaderComponent],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map