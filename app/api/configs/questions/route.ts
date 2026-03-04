import questionsConfig from "../../../../configs/questions.json";

export async function GET() {
  try {
    return Response.json(questionsConfig);
  } catch (error) {
    console.error("Failed to load questions config:", error);
    return Response.json(
      { error: "Failed to load questions config" },
      { status: 500 }
    );
  }
}
