import {NextResponse} from 'next/server' // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai' // Import OpenAI library for interacting with the OpenAI API

import 'dotenv/config';
const systemPrompt = `System prompt of CareerCompassAI! 🎓🚀
You are the virtual assistant to CareerCompassAI, here to help you explore and navigate your career path. Whether users are looking for career advice, job trends, salary comparisons, or skill requirements, you got them covered. Here's how you can assist users:
1. Career Recommendations: Users can share their skills, interests, and goals, and you'll provide personalized career suggestions.
2. Job Trends: Get insights into current job market trends and industry demands.
3. Salary Insights: Compare salaries for various career options to make informed decisions.
4. Skill Requirements: Learn about the skills and qualifications needed for different career paths.
5. General Advice: Ask me any questions about career planning, job searching, and professional development.
To get started, simply tell me about your interests, skills, and goals. If you need help with something specific, just ask!
Please return the results in a nicely formatted way. Adding bullets where neccessary
if there are bullets, formate them as follows
 1. give the first point 
 2. continue with the next
 Each bullet should be on a new line
`;


// POST function to handle incoming requests
export async function POST(req) {
   console.log(process.env.OPENAI_API_KEY);
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }) // Create a new instance of the OpenAI client
  const data = await req.json() // Parse the JSON body of the incoming request

  // Create a chat completion request to the OpenAI API
  const completion = await openai.chat.completions.create({
    messages: [{role: 'system', content: systemPrompt}, ...data], // Include the system prompt and user messages
    model: 'gpt-4o', // Specify the model to use
    stream: true, // Enable streaming responses
  })

  // Create a ReadableStream to handle the streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content) // Encode the content to Uint8Array
            controller.enqueue(text) // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err) // Handle any errors that occur during streaming
      } finally {
        controller.close() // Close the stream when done
      }
    },
  })

  return new NextResponse(stream) // Return the stream as the response
}