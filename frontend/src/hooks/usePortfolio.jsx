import { createContext, useContext, useEffect, useState } from 'react'
import { publicApi } from '../services/api'
import { projects, services, skills, toProject } from '../data/portfolioData'
const initial = { projects, services, skills }
const PortfolioContext = createContext(initial)
export function PortfolioProvider({ children }) {
  const [data, setData] = useState(initial)
  useEffect(() => {
    const controller = new AbortController()
    for (const key of Object.keys(initial)) {
      publicApi[key]({ signal: controller.signal }).then(({ data: response }) => {
        if (response.meta?.catalog_version !== 2 || !Array.isArray(response.data)) return
        const label = key === 'skills' ? 'name' : 'title'
        if (!response.data.every((item) => item && typeof item[label] === 'string')) return
        const items = key === 'projects' ? response.data.map(toProject) : key === 'services' ? response.data.map((item) => ({ ...item, features: Array.isArray(item.features) ? item.features : [] })) : response.data
        if (!controller.signal.aborted) setData((previous) => ({ ...previous, [key]: items }))
      }).catch(() => { /* Retain this section's build-time fallback on failure/cancellation. */ })
    }
    return () => controller.abort()
  }, [])
  return <PortfolioContext.Provider value={data}>{children}</PortfolioContext.Provider>
}
export const usePortfolio = () => useContext(PortfolioContext)
