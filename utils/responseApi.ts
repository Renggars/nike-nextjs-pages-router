import { NextApiResponse } from "next";

export const responseApi = (
  res: NextApiResponse,
  status: boolean,
  statusCode: number,
  message: string,
  data: any = {}
) => {
  res.status(statusCode).json({
    status: status,
    statusCode: statusCode,
    message: message,
    data: data,
  });
};

export const responseApiSuccess = (res: NextApiResponse, data: any = {}) => {
  responseApi(res, true, 200, "Success", data);
};

export const responseApiFailed = (res: NextApiResponse, data: any = {}) => {
  responseApi(res, false, 400, "Failed", data);
};

export const responseApiAccessDenied = (
  res: NextApiResponse,
  data: any = {}
) => {
  responseApi(res, false, 403, "Access Denied", data);
};

export const responseApiNotFound = (req: NextApiResponse, data: any = {}) => {
  responseApi(req, false, 404, "Not Found", data);
};

export const responeApiMethodNotAllowed = (
  req: NextApiResponse,
  data: any = {}
) => {
  responseApi(req, false, 405, "Method Not Allowed", data);
};
