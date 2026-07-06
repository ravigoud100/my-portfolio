/* =========================================================
   Ravi Anumantula — Portfolio
   Edit the SKILLS and EXPERIENCE arrays below to update content.
   ========================================================= */

const SKILLS = [
  { label: "// frontend", tags: ["React", "Next.js", "Angular", "Tailwind CSS", "Angular Material", "SCSS"] },
  { label: "// ai / ml", tags: ["Spring AI", "LangChain4j", "Anthropic Claude", "OpenAI", "RAG", "pgvector"] },
  { label: "// backend", tags: ["Spring Boot", "Spring Security", "Spring Data JPA", "Hibernate", "REST", "GraphQL", "MapStruct"] },
  { label: "// state", tags: ["Redux Toolkit", "RTK Query", "NgRx", "RxJS", "React Hooks"] },
  { label: "// data", tags: ["PostgreSQL", "MySQL", "Oracle", "Azure SQL", "MongoDB", "Redis", "Cassandra", "DynamoDB"] },
  { label: "// messaging", tags: ["Apache Kafka", "RabbitMQ", "WebSockets"] },
  { label: "// cloud & devops", tags: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Helm", "Argo CD", "Terraform", "GitHub Actions", "Jenkins"] },
  { label: "// security", tags: ["OAuth 2.0", "OIDC", "JWT", "Keycloak", "RBAC", "PCI-DSS", "HIPAA", "SOC 2"] },
  { label: "// testing & observability", tags: ["JUnit 5", "Mockito", "Cypress", "Playwright", "Prometheus", "Grafana", "Splunk", "ELK"] },
];

const EXPERIENCE = [
  {
    role: "Senior Full Stack Developer",
    company: "Dartmouth Health — Lebanon, NH (Remote)",
    date: "Jun 2024 – Present",
    points: [],
  },
  {
    role: "Full Stack Developer",
    company: "Keefe Group — Bridgeton, MO",
    date: "Mar 2022 – May 2024",
    points: [],
  },
  {
    role: "Full Stack Developer",
    company: "Mastercard — O'Fallon, MO",
    date: "Mar 2021 – Feb 2022",
    points: [],
  },
  {
    role: "Full Stack Developer",
    company: "Michaels Stores — Chicago, IL",
    date: "Jan 2020 – Feb 2021",
    points: [],
  },
  {
    role: "Software Developer",
    company: "CouponDunia — Mumbai, India",
    date: "Jan 2019 – Dec 2019",
    points: [],
  },
];

/* ---------- render skills ---------- */
const skillsGrid = document.getElementById("skillsGrid");
if (skillsGrid) {
  skillsGrid.innerHTML = SKILLS.map((s, i) => `
    <div class="skill reveal" style="--i:${i % 2}">
      <p class="skill__label">${s.label}</p>
      <div class="skill__tags">
        ${s.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>
    </div>`).join("");
}

/* ---------- render experience ---------- */
function parseEntryDate(dateStr) {
  const year = (dateStr.match(/\d{4}/g) || [])[0] || "";
  const months = dateStr.replace(/\d{4}/g, "").replace(/\s+/g, " ").trim();
  return { year, months };
}

const timeline = document.getElementById("timeline");
if (timeline) {
  timeline.innerHTML = `
    <div class="timeline__progress" id="timelineProgress" aria-hidden="true"></div>
    ${EXPERIENCE.map((e, i) => {
      const { year, months } = parseEntryDate(e.date);
      const isPresent = /present/i.test(e.date);
      const indexLabel = String(EXPERIENCE.length - i).padStart(2, "0");
      return `
    <article class="entry reveal" style="--i:${i}">
      <div class="entry__datecol">
        <span class="entry__year">${year}</span>
        <span class="entry__months">${months}</span>
      </div>
      <span class="entry__dot" aria-hidden="true"></span>
      <div class="entry__content">
        <div class="entry__top">
          <span class="entry__role">${e.role}</span>
          ${isPresent ? `<span class="entry__pill"><span class="entry__pill-dot" aria-hidden="true"></span>present</span>` : ""}
        </div>
        <p class="entry__company">${e.company}</p>
      </div>
      <span class="entry__index" aria-hidden="true">${indexLabel}</span>
    </article>`;
    }).join("")}
  `;
}

/* ---------- mobile nav ---------- */
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------- scroll reveal ---------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- timeline scroll progress ---------- */
const prefersReducedMotion = window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (timeline && !prefersReducedMotion) {
  const progressEl = document.getElementById("timelineProgress");
  let ticking = false;
  const updateTimelineProgress = () => {
    if (!progressEl) return;
    const rect = timeline.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const raw = (vh / 2 - rect.top) / (rect.height || 1);
    const pct = Math.min(1, Math.max(0, raw));
    progressEl.style.height = `${pct * 100}%`;
  };
  const onTimelineScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateTimelineProgress();
      ticking = false;
    });
  };
  window.addEventListener("scroll", onTimelineScroll, { passive: true });
  window.addEventListener("resize", onTimelineScroll);
  updateTimelineProgress();
}

/* ---------- active nav link on scroll ---------- */
const sections = [...document.querySelectorAll("section[id]")];
const navAnchors = [...document.querySelectorAll(".nav__links a")];
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach((a) =>
          a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`)
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spy.observe(s));

/* ---------- footer year ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
