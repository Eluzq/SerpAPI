import { type NextRequest, NextResponse } from "next/server"

const API_KEY = process.env.NEXT_PUBLIC_SERPAPI_KEY || ""

async function performGoogleSearch(query: string) {
  const url = new URL("https://serpapi.com/search")
  url.searchParams.append("engine", "google")
  url.searchParams.append("q", query)
  url.searchParams.append("hl", "ja")
  url.searchParams.append("gl", "jp")
  url.searchParams.append("api_key", API_KEY)

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(`Google検索APIエラー: ${response.status} ${response.statusText}`)
  }

  return await response.json()
}

async function fetchAIOverview(pageToken: string) {
  const url = new URL("https://serpapi.com/search")
  url.searchParams.append("engine", "google_ai_overview")
  url.searchParams.append("page_token", pageToken)
  url.searchParams.append("api_key", API_KEY)

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(`AI Overview APIエラー: ${response.status} ${response.statusText}`)
  }

  return await response.json()
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "検索クエリが指定されていません" }, { status: 400 })
  }

  if (!API_KEY) {
    return NextResponse.json({ error: "API キーが設定されていません" }, { status: 500 })
  }

  try {
    const searchResults = await performGoogleSearch(query)

    if (searchResults.ai_overview) {
      if (searchResults.ai_overview.text_blocks) {
        return NextResponse.json({
          search_metadata: searchResults.search_metadata,
          search_parameters: searchResults.search_parameters,
          ai_overview: searchResults.ai_overview,
        })
      }

      if (searchResults.ai_overview.page_token) {
        const pageToken = searchResults.ai_overview.page_token
        const aiOverviewData = await fetchAIOverview(pageToken)
        return NextResponse.json(aiOverviewData)
      }
    }

    return NextResponse.json({
      search_metadata: searchResults.search_metadata,
      search_parameters: searchResults.search_parameters,
      no_ai_overview: true,
      search_results: {
        organic_results: searchResults.organic_results || [],
        knowledge_graph: searchResults.knowledge_graph,
        answer_box: searchResults.answer_box,
      },
    })
  } catch (error) {
    console.error("API エラー:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "不明なエラーが発生しました" },
      { status: 500 },
    )
  }
}

