import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

type SettingsSection = 'profile' | 'notifications' | 'integrations' | 'appearance';

@Component({
  selector: 'app-settings-page',
  imports: [],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage {
  protected readonly activeSection = signal<SettingsSection>('profile');

  protected readonly notifications = signal({
    taskDeadlines: true,
    reviewRequests: true,
    collaboratorInvites: true,
    submissionUpdates: true,
    weeklyDigest: false,
    mentionAlerts: true,
  });

  protected readonly integrations = [
    { id: 'overleaf', name: 'Overleaf', desc: 'Sync manuscripts and collaborate in LaTeX', icon: 'document-text', connected: true },
    { id: 'zotero', name: 'Zotero', desc: 'Import references and manage citations', icon: 'document-lines', connected: true },
    { id: 'github', name: 'GitHub', desc: 'Link code repositories to papers', icon: 'workspace', connected: false },
    { id: 'slack', name: 'Slack', desc: 'Get notifications in your workspace', icon: 'bell', connected: false },
    { id: 'google-scholar', name: 'Google Scholar', desc: 'Sync publication data and citations', icon: 'review-search', connected: true },
  ];

  protected setSection(s: SettingsSection): void { this.activeSection.set(s); }

  protected toggleNotification(key: keyof ReturnType<typeof this.notifications>): void {
    this.notifications.update(n => ({ ...n, [key]: !n[key] }));
  }
}
