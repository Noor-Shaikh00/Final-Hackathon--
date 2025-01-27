import ShipEngine from "shipengine";

const shipengine = new ShipEngine({
  apiKey: process.env.SHIPENGINE_API_KEY as string,
});

export { shipengine };
