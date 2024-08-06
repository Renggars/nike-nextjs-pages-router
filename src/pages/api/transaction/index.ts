import { NextApiRequest, NextApiResponse } from "next";
import {
  responseApiFailed,
  responseApiSuccess,
} from "../../../../utils/responseApi";
import createTransaction from "@/lib/midtrans/transaction";
import { verify } from "../../../../utils/verifyToken";
import { updateData } from "@/lib/firebase/service";
import { redirect } from "next/dist/server/api-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    verify(req, res, false, async (decoded: any) => {
      const payload = req.body;
      delete payload.user.address.isMain;
      const generateOrderId = `${Date.now()}-${Math.random().toString(16)}`;
      const params = {
        transaction_details: {
          order_id: generateOrderId,
          gross_amount: payload.transaction.total,
        },
        customer_details: {
          first_name: payload.user.fullname,
          email: payload.user.email,
          phone: payload.user.address.phone,
        },
      };
      createTransaction(
        params,
        async (transaction: { token: string; redirect_url: string }) => {
          const data = {
            transaction: {
              ...payload.transaction,
              address: payload.user.address,
              token: transaction.token,
              redirect_url: transaction.redirect_url,
              status: "pending",
            },
            carts: [],
          };
          await updateData("users", decoded.id, data, (result: boolean) => {
            if (result) {
              responseApiSuccess(res, {
                token: transaction.token,
                redirect_url: transaction.redirect_url,
              });
            } else {
              responseApiFailed(res);
            }
          });
        }
      );
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
