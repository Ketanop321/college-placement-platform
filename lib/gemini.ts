import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY!)

export async function generateJobDescription(jobTitle: string, company: string, industry: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" })

  const prompt = `Generate a job description for a ${jobTitle} position at ${company}, a company in the ${industry} industry. Include responsibilities and requirements.`

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()

  return text
}

