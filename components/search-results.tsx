import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SearchResultsData } from "@/lib/types"

interface SearchResultsProps {
  data: SearchResultsData
}

export function SearchResults({ data }: SearchResultsProps) {
  const { search_results } = data

  const hasResults =
    search_results &&
    ((search_results.organic_results && search_results.organic_results.length > 0) ||
      search_results.knowledge_graph ||
      search_results.answer_box)

  if (!hasResults) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-lg text-gray-600">検索結果が見つかりませんでした。</p>
          <p className="text-sm text-gray-500 mt-2">別のキーワードで検索してみてください。</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {search_results.answer_box && (
        <Card>
          <CardHeader>
            <CardTitle>回答ボックス</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose">
              <h3>{search_results.answer_box.title || "回答"}</h3>
              <p>{search_results.answer_box.answer || search_results.answer_box.snippet}</p>
              {search_results.answer_box.source && (
                <p className="text-sm text-gray-500">
                  出典:{" "}
                  {typeof search_results.answer_box.source === "object" && search_results.answer_box.source.name
                    ? search_results.answer_box.source.name
                    : typeof search_results.answer_box.source === "string"
                      ? search_results.answer_box.source
                      : "不明"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {search_results.knowledge_graph && (
        <Card>
          <CardHeader>
            <CardTitle>ナレッジグラフ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose">
              <h3>{search_results.knowledge_graph.title}</h3>
              <p>{search_results.knowledge_graph.description}</p>
              {search_results.knowledge_graph.source && (
                <p className="text-sm text-gray-500">
                  出典:{" "}
                  {typeof search_results.knowledge_graph.source === "object" &&
                  search_results.knowledge_graph.source.name
                    ? search_results.knowledge_graph.source.name
                    : typeof search_results.knowledge_graph.source === "string"
                      ? search_results.knowledge_graph.source
                      : "不明"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {search_results.organic_results && search_results.organic_results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>検索結果</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {search_results.organic_results.slice(0, 5).map((result, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold text-lg">
                    <a
                      href={result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {result.title}
                    </a>
                  </h3>
                  <p className="text-sm text-green-700">{result.displayed_link || result.link}</p>
                  <p className="mt-1">{result.snippet}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

