import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { StatCard } from '../../shared-components/stat-card/stat-card';
import { CalendarEvent, EventType } from './calendar-event.model';

type TypeFilter = 'all' | EventType;

@Component({
  selector: 'app-calendar-page',
  imports: [StatCard],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPage {
  private readonly svc = inject(MockContentService);
  readonly statCards = this.svc.CalendarStatCards;
  readonly events = this.svc.CalendarEvents;

  protected readonly typeFilter = signal<TypeFilter>('all');

  protected readonly TYPE_LABELS: Record<EventType, string> = {
    deadline: 'Deadline', meeting: 'Meeting', milestone: 'Milestone', submission: 'Submission',
  };

  protected readonly filtered = computed<CalendarEvent[]>(() => {
    const t = this.typeFilter();
    return t === 'all' ? this.events : this.events.filter(e => e.type === t);
  });

  protected readonly groupedByDate = computed<{ date: string; events: CalendarEvent[] }[]>(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const e of this.filtered()) {
      const list = map.get(e.date) ?? [];
      list.push(e);
      map.set(e.date, list);
    }
    return Array.from(map.entries()).map(([date, evts]) => ({ date, events: evts }));
  });

  protected setType(t: TypeFilter): void { this.typeFilter.set(t); }
}
