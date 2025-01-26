import { Router } from "express";
const { client } = require("@repo/db/client");
import { CreateEventSchema } from '@repo/common/types'
import { adminMiddleware } from "../../../middleware/admin";

const router = Router();

router.post("/", adminMiddleware, async (req, res) => {

    const { data, success } = CreateEventSchema.safeParse(req.body);
    const adminId = req.userId;
    if(!success) {
        res.status(400).send('Invalid data');
        return;
    }

    try {
        const event = await client.event.create({
            data: {
                name: data.name,
                description: data.description,
                startTime: data.startTime,
                locationId: data.location,
                imageURL: data.imageURL
            }
        })
    
        res.json({
            message: "Hello World"
        })
    }
    catch(error) {
        res.status(500).send('Internal Server Error');
    }
})




export default router;