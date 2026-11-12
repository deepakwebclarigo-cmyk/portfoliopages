import type { ProjectContent } from './project-content';
import type { ProjectStory } from './project-story';

export const axorabidContent: ProjectContent = {
  discipline: 'Vehicle listings & auctions',
  headline: 'Connect each vehicle with its next step.',
  summary: 'A vehicle-auction mobile experience with seller and dealer entry, guided listing media, saved drafts, auction views, and account management.',
  overview: 'AxoraBid connects the practical work of preparing a vehicle listing with a clear auction workspace. Entry screens distinguish sellers from dealers, and the seller registration form groups basic contact information. The dashboard brings auction activity and listing shortcuts together, while upcoming auctions pair vehicle photography with the displayed bid information. Draft listings keep editing actions close to saved records. A dedicated photo-and-video stage organizes the required vehicle views, and the account area groups profile, document, and transaction-related destinations.',
  design: 'Royal-blue gradients introduce the product, with the new AxoraBid road-inspired emblem establishing an automotive identity. Working screens use white cards, thin neutral borders, and restrained spacing to keep vehicle images and listing information readable. Bright blue actions connect the entry and workspace views; orange saved-state labels and carefully separated red account actions provide distinct visual roles. Rounded navigation and compact active-state markers carry the same language through the seller account.',
  features: [
    ['Seller and dealer entry', 'Role choices explain the two audience paths before the account and registration views.'],
    ['Vehicle media checklist', 'A dedicated listing stage groups front, side, rear, tire, and video upload areas alongside the visible photo requirements.'],
    ['Auction and draft workspaces', 'Vehicle cards, upcoming-state tabs, saved timestamps, and nearby editing controls support different listing tasks.'],
    ['Seller account controls', 'Profile information, document navigation, settings, and transaction-history destinations share one structured account view.'],
  ],
};

export const axorabidStory: ProjectStory = {
  featureIntro: 'Role-based entry, vehicle media, auction records, and account tasks are presented as distinct parts of the same mobile workflow.',
  workflowIntro: 'The supplied interface moves from a clear audience choice into listing preparation and the review of vehicle and auction records.',
  steps: [
    ['Choose the right role', 'Seller and dealer choices establish the intended path before sign-in and seller registration.'],
    ['Prepare the vehicle listing', 'Basic information, a photo-and-video checklist, and saved drafts divide listing preparation into smaller tasks.'],
    ['Review the auction workspace', 'The dashboard and upcoming-auction view organize the displayed vehicles, bid information, and surrounding account destinations.'],
  ],
  problem: { title: 'Keep the next listing task easy to find.', text: 'A seller moves between creating a listing, collecting media, revisiting a draft, and checking auction information. AxoraBid gives these tasks separate views while keeping the vehicle and its current context close to the relevant action.' },
  solutions: [
    ['Tasks before detail', 'Dashboard shortcuts bring vehicle creation, active sales, and draft listings ahead of the longer vehicle catalog.'],
    ['Media organized by view', 'Labeled upload areas make each required vehicle angle recognizable within the listing stage.'],
    ['Status beside the vehicle', 'Upcoming, unsold, and sold tabs provide auction context; saved-state labels and editing actions distinguish draft records.'],
  ],
  engineering: { title: 'A structured vehicle-listing journey.', text: 'The supplied screens document role choices, seller registration, media collection, vehicle cards, saved drafts, auction records, and account destinations. They do not identify an auction engine, payment provider, identity-verification service, permission enforcement, or mobile framework. Monetary values and counters are presented as interface sample data.', topics: ['Role and account states', 'Listing media and drafts', 'Auction record presentation'] },
  cta: "Planning a vehicle marketplace? Let's connect listings, auction context, and seller tasks through a clear mobile experience.",
};
