import axios from 'axios';
import { describe, expect, it, test } from 'vitest';

const BACKEND_URL = 'http://localhost:8080';

const PHONE1 = "9808080889";
const NAME1 = "Harsh"

describe("Signup Endpoints", () => {

    it('Double signup doesnt work', async () => {
        const res1 = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            number: PHONE1
        })

        const res2 = await axios.post(`${BACKEND_URL}/api/v1/verify`, {
            name: NAME1,
            otp: '000000'
        })

        expect(res1.status).toBe(200);
        expect(res2.status).toBe(200);
        expect(res1.data.id).not.toBeNull();

        expect(async() => {
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                number: PHONE1
            })
        }).toThrow();
    })
})