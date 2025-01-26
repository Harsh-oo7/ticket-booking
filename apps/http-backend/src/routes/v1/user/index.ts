import { Router } from "express";
const { client } = require("@repo/db/client");
import jwt from 'jsonwebtoken'
import { JWT_PASSWORD } from "../../../config";
import { getTOTP, verifyTOTP } from "../../../utils/totp";

const router = Router();

router.post("/signup", async (req, res) => {
    try {
        const phoneNumber = req.body.phoneNumber;
        const totp = getTOTP(phoneNumber, 'SIGNUP');
        console.log("totp========>", totp);

        // send otp to phoneNumber

        const user = await client.user.upsert({
            where: {
                number: phoneNumber
            },
            create: {
                number: phoneNumber,
                name: ""
            },
            update: {

            }
        })

        res.json({
            id: user.id
        })
    }
    catch(error) {
        res.status(500).send('Internal Server Error');
    }
})


router.post("/signup/verify", async (req, res) => {
    try {
        const phoneNumber = req.body.phoneNumber;
        const name = req.body.name;

        if(process.env.NODE_ENV === 'production' && !verifyTOTP(phoneNumber, req.body.otp, 'SIGNUP')) {
            res.status(401).send('Invalid OTP');
            return;
        }

        const user = await client.user.update({
            where: {
                number: phoneNumber
            },
            data: {
                name: name,
                verified: true
            }
        })

        const token = jwt.sign({
            userId: user.id
        }, JWT_PASSWORD)

        res.json({
            token
        })
    }
    catch(error) {
        res.status(500).send('Internal Server Error');
    }
})

router.post("/signin", async (req, res) => {
    try {
        const phoneNumber = req.body.phoneNumber;
        const user = await client.user.findFirst({
            where: {
                number: phoneNumber
            }
        })
        if(!user) {
            res.status(404).send('User not found');
            return;
        }
        const totp = getTOTP(phoneNumber, 'SIGNIN');
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
        if(process.env.NODE_ENV === 'production' && !verifyTOTP(number, req.body.otp, 'SIGNIN')) {
            res.status(401).send('Invalid OTP');
            return;
        }

        const user = await client.user.findFirst({
            where: {
                number
            }
        })
        if(!user) {
            res.status(404).send('User not found');
            return;
        }

        const token = jwt.sign({
            userId: user.id
        }, JWT_PASSWORD)

        res.json({
            token
        })
    }
    catch(error) {
        res.status(500).send('Internal Server Error');
    }
})

export default router;