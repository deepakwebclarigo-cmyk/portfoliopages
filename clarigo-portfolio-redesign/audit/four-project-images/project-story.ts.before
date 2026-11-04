import { webStories } from './project-stories-web';
import { mobileStories } from './project-stories-mobile';

export type ProjectStory = {
  featureIntro: string;
  workflowIntro: string;
  steps: [string, string][];
  problem: { title: string; text: string };
  solutions: [string, string][];
  engineering: { title: string; text: string; topics: string[] };
  cta: string;
};

// Interpretations of visible product journeys, not undocumented client briefs or results.
export const projectStories: Record<string, ProjectStory> = { ...webStories, ...mobileStories };

// Positions refer to each project's audited display gallery, after visual exclusions.
export const storyVisuals: Record<string, [number, number]> = {
  livsocial: [0,4], streamdexa: [2,1], 'little-butterflies': [1,3], tukioconnect: [3,1], beliri: [2,4], printlific: [0,3], nerdrabbit: [0,0], paranest: [4,3],
  'glocal-expert': [0,0], 'mercury-mailroom': [0,0], umeed: [1,2], 'alum-connect': [3,2], kegelklock: [3,4], 'rallybridge': [2,0], 'network-capital': [0,0], whizora: [0,2], 'estrata': [2,0], 'been-there': [1,3], 'leadforma': [0,0],
  'app-livsocial': [0,0], 'app-simplyscouted': [2,4], 'app-infiscribe': [3,4], 'app-silaflow': [0,3], 'app-habitstride': [3,2], 'app-tukioconnect': [1,3], 'app-pace-of-play': [0,3], 'app-qcop-app': [2,3], 'app-little-butterflies': [1,3], 'app-case-management-ase': [2,0], 'app-printlific': [3,4], 'app-law-legend': [2,3], 'app-racepace': [2,4], 'app-been-there': [3,2], 'app-pantryone': [2,3], 'app-escapethehoa': [1,3], 'app-dateflow': [2,3], 'app-meravyaah': [1,3], 'app-beliri': [3,2], 'app-fynmate': [2,3], 'app-streetslate': [5,2], 'app-ummed': [0,3], 'app-bubble': [0,1], 'app-kegalklock': [3,2], 'app-gymbet': [2,3], 'app-gobroker': [1,3], 'app-heartsync': [1,2], 'app-supplement-management': [0,0],
};
