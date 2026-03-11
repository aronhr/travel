import OpenAI from 'openai'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const apiKey = config.openaiApiKey

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'OpenAI API key is not configured'
    })
  }

  const client = new OpenAI({ apiKey })

  const prompt = `You are a knowledgeable travel guide specializing in Budapest, Hungary. 
Recommend the 6 best coffee shops in Budapest for tourists. 
For each coffee shop, provide a JSON object with these exact fields:
- name: string (coffee shop name)
- description: string (2-3 sentence description of the atmosphere and what makes it special)
- address: string (full Budapest address)
- specialty: string (what they are known for, e.g. "specialty espresso", "traditional Hungarian pastries")
- rating: number (your recommended rating from 1-5, use one decimal place)
- priceRange: string (one of: "€", "€€", "€€€")
- tags: array of strings (2-4 short tags like "historic", "cozy", "specialty coffee", "vegan-friendly")

Return ONLY a valid JSON array of 6 objects, no additional text or markdown.`

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 1500
  })

  const content = response.choices[0]?.message?.content

  if (!content) {
    throw createError({
      statusCode: 500,
      statusMessage: 'No response from AI'
    })
  }

  try {
    const recommendations = JSON.parse(content)
    return { recommendations }
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to parse AI response'
    })
  }
})
