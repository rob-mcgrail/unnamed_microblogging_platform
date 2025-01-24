export interface TextHandler {
  id: string;
  priority: number;
  visualPriority: number;
  mimMatchLength: number;
  label: string;
  startCount: number;
  activeCount: number;
  persistentCount: number;
  alerted: boolean;
  class: 'core' | 'letters' | 'words' | 'infinity';
  regex: string;
}