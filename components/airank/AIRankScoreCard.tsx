'use client'

interface ScoreCardProps {
  geo_score: number
  seo_score: number
  aeo_score: number
  ai_score: number
  overall_score: number
  status?: 'APPROVED' | 'NEEDS_EDIT' | 'FLAGGED'
  ai_notes?: string
  flagged_reasons?: string[]
  revised_content?: string
}

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-bold" style={{ color }}>{score}/100</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export function AIRankScoreCard({
  geo_score, seo_score, aeo_score, ai_score,
  overall_score, status, ai_notes, flagged_reasons, revised_content
}: ScoreCardProps) {
  const statusConfig = {
    APPROVED: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', label: ' APPROVED' },
    NEEDS_EDIT: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', label: ' NEEDS EDIT' },
    FLAGGED: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: ' FLAGGED' },
  }

  const cfg = status ? statusConfig[status] : statusConfig.APPROVED

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#16a34a'
    if (score >= 60) return '#d97706'
    return '#dc2626'
  }

  return (
    <div className={`rounded-xl border-2 ${cfg.border} ${cfg.bg} p-6 space-y-4`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">AIRank Score</h3>
        {status && (
          <span className={`text-sm font-bold px-3 py-1 rounded-full ${cfg.bg} ${cfg.text} border ${cfg.border}`}>
            {cfg.label}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-5xl font-black" style={{ color: getScoreColor(overall_score) }}>
          {overall_score}
        </div>
        <div className="text-sm text-gray-500">
          <div>Overall Score</div>
          <div className="text-xs">out of 100</div>
        </div>
      </div>

      <div className="space-y-3">
        <ScoreBar label="GEO" score={geo_score} color={getScoreColor(geo_score)} />
        <ScoreBar label="SEO" score={seo_score} color={getScoreColor(seo_score)} />
        <ScoreBar label="AEO" score={aeo_score} color={getScoreColor(aeo_score)} />
        <ScoreBar label="AI Visibility" score={ai_score} color={getScoreColor(ai_score)} />
      </div>

      {ai_notes && (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">AI Analysis</p>
          <p className="text-sm text-gray-700">{ai_notes}</p>
        </div>
      )}

      {flagged_reasons && flagged_reasons.length > 0 && (
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <p className="text-xs font-semibold text-red-600 uppercase mb-2">Flagged Issues</p>
          <ul className="space-y-1">
            {flagged_reasons.map((reason, i) => (
              <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                <span></span><span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {revised_content && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-xs font-semibold text-blue-600 uppercase mb-2">AI Suggested Revision</p>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{revised_content}</p>
        </div>
      )}
    </div>
  )
}
