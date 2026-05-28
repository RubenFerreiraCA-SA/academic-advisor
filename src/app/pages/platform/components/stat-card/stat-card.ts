import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface StatCardData {
  label: string;
  value: string;
  detail: string;
  icon: string;
  tone: 'total' | 'drafting' | 'review' | 'revision' | 'submitted' | 'complete';
  trendIcon?: string;
};

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'article',
    '[class]': 'stat().tone',
  },
})
export class StatCard {
  readonly stat = input.required<StatCardData>();
}
