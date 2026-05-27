import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-platform',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './platform.html',
  styleUrl: './platform.scss',
})
export class Platform {}
