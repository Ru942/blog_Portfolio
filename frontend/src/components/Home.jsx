import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Footer from "./common/Footer";
import ProfilePhoto    from "../assets/profile-photo.jpg";


/* ── Data ─────────────────────────────────────────────────────────────────── */

const ROLES = [
  "Full Stack Developer",
  "React Engineer",
  "Android Developer",
  ".NET MAUI Dev",
  "MERN Stack Builder"
];

const STATS = [
  { value:"1+",  label:"Years Exp.",       icon:"⚡" },
  { value:"10+", label:"Projects Shipped", icon:"🚀" },
  { value:"98%", label:"CSAT Score",       icon:"⭐" },
  { value:"6",   label:"Awards Won",       icon:"🏆" },
];

const ABOUT_POINTS = [
  {
    icon:"🧠",
    title:"Problem Solver",
    body:"Root-cause analysis at Walmart scale — 90+ tickets/week, 7 Lines of Business, enterprise-grade debugging."
  },
  {
    icon:"⚛",
    title:"React Developer",
    body:"Component-driven UIs, hooks-first architecture, API integration, and production Vercel deployments."
  },
  {
    icon:"📱",
    title:"Mobile Developer",
    body:"Native Android (Java/Kotlin), cross-platform .NET MAUI, and custom REST API backends."
  },
  {
    icon:"🌐",
    title:"CCNA Certified",
    body:"Cisco-certified — OSPF, BGP, EIGRP, VPN configuration in live infrastructure at BSNL."
  },
  {
    icon:"⚙",
    title:"Backend Explorer",
    body:"Node.js + Express REST APIs, MongoDB CRUD, Nodemailer bulk-mail, Mongoose schemas."
  },
  {
    icon:"🎯",
    title:"Goal: SWE Role",
    body:"Building toward a full-time Software Engineering role, combining enterprise depth with MERN skills."
  },
];

const JOURNEY = [
  {
    year:"2020",
    org:"K. Ramakrishnan College",
    role:"Started B.Tech — IT",
    body:"Began engineering in Trichy. Explored networking, programming, and mobile fundamentals."
  },
  {
    year:"2023",
    org:"BSNL — Internship",
    role:"Telecom Network Intern",
    body:"Configured OSPF, BGP, EIGRP routing protocols and VPN on live multi-site infrastructure."
  },
  {
    year:"2023",
    org:"Pega & IBM",
    role:"Certified — PCSA, PCSSA, IBM DA",
    body:"Completed 3 major certifications strengthening BPM, case management, and data skills."
  },
  {
    year:"2024",
    org:"Hotspot Express",
    role:"Android Developer",
    body:"Production Android apps in Java/Kotlin; built custom REST APIs improving speed by 30%."
  },
  {
    year:"2024",
    org:"K. Ramakrishnan College",
    role:"B.Tech Graduated",
    body:"IT degree completed. Began freelance frontend work and published open-source projects."
  },
  {
    year:"2025",
    org:"Walmart Global Tech",
    role:"Resolution Coordinator",
    body:"Managing 90+ tickets/week. 6 awards. Debugging Oracle, WMTS, VMware at enterprise scale."
  },
  {
    year:"→",
    org:"Next Chapter",
    role:"Full Stack Software Engineer",
    body:"Targeting a product engineering team where I ship features, not just fix them.",
    isGoal:true
  },
];

const RESPONSIBILITIES = [
  "Incident Management",
  "Transportation Support",
  "Pickup Support",
  "Online Grocery",
  "Chat Support",
  "Email Support",
  "Root Cause Analysis",
  "Cross-team Collaboration",
  "ServiceNow ITSM",
  "Technical Debugging",
  "Escalation Handling",
  "Customer Communication"
];

const ACHIEVEMENTS = [
  "Maintained 98–100% CSAT across all ticket types",
  "Managed 90+ tickets/week across 7 Lines of Business",
  "Reduced average handle time to 120 seconds",
  "Received 3 Excellence Awards + 3 Bravo Awards",
  "Debugged Oracle, WMTS, VMware at enterprise scale",
  "Coordinated Billing, Delivery & Operations teams"
];

const SKILLS = [
  {
    cat:"Frontend",
    color:"#4f6ef7",
    items:[
      "React.js",
      "JavaScript ES6+",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive Design",
      "DOM APIs"
    ]
  },
  {
    cat:"Backend",
    color:"#7c3aed",
    items:[
      "Node.js",
      "Express.js",
      "REST APIs",
      "Nodemailer",
      "Custom APIs"
    ]
  },
  {
    cat:"Mobile",
    color:"#0891b2",
    items:[
      "Java",
      "Kotlin",
      "Android Studio",
      ".NET MAUI",
      "C#"
    ]
  },
  {
    cat:"Database",
    color:"#059669",
    items:[
      "MongoDB",
      "MySQL",
      "Oracle",
      "SQL Server",
      "Mongoose"
    ]
  },
  {
    cat:"Network",
    color:"#d97706",
    items:[
      "CCNA",
      "TCP/IP",
      "OSPF",
      "BGP",
      "EIGRP",
      "VPN"
    ]
  },
  {
    cat:"Tools",
    color:"#db2777",
    items:[
      "Git",
      "GitHub",
      "VS Code",
      "ServiceNow",
      "VMware",
      "Figma"
    ]
  },
];

const tagColors = {
  Latest:"#10b981",
  Featured:"#f59e0b",
  New:"#6378ff"
};


