
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const BUDDY_SYSTEM_INSTRUCTION = `You are Buddy, an AI coordination assistant inside a student-only academic book exchange app called NeedBook.

Your Role:
1. Help students safely and smoothly coordinate book handovers.
2. Manage the Rewards & Engagement System. Encourage students to help others to earn points and tags.
3. Act as a supportive campus moderator for the Feedback system.

Rewards System Knowledge:
- Listing a book: +10 pts
- Successful exchange: +15 pts
- Lending a book: +20 pts
- Donating a book: +30 pts
- Quick response: +5 pts
- Giving honest feedback: +5 pts

Student Tags:
- Book Starter (0–50 pts)
- Helpful Reader (51–150 pts)
- Campus Contributor (151–300 pts)
- Study Hero (301–500 pts)
- Book Champion (500+ pts)

Personality & Tone:
- Friendly, polite, and student-focused senior campus guide.
- Celebratory when users earn points or receive high ratings.
- Supportive and non-intrusive.

Safety & Privacy Rules:
- NEVER request or display personal home addresses.
- ALWAYS recommend public spots.
- Remind users to verify student ID/identity before the physical exchange.
`;

export async function getBookSuggestions(bookTitle: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide 3 standard academic subjects and a brief description for a textbook titled "${bookTitle}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subjects: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            description: { type: Type.STRING }
          },
          required: ["subjects", "description"]
        }
      }
    });
    
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return { subjects: ["Academic", "General"], description: "No description available." };
  }
}

export async function getFairPriceSuggestion(mrp: number, condition: string, title: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As a supportive senior student, suggest a fair student-friendly selling price for a used book.
      Book: ${title}
      Original Price (MRP): ${mrp}
      Condition: ${condition}
      Return a JSON with "suggestedPrice" (number) and "advice" (string, max 80 chars, friendly senior student tone).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedPrice: { type: Type.NUMBER },
            advice: { type: Type.STRING }
          },
          required: ["suggestedPrice", "advice"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback logic
    const discount = condition === 'New' ? 0.8 : condition === 'Good' ? 0.6 : 0.4;
    return { suggestedPrice: Math.round(mrp * discount), advice: "Pricing this fairly helps your fellow students save money!" };
  }
}

export async function checkMatchUrgency(note: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following student request note and determine if it sounds "High" or "Medium" urgency. Return only the level. Note: "${note}"`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text.includes("High") ? "High" : "Medium";
  } catch (error) {
    return "Medium";
  }
}

export async function summarizeFeedback(feedbacks: string[]) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize these student feedbacks into one supportive sentence for their profile: ${feedbacks.join(' | ')}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    return "Consistently helpful and reliable student contributor.";
  }
}

export async function getBuddyResponse(message: string, history: {role: 'user' | 'model', parts: {text: string}[]}[]) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: BUDDY_SYSTEM_INSTRUCTION,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Buddy Error:", error);
    return "Hey there! I'm having a little trouble connecting right now. Can you try asking me again in a moment?";
  }
}
