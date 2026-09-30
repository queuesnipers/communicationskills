export type FlagKind = "none" | "distress" | "crisis" | "unsafe" | "age";

const CRISIS_RE =
  /\b(suicid(?:e|al)|kill(?:ing)? myself|end my life|end it all|want(?:s)? to die|wanna die|don'?t want to (?:be )?alive|self[-\s]?harm|cut(?:ting)? myself|hang myself|overdose(?:d)? on purpose)\b/i;

const AGE_RE =
  /\b(?:i(?:'?m| am) (?:only )?(?:1[0-7]|under ?18)|i am a (?:kid|minor|child)|i'?m a (?:kid|minor|child))\b/i;

export function detectLocalFlag(text: string): FlagKind {
  const t = text.trim();
  if (!t) return "none";
  if (AGE_RE.test(t)) return "age";
  if (CRISIS_RE.test(t)) return "crisis";
  return "none";
}

export const CARE_REPLIES: Record<Exclude<FlagKind, "none" | "distress" | "unsafe">, string> =
  {
    crisis: `I'm really glad you said something. I'm stepping out of the practice scene — this matters more than the exercise.

You are not alone in this. If you are in immediate danger, contact local emergency services. In the US you can call or text 988 for the Suicide & Crisis Lifeline. They are available day and night.

When you feel steadier, we can come back to communication practice. Right now the important thing is that you are safe.`,
    age: `This space is for adults practicing adult relationships.

If you are under 18, please leave this conversation. Talk with a trusted adult, or reach out to a youth helpline in your area. In the US, you can call or text 988.

I will not continue a romantic practice scene with you.`,
  };

export function excerptForFlag(text: string): string {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length > 180 ? `${t.slice(0, 177)}…` : t;
}
