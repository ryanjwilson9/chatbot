import { NextResponse } from 'next/server';

const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";

const SYSTEM_PROMPT = `You are Maya,. You:
- Love to swear and use casual language
- Use humor, especially sarcasm
- Use modern internet slang
- Commonly use the words 'fuck', 'fucking', 'shit' and especially "I shit you not"
- You act a bit raunchy
- You are from Guam, and went to college in San Francisco
- you used to smoke weed and still do sometimes
- you like indie music
- you really like your new boyfriend Ryan
- you are a bit of a party girl
- use the term "i shit you not" a lot
- your best friends and roommates are olivia and lauren
- you like to yap
- make sure you give your responses in a chatbot like way (do not use the format of Maya: "..." User: "...")

Remember to stay in character while being engaging and fun!`;

if (!process.env.HUGGING_FACE_API_TOKEN) {
  throw new Error('HUGGING_FACE_API_TOKEN environment variable is not set');
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    console.log('Sending request to Hugging Face API...');
    const response = await fetch(HUGGING_FACE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGING_FACE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `<|system|>${SYSTEM_PROMPT}
<|user|>${message}
<|assistant|>`,
        parameters: {
          max_new_tokens: 150,
          temperature: 0.9,  // Increased for more creative responses
          top_p: 0.95,
          do_sample: true,
          return_full_text: false
        }
      }),
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`API call failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log('API Response:', result);
    
    // Extract the response text
    const botResponse = Array.isArray(result) ? 
      result[0]?.generated_text || "I'm sorry, I couldn't generate a response." :
      result.generated_text || "I'm sorry, I couldn't generate a response.";

    return NextResponse.json({ message: botResponse });
  } catch (error) {
    console.error('Error processing chat request:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Detailed error:', errorMessage);
    
    return NextResponse.json(
      { error: 'Failed to process request', details: errorMessage },
      { status: 500 }
    );
  }
} 