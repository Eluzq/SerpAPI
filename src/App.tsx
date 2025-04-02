"use client"

import { useState } from "react"
import { SearchForm } from "./components/search-form"
import { AIOverviewResults } from "./components/ai-overview-results"
import { SearchResults } from "./components/search-results"
import { LoadingSpinner } from "./components/ui/loading-spinner"
import { fetchAIOverviewData } from "./lib/api"
import type { AIOverviewData, SearchResultsData } from "./lib/types"
import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert"
import { ThemeProvider } from "./components/theme-provider"

export default function App() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<AIOverviewData | null>(null)
  const [searchResults, setSearchResults] = useState<SearchResultsData | null>(null)

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery)
    setIsLoading(true)
    setError(null)
    setData(null)
    setSearchResults(null)

    try {
      const result = await fetchAIOverviewData(searchQuery)
      console.log("検索結果:", result)

      if (result.no_ai_overview) {
        setSearchResults(result as SearchResultsData)
      } else {
        setData(result as AIOverviewData)
      }
    } catch (err) {
      console.error("検索エラー:", err)
      setError(err instanceof Error ? err.message : "検索中にエラーが発生しました。")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ThemeProvider defaultTheme="system">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Google AI Overview 検索ツール</h1>

        <SearchForm onSearch={handleSearch} />

        {isLoading && (
          <div className="flex justify-center my-12">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="my-6">
            <AlertTitle>エラーが発生しました</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {data && !isLoading && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">「{query}」の検索結果</h2>
            <AIOverviewResults data={data} />
          </div>
        )}

        {searchResults && !isLoading && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">「{query}」の検索結果</h2>
            <Alert className="mb-6">
              <AlertTitle>AI Overviewが利用できません</AlertTitle>
              <AlertDescription>
                この検索クエリに対するAI Overviewは利用できませんでした。代わりに通常の検索結果を表示します。
              </AlertDescription>
            </Alert>
            <SearchResults data={searchResults} />
          </div>
        )}
      </main>
    </ThemeProvider>
  )
}

