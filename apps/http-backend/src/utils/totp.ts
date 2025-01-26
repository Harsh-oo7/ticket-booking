import { generateToken, verifyToken } from "authenticator";
import { TOTP_SECRET } from "../config";

export function getTOTP(number: string, type: string) {
    return generateToken(number + type + TOTP_SECRET);
}

export function verifyTOTP(number: string, otp: string, type: string) {
    return verifyToken(number + type + TOTP_SECRET, otp)
}