import { createContext, useContext, useState, useCallback } from "react"
import en from "./locales/en.json"
import zh from "./locales/zh.json"

const translations = { en, zh }

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("foldcraft-lang")
    return saved || "zh"
  })

  const t = useCallback(
    (key) => {
      const keys = key.split(".")
      let obj = translations[lang]
      for (const k of keys) {
        if (obj === undefined || obj === null) return key
        obj = obj[k]
      }
      return typeof obj === "string" ? obj : obj
    },
    [lang],
  )

  const toggleLang = useCallback(() => {
    const next = lang === "zh" ? "en" : "zh"
    setLang(next)
    localStorage.setItem("foldcraft-lang", next)
  }, [lang])

  return <I18nContext.Provider value={{ lang, t, toggleLang }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}