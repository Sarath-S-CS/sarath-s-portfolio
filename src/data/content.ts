/*
 * All of the site's text lives here. Facts come from Sarath's CV and the
 * issuers' public verification pages; don't add claims not backed by one.
 */

export const profile = {
  name: "Sarath Surendran",
  title: "Cybersecurity Engineer",
  tagline:
    "Cloud security, identity and vulnerability management across Azure, AWS and Microsoft 365.",
  location: "Dublin, Ireland",
  email: "sarath2552@gmail.com",
  linkedin: "https://www.linkedin.com/in/sarath-surendran",
  github: "https://github.com/Sarath-S-CS",
  resume: "Sarath_Surendran_CV.pdf",
};

export const about = {
  paragraphs: [
    "I'm a cloud security, identity and vulnerability management engineer. I work across Azure, Microsoft Entra ID and Defender for Cloud, assessing and remediating security posture across enterprise Azure, AWS, Microsoft 365 and hybrid tenants. I'm currently a Cyber Security Consultant at Arctic Wolf, the designated security engineer for a portfolio of enterprise customers.",
    "Before that I spent eight years in engineering roles at Wipro, Commvault, Hewlett Packard Enterprise and Tata Consultancy Services, from a 10,000-user Active Directory estate to Microsoft security stacks across five enterprise tenants, then completed an MSc in Cybersecurity Risk Management at the University of Galway. I prioritise by exploitability and business impact, give every finding an owner and a date, and explain risk in the language of the team that has to fix it.",
  ],
};

// Grouped the same way as the CV's "Core skills" section.
export const skills: { group: string; items: string[] }[] = [
  {
    group: "Cloud & platform security",
    items: ["Defender for Cloud (CSPM)", "Azure", "AWS", "Microsoft 365", "CIS Benchmarks", "Azure Policy", "Docker", "Kubernetes"],
  },
  {
    group: "Identity & access management",
    items: ["Microsoft Entra ID", "Active Directory", "Conditional Access", "MFA", "RBAC & least privilege", "Privileged access", "Intune"],
  },
  {
    group: "Vulnerability & exposure management",
    items: ["Qualys", "Rapid7", "Nessus", "CVSS prioritisation", "Patch governance", "SCCM", "Attack surface management"],
  },
  {
    group: "Governance, risk & compliance",
    items: ["ISO 27001", "NIST CSF", "GDPR", "NIS2", "PCI DSS", "SOC 2", "Risk registers"],
  },
  {
    group: "Security monitoring & reporting",
    items: ["Microsoft Sentinel (KQL)", "Splunk (SPL)", "Purview", "Defender for Endpoint", "ServiceNow"],
  },
  {
    group: "Automation & scripting",
    items: ["PowerShell", "Python", "Bash", "Microsoft Copilot", "Claude", "GitHub Actions"],
  },
];

export interface Project {
  title: string;
  description: string;
  stack: string[];
  href: string;
  cta: string;
}

export const projects: Project[] = [
  {
    title: "SimplifiedCS",
    description:
      "A free self-assessment platform for small businesses. Traces each finding to NIST CSF and CIS Controls, flags risky combinations of answers against MITRE ATT&CK, and checks reported products against live NVD and CISA KEV data.",
    stack: ["JavaScript", "Netlify Functions", "Supabase", "Claude API", "NVD API"],
    href: "https://simplifiedcs.net",
    cta: "Visit site",
  },
  {
    title: "AI assistant security review",
    description:
      "A simulated engagement on a 500-person firm's GenAI assistant over SharePoint. Mapped five trust boundaries and scored seven findings by likelihood and impact against MITRE ATT&CK and ATLAS.",
    stack: ["Microsoft 365", "Entra ID", "Azure OpenAI", "MITRE ATT&CK", "MITRE ATLAS"],
    href: "https://simplifiedcs.net/case-studies",
    cta: "Read case study",
  },
  {
    title: "DevSecOps path",
    description:
      "TryHackMe's intermediate DevSecOps path: 18 hands-on labs across the secure SDLC, pipeline and build security, SAST, DAST, container hardening and infrastructure as code.",
    stack: ["CI/CD security", "SAST", "DAST", "Docker", "Kubernetes", "IaC"],
    href: "https://tryhackme.com/path/outline/devsecops",
    cta: "View path",
  },
];

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
