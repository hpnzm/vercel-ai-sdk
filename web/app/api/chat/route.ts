// app/api/chat/route.ts

import { HfInference } from "@huggingface/inference";
import { HuggingFaceStream, StreamingTextResponse } from "ai";

// Create a new HuggingFace Inference instance
const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY!);

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Request the HuggingFace API for the response based on the prompt
  const response = await Hf.textGenerationStream({
    model: "OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
    inputs: "Hello",
    parameters: {
      max_new_tokens: 200,
      // @ts-expect-error -- The HfInference API doesn't have types for `typical_p` even though it's necessary
      typical_p: 0.2,
      repetition_penalty: 1,
      truncate: 1000,
    },
  });

  // Convert the response into a friendly text-stream
  const stream = HuggingFaceStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
