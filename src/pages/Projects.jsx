import { useState } from "react"
import { Menu, X, ArrowRight, Globe, Waves, Fish, Anchor, Compass, Binoculars } from "lucide-react"
import { Link } from "react-router-dom"
import { useI18n } from "../i18n"

const PROJECT_BG = {
  "ocean-acidification": "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=800&q=80",
  "coral-reef-map": "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&q=80",
  "marine-biodiversity": "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80",
  "deep-sea-log": "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&q=80",
  "plastic-tracker": "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&q=80",
  "arctic-ice": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80"
}

const COLORS = [
  "from-blue-600 to-cyan-500",
  "from-orange-500 to-amber-400",
  "from-emerald-600 to-teal-500",
  "from-indigo-600 to-purple-500",
  "from-rose-500 to-pink-400",
  "from-sky-500 to-blue-400"
]

const ICONS = [Waves, Fish, Globe, Anchor, Binoculars, Compass]

const NAV_LINKS_KEY = ["home", "projects", "studio", "reach_us"]

export default function Projects() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, toggleLang, lang } = useI18n()
  const projects = t("projects.items")

  return (
    <div className="min-h-screen w-full bg-[#0a0e1a] font-geist text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-lg font-semibold tracking-tight text-white sm:text-xl">Foldcraft</Link>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS_KEY.map((key) => (
              <Link key={key} to={key === "home" ? "/" : `/${key.replace("_", "-")}`} className="text-sm text-white/80 hover:text-white transition-colors">
                {t(`nav.${key}`)}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/reach-us">
            <button className="hidden md:inline-flex rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:scale-105 transition-transform">
              {t("cta")}
            </button>
          </Link>
          <button
            onClick={toggleLang}
            className="hidden md:inline-flex rounded-lg bg-white/10 px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/20 transition-colors"
            title={lang === "zh" ? "Switch to English" : "切换为中文"}
          >
            <Globe className="w-4 h-4" />
          </button>
          <button className="md:hidden active:scale-90 w-10 h-10 flex items-center justify-center" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-x-0 top-0 z-40 bg-black/[0.98] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? "h-screen opacity-100" : "h-0 opacity-0 pointer-events-none"}`}>
        <div className={`flex h-full flex-col items-center justify-center px-8 transition-all duration-500 delay-100 ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          {NAV_LINKS_KEY.map((key) => (
            <Link key={key} to={key === "home" ? "/" : `/${key.replace("_", "-")}`} className="text-3xl font-medium text-white/90 hover:text-white my-4" onClick={() => setMobileMenuOpen(false)}>
              {t(`nav.${key}`)}
            </Link>
          ))}
          <Link to="/reach-us" onClick={() => setMobileMenuOpen(false)}>
            <button className="mt-6 rounded-full bg-white px-8 py-3.5 text-base font-medium text-black hover:scale-105 transition-transform">
              {t("cta")}
            </button>
          </Link>
          <button
            onClick={() => { toggleLang(); setMobileMenuOpen(false); }}
            className="mt-4 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <Globe className="w-5 h-5" />
            <span className="text-sm">{lang === "zh" ? "English" : "中文"}</span>
          </button>
        </div>
      </div>

      {/* Page Header */}
      <div className="px-6 pt-16 pb-12 md:px-12 lg:px-16">
        <p className="text-sm text-cyan-400/80 mb-3 tracking-wide uppercase">{t("projects.section_label")}</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium leading-tight tracking-tight">
          {t("projects.title").split("\n").map((line, i) => (
            <span key={i}>{line}{i < t("projects.title").split("\n").length - 1 && <br className="hidden sm:block" />}</span>
          ))}
        </h1>
        <p className="mt-6 max-w-lg text-base text-white/50 leading-relaxed">
          {t("projects.description")}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="px-6 pb-20 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const Icon = ICONS[i]
            const bgImage = PROJECT_BG[project.slug]
            return (
              <Link key={project.slug} to={`/projects/${project.slug}`} className="group relative rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${bgImage})` }}
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/70 to-[#0a0e1a]/30" />
                {/* Top Gradient Bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${COLORS[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                {/* Card Content */}
                <div className="relative p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${COLORS[i]} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">{project.tag}</p>
                  <h3 className="text-lg font-medium mb-2 group-hover:text-white transition-colors">{project.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{project.desc}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm text-white/60 group-hover:text-cyan-400 transition-colors">
                    {t("projects.view_case_study")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
