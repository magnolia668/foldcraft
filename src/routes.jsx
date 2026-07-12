import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Studio from "./pages/Studio"
import ReachUs from "./pages/ReachUs"
import ProjectDetail from "./pages/ProjectDetail"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/studio" element={<Studio />} />
      <Route path="/reach-us" element={<ReachUs />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
    </Routes>
  )
}
