// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// const systemPrompt = `
// You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
// Both front and back should be one sentence long.Follow these guidelines:

// 1. Create clear and concise questions for the front of the flashcard.
// 2. Provide accurate and informative answers for the back of the flashcard.
// 3. Ensure that each flashcard focuses on a single concept or piece of information.
// 4. Use simple language to make the flashcards accessible to a wide range of learners.
// 5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
// 6. Avoid overly complex or ambiguous phrasing in both questions and answers.
// 7. When appropriate, use mnemonics or memory aids to help reinforce the information.
// 8. Tailor the difficulty level of the flashcards to the user's specified preferences.
// 9. If given a body of text, extract the most important and relevant information for the flashcards.
// 10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
// 11. Only generate 10 flashcards.

// You should Return in the following JSON format:
// {
//   "flashcards":[
//     {
//       "front": "Front of the card",
//       "back": "Back of the card"
//     }
//   ]
// }
// `;
// export async function POST(req) {
//   const openai = new OpenAI();
//   const data = await req.text();

//   // We'll implement the OpenAI API call here
//   const completion = await openai.chat.completions.create({
//     messages: [
//       { role: "system", content: systemPrompt },
//       { role: "user", content: data },
//     ],
//     model: "gpt-4o",
//     response_format: { type: "json_object" },
//   });
  
//   console.log(completion.choices[0].message.content)
//   const flashcards = JSON.parse(completion.choices[0].message.content);

//   // Return the flashcards as a JSON response
//   return NextResponse.json(flashcards.flashcards);
// }
//-------------------------------------------------------------------------------------------------------------------------------------


import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// You need to ensure that the API key is available via environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure you have this in your environment variables
})

const systemPrompt = `
You are a flashcard creator. You take in text and create 10 flashcards from it. Each flashcard should have exactly one sentence on the front and one sentence on the back, formatted as JSON.
Return the response in the following format:
{
  "flashcards":[
    { "front": "Front of the card", "back": "Back of the card" },
    { "front": "Front of the card", "back": "Back of the card" },
    ...
  ]
}
`

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()
  
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
      model: 'gpt-3.5-turbo-1106',
      response_format: { type: 'json_object' },
    })
  
    // Parse the JSON response from the OpenAI API
    const flashcards = JSON.parse(completion.choices[0].message.content)
  
    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards)
  }