// Single source of truth for all profile content and résumé metrics.
export const metrics = {
  slackEngagementLift: "33%",
  slackExperimentScale: "hundreds of thousands of users",
  gubaRerenderReduction: "27%",
  thresholdLatencyReduction: "~29%",
  opportunityUniversitiesTarget: "10",
  opportunityStudentsTarget: "~25,000",
};

export const links = {
  email: "diressabebe23@gmail.com",
  linkedin: "https://www.linkedin.com/in/dires-a-abatieneh",
  github: "https://github.com/Dierzeethiopia",
};

export const profile = {
  name: "Dires Abatieneh",
  greeting: "ሰላም — hi, I’m Dires.",
  school: "Computer Science and Mathematics, Williams College ’28",
  previously: "Previously SWE Intern at Slack / Salesforce",
  tagline: "I like figuring out what makes things work, then making them work better. That curiosity has taken me from notification infrastructure at Slack to building AI tools at Williams. These days, I’m drawn to backend systems, useful AI, and ideas I can’t leave alone.",
};

export type Experience = {
  org: string;
  role: string;
  meta?: string;
  current?: boolean;
  points: string[];
};

export const experience: Experience[] = [
  {
    org: "Slack / Salesforce",
    role: "Infrastructure Software Engineering Intern",
    meta: "San Francisco · Jun–Aug 2026",
    points: ["Built delayed-notification infrastructure spanning backend job orchestration, real-time messaging hooks and frontend state synchronization."],
  },
  {
    org: "WSO at Williams",
    role: "Operations & Backend Engineer",
    meta: "Williamstown · Current",
    current: true,
    points: ["Help operate and develop backend systems for Williams Students Online, the student-run campus platform."],
  },
  {
    org: "Guba Technologies",
    role: "Full Stack Software Engineering Intern",
    meta: "Ethiopia · May–Aug 2025",
    points: [
      "Built a React/TypeScript analytics dashboard.",
      `Optimized REST API data flow and client-side state, cutting re-render time by ${metrics.gubaRerenderReduction}.`,
      "Built backend telemetry and automated integration tests.",
    ],
  },
  {
    org: "Williams College",
    role: "Advanced Calculus Teaching Assistant",
    meta: "Williamstown",
    points: ["Help students work through proof-based mathematics, formal reasoning and difficult concepts."],
  },
  {
    org: "Williams OIT",
    role: "Student Consultant",
    meta: "Williamstown",
    points: ["Support users and troubleshoot device, connectivity and campus technology issues."],
  },
  {
    org: "AI4All Ignite · Code2040 · ColorStack · Keploy API Fellowship",
    role: "Fellowships & Communities",
    meta: "Sep 2024 – Present",
    points: [],
  },
  {
    org: "Pinterest",
    role: "Selected Participant — Pin It To Win It Program",
    meta: "June – Aug 2026",
    points: [],
  },
  {
    org: "OURSTEM+ at The Davis Center",
    role: "Board Member",
    meta: "Sep 2026 – Present",
    points: [],
  },
  {
    org: "Williams Orthodox Students Organization",
    role: "Board Member",
    meta: "Fall 2026",
    points: [],
  },
  {
    org: "Williams Student Medicine",
    role: "Athletics Facilities Assistant",
    meta: "Sep 2026 – Present",
    points: [],
  },
  {
    org: "AddisCoder",
    role: "Coding Bootcamp Student",
    meta: "",
    points: [],
  },
];

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  tech: string[];
  summary: string;
  details: { heading: string; items: string[] }[];
  art: "lattice" | "funnel" | "channel" | "gather";
};

export const projects: Project[] = [
  {
    id: "shamir-7",
    title: "Shamir-7",
    subtitle: "Verification for AI coding agents",
    status: "In development",
    tech: ["Rust", "Tree-sitter", "Git"],
    summary:
      "Exploring how to verify AI-generated code against explicit constraints — turning a shifting code structure into an ordered, checkable dependency graph.",
    art: "lattice",
    details: [
      { heading: "Being built", items: ["Incremental AST analysis with Tree-sitter", "Symbol and dependency mapping across a codebase"] },
      { heading: "Exploring", items: ["Behavioral and mutation testing to check agent changes", "Git workflow integration"] },
      { heading: "Note", items: ["Capabilities are in active development; listed directions are not yet shipped."] },
    ],
  },
  {
    id: "threshold",
    title: "Threshold",
    subtitle: "AI request evaluation",
    status: "Salesforce hackathon · Jul 2026",
    tech: ["React", "Node.js", "Claude"],
    summary:
      "Turns unstructured requests into validated fields, then hands them to deterministic backend scoring — the model never gets the final say unchecked.",
    art: "funnel",
    details: [
      { heading: "How it works", items: ["Extracts structured information from free-form requests", "Validates model outputs before deterministic scoring"] },
      { heading: "Reliability", items: ["Handles malformed JSON, schema violations and inconsistent inputs"] },
      { heading: "Outcome", items: [`${metrics.thresholdLatencyReduction} lower processing time`] },
    ],
  },
  {
    id: "cipherchat",
    title: "CipherChat",
    subtitle: "Encrypted messaging",
    status: "Built",
    tech: ["React Native", "Socket.io", "MongoDB"],
    summary: "Real-time mobile messaging where every message crosses the wire AES-256 encrypted inside JWT-authenticated sessions.",
    art: "channel",
    details: [
      { heading: "Security", items: ["AES-256 message encryption", "JWT-authenticated sessions"] },
      { heading: "Realtime", items: ["Socket.io transport for live messaging", "MongoDB persistence"] },
    ],
  },
];

export const supporting = [
  { title: "BookXchange", tech: "Java · MySQL · React · TypeScript", note: "Student book marketplace." },
  { title: "AdmitStack", tech: "TypeScript · PostgreSQL", note: "Admissions-related software." },
];

export const programs = ["AI4All Ignite", "Code2040", "Keploy API Fellowship", "CodePath", "AddisCoder", "EducationUSA", "ColorStack"];

export const skills: { area: string; items: string[] }[] = [
  { area: "Systems / Backend", items: ["C", "Rust", "Java", "Node.js", "REST", "Job orchestration", "POSIX"] },
  { area: "Frontend / Mobile", items: ["React", "TypeScript", "React Native"] },
  { area: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB"] },
  { area: "AI Integration", items: ["Claude", "Structured output validation", "NLP"] },
  { area: "Developer Tooling", items: ["Git", "Tree-sitter", "Integration testing", "Observability"] },
];

export const community = [
  { role: "College Application Mentor", org: "CPT · Summer 2024" },
  { role: "Student in 2023 · Mentor for the next cohort in 2024", org: "EducationUSA Scholars Program" },
  { role: "Big Sib Mentor", org: "For a first-year international student" },
];
