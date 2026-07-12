import { useState } from "react"
import { Menu, X, ArrowRight, Mail, MapPin, Globe } from "lucide-react"
import { Link } from "react-router-dom"
import { useI18n } from "../i18n"

const NAV_LINKS_KEY = ["home", "projects", "studio", "reach_us"]

export default function ReachUs() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, toggleLang, lang } = useI18n()
  const socialLinks = t("reach_us.social_links")

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
          <button className="hidden md:inline-flex rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:scale-105 transition-transform">
            {t("cta")}
          </button>
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
          <button className="mt-6 rounded-full bg-white px-8 py-3.5 text-base font-medium text-black hover:scale-105 transition-transform">
            {t("cta")}
          </button>
          <button
            onClick={() => { toggleLang(); setMobileMenuOpen(false); }}
            className="mt-4 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <Globe className="w-5 h-5" />
            <span className="text-sm">{lang === "zh" ? "English" : "中文"}</span>
          </button>
        </div>
      </div>

      <div className="px-6 pt-16 pb-20 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div>
            <p className="text-sm text-cyan-400/80 mb-3 tracking-wide uppercase">{t("reach_us.section_label")}</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium leading-tight tracking-tight mb-6">
              {t("reach_us.title").split("\n").map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-md mb-10">
              {t("reach_us.description")}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/40 mb-1">{t("reach_us.email_label")}</p>
                  <p className="text-white">{t("reach_us.email_value")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/40 mb-1">{t("reach_us.location_label")}</p>
                  <p className="text-white">{t("reach_us.location_value")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/40 mb-1">{t("reach_us.social_label")}</p>
                  <div className="flex gap-4">
                    {socialLinks.map((link) => (
                      <a key={link} href="#" className="text-white/70 hover:text-white transition-colors">{link}</a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-8">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div>
                <label className="block text-sm text-white/60 mb-2">{t("reach_us.form_name")}</label>
                <input
                  type="text"
                  placeholder={t("reach_us.form_name_placeholder")}
                  className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">{t("reach_us.form_email")}</label>
                <input
                  type="email"
                  placeholder={t("reach_us.form_email_placeholder")}
                  className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">{t("reach_us.form_message")}</label>
                <textarea
                  rows={5}
                  placeholder={t("reach_us.form_message_placeholder")}
                  className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                />
              </div>
              <button className="w-full rounded-lg bg-white px-6 py-3 text-sm font-medium text-black hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2">
                {t("reach_us.form_submit")} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}