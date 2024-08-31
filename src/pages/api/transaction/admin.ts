import { retrieveData } from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";
import { responseApiSuccess } from "../../../../utils/responseApi";
import { verify } from "../../../../utils/verifyToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(req, res, true, async () => {
      const users = await retrieveData("users");
      let data: any = [];
      users.forEach((user: any) => {
        if (user.transaction) {
          const transaction = user.transaction.map((transaction: any) => {
            return {
              ...transaction,
              user: {
                id: user.id,
                fullname: user.fullname,
              },
            };
          });
          data = [...data, ...transaction];
        }
      });
      responseApiSuccess(res, data);
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
