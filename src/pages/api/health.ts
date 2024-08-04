import { NextApiRequest, NextApiResponse } from "next";
import { responseApiSuccess } from "../../../utils/responseApi";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  responseApiSuccess(res);
}
