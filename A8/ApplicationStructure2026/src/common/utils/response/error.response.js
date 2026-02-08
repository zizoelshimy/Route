import { NODE_ENV } from "../../../../config/config.service.js";
export const globalErrorHandling = (error, req, res, next) => {
  const status = error.cause?.status ?? 500;
  return res.status(status).json({
    error_message:
      status == 500
        ? "something went wrong"
        : (error.message ?? "something went wrong"),
    stack: NODE_ENV == "development" ? error.stack : undefined,
  });
};
export const ErrorException = (message="fail", cause=400,extra=undefined) => {
  throw new Error(message, { cause: { status,extra  } });
  
};
