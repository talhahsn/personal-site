import { FadeIn } from "./FadeIn";
import Image from "next/image";

export function Timeline({
  items,
}: {
  items: {
    company: string;
    role: string;
    period: string;
    points: string[];
    logo?: string;
    senior?: boolean;
  }[];
}) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />

      <div className="space-y-10">
        {items.map((item, index) => (
          <FadeIn key={index} delay={index * 0.05}>
            <div key={index} className="relative pl-10">
              {/* Dot */}
              <div className="absolute left-0 top-1.2 w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                {item.logo ? (
                  <Image
                    width={6}
                    height={6}
                    alt={item.company}
                    src={item.logo}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>

              {/* Content */}
              <div>
                <h3 className="font-semibold text-lg text-slate-900 dark:text-gray-100 flex items-center gap-2">
                  {item.role}

                  {item.senior && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      Senior Role
                    </span>
                  )}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.company} • {item.period}
                </p>

                <ul className="mt-3 space-y-1 text-gray-700 dark:text-gray-300">
                  {item.points.map((p, i) => (
                    <li key={i} className="text-sm leading-relaxed">
                      • {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
