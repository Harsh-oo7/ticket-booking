import { Router } from "express";
const { client } = require("@repo/db/client");
import jwt from 'jsonwebtoken'
import { ADMIN_JWT_PASSWORD, JWT_PASSWORD } from "../../../config";
import { getTOTP, verifyTOTP } from "../../../utils/totp";

const router = Router();

router.post("/signin", async (req, res) => {
    try {
        const phoneNumber = req.body.phoneNumber;
        const admin = await client.admin.findFirst({
            where: {
                number: phoneNumber
            }
        })
        if(!admin) {
            res.status(404).send('Admin not found');
            return;
        }
        const totp = getTOTP(phoneNumber, 'ADMIN_SIGNIN');
        console.log("totp========>", totp);
    
        res.json({
            message: "OTP sent"
        })
    }
    catch(error) {
        res.status(500).send('Internal Server Error');
    }
    
})

router.post("/signin/verify", async (req, res) => {
    try {
        const number = req.body.phoneNumber;
        if(process.env.NODE_ENV === 'production' && !verifyTOTP(number, req.body.otp, 'ADMIN_SIGNIN')) {
            res.status(401).send('Invalid OTP');
            return;
        }

        const admin = await client.admin.findFirst({
            where: {
                number
            }
        })
        if(!admin) {
            res.status(404).send('Admin not found');
            return;
        }

        const token = jwt.sign({
            userId: admin.id
        }, ADMIN_JWT_PASSWORD)

        res.json({
            token
        })
    }
    catch(error) {
        res.status(500).send('Internal Server Error');
    }
})

export default router;