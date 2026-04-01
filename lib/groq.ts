import { BLOG_TOPIC_SEEDS } from "@/data/blog-topics";
import { slugify, autoExcerpt, calcReadTime } from "@/lib/blog";

const MODEL = "gemini-1.5-flash";
const API_BASE = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent`;

const SYSTEM_PROMPT = `You are Talha Hassan — a software engineering leader with 10+ years of experience across AI, fintech, insurtech, and SaaS products. You've led teams, shipped real products, and have opinions forged from actual scars.

Your writing style:
- Human and conversational — like you're explaining to a smart friend over coffee
- Light, occasional humor — you're not a stand-up comedian but you're definitely not a robot either
- Short paragraphs — 2-3 sentences max. White space is your friend.
- Real examples > abstract theory. If you can't give an example, don't make the point.
- Honest about tradeoffs — you don't pretend things are simpler than they are
- Engaging opener — start with a relatable situation, a bold claim, or a question that makes people think
- No corporate fluff. No "In today's rapidly evolving landscape..." ever.
- Practical takeaways — readers should be able to do something differently after reading

Format rules:
- Use markdown headings (##, ###)
- Use bullet points sparingly — prefer prose
- Include a mermaid diagram or code block where genuinely useful, not as decoration
- Length: 800-1200 words (enough to be useful, short enough to actually be read)`;

async function geminiCall(contents: object[], systemInstruction?: string): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  const url = `${API_BASE}?key=${key}`;

  const body: Record<string, unknown> = { contents };
  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] };
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

export type GeneratedPost = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  read_time: number;
};

export async function generateBlogPost(topic?: string): Promise<GeneratedPost> {
  // Step 1: pick a topic if not provided
  let chosenTopic = topic;
  if (!chosenTopic) {
    const seeds = BLOG_TOPIC_SEEDS.join("\n");
    chosenTopic = await geminiCall([
      {
        role: "user",
        parts: [{ text:
          `Today's date: ${new Date().toDateString()}\n\n` +
          `You are choosing a blog topic for a tech engineering leader. ` +
          `Pick ONE specific, timely angle from the following theme areas. ` +
          `Make it specific — not "AI agents" but "Why most AI agent demos fail in production".\n\n` +
          `Theme areas:\n${seeds}\n\n` +
          `Respond with ONLY the topic title, nothing else.`
        }],
      },
    ]);
    chosenTopic = chosenTopic.trim();
  }

  // Step 2: generate the full post
  const raw = await geminiCall(
    [
      {
        role: "user",
        parts: [{ text:
          `Write a blog post about: "${chosenTopic}"\n\n` +
          `Return a JSON object with exactly these fields:\n` +
          `{\n` +
          `  "title": "the post title",\n` +
          `  "category": "one of: AI & ML, Engineering, Leadership, Career, Frontend, Backend",\n` +
          `  "tags": ["tag1", "tag2", "tag3"],\n` +
          `  "content": "full markdown content of the post"\n` +
          `}\n\n` +
          `Return ONLY the JSON, no markdown fences, no explanation.`
        }],
      },
    ],
    SYSTEM_PROMPT
  );

  const json = raw.trim().replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  const parsed = JSON.parse(json);

  const title: string = parsed.title;
  const content: string = parsed.content;

  return {
    title,
    slug: slugify(title),
    excerpt: autoExcerpt(content),
    content,
    category: parsed.category ?? "Engineering",
    tags: parsed.tags ?? [],
    read_time: calcReadTime(content),
  };
}

export async function editBlogPost(currentContent: string, instruction: string): Promise<string> {
  return geminiCall(
    [
      {
        role: "user",
        parts: [{ text:
          `Here is the current blog post in markdown:\n\n${currentContent}\n\n` +
          `Apply this change: "${instruction}"\n\n` +
          `Return ONLY the updated markdown content, no explanation.`
        }],
      },
    ],
    SYSTEM_PROMPT
  );
}
