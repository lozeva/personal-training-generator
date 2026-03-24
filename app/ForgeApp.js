"use client";

import { useState, useEffect, useRef } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────

const GOALS = [
  { id: "muscle_gain", label: "Build Muscle", icon: "💪", desc: "Hypertrophy-focused training" },
  { id: "fat_loss", label: "Lose Fat", icon: "🔥", desc: "High calorie burn sessions" },
  { id: "strength", label: "Get Stronger", icon: "🏋️", desc: "Progressive overload focus" },
  { id: "endurance", label: "Endurance", icon: "🫀", desc: "Cardiovascular conditioning" },
  { id: "general", label: "General Fitness", icon: "⚡", desc: "Balanced approach" },
];

const LEVELS = [
  { id: "beginner", label: "Beginner", desc: "0–6 months experience" },
  { id: "intermediate", label: "Intermediate", desc: "6–24 months experience" },
  { id: "advanced", label: "Advanced", desc: "2+ years experience" },
];

const EQUIPMENT = [
  { id: "full_gym", label: "Full Gym" },
  { id: "home_basic", label: "Home (Dumbbells + Bands)" },
  { id: "home_barbell", label: "Home (Barbell + Rack)" },
  { id: "bodyweight", label: "Bodyweight Only" },
  { id: "cardio_machines", label: "Cardio Machines" },
];

const DAYS_OPTIONS = [2, 3, 4, 5, 6];

const DURATION_OPTIONS = [
  { id: "30", label: "30 min" },
  { id: "45", label: "45 min" },
  { id: "60", label: "60 min" },
  { id: "75", label: "75 min" },
  { id: "90", label: "90 min" },
];

const TRAINING_TYPES = [
  { id: "strength", label: "Strength Training", icon: "🏋️" },
  { id: "cardio", label: "Cardio", icon: "🏃" },
  { id: "hybrid", label: "Hybrid (Both)", icon: "⚡" },
];

// ─── Reusable Components ─────────────────────────────────────────────────────

function StepIndicator({ current, total }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginBottom: 40 }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? 36 : 10,
            height: 10,
            borderRadius: 5,
            background: i <= current ? "var(--accent)" : "rgba(255,255,255,0.12)",
            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      ))}
    </div>
  );
}

function SelectionCard({ selected, onClick, children, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: selected
          ? "linear-gradient(135deg, rgba(234,179,8,0.15), rgba(234,179,8,0.05))"
          : "rgba(255,255,255,0.03)",
        border: selected ? "1.5px solid var(--accent)" : "1.5px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "18px 22px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        color: "var(--text)",
        textAlign: "left",
        outline: "none",
        fontFamily: "inherit",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ─── Step: Goal ──────────────────────────────────────────────────────────────

function StepGoal({ data, onChange }) {
  return (
    <div>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6, fontFamily: "var(--font-display)" }}>
        What&apos;s your goal?
      </h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32, fontSize: 15 }}>
        This shapes your entire program structure
      </p>
      <div style={{ display: "grid", gap: 12 }}>
        {GOALS.map((g) => (
          <SelectionCard key={g.id} selected={data.goal === g.id} onClick={() => onChange({ ...data, goal: g.id })}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 26 }}>{g.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{g.label}</div>
                <div style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 2 }}>{g.desc}</div>
              </div>
            </div>
          </SelectionCard>
        ))}
      </div>
    </div>
  );
}

// ─── Step: Profile ───────────────────────────────────────────────────────────

