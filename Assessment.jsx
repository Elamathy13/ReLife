import { useState } from "react";
import "./Assessment.css";
import { assessBattery } from "../engine/decisionEngine";

function Assessment({ onBack, onComplete }) {
  ReLife Decision Engine
// Prototype decision-support logic
// This does NOT certify battery safety.

const clamp = (value, min = 0, max = 100) => {
  return Math.min(Math.max(value, min), max);
};

const normalizePerformance = (performance) => {
  switch (performance) {
    case "Same as new":
      return 100;

    case "Slightly reduced":
      return 85;

    case "Moderately reduced":
      return 65;

    case "Significantly reduced":
      return 40;

    case "Very poor":
      return 20;

    default:
      return null;
  }
};

const normalizeYesNo = (value) => {
  if (value === "No") return 100;
  if (value === "Yes") return 40;
  return null;
};

const normalizeTemperature = (value) => {
  switch (value) {
    case "Normal":
      return 100;

    case "Slightly elevated":
      return 70;

    case "Abnormal":
      return 20;

    default:
      return null;
  }
};

const normalizeVoltage = (value) => {
  switch (value) {
    case "Stable":
      return 100;

    case "Moderately unstable":
      return 60;

    case "Highly unstable":
      return 20;

    default:
      return null;
  }
};

const normalizeResistance = (value) => {
  const resistance = Number(value);

  if (!Number.isFinite(resistance) || resistance < 0) {
    return null;
  }

  // Prototype normalization range.
  // This is NOT an industry safety threshold.
  const score = 100 - ((resistance - 20) / (150 - 20)) * 100;

  return clamp(score);
};

const getCapacityRetention = (ratedCapacity, measuredCapacity) => {
  const rated = Number(ratedCapacity);
  const measured = Number(measuredCapacity);

  if (
    !Number.isFinite(rated) ||
    !Number.isFinite(measured) ||
    rated <= 0 ||
    measured < 0
  ) {
    return null;
  }

  return clamp((measured / rated) * 100);
};

const getCapacityScore = (retention) => {
  if (retention === null) return null;

  return clamp(retention);
};

const calculateWeightedScore = (factors) => {
  const weights = {
    capacity: 40,
    resistance: 25,
    voltage: 20,
    temperature: 15,
  };

  let weightedTotal = 0;
  let totalWeight = 0;

  Object.entries(weights).forEach(([factor, weight]) => {
    const value = factors[factor];

    if (value !== null && value !== undefined) {
      weightedTotal += value * weight;
      totalWeight += weight;
    }
  });

  if (totalWeight === 0) {
    return null;
  }

  return Math.round(weightedTotal / totalWeight);
};

const getPathway = (score) => {
  if (score === null) {
    return "RECYCLE";
  }

  if (score >= 85) {
    return "REUSE";
  }

  if (score >= 65) {
    return "REPURPOSE";
  }

  return "RECYCLE";
};

const getPathwayDescription = (pathway) => {
  switch (pathway) {
    case "REUSE":
      return "The supplied information indicates relatively strong performance. The battery may have potential for continued use after appropriate professional validation.";

    case "REPURPOSE":
      return "The battery may no longer be ideal for its original application but could potentially fit a lower-demand second-life application after appropriate validation.";

    case "RECYCLE":
      return "The supplied information does not indicate a suitable second-life pathway under the current prototype criteria. Responsible recycling should be considered.";

    case "ISOLATE":
      return "A potentially abnormal or unsafe condition has been reported. The battery should not be recommended for reuse or repurposing based on this assessment.";

    default:
      return "Unable to determine a pathway.";
  }
};

const getApplicationCategories = (pathway) => {
  if (pathway !== "REPURPOSE") {
    return [];
  }

  return [
    "Low-power IoT applications",
    "Environmental sensing",
    "Emergency lighting",
    "Educational prototypes",
  ];
};

const getFactorStatus = (value) => {
  if (value === null || value === undefined) {
    return "Not available";
  }

  if (value >= 85) {
    return "Good";
  }

  if (value >= 65) {
    return "Moderate";
  }

  if (value >= 40) {
    return "Low";
  }

  return "Poor";
};

const calculateDataCompleteness = (data, mode) => {
  let available = 0;
  let expected = 0;

  if (mode === "quick") {
    const fields = [
      data.deviceType,
      data.batteryAge,
      data.performance,
      data.fastDischarge,
      data.shutdowns,
      data.heating,
      data.physicalDamage,
    ];

    expected = fields.length;

    fields.forEach((field) => {
      if (field !== "" && field !== null && field !== undefined) {
        available++;
      }
    });

    // Battery health is optional.
    if (
      data.batteryHealth !== "" &&
      data.batteryHealth !== null &&
      data.batteryHealth !== undefined
    ) {
      available++;
      expected++;
    }
  } else {
    const fields = [
      data.deviceType,
      data.batteryAge,
      data.ratedCapacity,
      data.measuredCapacity,
      data.internalResistance,
      data.voltageBehaviour,
      data.temperatureBehaviour,
    ];

    expected = fields.length;

    fields.forEach((field) => {
      if (field !== "" && field !== null && field !== undefined) {
        available++;
      }
    });
  }

  if (expected === 0) {
    return 0;
  }

  return Math.round((available / expected) * 100);
};

const getConfidence = (dataCompleteness, mode) => {
  if (mode === "quick") {
    if (dataCompleteness >= 90) return "Moderate";
    if (dataCompleteness >= 60) return "Limited";
    return "Very Limited";
  }

  if (dataCompleteness >= 90) return "Higher";
  if (dataCompleteness >= 60) return "Moderate";
  return "Limited";
};

export const assessBattery = (data) => {
  const mode = data.mode || "quick";

  /*
   * -------------------------------------------------------
   * 1. SAFETY OVERRIDE
   * -------------------------------------------------------
   */

  const physicalDamage =
    data.physicalDamage === "Yes";

  const abnormalTemperature =
    data.temperatureBehaviour === "Abnormal";

  const unusualHeating =
    data.heating === "Yes";

  if (physicalDamage || abnormalTemperature || unusualHeating) {
    const dataCompleteness = calculateDataCompleteness(data, mode);

    return {
      score: null,

      pathway: "ISOLATE",

      pathwayDescription: getPathwayDescription("ISOLATE"),

      dataCompleteness,

      confidence: getConfidence(dataCompleteness, mode),

      safetyFlag: true,

      factors: {
        capacity: null,
        resistance: null,
        voltage: null,
        temperature: abnormalTemperature ? 20 : null,
      },

      factorStatus: {
        capacity: "Not assessed",
        resistance: "Not assessed",
        voltage: "Not assessed",
        temperature: abnormalTemperature
          ? "Abnormal"
          : unusualHeating
          ? "Potentially abnormal"
          : "Not available",
      },

      explanations: [
        physicalDamage
          ? "Physical damage was reported."
          : null,

        abnormalTemperature
          ? "Abnormal temperature behaviour was reported."
          : null,

        unusualHeating
          ? "Unusual heating was reported during normal use."
          : null,

        "The system routes potentially abnormal cases to ISOLATE instead of recommending reuse or repurposing.",
      ].filter(Boolean),

      applicationCategories: [],

      disclaimer:
        "This is a software assessment record, not a safety certification. Professional handling and testing are required.",
    };
  }

  /*
   * -------------------------------------------------------
   * 2. CALCULATE AVAILABLE FACTORS
   * -------------------------------------------------------
   */

  let capacityScore = null;
  let resistanceScore = null;
  let voltageScore = null;
  let temperatureScore = null;

  let capacityRetention = null;

  if (mode === "detailed") {
    capacityRetention = getCapacityRetention(
      data.ratedCapacity,
      data.measuredCapacity
    );

    capacityScore = getCapacityScore(capacityRetention);

    resistanceScore = normalizeResistance(
      data.internalResistance
    );

    voltageScore = normalizeVoltage(
      data.voltageBehaviour
    );

    temperatureScore = normalizeTemperature(
      data.temperatureBehaviour
    );
  } else {
    /*
     * QUICK ASSESSMENT
     *
     * We use observable user information.
     * We do NOT invent technical parameters.
     */

    if (
      data.batteryHealth !== "" &&
      data.batteryHealth !== null &&
      data.batteryHealth !== undefined
    ) {
      const health = Number(data.batteryHealth);

      if (Number.isFinite(health)) {
        capacityScore = clamp(health);
        capacityRetention = clamp(health);
      }
    }

    const performanceScore =
      normalizePerformance(data.performance);

    const dischargeScore =
      normalizeYesNo(data.fastDischarge);

    const shutdownScore =
      normalizeYesNo(data.shutdowns);

    /*
     * For Quick Assessment, performance observations
     * are used only as available user-observation factors.
     *
     * Missing technical data is NOT fabricated.
     */

    if (capacityScore === null && performanceScore !== null) {
      capacityScore = performanceScore;
    }

    if (voltageScore === null && dischargeScore !== null) {
      voltageScore = dischargeScore;
    }

    if (temperatureScore === null && unusualHeating === false) {
      temperatureScore = 100;
    }

    if (resistanceScore === null && shutdownScore !== null) {
      resistanceScore = shutdownScore;
    }
  }

  /*
   * -------------------------------------------------------
   * 3. CALCULATE SCORE
   * -------------------------------------------------------
   */

  const factors = {
    capacity: capacityScore,
    resistance: resistanceScore,
    voltage: voltageScore,
    temperature: temperatureScore,
  };

  const score = calculateWeightedScore(factors);

  /*
   * -------------------------------------------------------
   * 4. PATHWAY
   * -------------------------------------------------------
   */

  const pathway = getPathway(score);

  /*
   * -------------------------------------------------------
   * 5. DATA COMPLETENESS
   * -------------------------------------------------------
   */

  const dataCompleteness =
    calculateDataCompleteness(data, mode);

  const confidence =
    getConfidence(dataCompleteness, mode);

  /*
   * -------------------------------------------------------
   * 6. EXPLANATION
   * -------------------------------------------------------
   */

  const explanations = [];

  if (capacityScore !== null) {
    explanations.push(
      `Capacity-related assessment: ${getFactorStatus(
        capacityScore
      )}.`
    );
  }

  if (resistanceScore !== null) {
    explanations.push(
      `Resistance-related assessment: ${getFactorStatus(
        resistanceScore
      )}.`
    );
  }

  if (voltageScore !== null) {
    explanations.push(
      `Voltage/performance behaviour: ${getFactorStatus(
        voltageScore
      )}.`
    );
  }

  if (temperatureScore !== null) {
    explanations.push(
      `Temperature behaviour: ${getFactorStatus(
        temperatureScore
      )}.`
    );
  }

  if (score !== null) {
    explanations.push(
      `The resulting prototype score is ${score}, leading to a potential ${pathway.toLowerCase()} pathway under the current decision rules.`
    );
  }

  if (dataCompleteness < 90) {
    explanations.push(
      "Some information was unavailable, so this assessment should be treated as preliminary."
    );
  }

  /*
   * -------------------------------------------------------
   * 7. APPLICATION MATCHING
   * -------------------------------------------------------
   */

  const applicationCategories =
    getApplicationCategories(pathway);

  /*
   * -------------------------------------------------------
   * 8. FINAL RESULT
   * -------------------------------------------------------
   */

  return {
    score,

    pathway,

    pathwayDescription:
      getPathwayDescription(pathway),

    dataCompleteness,

    confidence,

    safetyFlag: false,

    capacityRetention,

    factors,

    factorStatus: {
      capacity: getFactorStatus(capacityScore),
      resistance: getFactorStatus(resistanceScore),
      voltage: getFactorStatus(voltageScore),
      temperature: getFactorStatus(temperatureScore),
    },

    explanations,

    applicationCategories,

    disclaimer:
      "Potential pathway based on supplied diagnostic/user data. This software assessment is not a safety certification. Physical reuse or repurposing requires appropriate testing, protection and application-specific validation.",
  };
};

export default assessBattery;