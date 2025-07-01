import { VercelRequest, VercelResponse } from '@vercel/node';
import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';

const groqWithKey = createGroq({
    apiKey: process.env.GROQ_API_KEY!, // ✅ stored in Vercel project settings
});

const model = groqWithKey("llama-3.1-8b-instant");

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { vibe, howBroke, blame, banking } = req.body;

    try {
        const result = await generateText({
            model,
            prompt: `
You're a sarcastic, clever excuse generator. Make a short (50 words max), funny, kinda realistic excuse why someone can't pay back money. Use:
- Vibe: ${vibe}
- Broke level: ${howBroke}
- Blame: ${blame}
- Banking excuse: ${banking}
      `,
            temperature: 0.9,
        });

        const trimmed = result.text.trim();
        const unquoted = trimmed.startsWith('"') && trimmed.endsWith('"')
            ? trimmed.slice(1, -1)
            : trimmed;

        res.status(200).json({ excuse: unquoted });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to generate excuse.' });
    }
}