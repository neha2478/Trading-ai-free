// frontend/pages/api/brokers.ts

import type { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Strip the /api prefix and forward to /brokers on the FastAPI server
    const path = req.url?.replace(/^\/api\/brokers/, "") ?? "";
    const url = `${BACKEND_URL}/brokers${path}`;

    const response = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        // Forward any auth headers if needed:
        // Authorization: req.headers.authorization || ""
      },
      // Only include a body for methods that support one
      body: ["POST", "PUT", "PATCH", "DELETE"].includes(req.method || "")
        ? JSON.stringify(req.body)
        : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error: any) {
    console.error("Error proxying /api/brokers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

