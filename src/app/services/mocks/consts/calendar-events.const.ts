import { CalendarEvent } from "../../../pages/platform/pages/calendar-page/calendar-event.model";
import { StatCardData } from "../../../pages/platform/shared-components/stat-card/stat-card";

export const CALENDAR_STAT_CARDS: StatCardData[] = [
  { label: 'Due This Week', value: '4', detail: 'May 29 – Jun 4', icon: 'calendar', tone: 'review', trendIcon: '!' },
  { label: 'Upcoming Deadlines', value: '7', detail: 'Next 30 days', icon: 'document-simple', tone: 'total' },
  { label: 'Meetings', value: '3', detail: 'Scheduled', icon: 'collaborators', tone: 'drafting' },
  { label: 'Milestones', value: '5', detail: 'This quarter', icon: 'check-circle', tone: 'complete' },
  { label: 'Submissions Due', value: '2', detail: 'Next 14 days', icon: 'submissions', tone: 'revision' },
  { label: 'Review Windows', value: '3', detail: 'Open for review', icon: 'review-search', tone: 'submitted' },
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    uid: 'evt-01', title: 'Task deadline: Write introduction section',
    type: 'deadline', date: 'May 29, 2026', datetime: '2026-05-29', time: 'End of day',
    relatedPaper: 'Synthetic Intelligence and Origination', relatedPaperUid: 'HJlk39na9e',
    tone: 'danger',
  },
  {
    uid: 'evt-02', title: 'Task deadline: Incorporate reviewer feedback',
    type: 'deadline', date: 'May 29, 2026', datetime: '2026-05-29', time: 'End of day',
    relatedPaper: 'Deep Learning for Medical Imaging', relatedPaperUid: '9sdf8s7df',
    tone: 'danger',
  },
  {
    uid: 'evt-03', title: 'Review deadline: Synthetic Intelligence',
    type: 'deadline', date: 'May 30, 2026', datetime: '2026-05-30', time: '11:59 PM',
    relatedPaper: 'Synthetic Intelligence and Origination', relatedPaperUid: 'HJlk39na9e',
    tone: 'danger',
  },
  {
    uid: 'evt-04', title: 'Advisor meeting: Prof. Kowalski',
    type: 'meeting', date: 'May 30, 2026', datetime: '2026-05-30', time: '10:00 AM',
    description: 'Progress review — AI origination paper and upcoming NeurIPS submission',
    tone: 'info',
  },
  {
    uid: 'evt-05', title: 'Task deadline: Format bibliography',
    type: 'deadline', date: 'May 30, 2026', datetime: '2026-05-30',
    relatedPaper: 'Ethical Implications of LLMs in Education', relatedPaperUid: '2sdf8sdf2',
    tone: 'warning',
  },
  {
    uid: 'evt-06', title: 'Deep Learning for Medical Imaging — revision due',
    type: 'submission', date: 'Jun 1, 2026', datetime: '2026-06-01',
    description: 'Revision response due to IEEE TMI editors',
    relatedPaper: 'Deep Learning for Medical Imaging', relatedPaperUid: '9sdf8s7df',
    tone: 'warning',
  },
  {
    uid: 'evt-07', title: 'Task deadline: Proofread methodology section',
    type: 'deadline', date: 'Jun 1, 2026', datetime: '2026-06-01',
    relatedPaper: 'Climate Change Policy Review', relatedPaperUid: '8sdf7sdf8',
    tone: 'warning',
  },
  {
    uid: 'evt-08', title: 'Review deadline: Deep Learning for Medical Imaging',
    type: 'deadline', date: 'Jun 2, 2026', datetime: '2026-06-02',
    relatedPaper: 'Deep Learning for Medical Imaging', relatedPaperUid: '9sdf8s7df',
    tone: 'warning',
  },
  {
    uid: 'evt-09', title: 'Task deadline: Run ablation study',
    type: 'deadline', date: 'Jun 3, 2026', datetime: '2026-06-03',
    relatedPaper: 'Deep Learning for Medical Imaging', relatedPaperUid: '9sdf8s7df',
    tone: 'info',
  },
  {
    uid: 'evt-10', title: 'Co-author sync: Ruben & Jamie',
    type: 'meeting', date: 'Jun 3, 2026', datetime: '2026-06-03', time: '2:00 PM',
    description: 'Ablation experiments review and draft alignment for ICML',
    tone: 'info',
  },
  {
    uid: 'evt-11', title: 'Graph Neural Networks — review window closes',
    type: 'deadline', date: 'Jun 5, 2026', datetime: '2026-06-05',
    relatedPaper: 'Graph Neural Networks for Drug Discovery', relatedPaperUid: '3sdf8sdf3',
    tone: 'info',
  },
  {
    uid: 'evt-12', title: 'Task deadline: Write conclusions',
    type: 'deadline', date: 'Jun 5, 2026', datetime: '2026-06-05',
    relatedPaper: 'Reinforcement Learning for Robotics', relatedPaperUid: '0sdf8sdf0',
    tone: 'info',
  },
  {
    uid: 'evt-13', title: 'Federated Learning — review window closes',
    type: 'deadline', date: 'Jun 8, 2026', datetime: '2026-06-08',
    relatedPaper: 'Federated Learning in Healthcare', relatedPaperUid: '6sdf8sdf6',
    tone: 'info',
  },
  {
    uid: 'evt-14', title: 'Submit to NeurIPS 2026 deadline',
    type: 'submission', date: 'Jun 8, 2026', datetime: '2026-06-08', time: '11:59 PM AoE',
    relatedPaper: 'Synthetic Intelligence and Origination', relatedPaperUid: 'HJlk39na9e',
    description: 'Full paper submission with supplementary material',
    tone: 'warning',
  },
  {
    uid: 'evt-15', title: 'Privacy-Preserving ML — revision response due',
    type: 'submission', date: 'Jun 12, 2026', datetime: '2026-06-12',
    relatedPaper: 'Privacy-Preserving Machine Learning', relatedPaperUid: '9sdf8sdf0',
    tone: 'info',
  },
  {
    uid: 'evt-16', title: 'Department colloquium presentation',
    type: 'meeting', date: 'Jun 15, 2026', datetime: '2026-06-15', time: '3:00 PM',
    description: 'Presenting Synthetic Intelligence and Origination to the research group',
    tone: 'info',
  },
  {
    uid: 'evt-17', title: 'Milestone: NeurIPS submission complete',
    type: 'milestone', date: 'Jun 8, 2026', datetime: '2026-06-08',
    relatedPaper: 'Synthetic Intelligence and Origination', relatedPaperUid: 'HJlk39na9e',
    tone: 'success',
  },
  {
    uid: 'evt-18', title: 'Milestone: Draft methodology complete',
    type: 'milestone', date: 'Jun 18, 2026', datetime: '2026-06-18',
    relatedPaper: 'Climate Change Policy Review', relatedPaperUid: '8sdf7sdf8',
    tone: 'success',
  },
];
