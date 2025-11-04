import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      avatar: string | null;
      coins: number;
      wins: number;
      losses: number;
      games: number;
      score: number;
    };
  }

  interface User {
    coins: number;
    wins: number;
    losses: number;
    games: number;
    score: number;
    avatar: string | null;
  }
}
