import { ChangeDetectionStrategy, Component, computed, Input, input } from '@angular/core';
import { PaperData } from '../../pages/papers-page/papers-model';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.html',
  styleUrl: './info-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoCard {
  @Input() paper!: PaperData;

  protected readonly topicTags = computed(() => this.paper.topic.split(' · '));

  protected readonly progressStyle = computed(() => {
    const { value, tone } = this.paper.progress;
    const gradients: Record<string, string> = {
      blue: 'linear-gradient(90deg, #2563ff, #4d8dff)',
      green: 'linear-gradient(90deg, #16a34a, #4ade80)',
      cyan: 'linear-gradient(90deg, #0891b2, #22d3ee)',
    };
    const defaultGradient = 'linear-gradient(90deg, #5b3de8, #337dff)';
    return { width: `${value}%`, background: tone ? gradients[tone] : defaultGradient };
  });
}
