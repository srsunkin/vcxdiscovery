import { createServerFn } from "@tanstack/react-start";

type Payload = {
  mode: "brief" | "questions"
  summary: string
};

export const assistDeal = createServerFn({ method: "POST" })
  .validator((input: Payload) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "AI is not available in this environment." };

    const system =
      data.mode === "brief"
        ? "You are a senior industrial X-ray/CT applications engineer. Rewrite the discovery capture into a tight internal brief: situation, application, recommended direction, risks, and next action. Be concrete. No fluff. Use short labeled sections. Do not invent specs that are not in the capture. Do not assume a specific salesperson or region."
        : "You are a senior industrial X-ray/CT sales engineer at VisiConsult. Given this discovery capture, list the 6–10 highest-leverage questions still unasked. Group by technical / commercial / risk. One line each. Do not invent facts.";

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 700,
        messages: [
          { role: "system", content: system },
          { role: "user", content: data.summary.slice(0, 6000) },
        ],
      }),
    });
    if (!res.ok) return { ok: false as const, error: `xAI API error ${res.status}` };
    const body = (await res.json()) as { choices: { message: { content: string } }[] };
    return { ok: true as const, text: body.choices[0]?.message.content ?? "" };
  });
