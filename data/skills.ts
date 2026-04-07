export type Proficiency = "Expert" | "Proficient" | "Familiar";
export type SkillCategory =
  | "Frontend"
  | "State Management"
  | "Testing"
  | "CSS & UI"
  | "Backend"
  | "Database"
  | "Build & Tooling"
  | "DevOps"
  | "AI & ML"
  | "Quality";

export type Skill = {
  name: string;
  category: SkillCategory;
  level: Proficiency;
  description?: string;
  tags?: string[];
};

export const skills: Skill[] = [
  // Frontend
  {
    name: "React",
    category: "Frontend",
    level: "Expert",
    description: "Hook-based component architecture, performance tuning, and large-scale app design.",
    tags: ["Hooks", "Next.js", "Performance"],
  },
  {
    name: "Next.js",
    category: "Frontend",
    level: "Expert",
    description: "Full-stack React with SSR, ISR, App Router, and edge optimization.",
    tags: ["App Router", "Server Actions", "SSR"],
  },
  {
    name: "TypeScript",
    category: "Frontend",
    level: "Expert",
    description: "Enterprise-grade type systems, generics, and strict architecture design.",
    tags: ["Generics", "Strict Mode", "Clean Architecture"],
  },
  {
    name: "JavaScript (ES6+)",
    category: "Frontend",
    level: "Expert",
    description: "Deep knowledge of the event loop, async patterns, and modern JS APIs.",
    tags: ["Async/Await", "Closures", "ES Modules"],
  },
  {
    name: "Angular 2+",
    category: "Frontend",
    level: "Proficient",
    description: "Component-driven enterprise apps with RxJS, dependency injection, and routing.",
    tags: ["RxJS", "Modules", "DI"],
  },
  {
    name: "AngularJS",
    category: "Frontend",
    level: "Proficient",
    description: "Legacy AngularJS apps including internal tooling and enterprise dashboards.",
    tags: ["Directives", "Services", "$scope"],
  },
  {
    name: "HTML / CSS",
    category: "Frontend",
    level: "Expert",
    description: "Semantic HTML, advanced layout with Grid/Flexbox, and cross-browser compatibility.",
    tags: ["Grid", "Flexbox", "Accessibility"],
  },

  // State Management
  {
    name: "Redux / Redux Toolkit",
    category: "State Management",
    level: "Expert",
    description: "Global state architecture with slices, thunks, and RTK Query for data fetching.",
    tags: ["Slices", "Thunks", "RTK Query"],
  },
  {
    name: "Zustand",
    category: "State Management",
    level: "Proficient",
    description: "Lightweight state management for focused React applications.",
    tags: ["Stores", "Middlewares"],
  },
  {
    name: "React Context API",
    category: "State Management",
    level: "Expert",
    description: "Composable context patterns for auth, theming, and shared state.",
    tags: ["Providers", "useContext", "Reducers"],
  },
  {
    name: "NgRx",
    category: "State Management",
    level: "Familiar",
    description: "Redux-inspired state management for Angular with effects and selectors.",
    tags: ["Actions", "Effects", "Selectors"],
  },

  // Testing
  {
    name: "Jest",
    category: "Testing",
    level: "Proficient",
    description: "Unit and integration testing with mocks, spies, and snapshot assertions.",
    tags: ["Mocks", "Snapshots", "Coverage"],
  },
  {
    name: "React Testing Library",
    category: "Testing",
    level: "Proficient",
    description: "User-centric component testing focused on behavior, not implementation.",
    tags: ["Queries", "userEvent", "Accessibility"],
  },
  {
    name: "Jasmine",
    category: "Testing",
    level: "Familiar",
    description: "BDD-style test suites primarily used in Angular projects.",
    tags: ["Spies", "Matchers"],
  },
  {
    name: "Karma",
    category: "Testing",
    level: "Familiar",
    description: "Test runner for browser-based Angular unit tests.",
    tags: ["Browser Testing", "Angular"],
  },
  {
    name: "TDD",
    category: "Testing",
    level: "Proficient",
    description: "Test-driven development practices to reduce regressions and improve design.",
    tags: ["Red-Green-Refactor", "Coverage"],
  },

  // CSS & UI
  {
    name: "Tailwind CSS",
    category: "CSS & UI",
    level: "Expert",
    description: "Utility-first styling for rapid, consistent UI development at scale.",
    tags: ["Utility-First", "Dark Mode", "Responsive"],
  },
  {
    name: "SCSS / Sass",
    category: "CSS & UI",
    level: "Expert",
    description: "Variables, mixins, and modular architecture for maintainable stylesheets.",
    tags: ["Mixins", "Variables", "Nesting"],
  },
  {
    name: "Styled Components",
    category: "CSS & UI",
    level: "Proficient",
    description: "CSS-in-JS for scoped, dynamic styling with theming support.",
    tags: ["CSS-in-JS", "Theming", "Scoped Styles"],
  },
  {
    name: "CSS Modules",
    category: "CSS & UI",
    level: "Proficient",
    description: "Locally scoped CSS for component isolation and collision-free styling.",
    tags: ["Scoped", "BEM", "Composition"],
  },
  {
    name: "Material UI",
    category: "CSS & UI",
    level: "Proficient",
    description: "Google's Material Design component system for React applications.",
    tags: ["Components", "Theming", "sx prop"],
  },
  {
    name: "Ant Design",
    category: "CSS & UI",
    level: "Proficient",
    description: "Enterprise-grade React UI library used in internal dashboards.",
    tags: ["Forms", "Tables", "Enterprise"],
  },
  {
    name: "Bootstrap",
    category: "CSS & UI",
    level: "Proficient",
    description: "Responsive grid and component library for rapid UI scaffolding.",
    tags: ["Grid", "Responsive", "Components"],
  },

  // Backend
  {
    name: "Node.js",
    category: "Backend",
    level: "Expert",
    description: "Event-driven server-side JavaScript for APIs, services, and tooling.",
    tags: ["Async", "Streams", "EventEmitter"],
  },
  {
    name: "NestJS",
    category: "Backend",
    level: "Proficient",
    description: "Structured Node.js framework with DI, modules, and decorators for scalable APIs.",
    tags: ["Modules", "Guards", "Pipes"],
  },
  {
    name: "Express",
    category: "Backend",
    level: "Expert",
    description: "Minimal Node.js framework for building REST APIs and middleware stacks.",
    tags: ["Middleware", "REST", "Routing"],
  },
  {
    name: "Apollo GraphQL",
    category: "Backend",
    level: "Proficient",
    description: "Schema-first GraphQL APIs and client-side data management.",
    tags: ["Resolvers", "Apollo Client", "Schema"],
  },
  {
    name: "REST APIs",
    category: "Backend",
    level: "Expert",
    description: "Designing and consuming RESTful services across diverse enterprise domains.",
    tags: ["OpenAPI", "Auth", "Pagination"],
  },
  {
    name: "RxJS",
    category: "Backend",
    level: "Proficient",
    description: "Reactive programming with observables for async data streams.",
    tags: ["Observables", "Operators", "Subjects"],
  },
  {
    name: "KONG API Gateway",
    category: "Backend",
    level: "Proficient",
    description: "Centralised authentication, rate limiting, and routing at the API gateway layer.",
    tags: ["Auth", "Rate Limiting", "Plugins"],
  },

  // Database
  {
    name: "PostgreSQL",
    category: "Database",
    level: "Proficient",
    description: "Relational database design, complex queries, and indexing strategies.",
    tags: ["SQL", "Indexing", "Migrations"],
  },
  {
    name: "MySQL",
    category: "Database",
    level: "Proficient",
    description: "Relational database used across healthcare and enterprise applications.",
    tags: ["Queries", "Joins", "Transactions"],
  },
  {
    name: "SQLite",
    category: "Database",
    level: "Familiar",
    description: "Embedded database for lightweight local storage and tooling.",
    tags: ["Embedded", "Local"],
  },
  {
    name: "MongoDB",
    category: "Database",
    level: "Proficient",
    description: "Document-based NoSQL database for flexible, schema-less data models.",
    tags: ["Aggregation", "Atlas", "Mongoose"],
  },
  {
    name: "Redis",
    category: "Database",
    level: "Familiar",
    description: "In-memory data store for caching and session management.",
    tags: ["Caching", "Pub/Sub", "TTL"],
  },
  {
    name: "Supabase",
    category: "Database",
    level: "Proficient",
    description: "Postgres-powered BaaS with auth, realtime, and row-level security.",
    tags: ["RLS", "Realtime", "Auth"],
  },

  // Build & Tooling
  {
    name: "Webpack",
    category: "Build & Tooling",
    level: "Proficient",
    description: "Module bundler configuration, code splitting, and build optimisation.",
    tags: ["Loaders", "Plugins", "Code Splitting"],
  },
  {
    name: "Vite",
    category: "Build & Tooling",
    level: "Proficient",
    description: "Fast HMR-based build tool for modern frontend development.",
    tags: ["HMR", "ESM", "Plugins"],
  },
  {
    name: "Turbopack",
    category: "Build & Tooling",
    level: "Familiar",
    description: "Next-gen Rust-based bundler for Next.js projects.",
    tags: ["Rust", "Next.js", "Fast Refresh"],
  },
  {
    name: "Storybook",
    category: "Build & Tooling",
    level: "Proficient",
    description: "Component development and documentation in isolation for design systems.",
    tags: ["Component Library", "Stories", "Addons"],
  },
  {
    name: "Git",
    category: "Build & Tooling",
    level: "Expert",
    description: "Branching strategies, PR workflows, and release-cycle aligned Git practices.",
    tags: ["Branching", "PRs", "Rebase"],
  },

  // DevOps
  {
    name: "Docker",
    category: "DevOps",
    level: "Proficient",
    description: "Containerisation of services and local development environment management.",
    tags: ["Compose", "Images", "Volumes"],
  },
  {
    name: "CI/CD",
    category: "DevOps",
    level: "Proficient",
    description: "Automated pipelines for testing, building, and deploying to production.",
    tags: ["Pipelines", "Automation", "Releases"],
  },
  {
    name: "GitHub Actions",
    category: "DevOps",
    level: "Proficient",
    description: "Workflow automation for PRs, deployments, and scheduled tasks.",
    tags: ["Workflows", "Runners", "Secrets"],
  },
  {
    name: "Jenkins",
    category: "DevOps",
    level: "Familiar",
    description: "Build automation and deployment orchestration in enterprise CI environments.",
    tags: ["Pipelines", "Jobs"],
  },
  {
    name: "Vercel",
    category: "DevOps",
    level: "Proficient",
    description: "Next.js deployments with edge functions, preview URLs, and env management.",
    tags: ["Edge Functions", "Preview", "Analytics"],
  },

  // AI & ML
  {
    name: "Claude API",
    category: "AI & ML",
    level: "Proficient",
    description: "Building AI-powered features and autonomous agents using Anthropic's Claude.",
    tags: ["Agents", "Tool Use", "Streaming"],
  },
  {
    name: "Groq / LLMs",
    category: "AI & ML",
    level: "Proficient",
    description: "Fast LLM inference with Llama models for content generation pipelines.",
    tags: ["Llama", "Inference", "Streaming"],
  },
  {
    name: "Prompt Engineering",
    category: "AI & ML",
    level: "Proficient",
    description: "Structured prompting, delimiter formats, and chain-of-thought techniques.",
    tags: ["Chain-of-Thought", "Delimiters", "Few-Shot"],
  },
  {
    name: "AI Integration",
    category: "AI & ML",
    level: "Proficient",
    description: "End-to-end AI feature delivery: webhooks, content pipelines, and automation.",
    tags: ["Automation", "Pipelines", "Webhooks"],
  },

  // Quality
  {
    name: "WCAG 2.1",
    category: "Quality",
    level: "Proficient",
    description: "Accessibility compliance across key user journeys in production applications.",
    tags: ["a11y", "ARIA", "Contrast"],
  },
  {
    name: "Lighthouse / Core Web Vitals",
    category: "Quality",
    level: "Proficient",
    description: "Performance auditing and CWV tracking to improve real user experience scores.",
    tags: ["LCP", "CLS", "FID"],
  },
  {
    name: "Code Reviews",
    category: "Quality",
    level: "Expert",
    description: "Structured PR reviews to enforce quality, consistency, and knowledge sharing.",
    tags: ["PRs", "Standards", "Mentoring"],
  },
  {
    name: "Agile / Scrum",
    category: "Quality",
    level: "Expert",
    description: "Sprint planning, estimation, grooming, and retrospectives across multiple teams.",
    tags: ["Sprints", "Estimation", "Retros"],
  },
  {
    name: "Technical Design Docs",
    category: "Quality",
    level: "Proficient",
    description: "Writing TDDs before implementation to reduce regressions and align the team.",
    tags: ["TDDs", "Architecture", "Planning"],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  "Frontend",
  "State Management",
  "Testing",
  "CSS & UI",
  "Backend",
  "Database",
  "Build & Tooling",
  "DevOps",
  "AI & ML",
  "Quality",
];

export const CATEGORY_META: Record<
  SkillCategory,
  { color: string; bg: string; border: string; dot: string }
> = {
  Frontend: {
    color: "text-sky-700 dark:text-sky-300",
    bg: "bg-sky-50 dark:bg-sky-950/50",
    border: "border-sky-200 dark:border-sky-800",
    dot: "bg-sky-500",
  },
  "State Management": {
    color: "text-violet-700 dark:text-violet-300",
    bg: "bg-violet-50 dark:bg-violet-950/50",
    border: "border-violet-200 dark:border-violet-800",
    dot: "bg-violet-500",
  },
  Testing: {
    color: "text-amber-700 dark:text-amber-300",
    bg: "bg-amber-50 dark:bg-amber-950/50",
    border: "border-amber-200 dark:border-amber-800",
    dot: "bg-amber-500",
  },
  "CSS & UI": {
    color: "text-pink-700 dark:text-pink-300",
    bg: "bg-pink-50 dark:bg-pink-950/50",
    border: "border-pink-200 dark:border-pink-800",
    dot: "bg-pink-500",
  },
  Backend: {
    color: "text-indigo-700 dark:text-indigo-300",
    bg: "bg-indigo-50 dark:bg-indigo-950/50",
    border: "border-indigo-200 dark:border-indigo-800",
    dot: "bg-indigo-500",
  },
  Database: {
    color: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-50 dark:bg-emerald-950/50",
    border: "border-emerald-200 dark:border-emerald-800",
    dot: "bg-emerald-500",
  },
  "Build & Tooling": {
    color: "text-orange-700 dark:text-orange-300",
    bg: "bg-orange-50 dark:bg-orange-950/50",
    border: "border-orange-200 dark:border-orange-800",
    dot: "bg-orange-500",
  },
  DevOps: {
    color: "text-teal-700 dark:text-teal-300",
    bg: "bg-teal-50 dark:bg-teal-950/50",
    border: "border-teal-200 dark:border-teal-800",
    dot: "bg-teal-500",
  },
  "AI & ML": {
    color: "text-purple-700 dark:text-purple-300",
    bg: "bg-purple-50 dark:bg-purple-950/50",
    border: "border-purple-200 dark:border-purple-800",
    dot: "bg-purple-500",
  },
  Quality: {
    color: "text-rose-700 dark:text-rose-300",
    bg: "bg-rose-50 dark:bg-rose-950/50",
    border: "border-rose-200 dark:border-rose-800",
    dot: "bg-rose-500",
  },
};
