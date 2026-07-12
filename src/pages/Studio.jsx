import { useState } from "react"
import { Menu, X, ArrowRight, Globe, Palette, Film, Code, PenTool, Sparkles, Layers } from "lucide-react"
import { Link } from "react-router-dom"
import { useI18n } from "../i18n"

const SERVICE_BG = {
  "品牌识别": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  "动态与影视": "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
  "网页与交互": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
  "插画": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
  "创意指导": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  "3D与空间": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
}

const NAV_LINKS_KEY = ["home", "projects", "studio", "reach_us"]
const SERVICE_ICONS = [Palette, Film, Code, PenTool, Sparkles, Layers]

export default function Studio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, toggleLang, lang } = useI18n()
  const services = t("studio.services")
  const processSteps = t("studio.process_steps")

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
        <p className="text-sm text-cyan-400/80 mb-3 tracking-wide uppercase">{t("studio.section_label")}</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium leading-tight tracking-tight">
          {t("studio.title")}
        </h1>
        <p className="mt-6 max-w-2xl text-base text-white/50 leading-relaxed">
          {t("studio.description")}
        </p>
      </div>

      {/* Services Grid */}
      <div className="px-6 pb-20 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = SERVICE_ICONS[i] || Palette
            const bgImage = SERVICE_BG[service.title]
            return (
              <div key={service.title} className="group relative rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300">
                {/* Background Image */}
                {bgImage && (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${bgImage})` }}
                  />
                )}
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/75 to-[#0a0e1a]/50" />
                {/* Card Content */}
                <div className="relative p-6">
                  <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center mb-5 group-hover:bg-white/15 transition-colors">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs text-cyan-400/60 uppercase tracking-wider mb-2">{service.tag}</p>
                  <h3 className="text-lg font-medium mb-2">{service.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Process Section */}
      <div className="px-6 pb-20 md:px-12 lg:px-16 border-t border-white/5 pt-16">
        <p className="text-sm text-cyan-400/80 mb-3 tracking-wide uppercase">{t("studio.process_label")}</p>
        <h2 className="text-3xl sm:text-4xl font-medium leading-tight mb-12">{t("studio.process_title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {processSteps.map((item) => (
            <div key={item.step}>
              <p className="text-4xl font-medium text-white/10 mb-3">{item.step}</p>
              <h3 className="text-lg font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
