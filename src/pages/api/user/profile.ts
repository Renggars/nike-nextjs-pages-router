import { NextApiRequest, NextApiResponse } from "next";
import { retrieveDataById, updateData } from "@/lib/firebase/service";
import bcrypt from "bcrypt";
import { verify } from "../../../../utils/verifyToken";
import {
  responeApiMethodNotAllowed,
  responseApiFailed,
  responseApiNotFound,
  responseApiSuccess,
} from "../../../../utils/responseApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(req, res, false, async (decoded: { id: string }) => {
      const profile: any = await retrieveDataById("users", decoded.id);
      if (profile) {
        profile.id = decoded.id;
        responseApiSuccess(res, profile);
      } else {
        responseApiNotFound(res);
      }
    });
  } else if (req.method === "PUT") {
    const { data } = req.body;
    verify(req, res, false, async (decoded: { id: string }) => {
      if (data.password) {
        const passwordConfirm = await bcrypt.compare(
          data.oldPassword,
          data.encryptedPassword
        );
        if (!passwordConfirm) {
          responseApiFailed(res);
        }
        delete data.oldPassword;
        delete data.encryptedPassword;
        data.password = await bcrypt.hash(data.password, 10);
      }

      await updateData("users", decoded.id, data, (result: boolean) => {
        if (result) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else {
    responeApiMethodNotAllowed(res);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
