import "./Results.css";

function Results({ result, onBack, onHome, onGeneratePassport }) {
  if (!result) {
    return (
      <div className="results-page">
        <div className="results-empty">
          <h2>No assessment result found.</h2>
          <button className="primary-action" onClick={onBack}>
            ← Back to Assessment
          </button>
        </div>
      </div>
    );
  }

  const pathway = result.pathway || "RECYCLE";
  const score = result.score ?? "N/A";
  const factors = result.factors || {};

  const pathwayInfo = {
    REUSE: {
      title: "REUSE",
      description:
        "The supplied battery information indicates relatively strong performance. It may have potential for continued use after appropriate professional validation.",
      icon: "↻",
      nextTitle: "Recommended Next Step",
      nextText:
        "Consider professional battery testing and application-specific validation before any continued use. ReLife's result is a potential pathway assessment, not a safety approval.",
    },

    REPURPOSE: {
      title: "REPURPOSE",
      description:
        "The battery may no longer be ideal for its original application but could potentially fit a lower-demand second-life application.",
      icon: "♻",
      nextTitle: "Potential Next Step",
      nextText:
        "Consider lower-demand second-life categories such as low-power IoT applications, environmental sensing, emergency lighting or educational prototypes, subject to professional testing and application-specific validation.",
    },

    RECYCLE: {
      title: "RECYCLE",
      description:
        "The supplied information does not indicate a suitable second-life pathway under the current prototype criteria. Responsible recycling is recommended.",
      icon: "♲",
      nextTitle: "Recommended Next Step",
      nextText:
        "Route the battery through an appropriate battery collection or recycling channel. Do not attempt to reuse or repurpose it based only on this software assessment.",
    },

    ISOLATE: {
      title: "ISOLATE",
      description:
        "An abnormal or potentially unsafe condition was detected. Do not continue testing or reuse the battery. Professional handling is recommended.",
      icon: "⚠",
      nextTitle: "Immediate Next Step",
      nextText:
        "Do not continue testing, charging or attempting to reuse the battery. Follow appropriate professional handling procedures for a potentially abnormal battery.",
    },
  };

  const info = pathwayInfo[pathway] || pathwayInfo.RECYCLE;

  /* FACTOR-BASED EXPLANATION */

  const reasons = [];

  if (factors.capacity !== undefined && factors.capacity !== null) {
    if (factors.capacity >= 85) {
      reasons.push(
        `Capacity performance is strong (${factors.capacity}/100), which supports a higher second-life potential.`
      );
    } else if (factors.capacity >= 65) {
      reasons.push(
        `Capacity performance is moderate (${factors.capacity}/100), indicating noticeable degradation but some remaining potential.`
      );
    } else {
      reasons.push(
        `Capacity performance is relatively low (${factors.capacity}/100), reducing the potential for continued or second-life use.`
      );
    }
  }

  if (
    factors.resistance !== undefined &&
    factors.resistance !== null
  ) {
    if (factors.resistance >= 85) {
      reasons.push(
        `The resistance factor is favourable (${factors.resistance}/100), supporting the overall assessment.`
      );
    } else if (factors.resistance >= 65) {
      reasons.push(
        `The resistance factor is moderate (${factors.resistance}/100), so it contributes some limitation to the assessment.`
      );
    } else {
      reasons.push(
        `The resistance factor is relatively low (${factors.resistance}/100), which reduces the overall score.`
      );
    }
  }

  if (
    factors.voltage !== undefined &&
    factors.voltage !== null
  ) {
    if (factors.voltage >= 85) {
      reasons.push(
        `Voltage behaviour is stable according to the supplied information (${factors.voltage}/100).`
      );
    } else if (factors.voltage >= 65) {
      reasons.push(
        `Voltage behaviour shows some instability (${factors.voltage}/100), which limits the assessment.`
      );
    } else {
      reasons.push(
        `Voltage behaviour is relatively unstable (${factors.voltage}/100), reducing the potential pathway score.`
      );
    }
  }

  if (
    factors.temperature !== undefined &&
    factors.temperature !== null
  ) {
    if (factors.temperature >= 85) {
      reasons.push(
        `Temperature behaviour is within the favourable range supplied for the assessment (${factors.temperature}/100).`
      );
    } else if (factors.temperature >= 65) {
      reasons.push(
        `Temperature behaviour shows some elevation (${factors.temperature}/100), which limits the assessment.`
      );
    } else {
      reasons.push(
        `Temperature behaviour is abnormal or unfavourable (${factors.temperature}/100), which can strongly affect the pathway decision.`
      );
    }
  }

  if (reasons.length === 0) {
    reasons.push(
      "The result was generated from the available information supplied during the assessment."
    );
  }

  return (
    <div className="results-page">

      {/* Header */}

      <header className="results-header">

        <button
          className="results-back"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="results-logo">
          <span className="results-logo-mark"></span>
          <span>ReLife</span>
        </div>

        <div className="results-step">
          Step 2 of 3
        </div>

      </header>

      {/* Main */}

      <main className="results-container">

        <div className="results-heading">

          <span className="results-tag">
            ASSESSMENT COMPLETE
          </span>

          <h1>
            Your battery's
            <span> potential pathway.</span>
          </h1>

          <p>
            Based on the information provided, ReLife has
            generated the following decision-support result.
          </p>

        </div>

        {/* Score */}

        <section className="score-section">

          <div className="score-card">

            <div className="score-label">
              SECOND-LIFE SCORE
            </div>

            <div className="score-number">
              {score}
            </div>

            <div className="score-out-of">
              out of 100
            </div>

          </div>

          <div className="pathway-card">

            <div className="pathway-icon">
              {info.icon}
            </div>

            <div className="pathway-content">

              <span className="pathway-label">
                POTENTIAL PATHWAY
              </span>

              <h2>
                {info.title}
              </h2>

              <p>
                {info.description}
              </p>

            </div>

          </div>

        </section>

        {/* Factors */}

        <section className="factors-section">

          <div className="results-section-title">

            <span>01</span>

            <div>
              <h2>Assessment Factors</h2>

              <p>
                Factors considered in the decision.
              </p>
            </div>

          </div>

          <div className="factor-grid">

            <div className="factor-card">
              <span>Capacity</span>
              <strong>
                {factors.capacity ?? "—"}
              </strong>
            </div>

            <div className="factor-card">
              <span>Resistance</span>
              <strong>
                {factors.resistance ?? "—"}
              </strong>
            </div>

            <div className="factor-card">
              <span>Voltage</span>
              <strong>
                {factors.voltage ?? "—"}
              </strong>
            </div>

            <div className="factor-card">
              <span>Temperature</span>
              <strong>
                {factors.temperature ?? "—"}
              </strong>
            </div>

          </div>

        </section>

        {/* Explanation */}

        <section className="explanation-section">

          <div className="results-section-title">

            <span>02</span>

            <div>

              <h2>Why this result?</h2>

              <p>
                ReLife explains the factors behind its recommendation.
              </p>

            </div>

          </div>

          <div className="explanation-card">

            <p>
              This result is generated using ReLife's transparent
              rule-based assessment methodology. The score is based
              only on the information supplied during the assessment.
            </p>

            <ul>

              {reasons.map((reason, index) => (
                <li key={index}>
                  {reason}
                </li>
              ))}

            </ul>

          </div>

        </section>

        {/* Next Step */}

        <section className="next-step-section">

          <div className="results-section-title">

            <span>03</span>

            <div>

              <h2>{info.nextTitle}</h2>

              <p>
                What the assessment suggests doing next.
              </p>

            </div>

          </div>

          <div
            className={`next-step-card pathway-${pathway.toLowerCase()}`}
          >

            <div className="next-step-icon">
              {info.icon}
            </div>

            <div>

              <h3>
                {pathway === "REPURPOSE"
                  ? "Potential second-life direction"
                  : info.title}
              </h3>

              <p>
                {info.nextText}
              </p>

            </div>

          </div>

          {pathway === "REPURPOSE" && (
            <div className="application-list">

              <span>
                Potential application categories
              </span>

              <div className="application-tags">

                <div>Low-power IoT</div>
                <div>Environmental sensing</div>
                <div>Emergency lighting</div>
                <div>Educational prototypes</div>

              </div>

            </div>
          )}

        </section>

        {/* Data confidence */}

        <section className="confidence-section">

          <div className="confidence-card">

            <div>

              <span className="confidence-label">
                DATA COMPLETENESS
              </span>

              <h3>
                {result.dataCompleteness ?? "Limited"}
              </h3>

            </div>

            <div>

              <span className="confidence-label">
                ASSESSMENT CONFIDENCE
              </span>

              <h3>
                {result.confidence ?? "Limited data"}
              </h3>

            </div>

          </div>

        </section>

        {/* Disclaimer */}

        <div className="results-disclaimer">

          <strong>Important:</strong>

          <p>
            ReLife provides a software-based potential pathway
            assessment. It does not physically test batteries,
            certify safety or authorize reuse. Physical reuse
            or repurposing requires appropriate professional
            testing, protection and application-specific
            validation.
          </p>

        </div>

        {/* Actions */}

        <div className="results-actions">

          <button
            className="secondary-action"
            onClick={onBack}
          >
            ← Assess Again
          </button>

          <button
            className="primary-action"
            onClick={onGeneratePassport}
          >
            Generate Passport →
          </button>

        </div>

      </main>

    </div>
  );
}

export default Results;