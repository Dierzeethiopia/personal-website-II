// Single source of truth for all profile content and résumé metrics.
export const metrics = {
  slackEngagementLift: "33%",
  slackExperimentScale: "hundreds of thousands of users",
  gubaRerenderReduction: "27%",
  thresholdPlacement: "3rd place",
  thresholdLatencyReduction: "~29%",
  opportunityUniversitiesTarget: "10",
  opportunityStudentsTarget: "~25,000",
};

export const links = {
  email: "daa3@williams.edu",
  linkedin: "https://www.linkedin.com/in/dires-a-abatieneh",
  github: "https://github.com/Dierzeethiopia",
};

export const profile = {
  name: "Dires Abatieneh",
  greeting: "ሰላም — hi, I’m Dires.",
  focus: ["Backend", "Infrastructure", "AI"],
  school: "CS + Mathematics at Williams College ’28",
  previously: "Previously SWE Intern at Slack / Salesforce",
  tagline: "I build systems that feel simple on the surface, with a lot happening underneath.",
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
    status: `Salesforce hackathon · Jul 2026 · ${metrics.thresholdPlacement}`,
    tech: ["React", "Node.js", "Claude"],
    summary:
      "Turns unstructured requests into validated fields, then hands them to deterministic backend scoring — the model never gets the final say unchecked.",
    art: "funnel",
    details: [
      { heading: "How it works", items: ["Extracts structured information from free-form requests", "Validates model outputs before deterministic scoring"] },
      { heading: "Reliability", items: ["Handles malformed JSON, schema violations and inconsistent inputs"] },
      { heading: "Outcome", items: [`${metrics.thresholdPlacement} at the hackathon`, `${metrics.thresholdLatencyReduction} lower processing time`] },
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
  {
    id: "homeroam",
    title: "Homeroam",
    subtitle: "Education platform for Ethiopia",
    status: "Early-stage venture · customer discovery",
    tech: ["Web", "Mobile", "Product"],
    summary:
      "A proposed shared space bringing assignments, grades, learning materials and communication together for Ethiopian institutions.",
    art: "gather",
    details: [
      { heading: "Proposed", items: ["Assignments, grades, materials and messaging in one place", "Web and mobile access for administrators, instructors and students"] },
      { heading: "My role", items: ["Lead vision, product and business development", "Active team collaboration began August 2026"] },
      { heading: "Traction", items: ["Early conversations with Ethiopian university leaders"] },
    ],
  },
];

export const supporting = [
  { title: "HTTP Web Server", tech: "C · POSIX sockets · pthreads", note: "Static files, persistent connections, adaptive timeouts; tested with curl/netcat." },
  { title: "BookXchange", tech: "Java · MySQL · React · TypeScript", note: "Student book marketplace." },
  { title: "AdmitStack", tech: "TypeScript · PostgreSQL", note: "Admissions-related software." },
  { title: "Author Identification", tech: "NLP · Language models", note: "Coursework in progress — attributing text across ten authors." },
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
  { role: "Co-founder & President", org: "Ethiopian & Eritrean Students Association" },
  { role: "Board Member", org: "African Students Association" },
  { role: "Event Coordinator", org: "Orthodox Students Association" },
  { role: "Leader", org: "International Orientation" },
  { role: "Big Sib Mentor", org: "For a first-year international student" },
];
