import { RequestHandler } from "express";
import { middleware } from ".";
import { SUPER_ADMIN_JWT_PASSWORD } from "../config";

export const superAdminMiddleware: RequestHandler = middleware(SUPER_ADMIN_JWT_PASSWORD); 