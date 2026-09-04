import { useEffect, useState } from "react";
import "./App.css";
import { decompressFromEncodedURIComponent } from "lz-string";
import Assessment from "./pages/Assessment";
import Results from "./pages/Results";
import Passport from "./pages/Passportpage";

function App() {
  const [page, setPage] = useState("home");
  const [assessmentResult, setAssessmentResult] = useState(null);
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const encodedPassport = params.get("passport");

  if (encodedPassport) {
    try {
     const decodedPassport = JSON.parse(
  decompressFromEncodedURIComponent(encodedPassport)
);

      setAssessmentResult(decodedPassport);
      setPage("passport");
    } catch (error) {
      console.error("Invalid passport QR data:", error);
    }
  }
}, []);
if (page === "passport") {
  return (
    <Passport
      result={assessmentResult}
      onBack={() => setPage("results")}
      onHome={() => setPage("home")}
      
    />
  );
}
  if (page === "results") {
    return (
      <Results
        result={assessmentResult}
        onBack={() => setPage("assessment")}
        onHome={() => setPage("home")}
        onGeneratePassport={() => setPage("passport")}
      />
    );
  }
  
  if (page === "assessment") {
    return (
      <Assessment
        onBack={() => setPage("home")}
        onComplete={(result) => {
          setAssessmentResult(result);
          setPage("results");
        }}
      />
    );
  }

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">
          <span className="logo-mark"></span>
          <span>ReLife</span>
        </div>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("assessment")}>
            Assess Battery
          </button>
          <button>How It Works</button>
        </div>

        <button
          className="nav-cta"
          onClick={() => setPage("assessment")}
        >
          Start Assessment →
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-tag">
            INTELLIGENT BATTERY LIFECYCLE DECISION SUPPORT
          </div>

          <h1>
            Give every battery <span>another chance.</span>
          </h1>

          <p>
            ReLife turns available lithium-ion battery information into an
            explainable potential next-life pathway — Reuse, Repurpose,
            Recycle or Isolate.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-button"
              onClick={() => setPage("assessment")}
            >
              Assess a Battery →
            </button>

            <button className="secondary-button">
              Explore How It Works
            </button>
          </div>

          <div className="hero-note">
            Software-only • Explainable • No hardware required
          </div>
        </div>

        <div className="hero-visual">
          <div className="battery-card">
            <div className="battery-top">
              <span>BATTERY ASSESSMENT</span>
              <span className="status-dot"></span>
            </div>

            <div className="battery-score">
              <span>SECOND-LIFE</span>
              <strong>78</strong>
              <small>/ 100</small>
            </div>

            <div className="battery-line"></div>

            <div className="battery-result">
              <div>
                <span>POTENTIAL PATHWAY</span>
                <strong>REPURPOSE</strong>
              </div>

              <div className="result-icon">♻</div>
            </div>
          </div>
        </div>
      </section>

      {/* PATHWAYS */}
      <section className="pathways">
        <div className="section-heading">
          <span>FOUR POSSIBLE PATHWAYS</span>
          <h2>
            One assessment.
            <br />
            A clearer next step.
          </h2>
        </div>

        <div className="pathway-grid">
          <div className="pathway-box">
            <div className="pathway-number">01</div>
            <div className="pathway-symbol">↻</div>
            <h3>Reuse</h3>
            <p>
              Potential continued use when supplied data indicates
              relatively strong performance.
            </p>
          </div>

          <div className="pathway-box">
            <div className="pathway-number">02</div>
            <div className="pathway-symbol">♻</div>
            <h3>Repurpose</h3>
            <p>
              Potential transition into a lower-demand second-life
              application.
            </p>
          </div>

          <div className="pathway-box">
            <div className="pathway-number">03</div>
            <div className="pathway-symbol">♲</div>
            <h3>Recycle</h3>
            <p>
              Responsible recycling when the supplied information does
              not indicate second-life potential.
            </p>
          </div>

          <div className="pathway-box">
            <div className="pathway-number">04</div>
            <div className="pathway-symbol">⚠</div>
            <h3>Isolate</h3>
            <p>
              Abnormal or potentially unsafe conditions trigger
              isolation and professional handling.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="section-heading">
          <span>HOW RELIFE WORKS</span>
          <h2>
            From battery data
            <br />
            to a potential pathway.
          </h2>
        </div>

        <div className="steps">
          <div className="step">
            <span>01</span>
            <h3>Provide Information</h3>
            <p>
              Enter available battery information through Quick or
              Detailed Assessment.
            </p>
          </div>

          <div className="step">
            <span>02</span>
            <h3>Evaluate</h3>
            <p>
              ReLife validates and normalizes the supplied information.
            </p>
          </div>

          <div className="step">
            <span>03</span>
            <h3>Decide</h3>
            <p>
              A transparent rule-based engine generates a Second-Life
              Score and pathway.
            </p>
          </div>

          <div className="step">
            <span>04</span>
            <h3>Record</h3>
            <p>
              Generate an explainable report and digital Second-Life
              Passport.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div>
          <span>READY TO ASSESS?</span>
          <h2>
            Find the next possible
            <br />
            chapter for a battery.
          </h2>
        </div>

        <button onClick={() => setPage("assessment")}>
          Start Assessment →
        </button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="nav-logo">
          <span className="logo-mark"></span>
          <span>ReLife</span>
        </div>

        <p>Intelligent Second-Life Decision Engine</p>

        <span>© 2026 ReLife</span>
      </footer>
    </div>
  );
}

export default App;