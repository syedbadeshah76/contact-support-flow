import { convertToModelMessages, streamText, type UIMessage } from "npm:ai";
import { createLovableAiGatewayProvider } from "../_shared/gateway-helpers.ts";
import { getLovableAiGatewayRunId, withLovableAiGatewayRunIdHeader } from "../_shared/run-id.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-lovable-aig-run-id",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return new Response("Panda Tutor is not configured", { status: 500, headers: corsHeaders });

    const body = await request.json() as { messages?: UIMessage[] };
    if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 60) {
      return new Response("A valid conversation is required", { status: 400, headers: corsHeaders });
    }

    const gateway = createLovableAiGatewayProvider(apiKey, getLovableAiGatewayRunId(request), {
      baseURL: "https://ai.gateway.lovable.dev",
    });
    const modelMessages = await convertToModelMessages(body.messages);
    const result = streamText({
      model: gateway("google/gemini-3.1-flash-lite"),
      system: `You are Pippin, EDVANZ's friendly panda learning buddy for children and teens. Give accurate, encouraging, age-appropriate help. Explain in small steps, use short paragraphs and simple markdown, and ask one guiding question when it helps learning. Give hints before complete answers when a learner asks for homework help. Never shame mistakes. Avoid collecting personal information and never ask for passwords, addresses, school names, phone numbers, or private contact details. If asked about danger, self-harm, abuse, or an emergency, encourage the learner to contact a trusted adult immediately and local emergency services when urgent. You can help explain lessons, provide hints, create short practice questions, and start mini quizzes.`,
      messages: modelMessages,
      abortSignal: request.signal,
    });

    const response = result.toUIMessageStreamResponse({
      originalMessages: body.messages,
      onError: (error) => {
        console.error("Panda tutor stream error", error);
        return "Pippin had trouble answering. Please try again.";
      },
    });
    return await withLovableAiGatewayRunIdHeader(response, gateway, corsHeaders);
  } catch (error) {
    console.error("Panda tutor request failed", error);
    return new Response("Pippin could not answer right now", { status: 500, headers: corsHeaders });
  }
});
