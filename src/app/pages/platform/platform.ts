import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNav } from './sections/side-nav/side-nav';

@Component({
  selector: 'app-platform',
  imports: [RouterOutlet, SideNav],
  templateUrl: './platform.html',
  styleUrl: './platform.scss',
})
export class Platform {}
