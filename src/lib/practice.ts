export type Mode = "her" | "him";

export type Scenario = {
  id: string;
  title: string;
  lede: string;
  setup: string;
};

export type Partner = {
  name: string;
  age: number;
  gender: "woman" | "man";
  blurb: string;
  opener: string;
};

export const PARTNERS: Record<Mode, Partner> = {
  her: {
    name: "Maya",
    age: 29,
    gender: "woman",
    blurb:
      "Thoughtful, a little wry, and slow to trust big speeches. She notices the small things. She has been dating with intention after a long stretch of being busy.",
    opener:
      "Hey — I grabbed us a table by the window. You made it. I was starting to wonder if I had the time wrong, which is very me.",
  },
  him: {
    name: "Julian",
    age: 30,
    gender: "man",
    blurb:
      "Warm, a little awkward with big feelings, and he stays. He grew up in a house that did not talk much, so he is learning the same skill you are.",
    opener:
      "Hey. I got here early, which is… very me. You found it. I already ordered water, not because I am trying to be efficient, I just needed something to do with my hands.",
  },
};

export const SCENARIOS: Scenario[] = [
  {
    id: "first-date",
    title: "First date",
    lede: "Keep it real. A little nervous. Curious, not performing.",
    setup:
      "You are on a first date in a quiet restaurant. The goal is ease, curiosity, and showing who you are without overselling.",
  },
  {
    id: "how-i-feel",
    title: "How I feel",
    lede: "Name the feeling without making them responsible for it.",
    setup:
      "You have been seeing each other for a few months. Tonight you want to say you are catching real feelings, without demanding a matching speech.",
  },
  {
    id: "after-a-fight",
    title: "After a fight",
    lede: "Repair without rewriting history or keeping score.",
    setup:
      "You argued last night. Both of you said things that were sharper than you meant. This is the morning-after conversation.",
  },
  {
    id: "a-boundary",
    title: "A boundary",
    lede: "Be clear, kind, and unwilling to apologize for the need.",
    setup:
      "Something they do is wearing on you — last-minute plans, teasing that lands wrong, or checking out mid-conversation. You need to name the boundary.",
  },
  {
    id: "ask-for-more",
    title: "Ask for more",
    lede: "Ask for time, care, or closeness as a request, not a test.",
    setup:
      "You want more of them — more time, more check-ins, more of the relationship. Ask without turning it into a verdict on their love.",
  },
  {
    id: "feels-distant",
    title: "It feels distant",
    lede: "Check in on the space between you without accusing.",
    setup:
      "The last two weeks have felt thin. Texts are shorter. You miss them and you are a little scared of sounding needy.",
  },
  {
    id: "the-future",
    title: "The future",
    lede: "Talk about direction without forcing a timeline.",
    setup:
      "You want to know if you are building toward something. Exclusivity, moving, meeting family — pick the thread that fits. Stay adult, not courtroom.",
  },
  {
    id: "after-silence",
    title: "After silence",
    lede: "Re-enter without pretending the gap did not happen.",
    setup:
      "You have not spoken in ten days after a messy last conversation. You want to reconnect without collapsing into blame or fake lightness.",
  },
];

export function scenarioById(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}

export function modeLabel(mode: Mode): string {
  return mode === "her" ? "Practice with her" : "Practice with him";
}

export function safeNextPath(raw: unknown): string {
  if (typeof raw !== "string") return "/";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  if (raw.includes("://") || raw.includes("\\")) return "/";
  return raw;
}
