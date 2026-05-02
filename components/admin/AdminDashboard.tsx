"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User, GraduationCap, Briefcase, FolderGit2,
  BookOpen, Wrench, ThumbsUp, Globe, LogOut,
  ArrowUp, ArrowDown, Trash2, ChevronUp, ChevronDown, ChevronRight,
  type LucideIcon,
} from "lucide-react";
import type { Profile, SkillGroup, RecommendationItem } from "@/lib/content";
import type { EducationItem, ExperienceItem, ProjectItem, PublicationItem } from "@/lib/data";

type AllData = {
  profile: Profile;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  publications: PublicationItem[];
  skills: SkillGroup[];
  recommendations: RecommendationItem[];
};

type Tab = "Profile" | "Education" | "Experience" | "Projects" | "Publications" | "Skills" | "Recommendations";

const TABS: { id: Tab; Icon: LucideIcon; count?: (d: AllData) => number }[] = [
  { id: "Profile",         Icon: User },
  { id: "Education",       Icon: GraduationCap, count: (d) => d.education.length },
  { id: "Experience",      Icon: Briefcase,     count: (d) => d.experience.length },
  { id: "Projects",        Icon: FolderGit2,    count: (d) => d.projects.length },
  { id: "Publications",    Icon: BookOpen,      count: (d) => d.publications.length },
  { id: "Skills",          Icon: Wrench,        count: (d) => d.skills.length },
  { id: "Recommendations", Icon: ThumbsUp,      count: (d) => d.recommendations.length },
];

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function AdminDashboard({ initialData }: { initialData: AllData }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("Profile");
  const [data, setData] = useState<AllData>(initialData);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function save(section: keyof AllData, payload: unknown) {
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data: payload }),
      });
      if (!res.ok) throw new Error();
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)", fontFamily: "var(--font-sans, sans-serif)" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: "220px",
        flexShrink: 0,
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0, bottom: 0, left: 0,
        zIndex: 40,
        transition: "transform 0.25s",
      }}>
        {/* Logo */}
        <div style={{ padding: "1.25rem 1.25rem 1rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{
            width: "30px", height: "30px", borderRadius: "8px",
            background: "linear-gradient(135deg, var(--accent,#6366f1), #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Wrench size={15} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.88rem", letterSpacing: "-0.01em" }}>Admin Panel</div>
            <div style={{ fontSize: "0.68rem", color: "var(--muted)" }}>Content Manager</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "0.75rem 0.6rem", display: "flex", flexDirection: "column", gap: "0.15rem", overflowY: "auto" }}>
          {TABS.map((t) => {
            const active = tab === t.id;
            const count = t.count?.(data);
            return (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setSidebarOpen(false); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.65rem",
                  padding: "0.6rem 0.75rem",
                  borderRadius: "9px",
                  border: "none",
                  background: active ? "rgba(var(--accent-rgb,99,102,241),0.12)" : "transparent",
                  color: active ? "var(--accent, #6366f1)" : "var(--fg)",
                  fontWeight: active ? 600 : 400,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                  transition: "background 0.12s",
                }}
              >
                <t.Icon size={15} style={{ flexShrink: 0, opacity: active ? 1 : 0.6 }} />
                <span style={{ flex: 1 }}>{t.id}</span>
                {count !== undefined && (
                  <span style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    padding: "0.1rem 0.45rem",
                    borderRadius: "99px",
                    background: active ? "rgba(var(--accent-rgb,99,102,241),0.18)" : "var(--border)",
                    color: active ? "var(--accent,#6366f1)" : "var(--muted)",
                  }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: "0.75rem 0.6rem", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: "0.65rem",
              padding: "0.55rem 0.75rem",
              borderRadius: "9px",
              fontSize: "0.82rem",
              color: "var(--fg)",
              textDecoration: "none",
              background: "transparent",
              transition: "background 0.12s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--border)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <Globe size={14} style={{ opacity: 0.6 }} /> View Site
          </a>
          <button
            onClick={logout}
            style={{
              display: "flex", alignItems: "center", gap: "0.65rem",
              padding: "0.55rem 0.75rem",
              borderRadius: "9px",
              border: "none",
              background: "transparent",
              color: "#f87171",
              fontSize: "0.82rem",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
              transition: "background 0.12s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(248,113,113,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ marginLeft: "220px", flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* Top bar */}
        <header style={{
          position: "sticky", top: 0, zIndex: 30,
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "0.85rem 2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {(() => { const T = TABS.find((t) => t.id === tab); return T ? <T.Icon size={17} style={{ opacity: 0.7 }} /> : null; })()}
              <h1 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>{tab}</h1>
            </div>
            <p style={{ margin: 0, fontSize: "0.72rem", color: "var(--muted)" }}>
              Edit and save changes to your portfolio
            </p>
          </div>

          {/* Save status pill */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {status === "saving" && <StatusPill color="#a78bfa">Saving…</StatusPill>}
            {status === "saved"  && <StatusPill color="#4ade80">✓ Saved</StatusPill>}
            {status === "error"  && <StatusPill color="#f87171">✗ Error — retry</StatusPill>}
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: "2rem", maxWidth: "800px", width: "100%", margin: "0 auto" }}>
          {tab === "Profile" && (
            <ProfileEditor
              data={data.profile}
              onChange={(v) => setData((d) => ({ ...d, profile: v }))}
              onSave={() => save("profile", data.profile)}
            />
          )}
          {tab === "Education" && (
            <ListEditor<EducationItem>
              section="education"
              items={data.education}
              template={{ institution: "", degree: "", location: "", period: "", highlights: [] }}
              fields={[
                { key: "institution", label: "Institution", placeholder: "University of Maryland, Baltimore County" },
                { key: "degree",      label: "Degree",      placeholder: "PhD in Computer Science" },
                { key: "location",    label: "Location",    placeholder: "Baltimore, Maryland" },
                { key: "period",      label: "Period",      placeholder: "2024 - Present" },
              ]}
              arrayFields={["highlights"]}
              arrayLabels={{ highlights: "Highlights (one per line)" }}
              onChange={(v) => setData((d) => ({ ...d, education: v }))}
              onSave={() => save("education", data.education)}
            />
          )}
          {tab === "Experience" && (
            <ListEditor<ExperienceItem>
              section="experience"
              items={data.experience}
              template={{ role: "", org: "", period: "", summary: "", highlights: [], image: "" }}
              fields={[
                { key: "role",    label: "Role / Title",  placeholder: "Research Assistant" },
                { key: "org",     label: "Organization",  placeholder: "UMBC - NASA GESTAR II Lab" },
                { key: "period",  label: "Period",        placeholder: "2023 - Present" },
                { key: "summary", label: "Summary",       placeholder: "Describe what you did…", multiline: true },
              ]}
              arrayFields={["highlights"]}
              arrayLabels={{ highlights: "Key highlights (one per line)" }}
              onChange={(v) => setData((d) => ({ ...d, experience: v }))}
              onSave={() => save("experience", data.experience)}
            />
          )}
          {tab === "Projects" && (
            <ListEditor<ProjectItem>
              section="projects"
              items={data.projects}
              template={{ name: "", url: "", description: "", tech: [], impact: "", category: "", image: "", featured: false }}
              fields={[
                { key: "name",        label: "Project Name",  placeholder: "NeuroForge - Multi-Modal AI Platform" },
                { key: "url",         label: "GitHub URL",    placeholder: "https://github.com/you/project" },
                { key: "description", label: "Description",   placeholder: "What it does…", multiline: true },
                { key: "impact",      label: "Impact / Result", placeholder: "Measurable outcome…" },
                { key: "category",    label: "Category",      placeholder: "AI Systems" },
                { key: "image",       label: "Image URL",     placeholder: "https://images.unsplash.com/…" },
              ]}
              arrayFields={["tech"]}
              arrayLabels={{ tech: "Tech stack (one per line)" }}
              booleanFields={["featured"]}
              booleanLabels={{ featured: "Mark as featured project" }}
              onChange={(v) => setData((d) => ({ ...d, projects: v }))}
              onSave={() => save("projects", data.projects)}
            />
          )}
          {tab === "Publications" && (
            <ListEditor<PublicationItem>
              section="publications"
              items={data.publications}
              template={{ title: "", venue: "", year: new Date().getFullYear(), authors: [], kind: "", url: "" }}
              fields={[
                { key: "title", label: "Title",              placeholder: "Full paper title…", multiline: true },
                { key: "venue", label: "Venue / Journal",    placeholder: "IEEE Frontiers in Education Conference" },
                { key: "year",  label: "Year",               placeholder: "2025", type: "number" },
                { key: "kind",  label: "Publication Type",   placeholder: "Conference Paper" },
                { key: "url",   label: "Paper URL",          placeholder: "https://ieeexplore.ieee.org/…" },
              ]}
              arrayFields={["authors"]}
              arrayLabels={{ authors: "Authors (one per line, e.g. S.R. Dharmale)" }}
              onChange={(v) => setData((d) => ({ ...d, publications: v }))}
              onSave={() => save("publications", data.publications)}
            />
          )}
          {tab === "Skills" && (
            <ListEditor<SkillGroup>
              section="skills"
              items={data.skills}
              template={{ title: "", icon: "BrainCircuit", items: [] }}
              fields={[
                { key: "title", label: "Category Name",  placeholder: "AI and Machine Learning" },
                { key: "icon",  label: "Icon",           placeholder: "BrainCircuit, Cloud, Cpu, Workflow, Database…" },
              ]}
              arrayFields={["items"]}
              arrayLabels={{ items: "Skills (one per line)" }}
              onChange={(v) => setData((d) => ({ ...d, skills: v }))}
              onSave={() => save("skills", data.skills)}
            />
          )}
          {tab === "Recommendations" && (
            <ListEditor<RecommendationItem>
              section="recommendations"
              items={data.recommendations}
              template={{ recommender: "", title: "", relationship: "", body: "", note: "", image: "" }}
              fields={[
                { key: "recommender",  label: "Recommender Name",  placeholder: "Hao Fu" },
                { key: "title",        label: "Their Job Title",   placeholder: "Technology Lead at Orb Connect" },
                { key: "relationship", label: "Relationship / Date", placeholder: "Feb 2025 - Managed directly" },
                { key: "body",         label: "Recommendation Text", placeholder: "Full recommendation text…", multiline: true },
                { key: "note",         label: "Footnote (optional)", placeholder: "Recommendation provided by…" },
              ]}
              onChange={(v) => setData((d) => ({ ...d, recommendations: v }))}
              onSave={() => save("recommendations", data.recommendations)}
            />
          )}
        </main>
      </div>
    </div>
  );
}

/* ── Status pill ───────────────────────────────────────── */
function StatusPill({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span style={{
      fontSize: "0.78rem",
      fontWeight: 600,
      color,
      padding: "0.3rem 0.75rem",
      borderRadius: "99px",
      background: `${color}18`,
      border: `1px solid ${color}40`,
    }}>
      {children}
    </span>
  );
}

/* ── Profile Editor ────────────────────────────────────── */
function ProfileEditor({ data, onChange, onSave }: {
  data: Profile;
  onChange: (v: Profile) => void;
  onSave: () => void;
}) {
  const fields: { key: keyof Profile; label: string; placeholder: string; multiline?: boolean }[] = [
    { key: "name",     label: "Full Name",          placeholder: "Srushti Dharmale" },
    { key: "title",    label: "Page Title",          placeholder: "PhD Researcher and AI Engineer" },
    { key: "subtitle", label: "Credential Line",     placeholder: "UMBC - NASA GESTAR II - IEEE Published" },
    { key: "location", label: "Location",            placeholder: "Baltimore, Maryland, USA" },
    { key: "email",    label: "Email",               placeholder: "you@email.com" },
    { key: "linkedin", label: "LinkedIn URL",        placeholder: "https://linkedin.com/in/…" },
    { key: "github",   label: "GitHub URL",          placeholder: "https://github.com/…" },
    { key: "scholar",  label: "Google Scholar URL",  placeholder: "https://scholar.google.com/…" },
    { key: "tagline",  label: "Bio / Tagline",       placeholder: "One sentence about you…", multiline: true },
  ];

  return (
    <Section title="Profile" description="Your basic personal and contact information." onSave={onSave}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {fields.map(({ key, label, placeholder, multiline }) => (
          <div key={key} style={{ gridColumn: multiline ? "1 / -1" : undefined }}>
            <Field label={label}>
              {multiline ? (
                <textarea
                  value={data[key] as string}
                  onChange={(e) => onChange({ ...data, [key]: e.target.value })}
                  placeholder={placeholder}
                  rows={3}
                  style={inputStyle}
                />
              ) : (
                <input
                  type={key === "email" ? "email" : "text"}
                  value={data[key] as string}
                  onChange={(e) => onChange({ ...data, [key]: e.target.value })}
                  placeholder={placeholder}
                  style={inputStyle}
                />
              )}
            </Field>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ── Generic List Editor ───────────────────────────────── */
type FieldDef = {
  key: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  type?: "text" | "number";
};

function ListEditor<T extends Record<string, unknown>>({
  section, items, template, fields,
  arrayFields = [], arrayLabels = {},
  booleanFields = [], booleanLabels = {},
  onChange, onSave,
}: {
  section: string;
  items: T[];
  template: T;
  fields: FieldDef[];
  arrayFields?: string[];
  arrayLabels?: Record<string, string>;
  booleanFields?: string[];
  booleanLabels?: Record<string, string>;
  onChange: (v: T[]) => void;
  onSave: () => void;
}) {
  const [expanded, setExpanded] = useState<number | null>(items.length > 0 ? 0 : null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const label = section.charAt(0).toUpperCase() + section.slice(1);
  const singular = label.endsWith("s") ? label.slice(0, -1) : label;

  function update(i: number, key: string, value: unknown) {
    onChange(items.map((item, idx) => idx === i ? { ...item, [key]: value } : item));
  }

  function addItem() {
    onChange([...items, { ...template }]);
    setExpanded(items.length);
    setDeleteConfirm(null);
  }

  function removeItem(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
    setExpanded(null);
    setDeleteConfirm(null);
  }

  function moveItem(i: number, dir: -1 | 1) {
    const next = [...items];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  function getTitle(item: T): string {
    return (
      (item.name as string) ||
      (item.institution as string) ||
      (item.role as string) ||
      (item.title as string) ||
      (item.recommender as string) ||
      `New ${singular}`
    );
  }

  return (
    <Section
      title={label}
      description={`Manage your ${label.toLowerCase()} entries. Drag to reorder.`}
      onSave={onSave}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {items.length === 0 && (
          <div style={{
            textAlign: "center", padding: "2.5rem 1rem",
            border: "1.5px dashed var(--border)", borderRadius: "12px",
            color: "var(--muted)", fontSize: "0.85rem",
          }}>
            No {label.toLowerCase()} yet. Add one below.
          </div>
        )}

        {items.map((item, i) => {
          const isOpen = expanded === i;
          const isDeleting = deleteConfirm === i;

          return (
            <div key={i} style={{
              border: `1.5px solid ${isOpen ? "var(--accent,#6366f1)" : "var(--border)"}`,
              borderRadius: "12px",
              overflow: "hidden",
              transition: "border-color 0.15s",
            }}>
              {/* Card header */}
              <div
                onClick={() => { setExpanded(isOpen ? null : i); setDeleteConfirm(null); }}
                style={{
                  display: "flex", alignItems: "center",
                  padding: "0.85rem 1rem",
                  background: isOpen ? "rgba(var(--accent-rgb,99,102,241),0.04)" : "var(--surface)",
                  cursor: "pointer",
                  userSelect: "none",
                  gap: "0.75rem",
                }}
              >
                <div style={{
                  width: "28px", height: "28px", borderRadius: "8px",
                  background: isOpen ? "rgba(var(--accent-rgb,99,102,241),0.15)" : "var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem", fontWeight: 700,
                  color: isOpen ? "var(--accent,#6366f1)" : "var(--muted)",
                  flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <span style={{ flex: 1, fontWeight: 600, fontSize: "0.88rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {getTitle(item)}
                </span>
                <div style={{ display: "flex", gap: "0.3rem", flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                  <IconBtn onClick={() => moveItem(i, -1)} disabled={i === 0} title="Move up"><ArrowUp size={13} /></IconBtn>
                  <IconBtn onClick={() => moveItem(i, 1)} disabled={i === items.length - 1} title="Move down"><ArrowDown size={13} /></IconBtn>
                  {isDeleting ? (
                    <>
                      <IconBtn onClick={() => removeItem(i)} danger title="Confirm delete"><Trash2 size={13} /></IconBtn>
                      <IconBtn onClick={() => setDeleteConfirm(null)} title="Cancel"><ChevronRight size={13} style={{ transform: "rotate(180deg)" }} /></IconBtn>
                    </>
                  ) : (
                    <IconBtn onClick={() => setDeleteConfirm(i)} danger title="Delete"><Trash2 size={13} /></IconBtn>
                  )}
                  <IconBtn onClick={() => setExpanded(isOpen ? null : i)} title={isOpen ? "Collapse" : "Expand"}>
                    {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </IconBtn>
                </div>
              </div>

              {/* Delete confirm banner */}
              {isDeleting && !isOpen && (
                <div style={{
                  padding: "0.6rem 1rem",
                  background: "rgba(248,113,113,0.08)",
                  borderTop: "1px solid rgba(248,113,113,0.2)",
                  fontSize: "0.8rem", color: "#f87171",
                  display: "flex", alignItems: "center", gap: "0.5rem",
                }}>
                  ⚠ Delete &quot;{getTitle(item)}&quot;? Click ✓ to confirm.
                </div>
              )}

              {/* Card body */}
              {isOpen && (
                <div style={{
                  padding: "1.25rem",
                  background: "var(--bg)",
                  borderTop: "1px solid var(--border)",
                  display: "flex", flexDirection: "column", gap: "1rem",
                }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {fields.map(({ key, label: lbl, placeholder, multiline, type }) => (
                      <div key={key} style={{ gridColumn: multiline ? "1 / -1" : undefined }}>
                        <Field label={lbl}>
                          {multiline ? (
                            <textarea
                              value={String(item[key] ?? "")}
                              onChange={(e) => update(i, key, e.target.value)}
                              placeholder={placeholder}
                              rows={3}
                              style={inputStyle}
                            />
                          ) : (
                            <input
                              type={type ?? "text"}
                              value={String(item[key] ?? "")}
                              onChange={(e) => update(i, key, type === "number" ? Number(e.target.value) : e.target.value)}
                              placeholder={placeholder}
                              style={inputStyle}
                            />
                          )}
                        </Field>
                      </div>
                    ))}
                  </div>

                  {/* Array fields */}
                  {arrayFields.map((arrKey) => {
                    if (!(arrKey in item)) return null;
                    const arr = (item[arrKey] as string[]) ?? [];
                    return (
                      <Field key={arrKey} label={arrayLabels[arrKey] ?? `${arrKey} (one per line)`}>
                        <textarea
                          value={arr.join("\n")}
                          onChange={(e) => update(i, arrKey, e.target.value.split("\n"))}
                          rows={Math.max(3, arr.length + 1)}
                          placeholder="One item per line"
                          style={{ ...inputStyle, fontFamily: "monospace", fontSize: "0.82rem" }}
                        />
                      </Field>
                    );
                  })}

                  {/* Boolean fields */}
                  {booleanFields.map((boolKey) => {
                    if (!(boolKey in item)) return null;
                    return (
                      <label key={boolKey} style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", userSelect: "none" }}>
                        <input
                          type="checkbox"
                          checked={Boolean(item[boolKey])}
                          onChange={(e) => update(i, boolKey, e.target.checked)}
                          style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "var(--accent,#6366f1)" }}
                        />
                        <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                          {booleanLabels[boolKey] ?? boolKey}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Add button */}
        <button
          onClick={addItem}
          style={{
            padding: "0.75rem",
            borderRadius: "12px",
            border: "1.5px dashed var(--border)",
            background: "transparent",
            color: "var(--accent,#6366f1)",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
            transition: "background 0.12s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(var(--accent-rgb,99,102,241),0.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          + Add {singular}
        </button>
      </div>
    </Section>
  );
}

/* ── Shared UI ─────────────────────────────────────────── */
function Section({ title, description, children, onSave }: {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSave: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>{title}</h2>
          {description && <p style={{ margin: "0.2rem 0 0", fontSize: "0.78rem", color: "var(--muted)" }}>{description}</p>}
        </div>
        <button
          onClick={onSave}
          style={{
            padding: "0.55rem 1.25rem",
            borderRadius: "9px",
            border: "none",
            background: "linear-gradient(135deg, var(--accent,#6366f1), #8b5cf6)",
            color: "#fff",
            fontSize: "0.84rem",
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          Save {title}
        </button>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <label style={{
        fontSize: "0.72rem", fontWeight: 600,
        color: "var(--muted)",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function IconBtn({ children, onClick, disabled, danger, title }: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        padding: "0.3rem 0.5rem",
        borderRadius: "7px",
        border: `1px solid ${danger ? "rgba(248,113,113,0.3)" : "var(--border)"}`,
        background: danger ? "rgba(248,113,113,0.08)" : "var(--surface)",
        color: danger ? "#f87171" : "var(--muted)",
        fontSize: "0.78rem",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.35 : 1,
        transition: "background 0.1s",
        lineHeight: 1,
      }}
    >
      {children}
    </button>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.65rem 0.9rem",
  borderRadius: "9px",
  border: "1.5px solid var(--border)",
  background: "var(--surface)",
  color: "var(--fg)",
  fontSize: "0.88rem",
  outline: "none",
  width: "100%",
  resize: "vertical",
  fontFamily: "inherit",
  transition: "border-color 0.15s",
  boxSizing: "border-box",
};
