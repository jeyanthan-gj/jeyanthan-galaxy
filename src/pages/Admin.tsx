import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Briefcase, Award, Mail, Settings, Save, RotateCcw, Plus, Trash2,
  ChevronDown, ChevronUp, ExternalLink, Eye, EyeOff, Lock, Unlock,
  GraduationCap, Code, Star, FileText, Users, Building, Globe,
  Shield, CheckCircle, AlertCircle, X, Menu, LogOut, Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  PortfolioData, defaultPortfolioData, loadPortfolioData,
  savePortfolioData, resetPortfolioData,
  Project, SkillGroup, SkillItem, Award as AwardType, Certificate,
  LeadershipRole, IndustrialVisit, Education, SocialLink
} from '@/data/portfolioData';

// ─── Auth Gate ────────────────────────────────────────────────────────────────
// ⬇️ Change this to update the admin password
const ADMIN_PASSWORD = "jeyanthan2024";
function getStoredPassword() { return ADMIN_PASSWORD; }
function setStoredPassword(_pw: string) { /* password is set in code */ }

function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleLogin = () => {
    if (pw === getStoredPassword()) {
      onAuth();
    } else {
      setError('Incorrect password');
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setPw('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'hsl(220 20% 8%)' }}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'linear-gradient(hsl(210 100% 56% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(210 100% 56% / 0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'hsl(210 100% 56%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-15" style={{ background: 'hsl(275 100% 60%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <motion.div
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="rounded-2xl border p-8 backdrop-blur-xl"
            style={{ background: 'hsl(220 15% 12% / 0.9)', borderColor: 'hsl(220 15% 20%)' }}>

            {/* Lock icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, hsl(210 100% 56%), hsl(275 100% 60%))' }}>
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-1 text-white">Admin Access</h1>
            <p className="text-center text-sm mb-8" style={{ color: 'hsl(215 20% 65%)' }}>
              Jeyanthan Galaxy — Portfolio Manager
            </p>

            <div className="space-y-4">
              <div className="relative">
                <Input
                  type={show ? 'text' : 'password'}
                  placeholder="Enter admin password"
                  value={pw}
                  onChange={e => { setPw(e.target.value); setError(''); }}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  className="pr-10 text-white"
                  style={{ background: 'hsl(220 15% 15%)', borderColor: error ? 'hsl(0 84% 60%)' : 'hsl(220 15% 20%)' }}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
                >
                  {show ? <EyeOff className="w-4 h-4 text-white" /> : <Eye className="w-4 h-4 text-white" />}
                </button>
              </div>

              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-sm flex items-center gap-2" style={{ color: 'hsl(0 84% 60%)' }}>
                  <AlertCircle className="w-4 h-4" /> {error}
                </motion.p>
              )}

              <Button onClick={handleLogin} className="w-full font-semibold"
                style={{ background: 'linear-gradient(135deg, hsl(210 100% 56%), hsl(275 100% 60%))' }}>
                <Lock className="w-4 h-4 mr-2" /> Access Dashboard
              </Button>
            </div>


          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Reusable helpers ─────────────────────────────────────────────────────────
function SectionHeader({ icon: Icon, title, count }: { icon: any; title: string; count?: number }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, hsl(210 100% 56% / 0.2), hsl(275 100% 60% / 0.2))', border: '1px solid hsl(210 100% 56% / 0.3)' }}>
        <Icon className="w-4 h-4" style={{ color: 'hsl(210 100% 56%)' }} />
      </div>
      <h2 className="text-lg font-bold text-white">{title}</h2>
      {count !== undefined && (
        <Badge className="ml-auto text-xs" style={{ background: 'hsl(210 100% 56% / 0.15)', color: 'hsl(210 100% 70%)', border: '1px solid hsl(210 100% 56% / 0.3)' }}>
          {count} items
        </Badge>
      )}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'hsl(215 20% 55%)' }}>{children}</label>;
}

function AdminInput({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <Input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-white text-sm"
        style={{ background: 'hsl(220 15% 10%)', borderColor: 'hsl(220 15% 22%)', color: 'hsl(210 40% 98%)' }} />
    </div>
  );
}

function AdminTextarea({ label, value, onChange, placeholder, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <Textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        className="text-white text-sm resize-none"
        style={{ background: 'hsl(220 15% 10%)', borderColor: 'hsl(220 15% 22%)', color: 'hsl(210 40% 98%)' }} />
    </div>
  );
}

function ItemCard({ children, onDelete, title }: { children: React.ReactNode; onDelete: () => void; title?: string }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: 'hsl(220 15% 10%)', borderColor: 'hsl(220 15% 18%)' }}>
      <div className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
        style={{ background: 'hsl(220 15% 12%)' }}>
        <button onClick={() => setOpen(!open)} className="flex items-center gap-2 flex-1 text-left">
          {open ? <ChevronUp className="w-4 h-4" style={{ color: 'hsl(215 20% 55%)' }} /> : <ChevronDown className="w-4 h-4" style={{ color: 'hsl(215 20% 55%)' }} />}
          <span className="text-sm font-medium text-white truncate">{title || 'Item'}</span>
        </button>
        <button onClick={onDelete} className="p-1.5 rounded-lg transition-colors hover:bg-red-500/20 flex-shrink-0"
          title="Delete">
          <Trash2 className="w-4 h-4" style={{ color: 'hsl(0 84% 60%)' }} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            className="overflow-hidden">
            <div className="p-4 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed text-sm font-medium transition-all hover:border-blue-500 hover:text-blue-400"
      style={{ borderColor: 'hsl(220 15% 25%)', color: 'hsl(215 20% 55%)' }}>
      <Plus className="w-4 h-4" /> {label}
    </button>
  );
}

// ─── Section Editors ──────────────────────────────────────────────────────────

function HeroEditor({ data, onChange }: { data: PortfolioData['hero']; onChange: (d: PortfolioData['hero']) => void }) {
  const update = (key: string, val: any) => onChange({ ...data, [key]: val });
  const updateSocial = (i: number, key: string, val: string) => {
    const s = [...data.socials]; s[i] = { ...s[i], [key]: val }; update('socials', s);
  };
  const addSocial = () => update('socials', [...data.socials, { platform: '', href: '', label: '' }]);
  const removeSocial = (i: number) => update('socials', data.socials.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-6">
      <SectionHeader icon={User} title="Hero / Header" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdminInput label="Name" value={data.name} onChange={v => update('name', v)} placeholder="Your full name" />
        <AdminInput label="Subtitle (small text above name)" value={data.subtitle} onChange={v => update('subtitle', v)} placeholder="Hello, I am" />
      </div>
      <AdminInput label="Title / Role" value={data.title} onChange={v => update('title', v)} placeholder="AI-focused Electronics Engineer" />

      <div>
        <SectionHeader icon={Globe} title="Social Links" count={data.socials.length} />
        <div className="space-y-3">
          {data.socials.map((s, i) => (
            <ItemCard key={i} title={s.platform || `Social ${i + 1}`} onDelete={() => removeSocial(i)}>
              <div className="grid grid-cols-3 gap-3">
                <AdminInput label="Platform" value={s.platform} onChange={v => updateSocial(i, 'platform', v)} placeholder="LinkedIn" />
                <AdminInput label="Label" value={s.label} onChange={v => updateSocial(i, 'label', v)} placeholder="LinkedIn Profile" />
                <AdminInput label="URL" value={s.href} onChange={v => updateSocial(i, 'href', v)} placeholder="https://..." />
              </div>
            </ItemCard>
          ))}
          <AddButton onClick={addSocial} label="Add Social Link" />
        </div>
      </div>
    </div>
  );
}

function AboutEditor({ data, onChange }: { data: PortfolioData['about']; onChange: (d: PortfolioData['about']) => void }) {
  const updatePI = (key: string, val: string) => onChange({ ...data, personalInfo: { ...data.personalInfo, [key]: val } });
  const updateEdu = (i: number, key: string, val: string) => {
    const e = [...data.education]; e[i] = { ...e[i], [key]: val }; onChange({ ...data, education: e });
  };
  const addEdu = () => onChange({ ...data, education: [...data.education, { degree: '', institution: '', website: '', period: '', grade: '', specialization: '' }] });
  const removeEdu = (i: number) => onChange({ ...data, education: data.education.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-6">
      <SectionHeader icon={User} title="About Me" />
      <AdminTextarea label="Summary / Bio" value={data.summary} onChange={v => onChange({ ...data, summary: v })} rows={4} placeholder="Write your professional summary..." />

      <div>
        <SectionHeader icon={Mail} title="Personal Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminInput label="Email" value={data.personalInfo.email} onChange={v => updatePI('email', v)} />
          <AdminInput label="Phone" value={data.personalInfo.phone} onChange={v => updatePI('phone', v)} />
          <AdminInput label="Date of Birth" value={data.personalInfo.dob} onChange={v => updatePI('dob', v)} />
          <AdminInput label="Address" value={data.personalInfo.address} onChange={v => updatePI('address', v)} />
        </div>
      </div>

      <div>
        <SectionHeader icon={GraduationCap} title="Education" count={data.education.length} />
        <div className="space-y-3">
          {data.education.map((edu, i) => (
            <ItemCard key={i} title={edu.degree || `Education ${i + 1}`} onDelete={() => removeEdu(i)}>
              <AdminInput label="Degree / Level" value={edu.degree} onChange={v => updateEdu(i, 'degree', v)} />
              <AdminInput label="Specialization (optional)" value={edu.specialization || ''} onChange={v => updateEdu(i, 'specialization', v)} />
              <div className="grid grid-cols-2 gap-3">
                <AdminInput label="Institution" value={edu.institution} onChange={v => updateEdu(i, 'institution', v)} />
                <AdminInput label="Website URL" value={edu.website} onChange={v => updateEdu(i, 'website', v)} />
                <AdminInput label="Period" value={edu.period} onChange={v => updateEdu(i, 'period', v)} placeholder="2022 – 2026" />
                <AdminInput label="Grade / CGPA" value={edu.grade || ''} onChange={v => updateEdu(i, 'grade', v)} placeholder="CGPA: 8.5" />
              </div>
            </ItemCard>
          ))}
          <AddButton onClick={addEdu} label="Add Education Entry" />
        </div>
      </div>
    </div>
  );
}

function ProfilesEditor({ data, onChange }: { data: PortfolioData['profiles']; onChange: (d: PortfolioData['profiles']) => void }) {
  // Projects
  const updateProject = (i: number, key: string, val: string) => {
    const p = [...data.projects]; p[i] = { ...p[i], [key]: val }; onChange({ ...data, projects: p });
  };
  const addProject = () => onChange({ ...data, projects: [...data.projects, { title: '', description: '', link: '' }] });
  const removeProject = (i: number) => onChange({ ...data, projects: data.projects.filter((_, idx) => idx !== i) });

  // Skills
  const updateSkillGroup = (i: number, key: string, val: any) => {
    const s = [...data.skills]; s[i] = { ...s[i], [key]: val }; onChange({ ...data, skills: s });
  };
  const addSkillGroup = () => onChange({ ...data, skills: [...data.skills, { category: '', items: [] }] });
  const removeSkillGroup = (i: number) => onChange({ ...data, skills: data.skills.filter((_, idx) => idx !== i) });
  const updateSkillItem = (gi: number, si: number, val: string) => {
    const s = [...data.skills]; const items = [...s[gi].items]; items[si] = { name: val }; s[gi] = { ...s[gi], items }; onChange({ ...data, skills: s });
  };
  const addSkillItem = (gi: number) => {
    const s = [...data.skills]; s[gi] = { ...s[gi], items: [...s[gi].items, { name: '' }] }; onChange({ ...data, skills: s });
  };
  const removeSkillItem = (gi: number, si: number) => {
    const s = [...data.skills]; s[gi] = { ...s[gi], items: s[gi].items.filter((_, idx) => idx !== si) }; onChange({ ...data, skills: s });
  };

  // Awards
  const updateAward = (i: number, key: string, val: string) => {
    const a = [...data.awards]; a[i] = { ...a[i], [key]: val }; onChange({ ...data, awards: a });
  };
  const addAward = () => onChange({ ...data, awards: [...data.awards, { title: '', date: '', href: '' }] });
  const removeAward = (i: number) => onChange({ ...data, awards: data.awards.filter((_, idx) => idx !== i) });

  // Certificates
  const updateCert = (i: number, key: string, val: string) => {
    const c = [...data.certificates]; c[i] = { ...c[i], [key]: val }; onChange({ ...data, certificates: c });
  };
  const addCert = () => onChange({ ...data, certificates: [...data.certificates, { name: '', provider: '', href: '' }] });
  const removeCert = (i: number) => onChange({ ...data, certificates: data.certificates.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-8">
      {/* Projects */}
      <div>
        <SectionHeader icon={Code} title="Projects" count={data.projects.length} />
        <div className="space-y-3">
          {data.projects.map((p, i) => (
            <ItemCard key={i} title={p.title || `Project ${i + 1}`} onDelete={() => removeProject(i)}>
              <AdminInput label="Title" value={p.title} onChange={v => updateProject(i, 'title', v)} />
              <AdminTextarea label="Description" value={p.description} onChange={v => updateProject(i, 'description', v)} rows={2} />
              <AdminInput label="GitHub / Link URL" value={p.link} onChange={v => updateProject(i, 'link', v)} placeholder="https://github.com/..." />
            </ItemCard>
          ))}
          <AddButton onClick={addProject} label="Add Project" />
        </div>
      </div>

      {/* Skills */}
      <div>
        <SectionHeader icon={Star} title="Skills" count={data.skills.length} />
        <div className="space-y-3">
          {data.skills.map((group, gi) => (
            <ItemCard key={gi} title={group.category || `Skill Group ${gi + 1}`} onDelete={() => removeSkillGroup(gi)}>
              <AdminInput label="Category Name" value={group.category} onChange={v => updateSkillGroup(gi, 'category', v)} placeholder="Artificial Intelligence" />
              <FieldLabel>Skills in this category</FieldLabel>
              <div className="space-y-2">
                {group.items.map((item, si) => (
                  <div key={si} className="flex gap-2">
                    <Input value={item.name} onChange={e => updateSkillItem(gi, si, e.target.value)}
                      placeholder="Skill name" className="text-white text-sm flex-1"
                      style={{ background: 'hsl(220 15% 8%)', borderColor: 'hsl(220 15% 20%)' }} />
                    <button onClick={() => removeSkillItem(gi, si)} className="p-2 rounded-lg hover:bg-red-500/20 transition-colors">
                      <X className="w-4 h-4" style={{ color: 'hsl(0 84% 60%)' }} />
                    </button>
                  </div>
                ))}
                <button onClick={() => addSkillItem(gi)}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-blue-500/10"
                  style={{ color: 'hsl(210 100% 60%)' }}>
                  <Plus className="w-3 h-3" /> Add Skill
                </button>
              </div>
            </ItemCard>
          ))}
          <AddButton onClick={addSkillGroup} label="Add Skill Category" />
        </div>
      </div>

      {/* Awards */}
      <div>
        <SectionHeader icon={Award} title="Awards & Achievements" count={data.awards.length} />
        <div className="space-y-3">
          {data.awards.map((a, i) => (
            <ItemCard key={i} title={a.title || `Award ${i + 1}`} onDelete={() => removeAward(i)}>
              <AdminInput label="Award Title" value={a.title} onChange={v => updateAward(i, 'title', v)} />
              <div className="grid grid-cols-2 gap-3">
                <AdminInput label="Date / Event" value={a.date} onChange={v => updateAward(i, 'date', v)} placeholder="Nov 2024" />
                <AdminInput label="LinkedIn / Link URL" value={a.href} onChange={v => updateAward(i, 'href', v)} />
              </div>
            </ItemCard>
          ))}
          <AddButton onClick={addAward} label="Add Award" />
        </div>
      </div>

      {/* Certificates */}
      <div>
        <SectionHeader icon={FileText} title="Certificates" count={data.certificates.length} />
        <div className="space-y-3">
          {data.certificates.map((c, i) => (
            <ItemCard key={i} title={c.name || `Certificate ${i + 1}`} onDelete={() => removeCert(i)}>
              <div className="grid grid-cols-2 gap-3">
                <AdminInput label="Certificate Name" value={c.name} onChange={v => updateCert(i, 'name', v)} />
                <AdminInput label="Provider / Issuer" value={c.provider} onChange={v => updateCert(i, 'provider', v)} />
              </div>
              <AdminInput label="LinkedIn / Verification URL" value={c.href} onChange={v => updateCert(i, 'href', v)} />
            </ItemCard>
          ))}
          <AddButton onClick={addCert} label="Add Certificate" />
        </div>
      </div>
    </div>
  );
}

function ExperienceEditor({ data, onChange }: { data: PortfolioData['experience']; onChange: (d: PortfolioData['experience']) => void }) {
  const updateLeadership = (i: number, key: string, val: string) => {
    const l = [...data.leadership]; l[i] = { ...l[i], [key]: val }; onChange({ ...data, leadership: l });
  };
  const addLeadership = () => onChange({ ...data, leadership: [...data.leadership, { role: '', organization: '', period: '', description: '' }] });
  const removeLeadership = (i: number) => onChange({ ...data, leadership: data.leadership.filter((_, idx) => idx !== i) });

  const updateVisit = (i: number, key: string, val: string) => {
    const v = [...data.industrialVisits]; v[i] = { ...v[i], [key]: val }; onChange({ ...data, industrialVisits: v });
  };
  const addVisit = () => onChange({ ...data, industrialVisits: [...data.industrialVisits, { company: '', location: '', date: '', description: '' }] });
  const removeVisit = (i: number) => onChange({ ...data, industrialVisits: data.industrialVisits.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-8">
      <div>
        <SectionHeader icon={Users} title="Leadership & Responsibility" count={data.leadership.length} />
        <div className="space-y-3">
          {data.leadership.map((l, i) => (
            <ItemCard key={i} title={l.role || `Role ${i + 1}`} onDelete={() => removeLeadership(i)}>
              <div className="grid grid-cols-2 gap-3">
                <AdminInput label="Role / Position" value={l.role} onChange={v => updateLeadership(i, 'role', v)} />
                <AdminInput label="Period" value={l.period} onChange={v => updateLeadership(i, 'period', v)} placeholder="2023 – 2026" />
              </div>
              <AdminInput label="Organization" value={l.organization} onChange={v => updateLeadership(i, 'organization', v)} />
              <AdminInput label="Description" value={l.description} onChange={v => updateLeadership(i, 'description', v)} />
            </ItemCard>
          ))}
          <AddButton onClick={addLeadership} label="Add Leadership Role" />
        </div>
      </div>

      <div>
        <SectionHeader icon={Building} title="Industrial Visits" count={data.industrialVisits.length} />
        <div className="space-y-3">
          {data.industrialVisits.map((v, i) => (
            <ItemCard key={i} title={v.company || `Visit ${i + 1}`} onDelete={() => removeVisit(i)}>
              <div className="grid grid-cols-2 gap-3">
                <AdminInput label="Company" value={v.company} onChange={val => updateVisit(i, 'company', val)} />
                <AdminInput label="Location" value={v.location} onChange={val => updateVisit(i, 'location', val)} />
                <AdminInput label="Date" value={v.date} onChange={val => updateVisit(i, 'date', val)} placeholder="January 2025" />
                <AdminInput label="Description" value={v.description} onChange={val => updateVisit(i, 'description', val)} />
              </div>
            </ItemCard>
          ))}
          <AddButton onClick={addVisit} label="Add Industrial Visit" />
        </div>
      </div>
    </div>
  );
}

function ContactEditor({ data, onChange }: { data: PortfolioData['contact']; onChange: (d: PortfolioData['contact']) => void }) {
  const update = (key: string, val: any) => onChange({ ...data, [key]: val });
  const updateSocial = (i: number, key: string, val: string) => {
    const s = [...data.socials]; s[i] = { ...s[i], [key]: val }; update('socials', s);
  };
  const addSocial = () => update('socials', [...data.socials, { platform: '', href: '', label: '' }]);
  const removeSocial = (i: number) => update('socials', data.socials.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-6">
      <SectionHeader icon={Mail} title="Contact Information" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdminInput label="Email" value={data.email} onChange={v => update('email', v)} type="email" />
        <AdminInput label="Phone" value={data.phone} onChange={v => update('phone', v)} />
        <AdminInput label="WhatsApp Number (digits only)" value={data.whatsapp} onChange={v => update('whatsapp', v)} placeholder="919976719167" />
      </div>

      <div>
        <SectionHeader icon={Globe} title="Social Links" count={data.socials.length} />
        <div className="space-y-3">
          {data.socials.map((s, i) => (
            <ItemCard key={i} title={s.platform || `Social ${i + 1}`} onDelete={() => removeSocial(i)}>
              <div className="grid grid-cols-3 gap-3">
                <AdminInput label="Platform" value={s.platform} onChange={v => updateSocial(i, 'platform', v)} placeholder="LinkedIn" />
                <AdminInput label="Label" value={s.label} onChange={v => updateSocial(i, 'label', v)} placeholder="LinkedIn" />
                <AdminInput label="URL" value={s.href} onChange={v => updateSocial(i, 'href', v)} placeholder="https://..." />
              </div>
            </ItemCard>
          ))}
          <AddButton onClick={addSocial} label="Add Social Link" />
        </div>
      </div>
    </div>
  );
}


// ─── Change Password ──────────────────────────────────────────────────────────
function ChangePasswordEditor() {
  const [current, setCurrent] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleChange = () => {
    setError('');
    if (!current || !newPw || !confirm) { setError('All fields are required.'); return; }
    if (current !== getStoredPassword()) { setError('Current password is incorrect.'); return; }
    if (newPw.length < 6) { setError('New password must be at least 6 characters.'); return; }
    if (newPw !== confirm) { setError('New passwords do not match.'); return; }
    setStoredPassword(newPw);
    setSuccess(true);
    setNewPassword(newPw);
    setCurrent(''); setNewPw(''); setConfirm('');
    toast({ title: "Password updated for this session!", description: "Update ADMIN_PASSWORD in Admin.tsx to make it permanent." });
  };

  const PasswordInput = ({ label, value, onChange, show, onToggle }: { label: string; value: string; onChange: (v: string) => void; show: boolean; onToggle: () => void }) => (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <Input type={show ? 'text' : 'password'} value={value} onChange={e => { onChange(e.target.value); setError(''); }}
          className="pr-10 text-white text-sm"
          style={{ background: 'hsl(220 15% 10%)', borderColor: error ? 'hsl(0 84% 60%)' : 'hsl(220 15% 22%)' }} />
        <button type="button" onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity">
          {show ? <EyeOff className="w-4 h-4 text-white" /> : <Eye className="w-4 h-4 text-white" />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-md">
      <SectionHeader icon={Lock} title="Change Password" />

      <div className="rounded-xl border p-5 space-y-4"
        style={{ background: 'hsl(220 15% 10%)', borderColor: 'hsl(220 15% 18%)' }}>
        <PasswordInput label="Current Password" value={current} onChange={setCurrent} show={showCurrent} onToggle={() => setShowCurrent(!showCurrent)} />
        <PasswordInput label="New Password" value={newPw} onChange={setNewPw} show={showNew} onToggle={() => setShowNew(!showNew)} />
        <PasswordInput label="Confirm New Password" value={confirm} onChange={setConfirm} show={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} />

        {error && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg"
            style={{ background: 'hsl(0 84% 60% / 0.1)', color: 'hsl(0 84% 65%)', border: '1px solid hsl(0 84% 60% / 0.3)' }}>
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
          </motion.div>
        )}

        {success && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-2 text-sm px-3 py-3 rounded-lg"
            style={{ background: 'hsl(142 70% 45% / 0.1)', color: 'hsl(142 70% 55%)', border: '1px solid hsl(142 70% 45% / 0.3)' }}>
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle className="w-4 h-4 flex-shrink-0" /> Active for this session!
            </div>
            <p className="text-xs opacity-80">To make it permanent, update this line in <strong>Admin.tsx</strong>:</p>
            <code className="block text-xs px-2 py-1.5 rounded font-mono break-all"
              style={{ background: 'hsl(220 15% 8%)', color: 'hsl(210 100% 70%)' }}>
              {`const ADMIN_PASSWORD = "${newPassword}";`}
            </code>
          </motion.div>
        )}

        <Button onClick={handleChange} className="w-full font-semibold"
          style={{ background: 'linear-gradient(135deg, hsl(210 100% 56%), hsl(275 100% 60%))' }}>
          <Lock className="w-4 h-4 mr-2" /> Update Password
        </Button>
      </div>

      <div className="rounded-xl border p-4" style={{ background: 'hsl(38 92% 50% / 0.05)', borderColor: 'hsl(38 92% 50% / 0.2)' }}>
        <p className="text-xs font-semibold mb-1" style={{ color: 'hsl(38 92% 60%)' }}>ℹ️ How to change password</p>
        <p className="text-xs" style={{ color: 'hsl(215 20% 55%)' }}>
          Password is stored in the source code (<code className="font-mono" style={{ color: 'hsl(210 100% 60%)' }}>src/pages/Admin.tsx</code>).
          Enter your new password above and click Update — it will apply immediately for this session.
          To make it permanent, commit the updated file to your repo.
        </p>
      </div>
    </div>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'hero', label: 'Hero', icon: User },
  { id: 'about', label: 'About', icon: GraduationCap },
  { id: 'profiles', label: 'Profiles', icon: Code },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [data, setData] = useState<PortfolioData>(() => loadPortfolioData());
  const [activeSection, setActiveSection] = useState('hero');
  const [saved, setSaved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    savePortfolioData(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    toast({ title: "Saved!", description: "Portfolio data updated successfully." });
  };

  const handleReset = () => {
    if (!confirm("Reset ALL data to defaults? This cannot be undone.")) return;
    const fresh = resetPortfolioData();
    setData(fresh);
    toast({ title: "Reset complete", description: "All data restored to defaults.", variant: "destructive" });
  };

  const update = (section: keyof PortfolioData, val: any) => setData(prev => ({ ...prev, [section]: val }));

  const sectionContent: Record<string, React.ReactNode> = {
    hero: <HeroEditor data={data.hero} onChange={v => update('hero', v)} />,
    about: <AboutEditor data={data.about} onChange={v => update('about', v)} />,
    profiles: <ProfilesEditor data={data.profiles} onChange={v => update('profiles', v)} />,
    experience: <ExperienceEditor data={data.experience} onChange={v => update('experience', v)} />,
    contact: <ContactEditor data={data.contact} onChange={v => update('contact', v)} />,
    settings: <ChangePasswordEditor />,
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'hsl(220 20% 7%)' }}>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:flex
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'hsl(220 15% 10%)', borderRight: '1px solid hsl(220 15% 16%)' }}>

        {/* Logo */}
        <div className="p-5 border-b" style={{ borderColor: 'hsl(220 15% 16%)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, hsl(210 100% 56%), hsl(275 100% 60%))' }}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Admin Panel</div>
              <div className="text-xs" style={{ color: 'hsl(215 20% 50%)' }}>Portfolio Manager</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const active = activeSection === item.id;
            return (
              <button key={item.id}
                onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left
                  ${active ? 'text-white' : 'hover:bg-white/5'}`}
                style={active ? { background: 'linear-gradient(135deg, hsl(210 100% 56% / 0.2), hsl(275 100% 60% / 0.2))', border: '1px solid hsl(210 100% 56% / 0.3)', color: 'hsl(210 100% 70%)' } : { color: 'hsl(215 20% 55%)' }}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: 'hsl(210 100% 60%)' }} />}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t space-y-1.5" style={{ borderColor: 'hsl(220 15% 16%)' }}>
          <a href="/" target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors hover:bg-white/5 w-full"
            style={{ color: 'hsl(215 20% 55%)' }}>
            <Home className="w-4 h-4" /> View Portfolio
          </a>
          <button onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors hover:bg-red-500/10 w-full"
            style={{ color: 'hsl(0 84% 60%)' }}>
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">

        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 px-4 sm:px-6 py-4"
          style={{ background: 'hsl(220 15% 9% / 0.95)', borderBottom: '1px solid hsl(220 15% 14%)', backdropFilter: 'blur(12px)' }}>
          <button className="lg:hidden p-2 rounded-lg transition-colors hover:bg-white/5"
            onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-5 h-5 text-white" />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-white truncate">
              {NAV_ITEMS.find(n => n.id === activeSection)?.label}
            </h1>
            <p className="text-xs" style={{ color: 'hsl(215 20% 50%)' }}>Edit portfolio content</p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="ghost" size="sm" onClick={handleReset}
              className="hidden sm:flex items-center gap-1.5 text-xs"
              style={{ color: 'hsl(0 84% 60%)' }}>
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </Button>
            <Button size="sm" onClick={handleSave}
              className="flex items-center gap-1.5 text-xs font-semibold"
              style={{ background: saved ? 'hsl(142 70% 45%)' : 'linear-gradient(135deg, hsl(210 100% 56%), hsl(275 100% 60%))' }}>
              {saved ? <CheckCircle className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              {saved ? 'Saved!' : 'Save Changes'}
            </Button>
          </div>
        </header>

        {/* Editor area */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Projects', value: data.profiles.projects.length, color: 'hsl(210 100% 56%)' },
              { label: 'Skills', value: data.profiles.skills.reduce((a, g) => a + g.items.length, 0), color: 'hsl(142 70% 45%)' },
              { label: 'Awards', value: data.profiles.awards.length, color: 'hsl(38 92% 50%)' },
              { label: 'Certs', value: data.profiles.certificates.length, color: 'hsl(275 100% 60%)' },
            ].map(stat => (
              <div key={stat.label} className="rounded-xl p-3 text-center"
                style={{ background: 'hsl(220 15% 11%)', border: '1px solid hsl(220 15% 16%)' }}>
                <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs" style={{ color: 'hsl(215 20% 50%)' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Section editor */}
          <AnimatePresence mode="wait">
            <motion.div key={activeSection}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl p-5 sm:p-6"
              style={{ background: 'hsl(220 15% 11%)', border: '1px solid hsl(220 15% 16%)' }}>
              {sectionContent[activeSection]}
            </motion.div>
          </AnimatePresence>

          {/* Floating save */}
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={handleReset} className="text-sm"
              style={{ borderColor: 'hsl(0 84% 60% / 0.4)', color: 'hsl(0 84% 60%)' }}>
              <RotateCcw className="w-4 h-4 mr-2" /> Reset to Defaults
            </Button>
            <Button onClick={handleSave} className="text-sm font-semibold px-6"
              style={{ background: saved ? 'hsl(142 70% 45%)' : 'linear-gradient(135deg, hsl(210 100% 56%), hsl(275 100% 60%))' }}>
              {saved ? <CheckCircle className="w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              {saved ? 'All Saved!' : 'Save All Changes'}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Page root ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === '1');

  const handleAuth = () => {
    sessionStorage.setItem('admin_auth', '1');
    setAuthed(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setAuthed(false);
  };

  return authed ? <Dashboard onLogout={handleLogout} /> : <AuthGate onAuth={handleAuth} />;
}
