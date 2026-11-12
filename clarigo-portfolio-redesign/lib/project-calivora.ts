import type { ProjectContent } from './project-content';
import type { ProjectStory } from './project-story';

export const calivoraContent: ProjectContent = {
  discipline: 'Personal health & care',
  headline: 'Bring the everyday care journey together.',
  summary: 'A personal-health mobile experience connecting health profiles, care-plan progress, lab-report views, daily reflections, and provider conversations.',
  overview: 'Calivora brings several parts of an ongoing care journey into one calm mobile workspace. A staged health profile gathers personal information and medical-history selections. The home view organizes provider updates, consultation access, wearable-style indicators, daily check-ins, and adherence cards. Current and previous care plans keep their progress and daily-log destinations together. Lab views group measurements by category, while a separate document-upload screen gives reports their own entry point. Chat and video-call interfaces carry the same visual language into provider communication, with account and membership tasks kept in a dedicated area.',
  design: 'Deep plum and navy surfaces establish a quiet backdrop for emerald actions, active tabs, and progress indicators. The new Calivora ribbon emblem expresses continuity through an open, softly interlaced C. Rounded cards separate different information types without interrupting the curved background artwork. Serif welcome headings add warmth to account entry, while the working screens use compact sans-serif labels and clear numeric hierarchy. Outlined choices, grouped rows, and generous touch areas make dense profile and lab screens easier to scan.',
  features: [
    ['A health profile in clear stages', 'Personal information and medical-history choices are organized into distinct setup and editing screens, with selected states and a visible next action.'],
    ['Care plans with continuity', 'Current and previous plan cards pair progress indicators with plan details and daily-log destinations.'],
    ['Reports with visual context', 'Lab categories, reference bars, and status labels structure the report view; document uploads use a separate, focused screen.'],
    ['Provider communication in context', 'Chat distinguishes scheduled and ready call states, while the video interface keeps call controls and picture-in-picture together.'],
  ],
};

export const calivoraStory: ProjectStory = {
  featureIntro: 'Profile setup, care plans, reports, reflections, and provider contact share one emerald-and-plum interface, with each task given a recognizable place.',
  workflowIntro: 'The supplied designs connect account entry and profile setup with the ongoing review of plans, personal records, and provider conversations.',
  steps: [
    ['Establish the personal context', 'Web-assisted registration explains the return to the app. Personal-information and medical-history screens then divide health-profile setup into smaller stages.'],
    ['Follow the care workspace', 'The home screen brings updates and check-ins forward. Plan cards and dated daily logs provide separate views for the longer care journey.'],
    ['Review and connect', 'Lab categories and document-upload controls organize report-related tasks, while chat and consultation screens provide a distinct communication path.'],
  ],
  problem: {
    title: 'Make a detailed care journey feel connected.',
    text: 'Profiles, plans, reports, daily observations, and provider conversations each require a different information pattern. Calivora gives them dedicated screens and a consistent navigation structure, so dense records and everyday actions can coexist without competing for the same space.',
  },
  solutions: [
    ['Separate entry from ongoing care', 'Staged profile forms focus on one group of inputs at a time; the home view prioritizes the updates and actions relevant to the daily workspace.'],
    ['Give each record its own structure', 'Plan progress, dated reflections, lab reference bars, and uploaded files use distinct card formats suited to their content.'],
    ['Make communication states recognizable', 'Scheduled and ready call cards use different action treatments. The consultation view groups microphone, camera, conversation, and end-call controls along the lower edge.'],
  ],
  engineering: {
    title: 'A connected information system for personal care.',
    text: 'The screen set documents staged profile inputs, selected medical-history choices, plan states, dated log entries, categorized lab measurements, document rows, and consultation controls. These provide the basis for describing the interface structure and its interaction states. Backend services, wearable connections, clinical interpretation, and a specific mobile technology stack are not established by the supplied artwork.',
    topics: ['Profile and care-plan states', 'Report and document structure', 'Conversation and call interfaces'],
  },
  cta: "Planning a personal-care product? Let's give complex information, daily actions, and human connection a clear place in the experience.",
};
