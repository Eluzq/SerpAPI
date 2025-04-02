import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import type { AIOverviewData, TextBlock, Reference } from "../lib/types"

interface AIOverviewResultsProps {
  data: AIOverviewData
}

export function AIOverviewResults({ data }: AIOverviewResultsProps) {
  // デバッグ用にコンソールにデータを出力
  console.log("AI Overview Data:", data)

  if (!data.ai_overview) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-600">AI Overviewのデータが見つかりませんでした。</p>
      </div>
    )
  }

  const { text_blocks, references } = data.ai_overview

  // デバッグ用にテキストブロックの数を出力
  console.log("Text Blocks Count:", text_blocks?.length || 0)
  if (text_blocks) {
    text_blocks.forEach((block, index) => {
      console.log(`Block ${index} Type:`, block.type)
    })
  }

  return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="content">コンテンツ</TabsTrigger>
        <TabsTrigger value="references">参考文献</TabsTrigger>
      </TabsList>

      <TabsContent value="content">
        <Card>
          <CardHeader>
            <CardTitle>AI Overview コンテンツ</CardTitle>
          </CardHeader>
          <CardContent>
            {text_blocks && text_blocks.length > 0 ? (
              text_blocks.map((block, index) => (
                <div key={index} className="mb-6">
                  {renderTextBlock(block, index, references)}
                </div>
              ))
            ) : (
              <p className="text-gray-500">テキストブロックが見つかりませんでした。</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="references">
        <Card>
          <CardHeader>
            <CardTitle>参考文献</CardTitle>
          </CardHeader>
          <CardContent>
            {references && references.length > 0 ? (
              references.map((ref, index) => (
                <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
                  <h3 className="font-semibold text-lg">
                    <a
                      href={ref.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {ref.title}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">出典: {ref.source}</p>
                  {ref.snippet && <p className="mt-2">{ref.snippet}</p>}
                </div>
              ))
            ) : (
              <p className="text-gray-500">参考文献が見つかりませんでした。</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function renderTextBlock(block: TextBlock, index: number, references: Reference[] | undefined) {
  // デバッグ用にブロックの内容を出力
  console.log(`Rendering Block ${index}:`, block)

  switch (block.type) {
    case "paragraph":
      return (
        <div>
          <p className="mb-2">{block.snippet}</p>
          {block.reference_indexes && references && (
            <div className="text-xs text-gray-500">
              参照:{" "}
              {block.reference_indexes
                .map((idx) => {
                  const ref = references.find((r) => r.index === idx)
                  return ref ? ref.source : ""
                })
                .filter(Boolean)
                .join(", ")}
            </div>
          )}
        </div>
      )

    case "list":
      return (
        <div>
          <ul className="list-disc pl-5 space-y-3">
            {block.list &&
              block.list.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item.title && <strong>{item.title}: </strong>}
                  {item.snippet}
                  {item.reference_indexes && references && (
                    <div className="text-xs text-gray-500 mt-1">
                      参照:{" "}
                      {item.reference_indexes
                        .map((idx) => {
                          const ref = references.find((r) => r.index === idx)
                          return ref ? ref.source : ""
                        })
                        .filter(Boolean)
                        .join(", ")}
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      )

    default:
      return <p>サポートされていないブロックタイプ: {block.type}</p>
  }
}

