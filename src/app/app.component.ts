import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import cytoscape from 'cytoscape';
import { LoginComponent } from '../components/login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  cy: any; // Cytoscape instance
  constructor() {}

  title = 'my-angular-app';

  ngOnInit(): void {}
}
