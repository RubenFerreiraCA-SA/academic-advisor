import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { PaperData, PaperStage } from '../papers-page/papers-model';
import { PaperContent } from './paper-detail.model';

interface WorkflowStageInfo {
  id: PaperStage;
  step: number;
  label: string;
  shortLabel: string;
  description: string;
  nextSteps: string[];
  isAiStage?: boolean;
}

interface ReadinessItem { label: string; pass: boolean; }
interface ReadinessCheck { items: ReadinessItem[]; passCount: number; tone: 'green' | 'amber' | 'red'; label: string; }

const WORKFLOW_STAGES: WorkflowStageInfo[] = [
  {
    id: 'concept', step: 1, label: 'Concept', shortLabel: 'Concept',
    description: 'Research idea, topic, and core question.',
    nextSteps: [
      'Define your research question clearly',
      'Identify the core problem you are solving',
      'Do a preliminary literature search',
    ],
  },
  {
    id: 'positioning', step: 2, label: 'Positioning', shortLabel: 'Position',
    description: 'Literature gap, contribution, framing.',
    nextSteps: [
      'Map the gap in existing literature',
      'Articulate your unique contribution',
      'Choose target venue and audience',
    ],
  },
  {
    id: 'blueprint', step: 3, label: 'Paper Blueprint', shortLabel: 'Blueprint',
    description: 'Outline, argument, abstract, structure.',
    nextSteps: [
      'Draft section headings and paper structure',
      'Write a preliminary abstract',
      'Plan your argument flow end-to-end',
    ],
  },
  {
    id: 'drafting', step: 4, label: 'Drafting', shortLabel: 'Drafting',
    description: 'Write sections, gather evidence, refine argument.',
    nextSteps: [
      'Write methodology and results sections first',
      'Gather and cite supporting evidence',
      'Refine your argument as you write',
    ],
  },
  {
    id: 'peer-review', step: 5, label: 'Simulated Peer Review', shortLabel: 'Peer Rev.',
    description: 'AI reviewer reports from multiple perspectives.',
    nextSteps: [
      'Run the Simulated Peer Review Engine',
      'Review feedback from all AI reviewer personas',
      'Identify the highest-priority issues raised',
    ],
    isAiStage: true,
  },
  {
    id: 'game-plan', step: 6, label: 'Game Plan Document', shortLabel: 'Game Plan',
    description: 'Consolidated action plan, issue tracking, revision priorities.',
    nextSteps: [
      'Generate your Game Plan Document',
      'Prioritise revision tasks by impact',
      'Assign action items to collaborators',
    ],
    isAiStage: true,
  },
  {
    id: 'revision', step: 7, label: 'Revision Cycle', shortLabel: 'Revision',
    description: 'Address comments, strengthen paper, produce new version.',
    nextSteps: [
      'Work through each Game Plan action item',
      'Track every change against reviewer comments',
      'Re-run Peer Review to verify improvements',
    ],
  },
  {
    id: 'submission-ready', step: 8, label: 'Submission Ready', shortLabel: 'Sub. Ready',
    description: 'Formatting, journal fit, cover letter, final checks.',
    nextSteps: [
      'Format manuscript per journal guidelines',
      'Write and finalise your cover letter',
      'Run the Publication Readiness checklist',
    ],
  },
  {
    id: 'submitted', step: 9, label: 'Journal Submission', shortLabel: 'Submitted',
    description: 'Submitted to target journal, awaiting editor assignment.',
    nextSteps: [
      'Monitor for desk rejection (1–2 weeks)',
      'Continue refining related work in parallel',
      'Prepare a response plan for likely reviews',
    ],
  },
  {
    id: 'external-review', step: 10, label: 'External Peer Review', shortLabel: 'Ext. Rev.',
    description: 'Real editor and reviewer feedback received.',
    nextSteps: [
      'Read all reviewer comments carefully',
      'Map each comment to a revision action',
      'Use Game Plan to track your response strategy',
    ],
  },
  {
    id: 'revise-resubmit', step: 11, label: 'Revise & Resubmit', shortLabel: 'Revise',
    description: 'Respond to reviewers, resubmit, or reach acceptance.',
    nextSteps: [
      'Address every reviewer comment systematically',
      'Write a detailed author response letter',
      'Update your Game Plan as changes are made',
    ],
  },
  {
    id: 'published', step: 12, label: 'Published', shortLabel: 'Published',
    description: 'Final publication and post-publication tracking.',
    nextSteps: [
      'Archive the final published version',
      'Update your CV and publication list',
      'Share on academic networks and track citations',
    ],
  },
];

