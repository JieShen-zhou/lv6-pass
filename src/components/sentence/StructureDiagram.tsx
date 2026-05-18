interface StructureDiagramProps {
  structure: string
  translation: string
}

export default function StructureDiagram({ structure, translation }: StructureDiagramProps) {
  return (
    <div className="space-y-4">
      <div className="bg-card rounded-2xl shadow-sm border border-border p-5">
        <h3 className="font-semibold text-accent mb-3">句子结构图解</h3>
        <pre className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap font-mono bg-bg rounded-lg p-4 overflow-x-auto">
          {structure}
        </pre>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border p-5">
        <h3 className="font-semibold text-accent mb-3">参考翻译</h3>
        <p className="text-text leading-relaxed">{translation}</p>
      </div>
    </div>
  )
}
