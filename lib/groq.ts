import { BLOG_TOPIC_SEEDS } from "@/data/blog-topics";
import { slugify, autoExcerpt, calcReadTime } from "@/lib/blog";
import { fetchCoverImage } from "@/lib/unsplash";

const MODEL = "llama-3.3-70b-versatile";

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

async function groqCall(userMessage: string, systemPrompt?: string): Promise<string> {
  const messages: { role: string; content: string }[] = [];
  if (systemPrompt) messages.push({ role: "system", content: systemPrompt });
  messages.push({ role: "user", content: userMessage });

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({ model: MODEL, messages }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
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

const TOPIC_ANGLES = [
  "How to build or implement something practical",
  "What I learned from real experience (lessons, mistakes, wins)",
  "A contrarian or fresh take — why the common wisdom is wrong",
  "The future of something — where it's heading and why it matters",
  "A step-by-step guide for engineers to do something better",
  "An honest comparison or tradeoff analysis",
  "A success story or positive outcome from a specific approach",
  "Something underrated or overlooked that deserves more attention",
];

export async function generateBlogPost(topic?: string): Promise<GeneratedPost> {
  // Step 1: pick a topic if not provided
  let chosenTopic = topic;
  if (!chosenTopic) {
    const seeds = BLOG_TOPIC_SEEDS.join("\n");
    const angle = TOPIC_ANGLES[Math.floor(Math.random() * TOPIC_ANGLES.length)];
    chosenTopic = await groqCall(
      `Today's date: ${new Date().toDateString()}\n\n` +
      `You are choosing a blog topic for a tech engineering leader.\n` +
      `Pick ONE specific, timely topic from the theme areas below.\n\n` +
      `Angle to use this time: "${angle}"\n\n` +
      `Examples of good titles for this angle:\n` +
      `- How to structure a team that ships AI features without burning out\n` +
      `- What building a production LLM app taught me about software engineering\n` +
      `- The quiet revolution in frontend tooling nobody is talking about\n` +
      `- Why I stopped writing unit tests for everything (and what I do instead)\n\n` +
      `Theme areas:\n${seeds}\n\n` +
      `Respond with ONLY the topic title, nothing else.`
    );
    chosenTopic = chosenTopic.trim();
  }

  // Step 2: generate the full post with image placement markers
  const raw = await groqCall(
    `Write a blog post about: "${chosenTopic}"\n\n` +
    `You MUST respond in EXACTLY this format — no deviations, no extra text before TITLE::\n\n` +
    `TITLE: the post title (plain text, no markdown)\n` +
    `CATEGORY: one of: AI & ML, Engineering, Architecture, Frontend, Leadership, Career, General\n` +
    `TAGS: tag1, tag2, tag3\n` +
    `CONTENT:\n` +
    `full markdown content here\n` +
    `END_CONTENT\n\n` +
    `Rules for the CONTENT section:\n` +
    `- First line must be a # H1 heading (repeat of the title)\n` +
    `- Use ## H2 subheadings to break into 4-6 sections\n` +
    `- Use ### H3 for sub-points where useful\n` +
    `- At 2-3 natural points, insert: [IMAGE: short search query]\n` +
    `- Example: [IMAGE: software team whiteboard planning]\n` +
    `- Do NOT start your response with # or any markdown — start with TITLE:`,
    SYSTEM_PROMPT
  );

  const titleMatch = raw.match(/^TITLE:\s*(.+)$/m);
  const categoryMatch = raw.match(/^CATEGORY:\s*(.+)$/m);
  const tagsMatch = raw.match(/^TAGS:\s*(.+)$/m);
  const contentMatch = raw.match(/^CONTENT:\n([\s\S]+?)END_CONTENT/m);

  if (!titleMatch || !contentMatch) {
    throw new Error(`Failed to parse Groq response. Raw: ${raw.slice(0, 200)}`);
  }

  const title: string = titleMatch[1].trim();
  const category: string = categoryMatch?.[1].trim() ?? "Engineering";
  const tags: string[] = tagsMatch ? tagsMatch[1].split(",").map((t) => t.trim()) : [];
  let content: string = contentMatch[1].trim();

  // Replace [IMAGE: query] placeholders with real Unsplash images
  const placeholders = [...content.matchAll(/\[IMAGE:\s*([^\]]+)\]/gi)];
  for (const match of placeholders) {
    const query = match[1].trim();
    const url = await fetchCoverImage(query);
    content = content.replace(
      match[0],
      url ? `![${query}](${url})` : ""
    );
  }

  return {
    title,
    slug: slugify(title),
    excerpt: autoExcerpt(content),
    content,
    category,
    tags,
    read_time: calcReadTime(content),
  };
}

export async function editBlogPost(currentContent: string, instruction: string): Promise<string> {
  return groqCall(
    `Here is the current blog post in markdown:\n\n${currentContent}\n\n` +
    `Apply this change: "${instruction}"\n\n` +
    `Important rules:\n` +
    `- If the instruction asks to change the title, update the # H1 heading at the top of the content\n` +
    `- If the instruction asks to change the intro or opening, update the first paragraph only\n` +
    `- If the instruction uses words like "some", "a few", "one", "a couple" — change ONLY that many instances, not all\n` +
    `- Make only the requested change — do not rewrite, remove, or restructure unrelated sections\n` +
    `- Return ONLY the updated markdown content, no explanation.`,
    SYSTEM_PROMPT
  );
}
