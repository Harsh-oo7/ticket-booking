import { generateToken, verifyToken } from "authenticator";
import { Router } from "express";
import { client } from "@repo/db/client";
import jwt from 'jsonwebtoken'
import { JWT_PASSWORD } from "../../config";

const router = Router();

router.post("/signup", async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const totp = generateToken(phoneNumber + 'SIGNUP');
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
})


router.post("/signup/verify", async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const name = req.body.name;

    if(process.env.NODE_ENV === 'production' && !verifyToken(phoneNumber + 'SIGNUP', req.body.otp)) {
        res.status(401).send('Invalid OTP');
        return;
    }

    const userId = await client.user.update({
        where: {
            number: phoneNumber
        },
        data: {
            name: name,
            verified: true
        }
    })

    const token = jwt.sign({
        userId
    }, JWT_PASSWORD)

    res.json({
        token
    })
})

export default router;