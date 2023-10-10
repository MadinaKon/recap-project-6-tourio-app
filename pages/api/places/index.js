import Place from "../../../db/models/Place";
import dbConnect from "../../../db/models/connect";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;

      console.log("placeData ", placeData);
      await Place.create(placeData);

      response.status(201).json({ status: "place created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
