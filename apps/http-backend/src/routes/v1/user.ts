import { generateToken, verifyToken } from "authenticator";
import { Router } from "express";

const router = Router();

router.post("/signup", (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const totp = generateToken(phoneNumber + 'SIGNUP');
    console.log("totp========>", totp);

    // send otp to phoneNumber

    res.json({
        id: '1'
    })
})


router.post("/signup/verify", (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    if(process.env.NODE_ENV === 'production' && !verifyToken(phoneNumber + 'SIGNUP', req.body.otp)) {
        res.status(401).send('Invalid OTP');
        return;
    }

    res.json({})
})

export default router;