import { CATEGORY_STYLES } from "@/types/blog";

export function CategoryBadge({ category }: { category: string }) {
  const style =
    CATEGORY_STYLES[category] ??
    "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}
    >
      {category}
    </span>
  );
}
