import { NextResponse } from "next/server";

const GOALS_MAP = {
  muscle_gain: "Build Muscle (Hypertrophy)",
  fat_loss: "Lose Fat (High calorie burn)",
  strength: "Get Stronger (Progressive overload)",
  endurance: "Endurance (Cardiovascular conditioning)",
  general: "General Fitness (Balanced approach)",
};

const EQUIPMENT_MAP = {
  full_gym: "Full Gym",
  home_basic: "Home (Dumbbells + Bands)",
  home_barbell: "Home (Barbell + Rack)",
  bodyweight: "Bodyweight Only",
  cardio_machines: "Cardio Machines",
};

export async function POST(request) {
  try {
    const data = await request.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not configured. Add it to your .env.local or Vercel environment variables." },
        { status: 500 }
      );
    }

    const prompt = `You are an elite certified personal trainer and strength & conditioning coach. Generate a detailed, professional weekly training program based on this client profile:

GOAL: ${GOALS_MAP[data.goal] || data.goal}
EXPERIENCE: ${data.level}
AGE: ${data.age || "not specified"}
WEIGHT: ${data.weight ? data.weight + " kg" : "not specified"}
INJURIES/LIMITATIONS: ${data.injuries || "none"}
TRAINING TYPE: ${data.trainingType} (strength, cardio, or hybrid)
DAYS PER WEEK: ${data.days}
SESSION DURATION: ${data.duration} minutes
EQUIPMENT: ${(data.equipment || []).map((e) => EQUIPMENT_MAP[e] || e).join(", ")}

Return ONLY valid JSON (no markdown, no backticks, no preamble) with this exact structure:
{
  "title": "Program name",
  "overview": "1-2 sentence overview of the program philosophy",
  "weeklyTips": "Key coaching notes: rest periods, progression scheme, nutrition tips",
  "days": [
    {
      "dayLabel": "D1",
      "name": "Day name (e.g. Upper Push + HIIT)",
      "focus": "Primary focus",
      "duration": "Estimated duration",
      "warmup": "Specific warm-up routine (2-3 sentences)",
      "exercises": [
        {
          "name": "Exercise name",
          "sets": "e.g. 4×8-10 or 5×5 or 30s×4",
          "note": "Optional: tempo, rest, RPE, or form cue"
        }
      ],
      "cooldown": "Cool-down / stretching notes"
    }
  ]
}

Requirements:
- Include exactly ${data.days} training days
- Each day should have 5-8 exercises appropriate to the type
- For strength: include compound movements first, specify sets×reps, note rest periods and RPE
- For cardio: include intervals, steady-state, or HIIT with specific durations, heart rate zones, and intensities
- For hybrid: blend both appropriately per session or alternate days
- Scale difficulty to ${data.level} level
- Respect any injuries mentioned — provide alternatives
- Include proper warm-ups and cool-downs tailored to the day
- Be specific with exercise names (not generic)
- Add form cues, tempo prescriptions, or rest period notes where relevant`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Anthropic API error:", res.status, errText);
      return NextResponse.json(
        { error: `AI service error (${res.status}). Please try again.` },
        { status: 502 }
      );
    }

    const result = await res.json();
    const text = result.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    const clean = text.replace(/```json|```/g, "").trim();
    const program = JSON.parse(clean);

    return NextResponse.json(program);
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json(
      { error: "Failed to generate program. Please try again." },
      { status: 500 }
    );
  }
}
