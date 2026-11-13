import type { CSSProperties } from 'react';
import palettes from './project-themes.json';

export type ProjectTheme = {
  name: string; primary: string; surface: string; soft: string; canvas: string;
  border: string; deep: string; ink: string; muted: string; action: string;
  actionHover: string; onDeep: string; thumbnailTone: string; thumbnailBackground: string;
};

export function getProjectTheme(slug: string): ProjectTheme | undefined {
  return (palettes as Record<string, ProjectTheme>)[slug];
}

export function projectThemeStyle(theme: ProjectTheme | undefined, fallback: string): CSSProperties {
  if (!theme) return { '--project-color': fallback } as CSSProperties;
  const channels = theme.action.slice(1).match(/../g)!.map(value => parseInt(value, 16)).join(',');
  return {
    '--project-color': theme.surface,
    '--project-primary': theme.primary,
    '--project-surface': theme.surface,
    '--project-soft': theme.soft,
    '--project-canvas': theme.canvas,
    '--project-border': theme.border,
    '--project-deep': theme.deep,
    '--project-on-deep': theme.onDeep,
    '--project-rgb': channels,
    '--accent': theme.action,
    '--accent-dark': theme.actionHover,
    '--ink': theme.ink,
    '--muted': theme.muted,
    '--line': theme.border,
    '--surface': theme.soft,
  } as CSSProperties;
}
