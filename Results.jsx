import "./Results.css";

function Results({ result, onBack, onHome }) {
  if (!result) {
    return (
      <div className="results-page">
        <div className="results-empty">
          <h2>No assessment result found.</h2>
          <button onClick={onBack}>Back to Assessment</button>
        </div>
      </div>
    );
  }

  const pathway = result.pathway || "RECYCLE";
  const score = result.score ?? "N/A";

  const pathwayInfo = {
    REUSE: {
      title: "REUSE",
      description:
        "The supplied battery information indicates relatively strong performance. It may have potential for continued use after appropriate professional validation.",
      icon: "↻",
    },

    REPURPOSE: {
      title: "REPURPOSE",
      description:
        "The battery may no longer be ideal for its original application but could potentially fit a lower-demand second-life application.",
      icon: "♻",
    },

    RECYCLE: {
      title: "RECYCLE",
      description:
        "The supplied information does not indicate a suitable second-life pathway under the current prototype criteria. Responsible recycling is recommended.",
      icon: "♻",
    },

    ISOLATE: {
      title: "ISOLATE",
      description:
        "An abnormal or potentially unsafe condition was detected. Do not continue testing or reuse the battery. Professional handling is recommended.",
      icon: "⚠",
    },
  };

  const info = pathwayInfo[pathway] || pathwayInfo.RECYCLE;

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

              <h2>{info.title}</h2>

              <p>{info.description}</p>

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
                {result.factors?.capacity ?? "—"}
              </strong>
            </div>

            <div className="factor-card">
              <span>Resistance</span>
              <strong>
                {result.factors?.resistance ?? "—"}
              </strong>
            </div>

            <div className="factor-card">
              <span>Voltage</span>
              <strong>
                {result.factors?.voltage ?? "—"}
              </strong>
            </div>

            <div className="factor-card">
              <span>Temperature</span>
              <strong>
                {result.factors?.temperature ?? "—"}
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
              This result is generated using ReLife's
              transparent rule-based assessment methodology.
              The score is based only on the information
              supplied during the assessment.
            </p>

            {result.reasons?.length > 0 && (
              <ul>
                {result.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            )}

          </div>

        </section>

        {/* Application Matching */}
        {pathway === "REPURPOSE" &&
          result.applicationCategory && (
            <section className="application-section">

              <div className="results-section-title">
                <span>03</span>

                <div>
                  <h2>Potential Application</h2>
                  <p>
                    Possible lower-demand categories.
                  </p>
                </div>
              </div>

              <div className="application-card">

                <div className="application-icon">
                  ♻
                </div>

                <div>
                  <h3>
                    {result.applicationCategory}
                  </h3>

                  <p>
                    This is a potential application category,
                    not a safety certification or deployment
                    approval.
                  </p>
                </div>

              </div>

            </section>
          )}

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
            onClick={() => {
              alert(
                "Digital Second-Life Passport will be generated here."
              );
            }}
          >
            Generate Passport →
          </button>

        </div>

      </main>

    </div>
  );
}

export default Results;