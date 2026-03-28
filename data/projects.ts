export const projects = [
  {
    title: "Enterprise Call Routing Configuration Platform",
    company: "Afiniti",
    link: "",
    stack: ["React", "Node.js", "GraphQL", "JSON Schema", "CI/CD"],
    description:
      "An internal enterprise platform used to configure and optimize AI-driven call routing logic for large-scale telecom operations.",
    problem:
      "Telecom clients needed to update AI-driven call routing configurations frequently — adjusting weights, rules, and data models to tune performance. Every change required direct engineering involvement, creating a bottleneck that slowed iteration cycles and increased the risk of misconfiguration in production.",
    details:
      "Led development of a configuration-driven product enabling data teams and engineers to manage complex call-routing algorithms without direct code changes. Implemented dynamic JSON-based forms that rendered configuration UIs from schema definitions, improved deployment reliability through CI/CD optimizations, and ensured scalability for high-volume telecom environments. Also led sprint planning, grooming, and PR review processes to maintain team velocity and code quality.",
    impact:
      "Improved routing efficiency, reduced engineering dependency for configuration changes, and increased deployment reliability across production environments.",
  },

  {
    title: "B2C Insurance Marketplace Platform",
    company: "Takaful Bazaar",
    link: "",
    stack: ["React", "Node.js", "PostgreSQL", "REST APIs", "CI/CD"],
    description:
      "A customer-facing insurance marketplace providing digital access to auto, travel, and health insurance products.",
    problem:
      "Insurance in Pakistan was predominantly sold offline through agents, leaving customers with no reliable way to compare products, get quotes, or purchase policies digitally. The company needed a scalable platform to serve multiple insurance verticals under one roof while handling sensitive transactional data securely.",
    details:
      "Worked as a senior full-stack engineer leading development of the company's core insurance platform. Designed scalable frontend architecture, implemented secure backend integrations with insurance providers, and ensured clean, maintainable code across the stack. Led a full-stack team through sprint planning, estimation, and delivery cycles. Collaborated closely with product and stakeholder teams to ship production-ready features on a consistent cadence.",
    impact:
      "Delivered a scalable production system supporting auto, travel, and health insurance verticals. Improved engineering productivity through structured workflows and consistent deployment pipelines.",
  },

  {
    title: "On-The-Go Learning Platform",
    company: "Spekit",
    link: "",
    stack: ["React", "CI/CD", "Component Architecture"],
    description:
      "A learning enablement platform designed to deliver contextual training and knowledge to users within their workflow.",
    problem:
      "Enterprise teams struggled with software adoption — onboarding content lived in separate tools disconnected from daily workflows, leading to low retention and high support overhead. Users needed training delivered in context, at the moment they needed it, rather than front-loaded in isolation.",
    details:
      "Contributed to frontend architecture and UI development of a modern learning platform used by enterprise teams globally. Implemented responsive components aligned to design mocks, optimized rendering performance for a smooth user experience, and maintained CI/CD pipelines to ensure stable, reliable production releases. Worked closely with design and product to translate complex user flows into intuitive interfaces.",
    impact:
      "Enhanced platform usability and performance, maintained deployment stability, and contributed to improved onboarding and training workflows for enterprise customers.",
  },

  {
    title: "Data Modeling & Configuration System",
    company: "Afiniti",
    link: "",
    stack: ["React", "Node.js", "Kong API Gateway", "Dynamic Forms"],
    description:
      "A data modeling and configuration system built from scratch to support flexible enterprise data workflows.",
    problem:
      "Data and ML teams needed a way to model complex datasets and manage configuration parameters for AI pipelines — but had no dedicated tooling. Workflows were manual, inconsistent across team members, and deeply dependent on engineering bandwidth for even minor adjustments.",
    details:
      "Built the frontend of a complex data modeling platform entirely from scratch and later extended contributions to backend services. Implemented dynamic JSON-schema-based form rendering to support rapid UI generation from configuration definitions. Integrated Kong API Gateway for authentication and access control, and led frontend engineering efforts to maintain release quality and delivery consistency across monthly deployment cycles.",
    impact:
      "Reduced turnaround time for configuration updates, reduced reliance on engineering for data workflow changes, and improved flexibility for enterprise-scale data modeling operations.",
  },

  {
    title: "Nuclear Plant Process Digitization System",
    company: "10Pearls",
    link: "",
    stack: ["Angular", "Node.js", "Enterprise Workflow Systems"],
    description:
      "A process digitization platform used by engineers in nuclear energy facilities to manage operational workflows.",
    problem:
      "Engineers at nuclear plant facilities relied on paper-based procedures to manage critical operational routines — a process prone to human error, difficult to audit, and impossible to update quickly. In a high-compliance, high-stakes environment, the gap between paper and digital was a significant operational risk.",
    details:
      "Developed the frontend for a high-reliability enterprise application used by plant engineers to manage, track, and automate routine operational procedures. The platform replaced paper workflows with a structured digital system, adding traceability and audit trails to every action. Delivered production-ready features in close collaboration with domain experts and received internal recognition for the quality and impact of execution.",
    impact:
      "Enabled digital transformation of engineering workflows in a high-compliance industry, improving operational accuracy, auditability, and efficiency for plant teams.",
  },

  {
    title: "Hospital Management & Digital Health Systems",
    company: "10Pearls",
    link: "",
    stack: ["Angular", "Node.js", "TypeScript", "Healthcare Systems"],
    description:
      "A set of digital health platforms including hospital management systems and healthcare applications.",
    problem:
      "Healthcare facilities managed patient records, scheduling, and administrative workflows through fragmented or manual systems, creating gaps in data visibility and operational continuity. Reliability and usability were non-negotiable in environments where delays could have real patient impact.",
    details:
      "Worked on multiple healthcare applications covering patient management, clinical workflows, and administrative tooling. Contributed across both frontend and backend layers using Angular and Node.js. Maintained a strong focus on reliability and usability throughout, ensuring systems met the quality bar required for live healthcare environments.",
    impact:
      "Contributed to delivery of production healthcare software used in real operational environments, improving digital patient management and reducing administrative friction for healthcare teams.",
  },

  {
    title: "Augmented Reality Learning Application",
    company: "10Pearls",
    link: "",
    stack: ["Angular", "TypeScript", "AR Frontend"],
    description:
      "An augmented reality-based learning application built to enhance interactive user experiences.",
    problem:
      "Traditional e-learning formats were failing to engage users — static content and linear course structures led to poor retention. The client wanted to leverage emerging AR technology to create an immersive learning experience that felt fundamentally different from anything on the market.",
    details:
      "Developed frontend components for an AR-enabled learning application using Angular and TypeScript. Focused on delivering responsive, performant UI interactions suited to the demands of immersive AR experiences, ensuring smooth rendering and intuitive user flows across device sizes.",
    impact:
      "Expanded the product's capabilities into AR-driven user experiences and supported delivery of an innovative learning solution that differentiated the client in the ed-tech space.",
  },

  {
    title: "Internal Employee Management Platform",
    company: "10Pearls",
    link: "",
    stack: ["AngularJS", ".NET", "Enterprise Tools"],
    description:
      "An internal employee management system used for reporting, scheduling, and organizational workflows.",
    problem:
      "HR and operations teams were managing reporting, scheduling, and workforce visibility through manual processes and disconnected spreadsheets. The lack of a unified internal tool created blind spots in headcount planning and delayed routine operational decisions.",
    details:
      "Built multiple features including reporting automation and scheduling modules for an internal enterprise platform. Focused on improving usability, data visibility, and reducing the manual effort required for routine HR and operational processes across teams.",
    impact:
      "Improved internal workflow visibility, reduced manual effort in employee management processes, and gave operations teams a reliable single source of truth for headcount and scheduling data.",
  },
];


export const featuredProjects = projects.filter((p) =>
  [
    "Enterprise Call Routing Configuration Platform",
    "B2C Insurance Marketplace Platform",
    "Data Modeling & Configuration System",
  ].includes(p.title)
);
