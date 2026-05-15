import type { SdwisViolation, WaterSystem } from "./sdwis";

/**
 * Water Score methodology — see /methodology page for the human-readable
 * version of this. The short of it:
 *
 *   100 points to start.
 *   - 12 points off per active, health-based MCL violation in past 5 years.
 *   - 6 points off per resolved health-based violation.
 *   - 3 points off per active monitoring/reporting violation.
 *   - 1.5 points off per resolved monitoring/reporting violation.
 *   - Source-water penalty: surface-water systems start 4 points lower
 *     than groundwater (more disinfection-byproduct exposure on average).
 *   - Floor: 25. Ceiling: 100.
 *
 * BRUTALLY HONEST: this score is a proxy for regulatory compliance and
 * source-water type. It is NOT a tap-water lab test. A score of 100
 * means "this utility has no reported violations in SDWIS for the past
 * 5 years and uses groundwater" — which is good, but does not rule out
 * lead in YOUR home's plumbing or PFAS that the utility has never been
 * required to test for.
 */

export interface WaterScore {
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  healthBasedActive: number;
  healthBasedResolved: number;
  monitoringActive: number;
  monitoringResolved: number;
  totalViolations: number;
  breakdown: string[];
}

export function computeScore(
  system: WaterSystem,
  violations: SdwisViolation[]
): WaterScore {
  let score = 100;
  const breakdown: string[] = [];

  const active = (v: SdwisViolation) =>
    v.status === "Unaddressed" || v.status === "Addressed";

  const hbActive = violations.filter((v) => v.isHealthBased && active(v));
  const hbResolved = violations.filter(
    (v) => v.isHealthBased && !active(v) && v.status !== "Archived"
  );
  const monActive = violations.filter((v) => !v.isHealthBased && active(v));
  const monResolved = violations.filter(
    (v) => !v.isHealthBased && !active(v) && v.status !== "Archived"
  );

  if (hbActive.length) {
    const d = hbActive.length * 12;
    score -= d;
    breakdown.push(
      `−${d} for ${hbActive.length} active health-based violation${hbActive.length > 1 ? "s" : ""}`
    );
  }
  if (hbResolved.length) {
    const d = hbResolved.length * 6;
    score -= d;
    breakdown.push(
      `−${d} for ${hbResolved.length} resolved health-based violation${hbResolved.length > 1 ? "s" : ""}`
    );
  }
  if (monActive.length) {
    const d = monActive.length * 3;
    score -= d;
    breakdown.push(
      `−${d} for ${monActive.length} active monitoring/reporting violation${monActive.length > 1 ? "s" : ""}`
    );
  }
  if (monResolved.length) {
    const d = Math.round(monResolved.length * 1.5);
    score -= d;
    breakdown.push(
      `−${d} for ${monResolved.length} resolved monitoring/reporting violation${monResolved.length > 1 ? "s" : ""}`
    );
  }

  if (system.primarySource === "Surface water") {
    score -= 4;
    breakdown.push("−4 surface-water source (higher disinfection-byproduct exposure on average)");
  }

  score = Math.max(25, Math.min(100, Math.round(score)));

  let grade: WaterScore["grade"] = "F";
  if (score >= 92) grade = "A";
  else if (score >= 82) grade = "B";
  else if (score >= 70) grade = "C";
  else if (score >= 55) grade = "D";

  return {
    score,
    grade,
    healthBasedActive: hbActive.length,
    healthBasedResolved: hbResolved.length,
    monitoringActive: monActive.length,
    monitoringResolved: monResolved.length,
    totalViolations: violations.length,
    breakdown,
  };
}

/** National-baseline contaminant risk profile, used when SDWIS data is
 * sparse. These are honest, rough national-average concern levels — NOT
 * a substitute for actual sampling. */
export function baselineConcerns(system: WaterSystem) {
  const isSurface = system.primarySource === "Surface water";
  const concerns: Array<{ slug: string; reason: string }> = [
    {
      slug: "lead",
      reason:
        "Lead enters water after the utility's responsibility ends — at the service line and inside the home. Worth testing in any pre-1986 building regardless of utility.",
    },
    {
      slug: "pfas",
      reason:
        "USGS detected PFAS in at least 45% of U.S. tap-water samples. Most utilities have not yet completed compliance sampling under the 2024 rule.",
    },
  ];
  if (isSurface) {
    concerns.push({
      slug: "tthm",
      reason:
        "Surface-water systems have higher organic-matter loads, which means higher disinfection-byproduct formation on average.",
    });
  }
  return concerns;
}
