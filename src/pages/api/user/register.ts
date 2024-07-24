import { signUp } from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await signUp(req.body, (status: boolean) => {
      if (status) {
        res.status(200).json({ satatus: true, message: "success" });
      } else {
        res.status(400).json({ satatus: false, message: "failed" });
      }
    });
  } else {
    res
      .status(405)
      .json({ satatus: false, statusCode: 405, message: "Method not allowed" });
  }
}