const READINESS_STAGES = new Set<PaperStage>(['revision', 'submission-ready', 'submitted', 'external-review', 'revise-resubmit']);

@Component({
  selector: 'app-paper-detail-page',
  imports: [RouterLink],
  templateUrl: './paper-detail-page.html',
  styleUrl: './paper-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaperDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly mockContentService = inject(MockContentService);
  private readonly document = inject(DOCUMENT);

  protected readonly paperData = signal<PaperData | null>(null);
  protected readonly paperContent = signal<PaperContent | null>(null);
  protected readonly tocOpen = signal(true);
  private readonly collapsed = signal(new Set<string>());
  private readonly parentOf = new Map<string, string>();

  protected readonly WORKFLOW_STAGES = WORKFLOW_STAGES;

  protected readonly currentStageInfo = computed<WorkflowStageInfo>(() => {
    const stage = this.paperData()?.stage.tone ?? 'concept';
    return WORKFLOW_STAGES.find(s => s.id === stage) ?? WORKFLOW_STAGES[0];
  });

  protected readonly workflowStep = computed(() => this.currentStageInfo().step);

  protected readonly showReadiness = computed(() => {
    const stage = this.paperData()?.stage.tone;
    return stage ? READINESS_STAGES.has(stage) : false;
  });

  protected readonly readiness = computed<ReadinessCheck>(() => {
    const paper = this.paperData();
    if (!paper) return { items: [], passCount: 0, tone: 'red', label: 'Not yet ready' };

    const items: ReadinessItem[] = [
      { label: 'Progress is at least 80%', pass: paper.progress.value >= 80 },
      { label: 'Deadline is set', pass: !!paper.deadline.datetime },
      { label: 'Deadline has not passed', pass: paper.deadline.tone !== 'danger' || paper.progress.value === 100 },
      { label: 'Collaborators are assigned', pass: paper.collaborators.initials.length > 0 || paper.collaborators.extra !== '' },
    ];

    const passCount = items.filter(i => i.pass).length;
    const tone: 'green' | 'amber' | 'red' = passCount === 4 ? 'green' : passCount >= 2 ? 'amber' : 'red';
    const label = passCount === 4 ? 'Ready to submit' : passCount >= 2 ? 'Almost ready' : 'Not yet ready';
    return { items, passCount, tone, label };
  });

  ngOnInit(): void {
    const uid = this.route.snapshot.paramMap.get('id') ?? '';
    const paper = this.mockContentService.papers().find((p: { uid: string }) => p.uid === uid) ?? null;
    this.paperData.set(paper);

    this.mockContentService.getPaperContentById(uid).then(content => {
      this.paperContent.set(content);

      const ids = new Set<string>(['references']);
      for (const chapter of content.chapters) {
        ids.add(chapter.id);
        for (const section of chapter.sections) {
          ids.add(section.id);
          this.parentOf.set(section.id, chapter.id);
        }
      }
      this.collapsed.set(ids);
    });
  }

  protected isStepDone(step: number): boolean { return step < this.workflowStep(); }
  protected isStepCurrent(step: number): boolean { return step === this.workflowStep(); }
  protected isStepFuture(step: number): boolean { return step > this.workflowStep(); }

  protected toggleToc(): void { this.tocOpen.update(v => !v); }

  protected navigateTo(id: string): void {
    this.collapsed.update(set => {
      const next = new Set(set);
      next.delete(id);
      const parent = this.parentOf.get(id);
      if (parent) next.delete(parent);
      return next;
    });
    setTimeout(() => {
      this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

  protected isOpen(id: string): boolean { return !this.collapsed().has(id); }

  protected toggleSection(id: string): void {
    this.collapsed.update(set => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
}
