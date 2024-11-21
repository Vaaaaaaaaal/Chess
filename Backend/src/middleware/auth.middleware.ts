import * as express from "express";
import { Request } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "votre_secret_jwt";

export interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

interface JwtPayload {
  id: number;
  user: { username: string };
  [key: string]: any;
}

export function expressAuthentication(
  request: express.Request,

  securityName: string,
  scopes?: string[]
): Promise<JwtPayload> {
  if (securityName === "jwt") {
    console.log("Request headers:", request);
    if (request?.headers["authorization"] === undefined) {
      return Promise.reject(new Error("Header d'autorisation manquant"));
    }

    const authHeader = request.headers["authorization"] as string;
    console.log("Auth header:", authHeader);

    const cleanedHeader = authHeader.replace(/^Bearer\s+Bearer\s+/, "Bearer ");
    const parts = cleanedHeader.split(" ");
    console.log("Auth parts:", parts);

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return Promise.reject(new Error("Format d'autorisation invalide"));
    }

    const token = parts[1];
    console.log("Token:", token);

    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err: Error | null, decoded: any) => {
        if (err) {
          console.log("JWT verify error:", err);
          reject(err);
        } else if (decoded) {
          console.log("Decoded token:", decoded);
          resolve(decoded as JwtPayload);
        } else {
          reject(new Error("Token invalide"));
        }
      });
    });
  }
  return Promise.reject(new Error("Méthode d'authentification non supportée"));
}
