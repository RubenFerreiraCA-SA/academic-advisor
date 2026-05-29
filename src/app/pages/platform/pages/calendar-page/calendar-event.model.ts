export type EventType = 'deadline' | 'meeting' | 'milestone' | 'submission';
export type EventTone = 'danger' | 'warning' | 'success' | 'info';

export interface CalendarEvent {
  uid: string;
  title: string;
  type: EventType;
  date: string;
  datetime: string;
  time?: string;
  description?: string;
  relatedPaper?: string;
  relatedPaperUid?: string;
  tone: EventTone;
}
