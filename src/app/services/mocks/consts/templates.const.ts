import { TemplateData } from "../../../pages/platform/pages/templates-page/template.model";
import { StatCardData } from "../../../pages/platform/shared-components/stat-card/stat-card";

export const TEMPLATES_STAT_CARDS: StatCardData[] = [
  { label: 'Total Templates', value: '10', detail: 'Ready to use', icon: 'document-lines', tone: 'total' },
  { label: 'Used This Month', value: '6', detail: 'Since May 1', icon: 'document-pencil', tone: 'drafting' },
  { label: 'Personal', value: '6', detail: 'Created by you', icon: 'document-simple', tone: 'revision' },
  { label: 'Shared', value: '4', detail: 'Workspace templates', icon: 'collaborators', tone: 'submitted' },
  { label: 'Manuscripts', value: '4', detail: 'Paper templates', icon: 'document-text', tone: 'complete' },
  { label: 'Submissions', value: '3', label2: 'Cover Letters', detail: 'Submission packs', icon: 'submissions', tone: 'review' } as any,
];

export const TEMPLATES_DATA: TemplateData[] = [
  {
    uid: 'tpl-01', title: 'IEEE Conference Paper', description: 'Standard IEEE two-column format for conference submissions. Includes abstract, introduction, methodology, results, and references sections.',
    category: 'manuscript', visibility: 'shared',
    usageCount: 18, lastUsed: 'May 27, 2026', lastUsedDatetime: '2026-05-27',
    createdBy: 'Workspace', tags: ['IEEE', 'conference', 'two-column'],
  },
  {
    uid: 'tpl-02', title: 'NeurIPS Paper Format', description: 'NeurIPS-compliant template with correct margins, font sizes, and section headings. Includes ethics statement and broader impact sections.',
    category: 'manuscript', visibility: 'personal',
    usageCount: 4, lastUsed: 'May 22, 2026', lastUsedDatetime: '2026-05-22',
    createdBy: 'Ruben F.', tags: ['NeurIPS', 'ML', 'conference'],
  },
  {
    uid: 'tpl-03', title: 'Journal Article — Nature Style', description: 'Nature family journal template. Concise abstract, results-first structure, detailed methods section, and extended data figures.',
    category: 'manuscript', visibility: 'personal',
    usageCount: 2, lastUsed: 'May 15, 2026', lastUsedDatetime: '2026-05-15',
    createdBy: 'Ruben F.', tags: ['Nature', 'journal', 'high-impact'],
  },
  {
    uid: 'tpl-04', title: 'ACM Paper Format', description: 'ACM SIG proceedings template. Single and double column variants included with ACM CCS concepts and keywords.',
    category: 'manuscript', visibility: 'shared',
    usageCount: 9, lastUsed: 'May 10, 2026', lastUsedDatetime: '2026-05-10',
    createdBy: 'Workspace', tags: ['ACM', 'conference', 'proceedings'],
  },
  {
    uid: 'tpl-05', title: 'Research Outline', description: 'Structured paper outline with placeholder sections: motivation, related work, methodology, experiments, and conclusion. Includes guiding questions per section.',
    category: 'outline', visibility: 'personal',
    usageCount: 12, lastUsed: 'May 28, 2026', lastUsedDatetime: '2026-05-28',
    createdBy: 'Ruben F.', tags: ['outline', 'planning', 'structure'],
  },
  {
    uid: 'tpl-06', title: 'Peer Review Response', description: 'Professional reviewer response letter template. Structured point-by-point reply format with summary of changes and color-coded manuscript diff notation.',
    category: 'review', visibility: 'personal',
    usageCount: 5, lastUsed: 'May 29, 2026', lastUsedDatetime: '2026-05-29',
    createdBy: 'Ruben F.', tags: ['revision', 'response', 'review'],
  },
  {
    uid: 'tpl-07', title: 'Reviewer Checklist', description: 'Structured evaluation checklist for peer review tasks. Covers technical correctness, novelty, clarity, reproducibility, and ethical considerations.',
    category: 'review', visibility: 'shared',
    usageCount: 7, lastUsed: 'May 18, 2026', lastUsedDatetime: '2026-05-18',
    createdBy: 'Workspace', tags: ['checklist', 'peer-review', 'evaluation'],
  },
  {
    uid: 'tpl-08', title: 'IEEE Cover Letter', description: 'Professional cover letter for IEEE journal submissions. Includes novelty statement, significance claim, and suggested reviewers section.',
    category: 'cover-letter', visibility: 'personal',
    usageCount: 3, lastUsed: 'Apr 28, 2026', lastUsedDatetime: '2026-04-28',
    createdBy: 'Ruben F.', tags: ['IEEE', 'cover-letter', 'submission'],
  },
  {
    uid: 'tpl-09', title: 'Submission Checklist', description: 'End-to-end submission checklist covering formatting, author list, ethics declaration, supplementary materials, and final proofread items.',
    category: 'submission', visibility: 'shared',
    usageCount: 14, lastUsed: 'May 15, 2026', lastUsedDatetime: '2026-05-15',
    createdBy: 'Workspace', tags: ['checklist', 'submission', 'quality'],
  },
  {
    uid: 'tpl-10', title: 'Research Proposal', description: 'Grant and project proposal template. Includes executive summary, objectives, methodology, timeline, budget overview, and expected impact sections.',
    category: 'outline', visibility: 'personal',
    usageCount: 1, lastUsed: 'Mar 5, 2026', lastUsedDatetime: '2026-03-05',
    createdBy: 'Ruben F.', tags: ['proposal', 'grant', 'planning'],
  },
];
