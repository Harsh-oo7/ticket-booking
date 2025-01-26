import axios from 'axios';
import { describe, expect, it, test } from 'vitest';

const BACKEND_URL = 'http://localhost:8080';

const PHONE1 = "9808080889";
const NAME1 = "Harsh"


describe("events", () => {

    it('Cant create an event with the wrong location', async () => {
        await expect(axios.post(`${BACKEND_URL}/api/v1/admin/event`, {
            name: "Live event latent fest",
            description: "Latent fest is a premere fest for members",
            startTime: "2022-10-10 10:00:00",
            locationId: "123",
            banner: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
            seats: []
          })).rejects.toThrowError();
    })

    it('Can create an event with the right location', async () => {
        const locationResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/location`, {
          name: "Delhi",
          description: "Delhi, the capital of the country",
          imageURL: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        });
  
        const response = await axios.post(`${BACKEND_URL}/api/v1/admin/event`, { 
          name: "Live event latent fest",
          description: "Latent fest is a premere fest for members",
          startTime: "2022-10-10 10:00:00",
          locationId: locationResponse.data.id,
          banner: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
          seats: []
        });
  
        expect(response.status).toBe(200);
      })
})