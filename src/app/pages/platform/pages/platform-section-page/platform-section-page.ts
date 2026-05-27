import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-platform-section-page',
  imports: [],
  templateUrl: './platform-section-page.html',
  styleUrl: './platform-section-page.scss',
})
export class PlatformSectionPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly title = this.route.snapshot.data['title'] as string;
  protected readonly description = this.route.snapshot.data['description'] as string;
}
