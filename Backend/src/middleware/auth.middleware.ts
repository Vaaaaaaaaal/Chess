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
    const authHeader = request.headers["authorization"];
    if (!authHeader) {
      return Promise.reject(new Error("Header d'autorisation manquant"));
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return Promise.reject(new Error("Token manquant"));
    }

    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err: Error | null, decoded: any) => {
        if (err) {
          console.log("Erreur de vérification du token:", err);
          reject(new Error("Token invalide"));
        } else if (decoded) {
          console.log("Token décodé:", decoded);
          // S'assurer que l'ID est correctement extrait du token
          const userId = decoded.id || decoded.sub || decoded.userId;
          (request as AuthenticatedRequest).user = {
            id: userId,
          };
          resolve(decoded as JwtPayload);
        } else {
          reject(new Error("Token invalide"));
        }
      });
    });
  }
  return Promise.reject(new Error("Méthode d'authentification non supportée"));
}
