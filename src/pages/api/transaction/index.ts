import { NextApiRequest, NextApiResponse } from "next";
import {
  responseApiNotFound,
  responseApiSuccess,
} from "../../../../utils/responseApi";
import { createTransaction, getTransaction } from "@/lib/midtrans/transaction";
import { verify } from "../../../../utils/verifyToken";
import { retrieveDataById, updateData } from "@/lib/firebase/service";
import { arrayUnion } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(req, res, false, async (decoded: { id: string }) => {
      if (decoded.id) {
        const order_id = req.query.order_id;
        getTransaction(`${order_id}`, async (result: any) => {
          responseApiSuccess(res, result);
        });
      }
    });
  } else if (req.method === "POST") {
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
          phone: payload.user.phone,
          shipping_address: {
            first_name: payload.user.address.recipient,
            phone: payload.user.address.phone,
            address: payload.user.address.addressLine,
          },
          item_details: payload.transaction.items,
        },
      };
      createTransaction(
        params,
        async (transaction: { token: string; redirect_url: string }) => {
          const newTransaction = {
            ...payload.transaction,
            address: payload.user.address,
            token: transaction.token,
            redirect_url: transaction.redirect_url,
            status: "pending",
            order_id: generateOrderId,
          };

          const data = {
            transaction: arrayUnion(newTransaction),
            carts: [],
          };

          await updateData("users", decoded.id, data, (result: boolean) => {
            if (result) {
              responseApiSuccess(res, {
                token: transaction.token,
                redirect_url: transaction.redirect_url,
              });
            } else {
              responseApiNotFound(res);
            }
          });
        }
      );
    });
  } else if (req.method === "PUT") {
    verify(req, res, false, async (decoded: { id: string }) => {
      if (decoded.id) {
        const order_id = req.query.order_id;
        getTransaction(`${order_id}`, async (result: any) => {
          const user: any = await retrieveDataById("users", decoded.id);
          console.log(user);
          const index = user.transaction.findIndex(
            (transaction: any) => transaction.order_id === order_id
          );

          console.log(index);
          console.log(result);

          if (index !== -1) {
            user.transaction[index].status = result.transaction_status;
          }

          const data = { transaction: user.transaction };
          await updateData("users", decoded.id, data, (result: boolean) => {
            if (result) {
              responseApiSuccess(res);
            } else {
              responseApiNotFound(res);
            }
          });
        });
      }
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
