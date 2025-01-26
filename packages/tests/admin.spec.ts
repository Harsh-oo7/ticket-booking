import { describe, expect, test, it } from 'vitest'
import { getRandomNumber } from './utils/number';
import axios from 'axios';

const BACKEND_URL = "http://localhost:8080"

const PHONE_NUMBER_1 = getRandomNumber(10);
const NAME_1 = "harsh";

describe("Signin endpoints", () => {

    it('Signin doesnt work when user doesnt exist', async () => {
        await expect(axios.post(`${BACKEND_URL}/api/v1/admin/signin`, {
            number: PHONE_NUMBER_1,
        })).rejects.toThrowError();
    })
    
    it('Signin works for admin', async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/test/create-admin`, {
            number: PHONE_NUMBER_1,
            name: "Samay",
        });

        const responseSignin = await axios.post(`${BACKEND_URL}/api/v1/admin/signin`, {
            number: PHONE_NUMBER_1,
        });

        expect(response.status).toBe(200);
        expect(response.data.token).not.toBeNull();
        expect(responseSignin.status).toBe(200);
        expect(responseSignin.data.token).not.toBeNull();
    })

})