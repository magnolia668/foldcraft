import { useState } from "react"
import { ArrowRight, Menu, X, Globe } from "lucide-react"
import { Link } from "react-router-dom"
import { useI18n } from "../i18n"

const NAV_LINKS_KEY = ["home", "projects", "studio", "reach_us"]

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, toggleLang, lang } = useI18n()

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-geist">
      {/* Video Background */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        style={{ objectPosition: "70% center" }}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Navbar */}
      <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-lg font-semibold tracking-tight text-white sm:text-xl">Foldcraft</Link>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS_KEY.map((key) => (
              <Link
                key={key}
                to={key === "home" ? "/" : `/${key.replace("_", "-")}`}
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
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
          <button
            className="md:hidden active:scale-90 w-10 h-10 flex items-center justify-center z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white transition-all duration-300" style={{ opacity: 1, scale: 1, rotate: 0 }} />
            ) : (
              <Menu className="w-6 h-6 text-white transition-all duration-300" style={{ opacity: 1, scale: 1, rotate: 0 }} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-x-0 top-0 z-20 bg-black/[0.98] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? "h-screen opacity-100" : "h-0 opacity-0 pointer-events-none"}`}
      >
        <div className={`flex h-full flex-col items-center justify-center px-8 transition-all duration-500 delay-100 ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          {NAV_LINKS_KEY.map((key) => (
            <Link
              key={key}
              to={key === "home" ? "/" : `/${key.replace("_", "-")}`}
              className="text-3xl font-medium text-white/90 hover:text-white my-4"
              onClick={() => setMobileMenuOpen(false)}
            >
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

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-between h-[calc(100vh-80px)] px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm text-white/90 mb-4 sm:mb-6 animate-[fadeSlideUp_0.8s_ease_0.2s_both]">
            {t("home.tagline")}
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight text-white animate-[fadeSlideUp_0.8s_ease_0.4s_both]">
            {t("home.title").split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < t("home.title").split("\n").length - 1 && <br className="hidden sm:block" />}
              </span>
            ))}
          </h1>
        </div>

        <div>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/60 max-w-sm sm:max-w-lg mb-5 sm:mb-6 animate-[fadeSlideUp_0.8s_ease_0.7s_both]">
            {t("home.subtitle")}
          </p>
          <Link to="/projects">
            <button className="rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-black hover:scale-105 transition-transform inline-flex items-center gap-2 animate-[fadeSlideUp_0.8s_ease_0.9s_both]">
              {t("home.explore")}
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}