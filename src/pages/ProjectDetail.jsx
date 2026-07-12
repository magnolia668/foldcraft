import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Globe, Menu, X } from "lucide-react"
import { useState } from "react"
import { useI18n } from "../i18n"

const PROJECT_IMAGES = {
  "ocean-acidification": "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=1200&q=80",
  "coral-reef-map": "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=1200&q=80",
  "marine-biodiversity": "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&q=80",
  "deep-sea-log": "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1200&q=80",
  "plastic-tracker": "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=1200&q=80",
  "arctic-ice": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80"
}

const NAV_LINKS_KEY = ["home", "projects", "studio", "reach_us"]

export default function ProjectDetail() {
  const { slug } = useParams()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, toggleLang, lang } = useI18n()

  const project = t("projects.items").find((p) => p.slug === slug)
  const detail = project?.detail
  const imageUrl = PROJECT_IMAGES[slug] || PROJECT_IMAGES["ocean-acidification"]

  if (!project || !detail) {
    return (
      <div className="min-h-screen w-full bg-[#0a0e1a] flex items-center justify-center font-geist text-white">
        <div className="text-center px-6">
          <h1 className="text-3xl mb-4">Not Found</h1>
          <Link to="/projects">
            <button className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-black">Back to Projects</button>
          </Link>
        </div>
      </div>
    )
  }

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

      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <img src={imageUrl} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:px-12 md:pb-16 lg:px-16">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <p className="text-xs text-cyan-400/80 uppercase tracking-wider mb-3">{project.tag}</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight tracking-tight">{project.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-12 md:px-12 md:py-16 lg:px-16 max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">{detail.overview}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {detail.stats.map((stat, i) => (
            <div key={i} className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-6 text-center">
              <p className="text-2xl md:text-3xl font-medium text-cyan-400 mb-2">{stat.value}</p>
              <p className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        <div>
          {detail.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-base text-white/60 leading-relaxed mb-6">{paragraph}</p>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5">
          <Link to="/projects">
            <button className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-black hover:scale-[1.02] transition-transform inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}