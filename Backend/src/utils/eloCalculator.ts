export function calculateElo(
  playerRating: number,
  opponentRating: number,
  result: "win" | "loss" | "draw"
): number {
  const K = 32; // Facteur K pour ajuster la sensibilité du classement
  const expectedScore =
    1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
  let score;

  if (result === "win") {
    score = 1;
  } else if (result === "draw") {
    score = 0.5;
  } else {
    score = 0;
  }

  return Math.round(playerRating + K * (score - expectedScore));
}
