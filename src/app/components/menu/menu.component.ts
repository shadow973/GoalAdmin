import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    // moduleId: module.id,
    selector: 'sidebar-component',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})

export class MenuComponent{
    constructor(private router: Router) {}
}