import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNav } from './sections/side-nav/side-nav';
import { TopNav } from './sections/top-nav/top-nav';

@Component({
  selector: 'app-platform',
  imports: [RouterOutlet, SideNav, TopNav],
  templateUrl: './platform.html',
  styleUrl: './platform.scss',
})
export class Platform {}
