import type { AIOverviewData } from "./types"

export async function fetchAIOverviewData(query: string): Promise<AIOverviewData> {
  try {
    const url = new URL("/api/search", window.location.origin)
    url.searchParams.append("query", query)

    const response = await fetch(url.toString())

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "不明なエラー" }))
      throw new Error(errorData.error || `APIエラー: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("AI Overviewデータの取得中にエラーが発生しました:", error)
    throw error
  }
}