/* ═══════════════════════════════════════════════════════════════════════════
   PROJECT DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    n:"01",
    tag:"Latest",
    title:"Dynamic Gallery",
    stack:["React","Hooks","Vercel"],
    img:null,

    live:"https://dynamic-gallery-eight.vercel.app/",
    code:"https://github.com/Ru942/Dynamic-Gallery",
    li:"https://www.linkedin.com/posts/rupesh-k-r-70864a204_react-app-activity-7486805084094439424-euX3",

    feat:"Component-driven image gallery with dynamic filtering, smooth transitions, fully responsive grid.",

    ch:"Build a fast interactive gallery with modern component architecture.",
    sol:"React functional components + hooks for state-driven rendering.",
    res:"Smooth browsing experience and reusable component structure."
  },

  {
    n:"02",
    tag:"Featured",
    title:"Nostra — Fashion E-Commerce",
    stack:["HTML5","CSS3","JS"],
    img:null,

    live:"https://ru942.github.io/Nostra/",
    code:"https://github.com/Ru942/Nostra",
    li:"https://www.linkedin.com/posts/rupesh-k-r-70864a204_github-ru942nostra-activity-7481977327204134912-Ar99",

    feat:"Responsive UI, product collections, JS-powered search, category filters, hero slider.",

    ch:"Build a responsive e-commerce site with dynamic search and filtering.",
    sol:"Modern fashion store with JS-powered search and category filtering.",
    res:"Responsive across desktop, tablet and mobile."
  },

  {
    n:"03",
    tag:"Featured",
    title:"Greenden — Plant Store",
    stack:["HTML","Tailwind CSS"],
    img:null,

    live:"https://ru942.github.io/Greenden-Tailwind/",
    code:"https://github.com/Ru942/Greenden-Tailwind",
    li:"https://www.linkedin.com/posts/rupesh-k-r-70864a204_github-ru942greenden-tailwind-activity-7476357281308229632-iHdS",

    feat:"Responsive landing page, product cards, customer reviews, clean utility-first design.",

    ch:"Create a fast modern website using Tailwind CSS.",
    sol:"Responsive plant store using utility-first classes.",
    res:"Lightweight website with strong mobile responsiveness."
  },

  {
    n:"04",
    tag:"Featured",
    title:"Globe Buddy — Travel Clone",
    stack:["HTML","CSS"],
    img:null,

    live:"https://ru942.github.io/GlobeBuddy_Clone_Website/",
    code:"https://github.com/Ru942/GlobeBuddy_Clone_Website",
    li:"https://www.linkedin.com/posts/rupesh-k-r-70864a204_github-ru942globlebuddywebsite-globebuddy-activity-7474009625151950848-TlYg",

    feat:"Travel landing page, destination cards, hotel listings, responsive design.",

    ch:"Recreate a TripAdvisor-style travel interface.",
    sol:"Responsive layouts and travel cards with clean HTML/CSS.",
    res:"Clean UI and responsive layout."
  },

  {
    n:"05",
    tag:"Featured",
    title:"Udemy Clone",
    stack:["HTML","CSS"],
    img:null,

    live:"https://ru942.github.io/Udemy_Clone_website/",
    code:"https://github.com/Ru942/Udemy_Clone_website",
    li:"https://www.linkedin.com/posts/rupesh-k-r-70864a204_udemy-clone-activity-7471467764566716416-8w3v",

    feat:"Hero banner, course cards, navigation, categories and responsive layout.",

    ch:"Build an online learning platform interface.",
    sol:"Responsive grids and intuitive navigation.",
    res:"Improved layout design and responsive skills."
  },

  {
    n:"06",
    tag:"New",
    title:"Student List App",
    stack:["React","useState"],
    img:null,

    live:"https://favourite-student-list-livid.vercel.app/",
    code:"https://github.com/Ru942/favourite-student-list",
    li:"https://www.linkedin.com/posts/rupesh-k-r-70864a204_react-app-activity-7491564311165833216-b1zv",

    feat:"React app for managing student records — adding, viewing, organizing.",

    ch:"Interactive UI for creating and organizing student records.",
    sol:"React state and component composition for real-time list management.",
    res:"Clean responsive interface for adding and viewing records."
  },

  {
    n:"07",
    tag:"New",
    title:"Weather Report",
    stack:["JavaScript","Weather API"],
    img:null,

    live:"https://weather-report-umqx.vercel.app/",
    code:"https://github.com/Ru942/WeatherReport",
    li:"https://www.linkedin.com/posts/rupesh-k-r-70864a204_github-ru942weatherreport-activity-7494262992856068096-2Gw9",

    feat:"Live weather lookup for any searched location with responsive UI.",

    ch:"Fetch and present live weather data for any location.",
    sol:"Integrated Weather API with JS for live condition rendering.",
    res:"Fast responsive weather lookup across all devices."
  },

  {
    n:"08",
    tag:"New",
    title:"Netflix Login Clone",
    stack:["HTML","CSS","JS"],
    img:null,

    live:"https://netflix-login-clone-swart.vercel.app/",
    code:"https://github.com/Ru942/Netflix-Login-Clone",
    li:"https://www.linkedin.com/posts/rupesh-k-r-70864a204_github-ru942netflix-login-clone-activity-7496752200896000000-odGj",

    feat:"Pixel-accurate Netflix sign-in recreation with form validation.",

    ch:"Recreate a polished sign-in UI with proper validation.",
    sol:"HTML/CSS layout with JavaScript-driven form validation.",
    res:"Close responsive recreation of Netflix's sign-in flow."
  },

  {
    n:"09",
    tag:"New",
    title:"MongoDB CRUD Lab",
    stack:["Node.js","Express","MongoDB"],
    img:null,

    live:"https://github.com/Ru942/mongodb-crud-lab",
    code:"https://github.com/Ru942/MongoDB-CRUD-Lab",
    li:"https://www.linkedin.com/posts/rupesh-k-r-70864a204_github-ru942mongodb-crud-lab-activity-7499714486958927872-H3ZE",

    feat:"Full CRUD operations against MongoDB using Express and Mongoose.",

    ch:"Build a complete CRUD API against a real database.",
    sol:"Full CRUD routes with Express and Mongoose over MongoDB.",
    res:"Working reference API covering every CRUD operation."
  },

  {
    n:"10",
    tag:"New",
    title:"Bulk Mail App",
    stack:["Node.js","Nodemailer"],
    img:null,

    live:"https://bulk-mail-app-liard-six.vercel.app/",
    code:"https://github.com/Ru942/Bulk-Mail-App",
    li:"https://www.linkedin.com/posts/rupesh-k-r-70864a204_github-ru942bulk-mail-app-activity-7502255998594650112-JUAF",

    feat:"Backend utility for sending bulk emails through a simple API.",

    ch:"Send bulk emails reliably through a backend API.",
    sol:"Express API wired to Nodemailer for bulk email sending.",
    res:"Reusable bulk-mail utility exposed through a clean API."
  }
];


const CERTS = [
  { icon:"🔵", name:"Cisco CCNA",                       yr:"2023" },
  { icon:"🟣", name:"Pega PCSA",                       yr:"2023" },
  { icon:"🟣", name:"Pega PCSSA",                      yr:"2023" },
  { icon:"🟡", name:"IBM Data Analysis with Python",   yr:"2023" },
  { icon:"🟢", name:"Accenture Digital Skills — AI/UX",yr:"2023" },
  { icon:"⚪", name:"Business Analysis Foundations",    yr:"2023" },
];


/* ── Custom hooks ─────────────────────────────────────────────────────────── */

function useTypewriter(words, speed = 95, pause = 1800) {
  const [display,  setDisplay]  = useState("");
  const [wordIdx,  setWordIdx]  = useState(0);
  const [charIdx,  setCharIdx]  = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];

    const t = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));

        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));

        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx(w => (w + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);

    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}


function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}


/* ── Reusable components ──────────────────────────────────────────────────── */

function SectionHeading({ label, title, subtitle, center }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{
        textAlign: center ? "center" : "left",
        marginBottom: "52px"
      }}
    >
      <div
        className={`section-label ${inView ? "anim-fade-up" : ""}`}
        style={{
          justifyContent: center ? "center" : "flex-start",
          opacity: inView ? 1 : 0
        }}
      >
        {label}
      </div>

      <h2
        className={`display-lg ${inView ? "anim-fade-up delay-100" : ""}`}
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          opacity: inView ? 1 : 0
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={inView ? "anim-fade-up delay-200" : ""}
          style={{
            fontSize:"16px",
            color:"var(--text-muted)",
            maxWidth:"520px",
            lineHeight:1.65,
            margin: center ? "0 auto" : "0",
            opacity: inView ? 1 : 0
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}


function AboutCard({ pt, delay }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`glass-card ${inView ? "anim-fade-up" : ""}`}
      style={{
        padding:"24px",
        animationDelay:`${delay}s`,
        opacity: inView ? undefined : 0
      }}
    >
      <div style={{ fontSize:"26px", marginBottom:"12px" }}>
        {pt.icon}
      </div>

      <h3
        style={{
          fontFamily:"'Space Grotesk',sans-serif",
          fontSize:"15px",
          fontWeight:700,
          color:"var(--text-primary)",
          marginBottom:"8px"
        }}
      >
        {pt.title}
      </h3>

      <p
        style={{
          fontSize:"13px",
          color:"var(--text-muted)",
          lineHeight:1.7
        }}
      >
        {pt.body}
      </p>
    </div>
  );
}


function JourneyItem({ j, i, last }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{
        display:"flex",
        gap:"20px",
        marginBottom:"20px",
        opacity: inView ? 1 : 0,
        animation: inView
          ? `fadeUp 0.5s ${i * 0.06}s both`
          : "none"
      }}
    >
      <div
        style={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          flexShrink:0
        }}
      >
        <div
          style={{
            width:"38px",
            height:"38px",
            borderRadius:"50%",
            background: j.isGoal
              ? "linear-gradient(135deg,var(--accent-blue),var(--accent-violet))"
              : "var(--bg-glass)",
            border:`2px solid ${
              j.isGoal
                ? "transparent"
                : "var(--border-subtle)"
            }`,
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            fontSize:"10px",
            fontWeight:800,
            color: j.isGoal
              ? "#fff"
              : "var(--accent-blue)",
            backdropFilter:"blur(8px)",
            boxShadow: j.isGoal
              ? "0 0 20px var(--glow-blue)"
              : "var(--shadow-sm)",
            flexShrink:0
          }}
        >
          {j.year}
        </div>

        {!last && (
          <div
            style={{
              width:"2px",
              flex:1,
              minHeight:"20px",
              marginTop:"6px",
              background:"linear-gradient(to bottom,var(--accent-blue),var(--accent-violet))",
              opacity:0.25
            }}
          />
        )}
      </div>

      <div
        className="glass-card"
        style={{
          padding:"18px 20px",
          flex:1,
          marginBottom:"6px",
          borderColor: j.isGoal
            ? "color-mix(in srgb,var(--accent-blue) 30%,transparent)"
            : undefined,
          background: j.isGoal
            ? "color-mix(in srgb,var(--accent-blue) 6%,var(--bg-glass))"
            : undefined
        }}
      >
        <div
          style={{
            fontSize:"11px",
            fontWeight:600,
            color:"var(--accent-blue)",
            marginBottom:"3px"
          }}
        >
          {j.org}
        </div>

        <h3
          style={{
            fontFamily:"'Space Grotesk',sans-serif",
            fontSize:"15px",
            fontWeight:700,
            color:"var(--text-primary)",
            marginBottom:"5px"
          }}
        >
          {j.role}
        </h3>

        <p
          style={{
            fontSize:"13px",
            color:"var(--text-muted)",
            lineHeight:1.65
          }}
        >
          {j.body}
        </p>
      </div>
    </div>
  );
}


