import { Request } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "votre_secret_jwt";

export interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

interface JwtPayload {
  id: number;
  [key: string]: any;
}

export function expressAuthentication(
  request: AuthenticatedRequest,
  securityName: string,
  scopes?: string[]
): Promise<JwtPayload> {
  if (securityName === "jwt") {
    const authHeader = request.headers["authorization"];
    console.log("Auth header:", authHeader); // Debug

    if (!authHeader) {
      return Promise.reject(new Error("Aucun header d'autorisation"));
    }

    const parts = authHeader.split(" ");
    console.log("Auth parts:", parts); // Debug

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return Promise.reject(new Error("Format d'autorisation invalide"));
    }

    const token = parts[1];
    console.log("Token:", token); // Debug

    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err: Error | null, decoded: any) => {
        if (err) {
          console.log("JWT verify error:", err); // Debug
          reject(err);
        } else if (decoded) {
          console.log("Decoded token:", decoded); // Debug
          resolve(decoded as JwtPayload);
        } else {
          reject(new Error("Token invalide"));
        }
      });
    });
  }
  return Promise.reject(new Error("Méthode d'authentification non supportée"));
}
