export type TextHandler = {
  id: string;
  priority: number;
  visualPriority: number;
  mimMatchLength: number;
  label: string;
  startCount: number;
  activeCount: number;
  persistentCount: number;
  alerted: boolean;
  class: 'core' | 'letters' | 'words';
  regex: string;
}

export type User = {
  created: string;
  lastSeen: string;
  name: string;
  bio: string;
  posts: number;
  id: string;
  country: string | null;
  money: number;
}

export type Post = {
  id: string;
  authorId: string;
  content: string;
  created: string;
  name: string;
  replies: number;
  favs: number;
  reposts: number;
  flags: string;
  repliesTo: string | null;
  repostOf: string | null;
  repostedBy: string | null;
  repostedByName: string | null;
  repost: boolean;
}

export type Event = {
  subject: string;
  subjectName: string;
  event: 'post' | 'repost' | 'reply' | 'fav';
  actor?: string;
  object?: string;
  actorName?: string;
  money?: number;
  emoji?: string;
  modifiers?: string[];
}

export type Modifier = {
  name: string;
  emoji: string;
  description: string;
  identifier: string;
  rarirty: number;
  events: string[];
  actions: string[];
}