function RoleSection({ section }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`glass-card ${inView ? "anim-fade-up" : ""}`}
      style={{
        padding:"26px",
        opacity: inView ? undefined : 0
      }}
    >
      <h3
        style={{
          fontFamily:"'Space Grotesk',sans-serif",
          fontSize:"15px",
          fontWeight:700,
          color:section.color,
          marginBottom:"16px"
        }}
      >
        {section.title}
      </h3>

      {section.type === "pills" ? (
        <div
          style={{
            display:"flex",
            flexWrap:"wrap",
            gap:"7px"
          }}
        >
          {section.items.map(it => (
            <span key={it} className="tag">
              {it}
            </span>
          ))}
        </div>
      ) : (
        <ul
          style={{
            listStyle:"none",
            display:"flex",
            flexDirection:"column",
            gap:"9px"
          }}
        >
          {section.items.map(it => (
            <li
              key={it}
              style={{
                display:"flex",
                alignItems:"flex-start",
                gap:"9px",
                fontSize:"13px",
                color:"var(--text-secondary)",
                lineHeight:1.55
              }}
            >
              <span
                style={{
                  color:section.color,
                  flexShrink:0,
                  marginTop:"1px",
                  fontWeight:700
                }}
              >
                ✓
              </span>

              {it}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


function SkillCard({ cat, color, items, delay }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(null);

  return (
    <div
      ref={ref}
      className={`glass-card ${inView ? "anim-fade-up" : ""}`}
      style={{
        padding:"24px",
        animationDelay:delay,
        opacity: inView ? undefined : 0
      }}
    >
      <div
        style={{
          display:"flex",
          alignItems:"center",
          gap:"10px",
          marginBottom:"16px"
        }}
      >
        <div
          style={{
            width:"8px",
            height:"24px",
            borderRadius:"4px",
            background:color,
            flexShrink:0
          }}
        />

        <h3
          style={{
            fontFamily:"'Space Grotesk',sans-serif",
            fontSize:"15px",
            fontWeight:700,
            color:"var(--text-primary)"
          }}
        >
          {cat}
        </h3>
      </div>

      <div
        style={{
          display:"flex",
          flexWrap:"wrap",
          gap:"7px"
        }}
      >
        {items.map((item, i) => (
          <span
            key={item}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding:"5px 13px",
              borderRadius:"var(--r-pill)",
              fontSize:"12px",
              fontWeight:500,
              background:
                hovered === i
                  ? `color-mix(in srgb,${color} 15%,transparent)`
                  : "var(--bg-glass)",
              color:
                hovered === i
                  ? color
                  : "var(--text-muted)",
              border:
                `1px solid ${
                  hovered === i
                    ? color+"44"
                    : "var(--border-subtle)"
                }`,
              backdropFilter:"blur(8px)",
              cursor:"default",
              transition:"all 0.18s"
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   NEW PROJECT CARD
   ═══════════════════════════════════════════════════════════════════════════ */

function ProjectCard({ p, index }) {
  const [ref, inView] = useInView(0.1);
  const [expanded, setExpanded] = useState(false);

  const visualCode = p.title
    .split(" ")
    .map(word => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const themeClass =
    p.stack.some(x => /react|hook/i.test(x))
      ? "theme-react"
      : p.stack.some(x => /node|mongo|express|nodemailer/i.test(x))
        ? "theme-backend"
        : p.stack.some(x => /javascript|js/i.test(x))
          ? "theme-javascript"
          : p.stack.some(x => /tailwind|html|css/i.test(x))
            ? "theme-web"
            : "theme-default";

  return (
    <article
      ref={ref}
      className={`project-vault-card ${themeClass} ${
        inView ? "project-card-visible" : ""
      }`}
      style={{ "--project-delay": `${(index % 2) * 0.08}s` }}
    >
      <div className="project-visual">
        <div className="project-visual-bg" aria-hidden="true">
          <div className="project-noise"></div>
          <div className="project-glow glow-a"></div>
          <div className="project-glow glow-b"></div>
          <div className="project-grid"></div>
          <div className="project-ring ring-one"></div>
          <div className="project-ring ring-two"></div>

          <div className="project-browser">
            <div className="browser-bar">
              <span></span>
              <span></span>
              <span></span>
              <b>BUILD_{p.n}</b>
            </div>

            <div className="browser-canvas">
              <div className="canvas-sidebar"></div>
              <div className="canvas-content">
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>
          </div>

          <div className="project-monogram">{visualCode}</div>
        </div>

        <div className="project-visual-overlay"></div>

        <div className="project-top-meta">
          <span className="project-index">
            {p.n}<small>/10</small>
          </span>

          <span className="project-category">
            {p.stack[0]}
          </span>
        </div>

        {p.tag && (
          <div
            className="project-badge"
            style={{
              "--badge-color": tagColors[p.tag] || "var(--accent-blue)"
            }}
          >
            <span className="project-badge-dot"></span>
            {p.tag}
          </div>
        )}

        <div className="project-center-mark" aria-hidden="true">
          <span>{visualCode}</span>
          <small>PROJECT {p.n}</small>
        </div>

        <div className="project-reveal">
          <div className="project-reveal-content">
            <span className="project-eyebrow">
              SELECTED BUILD · {p.n}
            </span>

            <h3>{p.title}</h3>

            <div className="project-tech-stack">
              {p.stack.map(tech => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="project-actions" aria-label={`${p.title} project links`}>
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action project-action-primary"
              aria-label={`Open live demo for ${p.title}`}
            >
              <span className="project-action-icon">↗</span>
              <small>Live</small>
            </a>
          )}

          {p.code && (
            <a
              href={p.code}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action"
              aria-label={`View source code for ${p.title}`}
            >
              <span className="project-action-icon">&lt;/&gt;</span>
              <small>Code</small>
            </a>
          )}

          {p.li && (
            <a
              href={p.li}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action project-linkedin"
              aria-label={`View LinkedIn post for ${p.title}`}
            >
              <span className="project-action-icon linkedin-icon">in</span>
              <small>Post</small>
            </a>
          )}
        </div>

        {p.live && (
          <a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            className="project-open-hit"
            aria-label={`Open live demo for ${p.title}`}
          />
        )}

        <div className="project-corner-arrow" aria-hidden="true">↗</div>
      </div>

      <div className="project-tech-strip">
        <div className="project-tech-list">
          {p.stack.map((tech, techIndex) => (
            <React.Fragment key={tech}>
              <span>{tech}</span>
              {techIndex < p.stack.length - 1 && <i>·</i>}
            </React.Fragment>
          ))}
        </div>

        <button
          type="button"
          className={`project-case-toggle ${expanded ? "active" : ""}`}
          onClick={() => setExpanded(prev => !prev)}
          aria-expanded={expanded}
        >
          <span>{expanded ? "Close" : "Case Study"}</span>
          <b>{expanded ? "−" : "+"}</b>
        </button>
      </div>

      <div className={`project-case-study ${expanded ? "expanded" : ""}`}>
        <div className="project-case-grid">
          <div>
            <span>01 · CHALLENGE</span>
            <p>{p.ch}</p>
          </div>

          <div>
            <span>02 · SOLUTION</span>
            <p>{p.sol}</p>
          </div>

          <div>
            <span>03 · RESULT</span>
            <p>{p.res}</p>
          </div>
        </div>
      </div>
    </article>
  );
}


function CertCard({ c, delay }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`glass-card ${inView ? "anim-fade-up" : ""}`}
      style={{
        padding:"16px 18px",
        display:"flex",
        alignItems:"center",
        gap:"12px",
        animationDelay:delay,
        opacity: inView ? undefined : 0
      }}
    >
      <span style={{ fontSize:"20px" }}>
        {c.icon}
      </span>

      <div>
        <p
          style={{
            fontSize:"13px",
            fontWeight:600,
            color:"var(--text-primary)",
            margin:0,
            lineHeight:1.3
          }}
        >
          {c.name}
        </p>

        <p
          style={{
            fontSize:"11px",
            color:"var(--text-faint)",
            margin:"2px 0 0"
          }}
        >
          {c.yr}
        </p>
      </div>
    </div>
  );
}


function BlogCta({ navigate }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`glass-card ${inView ? "anim-scale-in" : ""}`}
      style={{
        textAlign:"center",
        padding:"64px 40px",
        background:
          "linear-gradient(135deg,color-mix(in srgb,var(--accent-blue) 7%,var(--bg-glass)),color-mix(in srgb,var(--accent-violet) 7%,var(--bg-glass)))",
        opacity: inView ? undefined : 0
      }}
    >
      <div
        className="section-label"
        style={{
          justifyContent:"center",
          marginBottom:"14px"
        }}
      >
        Writing
      </div>

      <h2
        className="display-lg"
        style={{ marginBottom:"12px" }}
      >
        <span className="grad-text">
          Ideas & Experiments
        </span>
      </h2>

      <p
        style={{
          color:"var(--text-muted)",
          fontSize:"15px",
          maxWidth:"440px",
          margin:"0 auto 30px",
          lineHeight:1.7
        }}
      >
        Lessons from enterprise debugging, React patterns, and what I'm learning on the way to full stack.
      </p>

      <button
        className="btn-primary"
        onClick={() => navigate("/blogs")}
        style={{
          fontSize:"15px",
          padding:"12px 30px"
        }}
      >
        Read the Blog →
      </button>
    </div>
  );
}


/* ── Main Component ────────────────────────────────────────────────────────── */

export default function Home() {
  const navigate = useNavigate();
  const { dark } = useTheme();

  const role = useTypewriter(ROLES);

  const [filterActive, setFilterActive] = useState("All");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const [activeLabel, setActiveLabel] = useState(0);


  useEffect(() => {
    const t = setInterval(
      () => setActiveLabel(l => (l + 1) % 4),
      2200
    );

    return () => clearInterval(t);
  }, []);


  const handleContact = e => {
    e.preventDefault();

    const sub = encodeURIComponent(
      `Portfolio contact from ${name}`
    );

    const bod = encodeURIComponent(
      `${message}\n\n— ${name} (${email})`
    );

    window.location.href =
      `mailto:rupeshkuppusamy@gmail.com?subject=${sub}&body=${bod}`;

    setSent(true);
  };


  /* ── Project filters ───────────────────────────────────────────────────── */

  const FILTERS = [
    "All",
    "React",
    "JavaScript",
    "HTML/CSS",
    "Backend"
  ];


  const filterMap = {
    React:[
      "React",
      "Hooks"
    ],

    JavaScript:[
      "JavaScript",
      "Weather API",
      "JS"
    ],

    "HTML/CSS":[
      "HTML",
      "HTML5",
      "CSS",
      "CSS3",
      "Tailwind CSS"
    ],

    Backend:[
      "Node.js",
      "Express",
      "MongoDB",
      "Nodemailer"
    ]
  };


  const filtered =
    filterActive === "All"
      ? PROJECTS
      : PROJECTS.filter(project =>
          project.stack.some(stackItem =>
            (filterMap[filterActive] || []).some(
              filterItem =>
                stackItem.includes(filterItem)
            )
          )
        );


  const floatLabels = [
    {
      txt:"⚛ Frontend",
      color:"var(--accent-blue)"
    },
    {
      txt:"📱 Android",
      color:"var(--accent-violet)"
    },
    {
      txt:"🧩 .NET MAUI",
      color:"var(--accent-cyan)"
    },
    {
      txt:"🚀 Full Stack",
      color:"var(--accent-green)"
    },
  ];


  const ROLE_SECTIONS = [
    {
      title:"Responsibilities",
      color:"var(--accent-blue)",
      items:RESPONSIBILITIES,
      type:"pills"
    },
    {
      title:"Achievements",
      color:"var(--accent-green)",
      items:ACHIEVEMENTS,
      type:"list"
    },
  ];


  return (
    <div style={{ minHeight:"100vh" }}>

      {/* ═══════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════ */}

      <section
        style={{
          padding:"56px 28px 80px",
          maxWidth:"1120px",
          margin:"0 auto"
        }}
      >

        <div
          style={{
            display:"grid",
            gridTemplateColumns:"1fr auto",
            gap:"60px",
            alignItems:"center"
          }}
          className="hero-layout"
        >

          {/* LEFT */}

          <div>

            <div
              className="anim-fade-up"
              style={{ marginBottom:"22px" }}
            >
              <span
                style={{
                  display:"inline-flex",
                  alignItems:"center",
                  gap:"7px",
                  background:
                    "color-mix(in srgb,var(--accent-green) 12%,transparent)",
                  color:"var(--accent-green)",
                  border:
                    "1px solid color-mix(in srgb,var(--accent-green) 30%,transparent)",
                  fontSize:"12px",
                  fontWeight:600,
                  padding:"6px 16px",
                  borderRadius:"999px"
                }}
              >
                <span
                  style={{
                    width:"7px",
                    height:"7px",
                    borderRadius:"50%",
                    background:"var(--accent-green)",
                    boxShadow:"0 0 6px var(--accent-green)",
                    display:"inline-block",
                    animation:"pulseGlow 2s ease-in-out infinite"
                  }}
                />

                Available for opportunities
              </span>
            </div>


            <p
              className="anim-fade-up delay-100"
              style={{
                fontSize:"clamp(14px,2.5vw,18px)",
                fontWeight:400,
                color:"var(--text-muted)",
                marginBottom:"4px",
                fontFamily:"'Inter',sans-serif"
              }}
            >
              Hi, I'm
            </p>


            <h1
              className="display-xl anim-fade-up delay-200"
              style={{ marginBottom:"8px" }}
            >
              <span className="grad-text">
                Rupesh K R
              </span>
            </h1>


            <div
              className="anim-fade-up delay-300"
              style={{
                fontSize:"clamp(16px,2.8vw,22px)",
                fontWeight:600,
                color:"var(--text-secondary)",
                marginBottom:"20px",
                minHeight:"32px",
                fontFamily:"'Space Grotesk',sans-serif"
              }}
            >
              {role}

              <span
                style={{
                  display:"inline-block",
                  width:"2px",
                  height:"1.1em",
                  background:"var(--accent-blue)",
                  marginLeft:"2px",
                  verticalAlign:"text-bottom",
                  animation:"blink 1s step-end infinite"
                }}
              />
            </div>


            <p
              className="anim-fade-up delay-300"
              style={{
                fontSize:"15px",
                lineHeight:1.75,
                color:"var(--text-muted)",
                maxWidth:"490px",
                marginBottom:"26px"
              }}
            >
              Resolution Coordinator at Walmart Global Tech, building toward full stack engineering. I solve enterprise-scale problems by day and ship React + Node apps by night.
            </p>


            <div
              className="anim-fade-up delay-400"
              style={{
                display:"flex",
                flexWrap:"wrap",
                gap:"8px",
                marginBottom:"28px"
              }}
            >
              {[
                "⚛ React",
                "📱 Android",
                "🧩 .NET MAUI",
                "⚙ Node.js",
                "🌐 CCNA"
              ].map(b => (
                <span key={b} className="badge">
                  {b}
                </span>
              ))}
            </div>


            <div
              className="anim-fade-up delay-500"
              style={{
                display:"flex",
                flexWrap:"wrap",
                gap:"10px"
              }}
            >

              <a
                href="#contact"
                className="btn-primary"
              >
                ✉ Contact Me
              </a>


              <a
                href="#projects"
                className="btn-ghost"
              >
                → Projects
              </a>


              <a
                href="https://github.com/Ru942"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>

                GitHub
              </a>


              <a
                href="https://www.linkedin.com/in/rupesh-k-r-70864a204/"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                💼 LinkedIn
              </a>


              <a
                href="https://ru942.github.io/Portfolio/"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                📄 Resume
              </a>

            </div>

          </div>


          {/* RIGHT — PHOTO */}

          <div
            className="anim-float"
            style={{
              position:"relative",
              flexShrink:0
            }}
          >

            <div
              style={{
                position:"absolute",
                inset:"-4px",
                borderRadius:"30px",
                background:
                  "linear-gradient(135deg,var(--accent-blue),var(--accent-violet),var(--accent-cyan))",
                filter:"blur(16px)",
                opacity:0.4,
                animation:"pulseGlow 3s ease-in-out infinite"
              }}
            />


            <div
              style={{
                position:"relative",
                width:"266px",
                borderRadius:"24px",
                overflow:"hidden",
                border:"1px solid var(--border-glass)",
                background:"var(--bg-surface)",
                boxShadow:"var(--shadow-lg)"
              }}
            >

              <img
                src={ProfilePhoto}
                alt="Rupesh K R"
                style={{
                  width:"100%",
                  height:"308px",
                  objectFit:"cover",
                  objectPosition:"center top",
                  display:"block"
                }}
              />


              <div
                style={{
                  position:"absolute",
                  bottom:0,
                  left:0,
                  right:0,
                  background:
                    "linear-gradient(to top,rgba(0,0,0,0.82) 0%,transparent 100%)",
                  padding:"36px 16px 16px"
                }}
              >
                <p
                  style={{
                    margin:0,
                    color:"#fff",
                    fontFamily:"'Space Grotesk',sans-serif",
                    fontWeight:700,
                    fontSize:"15px"
                  }}
                >
                  Rupesh K R
                </p>

                <p
                  style={{
                    margin:"3px 0 0",
                    color:"rgba(255,255,255,0.65)",
                    fontSize:"12px"
                  }}
                >
                  Full Stack Developer
                </p>
              </div>


              <div
                style={{
                  position:"absolute",
                  top:"12px",
                  right:"12px",
                  display:"flex",
                  alignItems:"center",
                  gap:"5px",
                  background:"rgba(255,255,255,0.92)",
                  backdropFilter:"blur(10px)",
                  borderRadius:"999px",
                  padding:"4px 10px",
                  fontSize:"11px",
                  fontWeight:600,
                  color:"#059669"
                }}
              >
                <span
                  style={{
                    width:"6px",
                    height:"6px",
                    borderRadius:"50%",
                    background:"#10b981",
                    display:"inline-block"
                  }}
                />

                Open to work
              </div>

            </div>


            {/* Floating labels */}

            {floatLabels.map((fl, i) => {

              const positions = [
                {
                  top:"16px",
                  left:"-106px"
                },
                {
                  bottom:"90px",
                  left:"-92px"
                },
                {
                  top:"100px",
                  right:"-100px"
                },
                {
                  bottom:"16px",
                  right:"-112px"
                },
              ];

              const active = activeLabel === i;

              return (
                <div
                  key={fl.txt}
                  style={{
                    position:"absolute",
                    ...positions[i],
                    background:"var(--bg-glass)",
                    backdropFilter:"blur(14px)",
                    WebkitBackdropFilter:"blur(14px)",
                    border:
                      `1px solid ${
                        active
                          ? fl.color+"55"
                          : "var(--border-subtle)"
                      }`,
                    borderRadius:"11px",
                    padding:"6px 13px",
                    fontSize:"12px",
                    fontWeight:600,
                    color:
                      active
                        ? fl.color
                        : "var(--text-muted)",
                    boxShadow:
                      active
                        ? `0 4px 16px ${fl.color}33`
                        : "var(--shadow-sm)",
                    transition:
                      "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                    transform:
                      active
                        ? "scale(1.05)"
                        : "scale(1)",
                    whiteSpace:"nowrap"
                  }}
                >
                  {fl.txt}
                </div>
              );
            })}

          </div>

        </div>


        {/* STATS */}

        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(4,1fr)",
            gap:"16px",
            marginTop:"64px"
          }}
          className="stats-row"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="glass-card anim-fade-up"
              style={{
                padding:"20px",
                textAlign:"center",
                animationDelay:`${0.3 + i * 0.08}s`,
                opacity:0
              }}
            >
              <div
                style={{
                  fontSize:"22px",
                  marginBottom:"4px"
                }}
              >
                {s.icon}
              </div>

              <div
                style={{
                  fontFamily:"'Space Grotesk',sans-serif",
                  fontSize:"clamp(24px,3.5vw,34px)",
                  fontWeight:700,
                  background:
                    "linear-gradient(135deg,var(--accent-blue),var(--accent-violet))",
                  WebkitBackgroundClip:"text",
                  WebkitTextFillColor:"transparent",
                  backgroundClip:"text"
                }}
              >
                {s.value}
              </div>

              <p
                style={{
                  fontSize:"12px",
                  color:"var(--text-faint)",
                  marginTop:"3px",
                  fontWeight:500
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

      </section>


      <div
        className="rk-divider"
        style={{
          maxWidth:"1120px",
          margin:"0 auto"
        }}
      />


      {/* ═══════════════════════════════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════════════════════════════ */}

      <section
        id="about"
        className="section page-container"
      >

        <SectionHeading
          label="About Me"
          title="Who I Am"
          subtitle="Engineer by education, problem-solver by profession, developer by conviction."
        />

        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
            gap:"16px"
          }}
          className="about-grid"
        >
          {ABOUT_POINTS.map((pt, i) => (
            <AboutCard
              key={pt.title}
              pt={pt}
              delay={i * 0.07}
            />
          ))}
        </div>

      </section>


      <div
        className="rk-divider"
        style={{
          maxWidth:"1120px",
          margin:"0 auto"
        }}
      />


      {/* ═══════════════════════════════════════════════════════════════
          JOURNEY
      ═══════════════════════════════════════════════════════════════ */}

      <section
        id="journey"
        className="section page-container"
      >

        <SectionHeading
          label="Career"
          title="My Journey"
          subtitle="From networking labs to Walmart enterprise — building toward full stack engineering."
        />

        <div
          style={{
            maxWidth:"680px",
            margin:"0 auto"
          }}
        >
          {JOURNEY.map((j, i) => (
            <JourneyItem
              key={i}
              j={j}
              i={i}
              last={i === JOURNEY.length - 1}
            />
          ))}
        </div>

      </section>


      <div
        className="rk-divider"
        style={{
          maxWidth:"1120px",
          margin:"0 auto"
        }}
      />


      {/* ═══════════════════════════════════════════════════════════════
          CURRENT ROLE
      ═══════════════════════════════════════════════════════════════ */}

      <section
        id="role"
        className="section page-container"
      >

        <SectionHeading
          label="Current Role"
          title="Walmart Global Tech"
          subtitle="Resolution Coordinator · Feb 2025 – Present · Trichy, India"
        />

        <div
          style={{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            gap:"22px"
          }}
          className="role-grid"
        >
          {ROLE_SECTIONS.map(s => (
            <RoleSection
              key={s.title}
              section={s}
            />
          ))}
        </div>

      </section>


      <div
        className="rk-divider"
        style={{
          maxWidth:"1120px",
          margin:"0 auto"
        }}
      />


      {/* ═══════════════════════════════════════════════════════════════
          SKILLS
      ═══════════════════════════════════════════════════════════════ */}

      <section
        id="skills"
        className="section page-container"
      >

        <SectionHeading
          label="Tech Stack"
          title="What I Build With"
          subtitle="Technologies across frontend, backend, mobile, database, networking, and tooling."
        />

        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
            gap:"16px"
          }}
          className="skills-grid"
        >
          {SKILLS.map((s, i) => (
            <SkillCard
              key={s.cat}
              {...s}
              delay={`${i * 0.08}s`}
            />
          ))}
        </div>

      </section>


      <div
        className="rk-divider"
        style={{
          maxWidth:"1120px",
          margin:"0 auto"
        }}
      />


      {/* ═══════════════════════════════════════════════════════════════
          PROJECTS — REDESIGNED ONLY
      ═══════════════════════════════════════════════════════════════ */}

      <section
        id="projects"
        className="project-vault-section section page-container"
      >

        <div className="project-vault-heading">

          <SectionHeading
            label="Selected Work"
            title={
              <>
                Things I've
                <br />
                <span className="grad-text">
                  Built & Shipped.
                </span>
              </>
            }
            subtitle="A visual archive of interfaces, applications and backend systems I've designed, engineered and deployed."
          />

        </div>


        {/* PROJECT FILTERS */}

        <div className="project-vault-filters">

          {FILTERS.map(filterName => (

            <button
              key={filterName}
              type="button"
              onClick={() =>
                setFilterActive(filterName)
              }
              className={`project-vault-filter ${
                filterActive === filterName
                  ? "active"
                  : ""
              }`}
            >

              <span>
                {filterName === "All"
                  ? "All Builds"
                  : filterName}
              </span>

              <small>
                {filterName === "All"
                  ? PROJECTS.length
                  : PROJECTS.filter(project =>
                      project.stack.some(stackItem =>
                        (filterMap[filterName] || []).some(
                          filterItem =>
                            stackItem.includes(filterItem)
                        )
                      )
                    ).length}
              </small>

            </button>

          ))}

        </div>


        {/* PROJECT GRID */}

        <div className="project-vault-grid">

          {filtered.map((p, i) => (
            <ProjectCard
              key={p.title}
              p={p}
              index={i}
            />
          ))}

        </div>

      </section>


      <div
        className="rk-divider"
        style={{
          maxWidth:"1120px",
          margin:"0 auto"
        }}
      />


      {/* ═══════════════════════════════════════════════════════════════
          CERTIFICATIONS
      ═══════════════════════════════════════════════════════════════ */}

      <section
        className="section page-container"
      >

        <SectionHeading
          label="Credentials"
          title="Certifications"
          center
        />

        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
            gap:"14px",
            maxWidth:"820px",
            margin:"0 auto"
          }}
          className="cert-grid"
        >
          {CERTS.map((c, i) => (
            <CertCard
              key={c.name}
              c={c}
              delay={`${i * 0.06}s`}
            />
          ))}
        </div>

      </section>


      <div
        className="rk-divider"
        style={{
          maxWidth:"1120px",
          margin:"0 auto"
        }}
      />


      {/* ═══════════════════════════════════════════════════════════════
          BLOG CTA
      ═══════════════════════════════════════════════════════════════ */}

      <section
        className="section page-container"
      >
        <BlogCta navigate={navigate} />
      </section>


      <div
        className="rk-divider"
        style={{
          maxWidth:"1120px",
          margin:"0 auto"
        }}
      />


      {/* ═══════════════════════════════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════════════════════════════ */}

      <section
        id="contact"
        className="section page-container"
      >

        <SectionHeading
          label="Get In Touch"
          title="Let's Build Something"
          subtitle="Open to full stack engineering roles, freelance projects, and interesting collaborations."
        />


        <div
          style={{
            display:"grid",
            gridTemplateColumns:"1fr 1.3fr",
            gap:"28px",
            alignItems:"start"
          }}
          className="contact-grid"
        >

          <div
            className="glass-card"
            style={{ padding:"28px" }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "none";
            }}
          >

            <p
              style={{
                fontSize:"14px",
                color:"var(--text-muted)",
                lineHeight:1.75,
                marginBottom:"22px"
              }}
            >
              Have an opportunity or a question? I reply within 24 hours.
            </p>


            <div
              style={{
                display:"flex",
                flexDirection:"column",
                gap:"14px",
                marginBottom:"22px"
              }}
            >

              {[
                {
                  icon:"✉",
                  val:"rupeshkuppusamy@gmail.com",
                  href:"mailto:rupeshkuppusamy@gmail.com"
                },
                {
                  icon:"📞",
                  val:"+91 8056822299",
                  href:"tel:+918056822299"
                },
                {
                  icon:"📍",
                  val:"Trichy, India",
                  href:null
                },
              ].map(it =>
                it.href ? (

                  <a
                    key={it.val}
                    href={it.href}
                    style={{
                      display:"flex",
                      alignItems:"center",
                      gap:"11px",
                      color:"var(--accent-blue)",
                      textDecoration:"none",
                      fontSize:"14px",
                      fontWeight:500,
                      transition:"opacity var(--transition-fast)"
                    }}
                    onMouseEnter={e =>
                      e.currentTarget.style.opacity="0.7"
                    }
                    onMouseLeave={e =>
                      e.currentTarget.style.opacity="1"
                    }
                  >

                    <span
                      style={{
                        fontSize:"15px",
                        width:"32px",
                        height:"32px",
                        background:
                          "color-mix(in srgb,var(--accent-blue) 10%,transparent)",
                        borderRadius:"8px",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        flexShrink:0
                      }}
                    >
                      {it.icon}
                    </span>

                    {it.val}

                  </a>

                ) : (

                  <div
                    key={it.val}
                    style={{
                      display:"flex",
                      alignItems:"center",
                      gap:"11px",
                      color:"var(--text-muted)",
                      fontSize:"14px"
                    }}
                  >

                    <span
                      style={{
                        fontSize:"15px",
                        width:"32px",
                        height:"32px",
                        background:
                          "color-mix(in srgb,var(--accent-blue) 8%,transparent)",
                        borderRadius:"8px",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        flexShrink:0
                      }}
                    >
                      {it.icon}
                    </span>

                    {it.val}

                  </div>
                )
              )}

            </div>


            <div
              style={{
                display:"flex",
                flexWrap:"wrap",
                gap:"8px",
                paddingTop:"16px",
                borderTop:"1px solid var(--border-subtle)"
              }}
            >

              {[
                [
                  "📄 Resume",
                  "https://ru942.github.io/Portfolio/"
                ],
                [
                  "GitHub",
                  "https://github.com/Ru942"
                ],
                [
                  "LinkedIn",
                  "https://www.linkedin.com/in/rupesh-k-r-70864a204/"
                ]
              ].map(([l,h]) => (

                <a
                  key={l}
                  href={h}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                  style={{
                    fontSize:"13px",
                    padding:"7px 14px"
                  }}
                >
                  {l}
                </a>

              ))}

            </div>

          </div>


          <form
            onSubmit={handleContact}
            className="glass-card"
            style={{
              padding:"28px",
              display:"flex",
              flexDirection:"column",
              gap:"14px"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "none";
            }}
          >

            <input
              className="rk-input"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e =>
                setName(e.target.value)
              }
              required
            />

            <input
              className="rk-input"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={e =>
                setEmail(e.target.value)
              }
              required
            />

            <textarea
              className="rk-input"
              placeholder="Your Message"
              rows={5}
              value={message}
              onChange={e =>
                setMessage(e.target.value)
              }
              required
              style={{
                resize:"vertical",
                fontFamily:"'Inter',sans-serif"
              }}
            />

            <button
              type="submit"
              className="btn-primary"
              style={{
                fontSize:"15px",
                padding:"13px 24px",
                justifyContent:"center"
              }}
            >
              {sent
                ? "✓ Sent — check your email app!"
                : "Send Message →"}
            </button>

          </form>

        </div>

      </section>


      {/* ═══════════════════════════════════════════════════════════════
          PROJECT-ONLY RESPONSIVE + VISUAL CSS
      ═══════════════════════════════════════════════════════════════ */}

      <style>{`
        /* =============================================================
           PROJECT VAULT — PREMIUM VISUAL SYSTEM
           UI-only changes. Project data, filters and interactions stay intact.
        ============================================================= */

        .project-vault-section {
          position:relative;
          overflow:hidden;
          isolation:isolate;
        }

        .project-vault-section::before,
        .project-vault-section::after {
          content:"";
          position:absolute;
          width:560px;
          height:560px;
          border-radius:50%;
          pointer-events:none;
          filter:blur(2px);
          opacity:.9;
        }

        .project-vault-section::before {
          top:4%;
          left:-360px;
          background:radial-gradient(circle,color-mix(in srgb,var(--accent-blue) 14%,transparent),transparent 68%);
        }

        .project-vault-section::after {
          right:-360px;
          bottom:3%;
          background:radial-gradient(circle,color-mix(in srgb,var(--accent-violet) 13%,transparent),transparent 68%);
        }

        .project-vault-filters {
          position:relative;
          z-index:3;
          display:flex;
          justify-content:center;
          align-items:center;
          flex-wrap:wrap;
          gap:9px;
          margin:-8px auto 48px;
        }

        .project-vault-filter {
          position:relative;
          display:inline-flex;
          align-items:center;
          gap:9px;
          padding:10px 15px;
          border:1px solid var(--border-subtle);
          border-radius:999px;
          background:color-mix(in srgb,var(--bg-glass) 78%,transparent);
          color:var(--text-muted);
          font-family:'Inter',sans-serif;
          font-size:10px;
          font-weight:700;
          letter-spacing:.02em;
          cursor:pointer;
          backdrop-filter:blur(14px);
          -webkit-backdrop-filter:blur(14px);
          transition:transform .25s ease,border-color .25s ease,background .25s ease,color .25s ease,box-shadow .25s ease;
        }

        .project-vault-filter small {
          min-width:19px;
          height:19px;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border-radius:50%;
          background:var(--bg-surface);
          color:var(--text-faint);
          font-size:8px;
          font-weight:800;
        }

        .project-vault-filter:hover {
          transform:translateY(-2px);
          color:var(--text-primary);
          border-color:color-mix(in srgb,var(--accent-blue) 35%,var(--border-subtle));
        }

        .project-vault-filter.active {
          color:#fff;
          border-color:color-mix(in srgb,var(--accent-blue) 55%,transparent);
          background:linear-gradient(135deg,color-mix(in srgb,var(--accent-blue) 78%,#111),color-mix(in srgb,var(--accent-violet) 70%,#111));
          box-shadow:0 12px 34px color-mix(in srgb,var(--accent-blue) 18%,transparent);
        }

        .project-vault-filter.active small {
          background:rgba(255,255,255,.14);
          color:rgba(255,255,255,.9);
        }

        .project-vault-grid {
          position:relative;
          z-index:2;
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:24px;
        }

        .project-vault-card {
          position:relative;
          min-width:0;
          overflow:hidden;
          border:1px solid var(--border-subtle);
          border-radius:26px;
          background:color-mix(in srgb,var(--bg-glass) 90%,transparent);
          box-shadow:var(--shadow-sm);
          opacity:0;
          transform:translateY(22px) scale(.985);
          transition:opacity .6s ease var(--project-delay),transform .6s cubic-bezier(.22,1,.36,1) var(--project-delay),border-color .35s ease,box-shadow .35s ease;
          contain:layout paint;
        }

        .project-vault-card.project-card-visible {
          opacity:1;
          transform:translateY(0) scale(1);
        }

        .project-vault-card:hover {
          transform:translateY(-7px);
          border-color:color-mix(in srgb,var(--accent-blue) 32%,var(--border-subtle));
          box-shadow:0 28px 70px rgba(0,0,0,.16),0 0 0 1px color-mix(in srgb,var(--accent-blue) 8%,transparent);
        }

        .project-visual {
          position:relative;
          height:440px;
          overflow:hidden;
          background:#080a12;
          cursor:pointer;
        }

        .project-visual-bg,
        .project-visual-overlay,
        .project-open-hit {
          position:absolute;
          inset:0;
        }

        .project-visual-bg {
          overflow:hidden;
          transition:transform .9s cubic-bezier(.22,1,.36,1);
        }

        .project-vault-card:hover .project-visual-bg {
          transform:scale(1.035);
        }

        .project-noise {
          position:absolute;
          inset:-50%;
          opacity:.045;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");
          pointer-events:none;
        }

        .project-grid {
          position:absolute;
          inset:0;
          opacity:.25;
          background-image:linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px);
          background-size:42px 42px;
          mask-image:linear-gradient(to bottom,transparent,black 30%,black 72%,transparent);
        }

        .project-glow {
          position:absolute;
          width:360px;
          height:360px;
          border-radius:50%;
          filter:blur(18px);
          opacity:.55;
        }

        .glow-a {
          top:-150px;
          left:-80px;
          background:radial-gradient(circle,color-mix(in srgb,var(--accent-blue) 48%,transparent),transparent 68%);
        }

        .glow-b {
          right:-140px;
          bottom:-150px;
          background:radial-gradient(circle,color-mix(in srgb,var(--accent-violet) 42%,transparent),transparent 68%);
        }

        .theme-backend .glow-a { background:radial-gradient(circle,color-mix(in srgb,var(--accent-green) 45%,transparent),transparent 68%); }
        .theme-javascript .glow-a { background:radial-gradient(circle,color-mix(in srgb,#f5c84b 45%,transparent),transparent 68%); }
        .theme-web .glow-a { background:radial-gradient(circle,color-mix(in srgb,#22c55e 40%,transparent),transparent 68%); }

        .project-ring {
          position:absolute;
          left:50%;
          top:50%;
          border:1px solid rgba(255,255,255,.12);
          border-radius:50%;
          transform:translate(-50%,-50%) rotate(-18deg);
          box-shadow:0 0 50px rgba(255,255,255,.03);
        }

        .ring-one { width:390px; height:150px; }
        .ring-two { width:520px; height:205px; transform:translate(-50%,-50%) rotate(31deg); }

        .project-browser {
          position:absolute;
          left:50%;
          top:50%;
          width:72%;
          max-width:470px;
          height:63%;
          border:1px solid rgba(255,255,255,.16);
          border-radius:18px;
          background:linear-gradient(145deg,rgba(255,255,255,.11),rgba(255,255,255,.025));
          box-shadow:0 30px 70px rgba(0,0,0,.32),inset 0 1px rgba(255,255,255,.08);
          backdrop-filter:blur(10px);
          -webkit-backdrop-filter:blur(10px);
          transform:translate(-50%,-50%) perspective(1000px) rotateX(5deg) rotateY(-8deg);
          transition:transform .7s cubic-bezier(.22,1,.36,1);
        }

        .project-vault-card:hover .project-browser {
          transform:translate(-50%,-50%) perspective(1000px) rotateX(1deg) rotateY(-3deg) scale(1.025);
        }

        .browser-bar {
          height:34px;
          display:flex;
          align-items:center;
          gap:5px;
          padding:0 11px;
          border-bottom:1px solid rgba(255,255,255,.09);
          background:rgba(0,0,0,.18);
        }

        .browser-bar span {
          width:6px;
          height:6px;
          border-radius:50%;
          background:rgba(255,255,255,.32);
        }

        .browser-bar b {
          margin-left:auto;
          color:rgba(255,255,255,.34);
          font:700 7px 'Space Grotesk',sans-serif;
          letter-spacing:.15em;
        }

        .browser-canvas {
          display:grid;
          grid-template-columns:25% 1fr;
          height:calc(100% - 34px);
          padding:15px;
          gap:12px;
        }

        .canvas-sidebar,
        .canvas-content i {
          border:1px solid rgba(255,255,255,.08);
          background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.025));
          border-radius:9px;
        }

        .canvas-sidebar { height:100%; }

        .canvas-content {
          display:grid;
          grid-template-columns:repeat(2,1fr);
          grid-template-rows:1.25fr 1fr;
          gap:9px;
        }

        .canvas-content i {
          display:block;
        }

        .canvas-content i:first-child {
          grid-column:1 / -1;
        }

        .project-monogram {
          position:absolute;
          left:50%;
          top:50%;
          z-index:4;
          width:108px;
          height:108px;
          display:flex;
          align-items:center;
          justify-content:center;
          border:1px solid rgba(255,255,255,.2);
          border-radius:32px;
          background:linear-gradient(145deg,rgba(10,12,24,.76),rgba(10,12,24,.3));
          color:#fff;
          font:800 32px 'Space Grotesk',sans-serif;
          letter-spacing:-.08em;
          box-shadow:0 22px 55px rgba(0,0,0,.35),inset 0 1px rgba(255,255,255,.12);
          backdrop-filter:blur(14px);
          -webkit-backdrop-filter:blur(14px);
          transform:translate(-50%,-50%);
          transition:transform .55s cubic-bezier(.22,1,.36,1),opacity .35s ease;
        }

        .project-vault-card:hover .project-monogram {
          transform:translate(-50%,-50%) scale(.78) rotate(-7deg);
          opacity:.18;
        }

        .project-visual-overlay {
          z-index:5;
          background:linear-gradient(180deg,rgba(3,5,12,.02) 0%,rgba(3,5,12,.02) 38%,rgba(3,5,12,.72) 100%);
          pointer-events:none;
        }

        .project-top-meta {
          position:absolute;
          top:17px;
          left:17px;
          right:17px;
          z-index:9;
          display:flex;
          align-items:center;
          justify-content:space-between;
          pointer-events:none;
        }

        .project-index {
          display:inline-flex;
          align-items:baseline;
          gap:3px;
          color:#fff;
          font:800 20px 'Space Grotesk',sans-serif;
          letter-spacing:-.07em;
          text-shadow:0 3px 20px rgba(0,0,0,.6);
        }

        .project-index small {
          color:rgba(255,255,255,.5);
          font:500 8px 'Inter',sans-serif;
          letter-spacing:0;
        }

        .project-category {
          padding:8px 11px;
          border:1px solid rgba(255,255,255,.16);
          border-radius:999px;
          background:rgba(4,6,14,.34);
          color:rgba(255,255,255,.82);
          font:700 8px 'Inter',sans-serif;
          letter-spacing:.12em;
          text-transform:uppercase;
          backdrop-filter:blur(12px);
          -webkit-backdrop-filter:blur(12px);
        }

        .project-badge {
          position:absolute;
          left:17px;
          bottom:17px;
          z-index:9;
          display:flex;
          align-items:center;
          gap:7px;
          padding:7px 10px;
          border:1px solid rgba(255,255,255,.13);
          border-radius:999px;
          background:rgba(4,6,14,.38);
          color:rgba(255,255,255,.78);
          font:700 8px 'Inter',sans-serif;
          letter-spacing:.07em;
          text-transform:uppercase;
          backdrop-filter:blur(12px);
          -webkit-backdrop-filter:blur(12px);
          transition:opacity .3s ease,transform .3s ease;
          pointer-events:none;
        }

        .project-badge-dot {
          width:6px;
          height:6px;
          border-radius:50%;
          background:var(--badge-color);
          box-shadow:0 0 10px var(--badge-color);
        }

        .project-center-mark {
          position:absolute;
          left:50%;
          bottom:21px;
          z-index:8;
          display:flex;
          align-items:center;
          gap:8px;
          opacity:.0;
          transform:translate(-50%,8px);
          transition:opacity .35s ease,transform .35s ease;
          pointer-events:none;
        }

        .project-center-mark span {
          font:800 10px 'Space Grotesk',sans-serif;
          letter-spacing:.05em;
          color:rgba(255,255,255,.82);
        }

        .project-center-mark small {
          color:rgba(255,255,255,.42);
          font:700 7px 'Inter',sans-serif;
          letter-spacing:.13em;
        }

        .project-vault-card:hover .project-center-mark {
          opacity:1;
          transform:translate(-50%,0);
        }

        .project-reveal {
          position:absolute;
          inset:0;
          z-index:7;
          display:flex;
          align-items:flex-end;
          padding:29px;
          background:linear-gradient(180deg,transparent 28%,rgba(3,5,12,.04) 40%,rgba(3,5,12,.95) 100%);
          opacity:0;
          transform:translateY(14px);
          transition:opacity .4s ease,transform .4s cubic-bezier(.22,1,.36,1);
          pointer-events:none;
        }

        .project-vault-card:hover .project-reveal {
          opacity:1;
          transform:translateY(0);
        }

        .project-reveal-content { width:100%; max-width:calc(100% - 65px); }

        .project-eyebrow {
          display:block;
          margin-bottom:9px;
          color:color-mix(in srgb,var(--accent-blue) 90%,white);
          font:800 8px 'Inter',sans-serif;
          letter-spacing:.17em;
          text-transform:uppercase;
        }

        .project-reveal h3 {
          margin:0 0 14px;
          color:#fff;
          font:700 clamp(25px,3vw,39px) 'Space Grotesk',sans-serif;
          line-height:.98;
          letter-spacing:-.065em;
          text-shadow:0 5px 25px rgba(0,0,0,.4);
        }

        .project-tech-stack {
          display:flex;
          flex-wrap:wrap;
          gap:6px;
        }

        .project-tech-stack span {
          padding:6px 9px;
          border:1px solid rgba(255,255,255,.13);
          border-radius:7px;
          background:rgba(255,255,255,.07);
          color:rgba(255,255,255,.82);
          font:600 8px 'Inter',sans-serif;
          backdrop-filter:blur(8px);
          -webkit-backdrop-filter:blur(8px);
        }

        .project-actions {
          position:absolute;
          top:50%;
          right:17px;
          z-index:11;
          display:flex;
          flex-direction:column;
          gap:7px;
          transform:translateY(-50%) translateX(20px);
          opacity:0;
          transition:opacity .35s ease,transform .35s cubic-bezier(.22,1,.36,1);
        }

        .project-vault-card:hover .project-actions {
          opacity:1;
          transform:translateY(-50%) translateX(0);
        }

        .project-action {
          width:48px;
          height:48px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:2px;
          border:1px solid rgba(255,255,255,.15);
          border-radius:14px;
          background:rgba(5,7,15,.68);
          color:#fff;
          text-decoration:none;
          box-shadow:0 10px 25px rgba(0,0,0,.16);
          backdrop-filter:blur(16px);
          -webkit-backdrop-filter:blur(16px);
          transition:transform .22s ease,background .22s ease,border-color .22s ease;
        }

        .project-action:hover {
          transform:scale(1.08);
          border-color:color-mix(in srgb,var(--accent-blue) 58%,white);
          background:color-mix(in srgb,var(--accent-blue) 35%,rgba(5,7,15,.78));
        }

        .project-action-primary {
          background:linear-gradient(145deg,color-mix(in srgb,var(--accent-blue) 70%,#0a0d18),rgba(5,7,15,.72));
          border-color:color-mix(in srgb,var(--accent-blue) 45%,rgba(255,255,255,.15));
        }

        .project-action-icon {
          font:800 12px 'Inter',sans-serif;
          line-height:1;
        }

        .project-action small {
          color:rgba(255,255,255,.62);
          font:700 6px 'Inter',sans-serif;
          letter-spacing:.07em;
          text-transform:uppercase;
        }

        .linkedin-icon {
          font:800 13px Arial,sans-serif;
        }

        .project-open-hit {
          z-index:6;
          pointer-events:none;
        }

        .project-corner-arrow {
          position:absolute;
          right:17px;
          bottom:17px;
          z-index:10;
          width:38px;
          height:38px;
          display:flex;
          align-items:center;
          justify-content:center;
          border:1px solid rgba(255,255,255,.14);
          border-radius:50%;
          background:rgba(255,255,255,.07);
          color:#fff;
          font-size:14px;
          backdrop-filter:blur(10px);
          transition:transform .35s cubic-bezier(.22,1,.36,1),background .35s ease;
          pointer-events:none;
        }

        .project-vault-card:hover .project-corner-arrow {
          transform:rotate(45deg) scale(1.08);
          background:color-mix(in srgb,var(--accent-blue) 32%,transparent);
        }

        .project-tech-strip {
          position:relative;
          z-index:12;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:18px;
          padding:15px 18px;
          border-top:1px solid var(--border-subtle);
          background:color-mix(in srgb,var(--bg-surface) 45%,transparent);
        }

        .project-tech-list {
          display:flex;
          align-items:center;
          flex-wrap:wrap;
          gap:7px;
          min-width:0;
        }

        .project-tech-list span {
          color:var(--text-faint);
          font:600 9px 'Inter',sans-serif;
          white-space:nowrap;
        }

        .project-tech-list i {
          color:var(--text-faint);
          font-style:normal;
          opacity:.5;
        }

        .project-case-toggle {
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:8px 11px;
          border:1px solid var(--border-subtle);
          border-radius:999px;
          background:transparent;
          color:var(--text-muted);
          font:700 8px 'Inter',sans-serif;
          cursor:pointer;
          transition:border-color .25s ease,background .25s ease,color .25s ease,transform .25s ease;
        }

        .project-case-toggle:hover,
        .project-case-toggle.active {
          transform:translateY(-1px);
          border-color:color-mix(in srgb,var(--accent-blue) 45%,var(--border-subtle));
          background:color-mix(in srgb,var(--accent-blue) 8%,transparent);
          color:var(--accent-blue);
        }

        .project-case-toggle b {
          font-size:14px;
          font-weight:400;
          line-height:1;
        }

        .project-case-study {
          display:grid;
          grid-template-rows:0fr;
          transition:grid-template-rows .45s cubic-bezier(.22,1,.36,1);
        }

        .project-case-study.expanded {
          grid-template-rows:1fr;
        }

        .project-case-grid {
          min-height:0;
          overflow:hidden;
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:1px;
          background:var(--border-subtle);
        }

        .project-case-grid > div {
          padding:20px;
          background:color-mix(in srgb,var(--bg-surface) 92%,transparent);
        }

        .project-case-grid span {
          display:block;
          margin-bottom:9px;
          color:var(--accent-blue);
          font:800 7px 'Inter',sans-serif;
          letter-spacing:.14em;
        }

        .project-case-grid p {
          margin:0;
          color:var(--text-muted);
          font:400 11px/1.65 'Inter',sans-serif;
        }

        @media (hover:none) {
          .project-vault-card:hover {
            transform:none;
          }

          .project-reveal {
            opacity:1;
            transform:translateY(0);
            background:linear-gradient(180deg,transparent 22%,rgba(3,5,12,.82) 100%);
          }

          .project-actions {
            opacity:1;
            transform:translateY(-50%) translateX(0);
          }

          .project-center-mark {
            opacity:1;
            transform:translate(-50%,0);
          }

          .project-monogram {
            transform:translate(-50%,-50%) scale(.82);
          }

          .project-badge {
            opacity:0;
          }

          .project-corner-arrow {
            display:none;
          }

          .project-open-hit {
            pointer-events:none;
          }
        }

        /* =============================================================
           TABLET
        ============================================================= */

        @media(max-width:900px) {

          .project-vault-grid {
            grid-template-columns:1fr;
          }

          .project-visual {
            height:420px;
          }

        }


        /* =============================================================
           EXISTING SITE RESPONSIVE RULES
        ============================================================= */

        @media(max-width:820px){

          .hero-layout {
            grid-template-columns:1fr!important;
          }

          .hero-layout>div:last-child {
            display:none;
          }

          .stats-row {
            grid-template-columns:
              repeat(2,1fr)!important;
          }

          .about-grid {
            grid-template-columns:
              repeat(2,1fr)!important;
          }

          .role-grid {
            grid-template-columns:
              1fr!important;
          }

          .skills-grid {
            grid-template-columns:
              repeat(2,1fr)!important;
          }

          .proj-grid {
            grid-template-columns:
              1fr!important;
          }

          .cert-grid {
            grid-template-columns:
              repeat(2,1fr)!important;
          }

          .contact-grid {
            grid-template-columns:
              1fr!important;
          }

        }


        /* =============================================================
           MOBILE
        ============================================================= */

        @media(max-width:640px){

          .project-vault-section {
            overflow:hidden;
          }

          .project-vault-filters {
            justify-content:flex-start;

            margin-bottom:35px;

            overflow-x:auto;

            flex-wrap:nowrap;

            padding-bottom:5px;

            scrollbar-width:none;
          }

          .project-vault-filters::-webkit-scrollbar {
            display:none;
          }

          .project-vault-filter {
            flex-shrink:0;
          }

          .project-visual {
            height:340px;
          }

          .project-reveal {
            padding:21px;
          }

          .project-reveal h3 {
            font-size:28px;
          }

          .project-actions {
            right:11px;
          }

          .project-action {
            width:43px;
            height:43px;

            border-radius:12px;
          }

          .project-tech-strip {
            align-items:flex-start;

            flex-direction:column;

            padding:15px;
          }

          .project-case-toggle {
            align-self:flex-end;
          }

          .project-case-grid {
            grid-template-columns:1fr;
          }

          .project-case-grid > div {
            padding:17px;
          }

          .project-monogram {
            width:115px;
            height:115px;

            border-radius:30px;

            font-size:35px;
          }

          .project-orbit.orbit-one {
            width:290px;
            height:120px;
          }

          .project-orbit.orbit-two {
            width:370px;
            height:150px;
          }

        }


        /* =============================================================
           SMALL MOBILE
        ============================================================= */

        @media(max-width:520px){

          .about-grid {
            grid-template-columns:
              1fr!important;
          }

          .skills-grid {
            grid-template-columns:
              1fr!important;
          }

          .cert-grid {
            grid-template-columns:
              1fr!important;
          }

          .project-visual {
            height:305px;
          }

          .project-top-meta {
            top:13px;
            left:13px;
            right:13px;
          }

          .project-category {
            padding:6px 9px;
            font-size:7px;
          }

          .project-index {
            font-size:17px;
          }

          .project-badge {
            left:13px;
            bottom:13px;
          }

          .project-reveal {
            padding:18px;
          }

          .project-reveal h3 {
            font-size:24px;
          }

          .project-actions {
            right:9px;
          }

          .project-action {
            width:39px;
            height:39px;
          }

          .project-action-icon {
            font-size:11px;
          }

          .project-action small {
            font-size:6px;
          }

        }

      `}</style>


      <Footer />

    </div>
  );
}