function StepProfile({ data, onChange }) {
  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: "1.5px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.03)",
    color: "var(--text)",
    fontSize: 16,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  return (
    <div>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6, fontFamily: "var(--font-display)" }}>About you</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32, fontSize: 15 }}>
        Help us personalize your training
      </p>

      <div style={{ marginBottom: 24 }}>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1.2,
            color: "var(--text-secondary)",
            display: "block",
            marginBottom: 10,
          }}
        >
          Experience Level
        </span>
        <div style={{ display: "grid", gap: 10 }}>
          {LEVELS.map((l) => (
            <SelectionCard key={l.id} selected={data.level === l.id} onClick={() => onChange({ ...data, level: l.id })}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{l.label}</div>
              <div style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 2 }}>{l.desc}</div>
            </SelectionCard>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <label>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1.2,
              color: "var(--text-secondary)",
              display: "block",
              marginBottom: 10,
            }}
          >
            Age
          </span>
          <input
            type="number"
            min="14"
            max="80"
            value={data.age || ""}
            onChange={(e) => onChange({ ...data, age: e.target.value })}
            placeholder="e.g. 28"
            style={inputStyle}
          />
        </label>
        <label>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1.2,
              color: "var(--text-secondary)",
              display: "block",
              marginBottom: 10,
            }}
          >
            Weight (kg)
          </span>
          <input
            type="number"
            min="30"
            max="250"
            value={data.weight || ""}
            onChange={(e) => onChange({ ...data, weight: e.target.value })}
            placeholder="e.g. 75"
            style={inputStyle}
          />
        </label>
      </div>

      <label>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1.2,
            color: "var(--text-secondary)",
            display: "block",
            marginBottom: 10,
          }}
        >
          Injuries or Limitations (optional)
        </span>
        <textarea
          value={data.injuries || ""}
          onChange={(e) => onChange({ ...data, injuries: e.target.value })}
          placeholder="e.g. Lower back pain, bad left knee..."
          rows={2}
          style={{
            ...inputStyle,
            resize: "vertical",
          }}
        />
      </label>
    </div>
  );
}

// ─── Step: Setup ─────────────────────────────────────────────────────────────

