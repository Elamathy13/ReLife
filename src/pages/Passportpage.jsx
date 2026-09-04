import "./Passport.css";
import { QRCodeSVG } from "qrcode.react";
import { compressToEncodedURIComponent } from "lz-string";

function Passport({ result, onBack, onHome }) {
  if (!result) {
    return (
      <div className="passport-page">
        <div className="passport-empty">
          <h2>No assessment found</h2>
          <p>Please complete a battery assessment first.</p>

          <button onClick={onHome} className="passport-button">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const passportId =
    result.passportId ||
    `RL-${Date.now().toString().slice(-8)}`;

  const assessmentDate = new Date().toLocaleDateString();


  const passportData = {
  ...result,
  passportId,
  assessmentDate,
};

const encodedPassport = compressToEncodedURIComponent(
  JSON.stringify(passportData)
);

const qrData = `${window.location.origin}/?passport=${encodedPassport}`;


  const pathway = result.pathway || "RECYCLE";

  const pathwayDescriptions = {
    REUSE:
      "The supplied information indicates relatively strong performance. Continued use may be possible after appropriate professional validation.",
    REPURPOSE:
      "The supplied information suggests the battery may have potential for a lower-demand second-life application after appropriate testing and validation.",
    RECYCLE:
      "The supplied information does not indicate sufficient second-life potential under the prototype assessment criteria. Responsible recycling is recommended.",
    ISOLATE:
      "An abnormal or potentially unsafe condition was reported. The battery should be isolated and handled through appropriate professional channels.",
  };

  return (
    <div className="passport-page">
      {/* HEADER */}
      <header className="passport-header">
        <button className="passport-back" onClick={onBack}>
          ← Back to Results
        </button>

        <div className="passport-logo">
          <span className="logo-mark"></span>
          <span>ReLife</span>
        </div>

        <div className="passport-title-small">
          DIGITAL SECOND-LIFE PASSPORT
        </div>
      </header>

      {/* MAIN */}
      <main className="passport-container">
        <div className="passport-heading">
          <span>DIGITAL RECORD</span>
          <h1>Second-Life Passport</h1>
          <p>
            A digital assessment record containing the supplied battery
            information, assessment result and potential next-life pathway.
          </p>
        </div>

        {/* PASSPORT CARD */}
        <section className="passport-card">
          <div className="passport-card-top">
            <div>
              <span className="passport-label">
                PASSPORT ID
              </span>

              <h2>{passportId}</h2>
            </div>

            <div className="passport-status">
              SOFTWARE ASSESSMENT RECORD
            </div>
          </div>

          <div className="passport-divider"></div>

          {/* BATTERY INFORMATION */}
          <div className="passport-section">
            <h3>Battery Information</h3>

            <div className="passport-grid">
              <div className="passport-field">
                <span>Battery ID</span>
                <strong>
                  {result.batteryId || "Not provided"}
                </strong>
              </div>

              <div className="passport-field">
                <span>Chemistry</span>
                <strong>
                  {result.chemistry || "Lithium-ion"}
                </strong>
              </div>

              <div className="passport-field">
                <span>Device Type</span>
                <strong>
                  {result.deviceType || "Not provided"}
                </strong>
              </div>

              <div className="passport-field">
                <span>Assessment Date</span>
                <strong>{assessmentDate}</strong>
              </div>
            </div>
          </div>

          {/* ASSESSMENT DATA */}
          <div className="passport-section">
            <h3>Assessment Data</h3>

            <div className="passport-grid">
              <div className="passport-field">
                <span>Rated Capacity</span>
                <strong>
                  {result.ratedCapacity
                    ? `${result.ratedCapacity} mAh`
                    : "Not provided"}
                </strong>
              </div>

              <div className="passport-field">
                <span>Measured Capacity</span>
                <strong>
                  {result.measuredCapacity
                    ? `${result.measuredCapacity} mAh`
                    : "Not provided"}
                </strong>
              </div>

              <div className="passport-field">
                <span>Capacity Retention</span>
                <strong>
                  {result.capacityRetention != null
                    ? `${Number(result.capacityRetention).toFixed(1)}%`
                    : "Not available"}
                </strong>
              </div>

              <div className="passport-field">
                <span>Internal Resistance</span>
                <strong>
                  {result.internalResistance
                    ? `${result.internalResistance} mΩ`
                    : "Not provided"}
                </strong>
              </div>

              <div className="passport-field">
                <span>Voltage Behaviour</span>
                <strong>
                  {result.voltageBehaviour || "Not provided"}
                </strong>
              </div>

              <div className="passport-field">
                <span>Temperature Behaviour</span>
                <strong>
                  {result.temperatureBehaviour || "Not provided"}
                </strong>
              </div>
            </div>
          </div>

          {/* RESULT */}
          <div className="passport-result">
            <div>
              <span>SECOND-LIFE SCORE</span>

              <div className="passport-score">
                {result.score != null
                  ? Math.round(result.score)
                  : "—"}
                <small>/ 100</small>
              </div>
            </div>

            <div className={`passport-pathway ${pathway.toLowerCase()}`}>
              <span>POTENTIAL PATHWAY</span>
              <strong>{pathway}</strong>
            </div>
          </div>

          {/* EXPLANATION */}
          <div className="passport-section">
            <h3>Potential Pathway</h3>

            <p className="passport-description">
              {pathwayDescriptions[pathway]}
            </p>
          </div>

          {/* QR */}
          <div className="passport-qr-section">
            <div>
              <h3>Digital Verification</h3>

              <p>
                Scan this QR code to access the digital assessment
                record.
              </p>

              <small>
                Passport ID: {passportId}
              </small>
            </div>

            <div className="passport-qr">
              <QRCodeSVG
                value={qrData}
                size={300}
                level="M"
              />
            </div>
          </div>

          {/* DISCLAIMER */}
          <div className="passport-disclaimer">
            <strong>Important:</strong> This is a software assessment
            record, not a battery safety certification. Physical reuse
            or repurposing requires appropriate testing, protection and
            application-specific validation.
          </div>
        </section>

        {/* ACTIONS */}
        <div className="passport-actions">
          <button
            className="passport-secondary"
            onClick={onBack}
          >
            ← Back to Results
          </button>

          <button
            className="passport-primary"
            onClick={() => window.print()}
          >
            Print / Save Passport
          </button>
        </div>
      </main>
    </div>
  );
}

export default Passport;