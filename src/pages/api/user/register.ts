import { signUp } from "@/services/auth/services";
import { NextApiRequest, NextApiResponse } from "next";
import {
  responeApiMethodNotAllowed,
  responseApiFailed,
  responseApiSuccess,
} from "../../../../utils/responseApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await signUp(req.body, (status: boolean) => {
      if (status) {
        responseApiSuccess(res);
      } else {
        responseApiFailed(res);
      }
    });
  } else {
    responeApiMethodNotAllowed(res);
  }
}