function StepSetup({ data, onChange }) {
  const sectionLabel = {
    fontSize: 13,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: "var(--text-secondary)",
    display: "block",
    marginBottom: 12,
  };

  return (
    <div>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6, fontFamily: "var(--font-display)" }}>
        Training Setup
      </h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32, fontSize: 15 }}>
        Configure your weekly schedule
      </p>

      <div style={{ marginBottom: 28 }}>
        <span style={sectionLabel}>Training Type</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {TRAINING_TYPES.map((t) => (
            <SelectionCard
              key={t.id}
              selected={data.trainingType === t.id}
              onClick={() => onChange({ ...data, trainingType: t.id })}
              style={{ textAlign: "center", padding: "16px 10px" }}
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>{t.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{t.label}</div>
            </SelectionCard>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <span style={sectionLabel}>Days per week</span>
        <div style={{ display: "flex", gap: 10 }}>
          {DAYS_OPTIONS.map((d) => (
            <SelectionCard
              key={d}
              selected={data.days === d}
              onClick={() => onChange({ ...data, days: d })}
              style={{ flex: 1, textAlign: "center", padding: "14px 0" }}
            >
              <div style={{ fontWeight: 700, fontSize: 20 }}>{d}</div>
            </SelectionCard>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <span style={sectionLabel}>Session Duration</span>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {DURATION_OPTIONS.map((d) => (
            <SelectionCard
              key={d.id}
              selected={data.duration === d.id}
              onClick={() => onChange({ ...data, duration: d.id })}
              style={{ padding: "12px 20px", textAlign: "center" }}
            >
              <div style={{ fontWeight: 600, fontSize: 14 }}>{d.label}</div>
            </SelectionCard>
          ))}
        </div>
      </div>

      <div>
        <span style={sectionLabel}>Available Equipment</span>
        <div style={{ display: "grid", gap: 10 }}>
          {EQUIPMENT.map((e) => (
            <SelectionCard
              key={e.id}
              selected={(data.equipment || []).includes(e.id)}
              onClick={() => {
                const eq = data.equipment || [];
                onChange({
                  ...data,
                  equipment: eq.includes(e.id) ? eq.filter((x) => x !== e.id) : [...eq, e.id],
                });
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 15 }}>{e.label}</div>
            </SelectionCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Loading ─────────────────────────────────────────────────────────────────

function LoadingScreen() {
  const [dotCount, setDotCount] = useState(0);
  const messages = [
    "Analyzing your profile",
    "Selecting optimal exercises",
    "Building periodization",
    "Calibrating volume & intensity",
    "Finalizing your program",
  ];
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const dotTimer = setInterval(() => setDotCount((p) => (p + 1) % 4), 400);
    const msgTimer = setInterval(() => setMsgIdx((p) => (p + 1) % messages.length), 2200);
    return () => {
      clearInterval(dotTimer);
      clearInterval(msgTimer);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 400,
        gap: 32,
      }}
    >
      <div style={{ position: "relative", width: 72, height: 72 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid rgba(234,179,8,0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid transparent",
            borderTopColor: "var(--accent)",
            animation: "spin 0.9s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 8,
            borderRadius: "50%",
            border: "3px solid transparent",
            borderTopColor: "rgba(234,179,8,0.4)",
            animation: "spin 1.4s linear infinite reverse",
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8, fontFamily: "var(--font-display)" }}>
          Generating Your Program
        </div>
        <div style={{ color: "var(--text-secondary)", fontSize: 14, height: 20 }}>
          {messages[msgIdx]}
          {".".repeat(dotCount)}
        </div>
      </div>
    </div>
  );
}

// ─── Program View ────────────────────────────────────────────────────────────

function WorkoutDay({ day, index }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 12,
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          padding: "18px 22px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          color: "var(--text)",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg, var(--accent), rgba(234,179,8,0.6))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 16,
              color: "#000",
              flexShrink: 0,
            }}
          >
            {day.dayLabel || `D${index + 1}`}
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: 700, fontSize: 16, fontFamily: "var(--font-display)" }}>{day.name}</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>
              {day.focus} · {day.duration}
            </div>
          </div>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
        >
          <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {expanded && (
        <div style={{ padding: "0 22px 22px" }}>
          {day.warmup && (
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  color: "var(--accent)",
                  marginBottom: 10,
                }}
              >
                Warm-up
              </div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>{day.warmup}</div>
            </div>
          )}

          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              color: "var(--accent)",
              marginBottom: 12,
            }}
          >
            Exercises
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {(day.exercises || []).map((ex, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr auto",
                  gap: 14,
                  alignItems: "center",
                  padding: "12px 14px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "rgba(234,179,8,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--accent)",
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{ex.name}</div>
                  {ex.note && (
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{ex.note}</div>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--accent)",
                    background: "rgba(234,179,8,0.08)",
                    padding: "6px 12px",
                    borderRadius: 8,
                    whiteSpace: "nowrap",
                  }}
                >
                  {ex.sets}
                </div>
              </div>
            ))}
          </div>

          {day.cooldown && (
            <div style={{ marginTop: 20 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  color: "var(--accent)",
                  marginBottom: 10,
                }}
              >
                Cool-down
              </div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>{day.cooldown}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProgramView({ program, onReset }) {
  return (
    <div style={{ animation: "fadeUp 0.6s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 2,
            color: "var(--accent)",
            marginBottom: 8,
          }}
        >
          Your Program
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, fontFamily: "var(--font-display)", marginBottom: 8 }}>
          {program.title}
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15, maxWidth: 500, margin: "0 auto" }}>
          {program.overview}
        </p>
      </div>

      {program.weeklyTips && (
        <div
          style={{
            background: "linear-gradient(135deg, rgba(234,179,8,0.1), rgba(234,179,8,0.03))",
            border: "1px solid rgba(234,179,8,0.2)",
            borderRadius: 16,
            padding: "20px 24px",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              color: "var(--accent)",
              marginBottom: 8,
            }}
          >
            Coach Notes
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{program.weeklyTips}</div>
        </div>
      )}

      <div>
        {(program.days || []).map((day, i) => (
          <WorkoutDay key={i} day={day} index={i} />
        ))}
      </div>

      <button
        onClick={onReset}
        style={{
          width: "100%",
          marginTop: 32,
          padding: "16px",
          borderRadius: 14,
          border: "1.5px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.03)",
          color: "var(--text)",
          fontWeight: 600,
          fontSize: 15,
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        ← Start Over
      </button>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 3;

export default function ForgeApp() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    goal: "",
    level: "",
    age: "",
    weight: "",
    injuries: "",
    trainingType: "hybrid",
    days: 4,
    duration: "60",
    equipment: [],
  });
  const [loading, setLoading] = useState(false);
  const [program, setProgram] = useState(null);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  const canAdvance = () => {
    if (step === 0) return !!data.goal;
    if (step === 1) return !!data.level;
    if (step === 2) return data.equipment.length > 0 && !!data.trainingType;
    return true;
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generateProgram = async () => {
    setLoading(true);
    setError(null);
    scrollTop();

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || `Server error: ${res.status}`);
      }

      const result = await res.json();
      setProgram(result);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to generate program. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
      scrollTop();
    } else {
      generateProgram();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      scrollTop();
    }
  };

  const handleReset = () => {
    setProgram(null);
    setStep(0);
    setData({
      goal: "",
      level: "",
      age: "",
      weight: "",
      injuries: "",
      trainingType: "hybrid",
      days: 4,
      duration: "60",
      equipment: [],
    });
    scrollTop();
  };

  const stepContent = [
    <StepGoal key="goal" data={data} onChange={setData} />,
    <StepProfile key="profile" data={data} onChange={setData} />,
    <StepSetup key="setup" data={data} onChange={setData} />,
  ];

  return (
    <div ref={containerRef} style={{ minHeight: "100vh", background: "var(--bg)", position: "relative" }}>
      {/* Grain overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          animation: "grain 4s steps(6) infinite",
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: "fixed",
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(234,179,8,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          padding: "48px 24px 100px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, var(--accent), #CA9A06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 900,
                color: "#000",
              }}
            >
              F
            </div>
            <span
              style={{
                fontSize: 22,
                fontWeight: 800,
                fontFamily: "var(--font-display)",
                letterSpacing: -0.5,
              }}
            >
              FORGE
            </span>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", letterSpacing: 2, textTransform: "uppercase" }}>
            AI-Powered Training Programs
          </div>
        </div>

        {/* Content */}
        {program ? (
          <ProgramView program={program} onReset={handleReset} />
        ) : loading ? (
          <LoadingScreen />
        ) : (
          <div style={{ animation: "fadeUp 0.5s ease" }}>
            <StepIndicator current={step} total={TOTAL_STEPS} />
            {stepContent[step]}

            <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
              {step > 0 && (
                <button
                  onClick={handleBack}
                  style={{
                    padding: "16px 28px",
                    borderRadius: 14,
                    border: "1.5px solid rgba(255,255,255,0.1)",
                    background: "transparent",
                    color: "var(--text)",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canAdvance()}
                style={{
                  flex: 1,
                  padding: "16px 28px",
                  borderRadius: 14,
                  border: "none",
                  background: canAdvance()
                    ? "linear-gradient(135deg, var(--accent), #CA9A06)"
                    : "rgba(255,255,255,0.06)",
                  color: canAdvance() ? "#000" : "rgba(255,255,255,0.25)",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: canAdvance() ? "pointer" : "not-allowed",
                  fontFamily: "var(--font-display)",
                  letterSpacing: -0.2,
                  transition: "all 0.3s ease",
                }}
              >
                {step === TOTAL_STEPS - 1 ? "Generate Program ⚡" : "Continue"}
              </button>
            </div>

            {error && (
              <div
                style={{
                  marginTop: 16,
                  padding: "14px 18px",
                  borderRadius: 12,
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#EF4444",
                  fontSize: 14,
                }}
              >
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
