// /api/upload.ts
import { put } from "@vercel/blob";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const filename = searchParams.get("filename") || "file";

  const blob = await put(filename, req, {
    access: "public",
  });

  return res.status(200).json(blob);
}
