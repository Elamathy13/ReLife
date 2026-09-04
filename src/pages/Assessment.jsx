import { useState } from "react";
import "./Assessment.css";
import { assessBattery } from "../engine/decisionEngine";

function Assessment({ onBack, onComplete }) {
  const [mode, setMode] = useState("quick");

  const [formData, setFormData] = useState({
    deviceType: "",
    batteryAge: "",
    performance: "",
    fastDischarge: "",
    shutdowns: "",
    heating: "",
    physicalDamage: "",
    batteryHealth: "",
    ratedCapacity: "",
    measuredCapacity: "",
    internalResistance: "",
    voltageBehaviour: "",
    temperatureBehaviour: "",
    cycleCount: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = assessBattery({
      ...formData,
      mode,
    });

    console.log("ReLife Assessment Result:", result);

    if (onComplete) {
      onComplete(result);
    }
  };

  return (
    <div className="assessment-page">

      {/* Header */}
      <header className="assessment-header">

        <div className="assessment-logo">
          <span className="assessment-logo-mark"></span>
          <span>ReLife</span>
        </div>

        <div className="assessment-step">
          Step 1 of 3
        </div>

      </header>

      {/* Main */}
      <main className="assessment-container">

        <div className="assessment-heading">

          <span className="assessment-tag">
            BATTERY ASSESSMENT
          </span>

          <h1>
            Tell us about your
            <span> battery.</span>
          </h1>

          <p>
            Provide the battery information you have available.
            You don't need technical knowledge to start.
          </p>

        </div>

        {/* Mode Selection */}
        <div className="mode-selector">

          <button
            type="button"
            className={`mode-card ${
              mode === "quick" ? "active" : ""
            }`}
            onClick={() => setMode("quick")}
          >

            <div className="mode-icon">⚡</div>

            <div>
              <h3>Quick Assessment</h3>

              <p>
                For everyday users with basic battery information.
              </p>
            </div>

            <span className="mode-check">
              {mode === "quick" ? "✓" : ""}
            </span>

          </button>

          <button
            type="button"
            className={`mode-card ${
              mode === "detailed" ? "active" : ""
            }`}
            onClick={() => setMode("detailed")}
          >

            <div className="mode-icon">◈</div>

            <div>
              <h3>Detailed Assessment</h3>

              <p>
                For users with technical battery diagnostic data.
              </p>
            </div>

            <span className="mode-check">
              {mode === "detailed" ? "✓" : ""}
            </span>

          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="assessment-form"
        >

          {/* Basic Information */}
          <section className="form-section">

            <div className="section-title">

              <span>01</span>

              <div>
                <h2>Basic Information</h2>

                <p>
                  Tell us which battery you're assessing.
                </p>
              </div>

            </div>

            <div className="form-grid">

              <div className="form-group">

                <label>Device Type</label>

                <select
                  value={formData.deviceType}
                  onChange={(e) =>
                    handleChange(
                      "deviceType",
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="">
                    Select device type
                  </option>

                  <option value="Electric Vehicle">
                    Electric Vehicle
                  </option>

                  <option value="Laptop">
                    Laptop
                  </option>

                  <option value="Smartphone">
                    Smartphone
                  </option>

                  <option value="Energy Storage System">
                    Energy Storage System
                  </option>

                  <option value="Power Tool">
                    Power Tool
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>

              </div>

              <div className="form-group">

                <label>Approximate Battery Age</label>

                <select
                  value={formData.batteryAge}
                  onChange={(e) =>
                    handleChange(
                      "batteryAge",
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="">
                    Select age
                  </option>

                  <option value="Less than 1 year">
                    Less than 1 year
                  </option>

                  <option value="1-2 years">
                    1–2 years
                  </option>

                  <option value="2-4 years">
                    2–4 years
                  </option>

                  <option value="More than 4 years">
                    More than 4 years
                  </option>

                  <option value="Unknown">
                    Unknown
                  </option>
                </select>

              </div>

            </div>

          </section>

          {/* Battery Condition */}
          <section className="form-section">

            <div className="section-title">

              <span>02</span>

              <div>
                <h2>Battery Condition</h2>

                <p>
                  Answer based on what you've observed during
                  normal use.
                </p>
              </div>

            </div>

            <div className="form-grid">

              <div className="form-group">

                <label>
                  Performance Compared With When New
                </label>

                <select
                  value={formData.performance}
                  onChange={(e) =>
                    handleChange(
                      "performance",
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="">
                    Select performance
                  </option>

                  <option value="Almost the same">
                    Almost the same
                  </option>

                  <option value="Slightly reduced">
                    Slightly reduced
                  </option>

                  <option value="Moderately reduced">
                    Moderately reduced
                  </option>

                  <option value="Significantly reduced">
                    Significantly reduced
                  </option>

                  <option value="Unknown">
                    Unknown
                  </option>
                </select>

              </div>

              <div className="form-group">

                <label>
                  Does the battery discharge unusually fast?
                </label>

                <select
                  value={formData.fastDischarge}
                  onChange={(e) =>
                    handleChange(
                      "fastDischarge",
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="">
                    Select an option
                  </option>

                  <option value="Yes">
                    Yes
                  </option>

                  <option value="No">
                    No
                  </option>

                  <option value="Not sure">
                    Not sure
                  </option>
                </select>

              </div>

              <div className="form-group">

                <label>
                  Unexpected shutdowns?
                </label>

                <select
                  value={formData.shutdowns}
                  onChange={(e) =>
                    handleChange(
                      "shutdowns",
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="">
                    Select an option
                  </option>

                  <option value="Yes">
                    Yes
                  </option>

                  <option value="No">
                    No
                  </option>

                  <option value="Not sure">
                    Not sure
                  </option>
                </select>

              </div>

              <div className="form-group">

                <label>
                  Unusual heating?
                </label>

                <select
                  value={formData.heating}
                  onChange={(e) =>
                    handleChange(
                      "heating",
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="">
                    Select an option
                  </option>

                  <option value="Yes">
                    Yes
                  </option>

                  <option value="No">
                    No
                  </option>

                  <option value="Not sure">
                    Not sure
                  </option>
                </select>

              </div>

            </div>

          </section>

          {/* Physical Condition */}
          <section className="form-section safety-section">

            <div className="section-title">

              <span>03</span>

              <div>
                <h2>Physical Condition</h2>

                <p>
                  This information helps ReLife identify potentially
                  abnormal conditions.
                </p>
              </div>

            </div>

            <div className="safety-warning">

              <strong>Safety first</strong>

              <p>
                If a battery is swollen, leaking or physically damaged,
                do not continue testing it. ReLife will flag it for
                professional handling.
              </p>

            </div>

            <div className="form-group">

              <label>
                Is there swelling, leakage or visible physical damage?
              </label>

              <div className="radio-group">

                {["Yes", "No", "Not sure"].map((option) => (
                  <label
                    className="radio-option"
                    key={option}
                  >

                    <input
                      type="radio"
                      name="physicalDamage"
                      value={option}
                      checked={
                        formData.physicalDamage === option
                      }
                      onChange={(e) =>
                        handleChange(
                          "physicalDamage",
                          e.target.value
                        )
                      }
                      required
                    />

                    <span>{option}</span>

                  </label>
                ))}

              </div>

            </div>

          </section>

          {/* Battery Health */}
          <section className="form-section">

            <div className="section-title">

              <span>04</span>

              <div>

                <h2>Battery Health</h2>

                <p>
                  Optional — enter this only if your device provides
                  a battery-health value.
                </p>

              </div>

            </div>

            <div className="form-grid">

              <div className="form-group">

                <label>
                  Battery Health Percentage
                  <span className="optional">
                    Optional
                  </span>
                </label>

                <div className="input-with-unit">

                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Example: 82"
                    value={formData.batteryHealth}
                    onChange={(e) =>
                      handleChange(
                        "batteryHealth",
                        e.target.value
                      )
                    }
                  />

                  <span>%</span>

                </div>

              </div>

            </div>

          </section>

          {/* Detailed Mode */}
          {mode === "detailed" && (
            <section className="form-section detailed-section">

              <div className="section-title">

                <span>05</span>

                <div>

                  <h2>Technical Diagnostics</h2>

                  <p>
                    Enter technical information only if you have
                    reliable diagnostic data.
                  </p>

                </div>

              </div>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Rated Capacity
                    <span className="unit-label">
                      Wh
                    </span>
                  </label>

                  <input
                    type="number"
                    min="0"
                    placeholder="Example: 500"
                    value={formData.ratedCapacity}
                    onChange={(e) =>
                      handleChange(
                        "ratedCapacity",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Measured Capacity
                    <span className="unit-label">
                      Wh
                    </span>
                  </label>

                  <input
                    type="number"
                    min="0"
                    placeholder="Example: 420"
                    value={formData.measuredCapacity}
                    onChange={(e) =>
                      handleChange(
                        "measuredCapacity",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Internal Resistance
                    <span className="unit-label">
                      mΩ
                    </span>
                  </label>

                  <input
                    type="number"
                    min="0"
                    placeholder="Example: 85"
                    value={formData.internalResistance}
                    onChange={(e) =>
                      handleChange(
                        "internalResistance",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Voltage Behaviour
                  </label>

                  <select
                    value={formData.voltageBehaviour}
                    onChange={(e) =>
                      handleChange(
                        "voltageBehaviour",
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select behaviour
                    </option>

                    <option value="Stable">
                      Stable
                    </option>

                    <option value="Moderately unstable">
                      Moderately unstable
                    </option>

                    <option value="Highly unstable">
                      Highly unstable
                    </option>

                    <option value="Unknown">
                      Unknown
                    </option>
                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Temperature Behaviour
                  </label>

                  <select
                    value={formData.temperatureBehaviour}
                    onChange={(e) =>
                      handleChange(
                        "temperatureBehaviour",
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select behaviour
                    </option>

                    <option value="Normal">
                      Normal
                    </option>

                    <option value="Moderately elevated">
                      Moderately elevated
                    </option>

                    <option value="Abnormal">
                      Abnormal
                    </option>

                    <option value="Unknown">
                      Unknown
                    </option>
                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Cycle Count
                    <span className="optional">
                      Optional
                    </span>
                  </label>

                  <input
                    type="number"
                    min="0"
                    placeholder="Example: 650"
                    value={formData.cycleCount}
                    onChange={(e) =>
                      handleChange(
                        "cycleCount",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

            </section>
          )}

          {/* Bottom */}
          <div className="form-footer">

            <p>
              🔒 Your information is used only for this assessment.
            </p>

            <button
              type="submit"
              className="analyze-button"
            >
              Analyze Battery
              <span>→</span>
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default Assessment;