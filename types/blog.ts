export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  published: boolean;
  published_at: string | null;
  read_time: number;
  created_at: string;
  updated_at: string;
}

export type PostInput = {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  category?: string;
  tags?: string[];
  published?: boolean;
};

export type PostUpdateInput = Partial<PostInput>;

export const CATEGORIES = [
  "Engineering",
  "Architecture",
  "Frontend",
  "Leadership",
  "Career",
  "General",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_STYLES: Record<string, string> = {
  Engineering:
    "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-400 border-sky-200 dark:border-sky-900",
  Architecture:
    "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-400 border-violet-200 dark:border-violet-900",
  Frontend:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900",
  Leadership:
    "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-200 dark:border-amber-900",
  Career:
    "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-400 border-orange-200 dark:border-orange-900",
  General:
    "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700",
};
