export const projects = [
  {
    title: "Enterprise Call Routing Configuration Platform",
    company: "Afiniti",
    link: "",
    stack: ["React", "Node.js", "GraphQL", "JSON Schema", "CI/CD"],
    description:
      "An internal enterprise platform used to configure and optimize AI-driven call routing logic for large-scale telecom operations.",
    details:
      "Led development of a configuration-driven product enabling data teams and engineers to manage complex call-routing algorithms without direct code changes. Implemented dynamic JSON-based forms, improved deployment reliability through CI/CD optimizations, and ensured scalability for high-volume telecom environments. The system reduced operational friction, accelerated release cycles, and improved routing accuracy across enterprise clients.",
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
    details:
      "Worked as a senior full-stack engineer leading development of the company’s core insurance platform. Designed scalable frontend architecture, implemented secure backend integrations, and ensured clean, maintainable code across the stack. Collaborated closely with product teams and stakeholders to deliver a reliable system capable of handling high user traffic and transactional workflows.",
    impact:
      "Delivered a scalable production system supporting multiple insurance verticals and improved engineering productivity through structured development workflows.",
  },

  {
    title: "On-The-Go Learning Platform",
    company: "Spekit",
    link: "",
    stack: ["React", "CI/CD", "Component Architecture"],
    description:
      "A learning enablement platform designed to deliver contextual training and knowledge to users within their workflow.",
    details:
      "Contributed to frontend architecture and UI development of a modern learning platform used by enterprise teams. Implemented responsive components, optimized UI performance, and maintained CI/CD pipelines to ensure stable production releases. Worked closely with design and product teams to translate complex user flows into intuitive interfaces.",
    impact:
      "Enhanced platform usability, ensured stable deployments, and contributed to improved onboarding and training workflows for enterprise users.",
  },

  {
    title: "Data Modeling & Configuration System",
    company: "Afiniti",
    link: "",
    stack: ["React", "Node.js", "Kong API Gateway", "Dynamic Forms"],
    description:
      "A data modeling and configuration system built from scratch to support flexible enterprise data workflows.",
    details:
      "Built the frontend of a complex data modeling platform from the ground up and later contributed to backend services. Implemented dynamic JSON-based form rendering, integrated Kong API Gateway for authentication, and led frontend engineering efforts to maintain quality and release consistency. The system enabled rapid adjustments to data workflows without extensive code changes.",
    impact:
      "Reduced turnaround time for configuration updates and improved system flexibility for enterprise-scale data modeling operations.",
  },

  {
    title: "Nuclear Plant Process Digitization System",
    company: "10Pearls",
    link: "",
    stack: ["Angular", "Node.js", "Enterprise Workflow Systems"],
    description:
      "A process digitization platform used by engineers in nuclear energy facilities to manage operational workflows.",
    details:
      "Developed the frontend for a high-reliability enterprise application used by engineers to manage and automate routine procedures. The platform replaced manual workflows with a structured digital system, improving operational accuracy and traceability. This project received internal recognition for its impact and execution quality.",
    impact:
      "Enabled digital transformation of engineering workflows in a high-compliance industry and improved operational efficiency for plant teams.",
  },

  {
    title: "Hospital Management & Digital Health Systems",
    company: "10Pearls",
    link: "",
    stack: ["Angular", "Node.js", "TypeScript", "Healthcare Systems"],
    description:
      "A set of digital health platforms including hospital management systems and healthcare applications.",
    details:
      "Worked on multiple healthcare applications covering patient management, system workflows, and administrative tooling. Contributed across both frontend and backend layers using Angular and Node.js. Helped deliver scalable, production-ready systems in the healthcare domain where reliability and usability were critical.",
    impact:
      "Supported delivery of production healthcare software used in real operational environments, contributing to improved digital patient management processes.",
  },

  {
    title: "Augmented Reality Learning Application",
    company: "10Pearls",
    link: "",
    stack: ["Angular", "TypeScript", "AR Frontend"],
    description:
      "An augmented reality-based learning application built to enhance interactive user experiences.",
    details:
      "Developed frontend components for an AR-enabled application using Angular and TypeScript. Focused on delivering responsive UI interactions and ensuring smooth rendering performance for immersive user experiences.",
    impact:
      "Expanded product capabilities into AR-driven user experiences and supported delivery of an innovative learning solution.",
  },

  {
    title: "Internal Employee Management Platform",
    company: "10Pearls",
    link: "",
    stack: ["AngularJS", ".NET", "Enterprise Tools"],
    description:
      "An internal employee management system used for reporting, scheduling, and organizational workflows.",
    details:
      "Built multiple features including reporting automation and scheduling modules for an internal enterprise platform. Focused on improving usability and supporting operational processes across teams.",
    impact:
      "Improved internal workflow visibility and reduced manual effort in employee management processes.",
  },
];


export const featuredProjects = projects.filter((p) =>
  [
    "Enterprise Call Routing Configuration Platform",
    "B2C Insurance Marketplace Platform",
    "Data Modeling & Configuration System",
  ].includes(p.title)
);
