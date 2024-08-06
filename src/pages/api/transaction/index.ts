import { NextApiRequest, NextApiResponse } from "next";
import { responseApiSuccess } from "../../../../utils/responseApi";
import createTransaction from "@/lib/midtrans/transaction";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const generateOrderId = `${Date.now()}-${Math.random().toString(16)}`;
    const params = {
      transaction_details: {
        order_id: generateOrderId,
        gross_amount: 200000,
      },
      customer_details: {
        first_name: "budi",
        email: "budi@pratama.com",
        phone: "08123456789",
      },
    };
    createTransaction(
      params,
      (transaction: { token: string; redirect_url: string }) => {
        responseApiSuccess(res, transaction);
      }
    );
  }
}
