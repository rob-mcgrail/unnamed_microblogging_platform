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
  repost: boolean;
}