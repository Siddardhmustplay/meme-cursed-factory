
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

interface ChatGPTResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const generateCursedCaption = async (mode: string, apiKey: string): Promise<{ top: string; bottom: string }> => {
  const prompts = {
    delusional: "Generate a completely unhinged, nonsensical meme caption with top and bottom text. Make it absurd and chaotic. Format: TOP: [text] BOTTOM: [text]",
    woke: "Generate a deep, edgy, and philosophical meme caption that sounds profound but is actually meaningless. Format: TOP: [text] BOTTOM: [text]", 
    boomer: "Generate a meme caption that sounds like it was made by someone completely out of touch with modern internet culture. Format: TOP: [text] BOTTOM: [text]"
  };

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompts[mode as keyof typeof prompts] || prompts.delusional
          }
        ],
        max_tokens: 100,
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data: ChatGPTResponse = await response.json();
    const content = data.choices[0]?.message?.content || '';
    
    // Parse the response to extract top and bottom captions
    const topMatch = content.match(/TOP:\s*(.+?)(?=\s*BOTTOM:|$)/i);
    const bottomMatch = content.match(/BOTTOM:\s*(.+?)$/i);
    
    return {
      top: topMatch?.[1]?.trim() || "WHEN THE VOID STARES BACK",
      bottom: bottomMatch?.[1]?.trim() || "BOTTOM TEXT"
    };
  } catch (error) {
    console.error('ChatGPT API error:', error);
    // Fallback to random captions
    const fallbackTops = [
      "WHEN THE VOID STARES BACK",
      "REALITY.EXE HAS STOPPED WORKING", 
      "POV: YOU'RE THE PROBLEM"
    ];
    const fallbackBottoms = [
      "AND THAT'S ON PERIOD",
      "BOTTOM TEXT",
      "THIS IS FINE"
    ];
    
    return {
      top: fallbackTops[Math.floor(Math.random() * fallbackTops.length)],
      bottom: fallbackBottoms[Math.floor(Math.random() * fallbackBottoms.length)]
    };
  }
};
