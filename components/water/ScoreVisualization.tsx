import { cn } from "@/lib/utils";
import type { WaterScore } from "@/lib/epa/score";

const GRADE_COLOR: Record<WaterScore["grade"], string> = {
  A: "text-emerald-600",
  B: "text-cyan-500",
  C: "text-amber-400",
  D: "text-amber-500",
  F: "text-red-500",
};

const GRADE_RING: Record<WaterScore["grade"], string> = {
  A: "stroke-emerald-500",
  B: "stroke-cyan-400",
  C: "stroke-amber-300",
  D: "stroke-amber-500",
  F: "stroke-red-500",
};

const GRADE_TONE: Record<WaterScore["grade"], string> = {
  A: "Excellent compliance record",
  B: "Solid compliance, watch the edges",
  C: "Mixed record — read below carefully",
  D: "Repeated issues worth taking seriously",
  F: "Significant unresolved problems",
};

export function ScoreVisualization({ score }: { score: WaterScore }) {
  const R = 70;
  const C = 2 * Math.PI * R;
  const pct = Math.max(0, Math.min(1, score.score / 100));
  const dashOffset = C * (1 - pct);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
        <circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          stroke="#E5E8EC"
          strokeWidth="10"
        />
        <circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={dashOffset}
          className={cn("transition-all duration-700", GRADE_RING[score.grade])}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-serif text-6xl leading-none", GRADE_COLOR[score.grade])}>
          {score.grade}
        </span>
        <span className="mt-1 text-sm text-muted">{score.score} / 100</span>
      </div>
    </div>
  );
}

export function ScoreSummary({ score }: { score: WaterScore }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-10">
      <ScoreVisualization score={score} />
      <div className="flex-1">
        <div className="eyebrow mb-2">Water Score</div>
        <h2 className="display text-3xl md:text-4xl text-ocean-700 mb-3">
          {GRADE_TONE[score.grade]}
        </h2>
        <p className="text-ink/75 leading-relaxed mb-4 max-w-prose">
          Score is built from EPA SDWIS regulatory compliance data over the past
          5 years. It measures how well your utility follows the rules — not
          whether the rules themselves are protective enough. See{" "}
          <a href="/methodology" className="text-cyan-500 hover:underline">methodology</a> for the full breakdown.
        </p>
        {score.breakdown.length > 0 && (
          <ul className="space-y-1 text-sm text-ink/70">
            {score.breakdown.map((b, i) => (
              <li key={i}>• {b}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
