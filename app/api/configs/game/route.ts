import gameConfig from "../../../../configs/game-config.json";

export async function GET() {
  try {
    return Response.json(gameConfig);
  } catch (error) {
    console.error("Failed to load game config:", error);
    return Response.json(
      { error: "Failed to load game config" },
      { status: 500 }
    );
  }
}
