import { ApifyClient } from "apify-client";

// Initialize the ApifyClient with API token
const client = new ApifyClient({
  token: process.env.APIFY_API_KEY,
});

// Prepare Actor input
const input = {
  query: "party",
  maxItems: 10,
};
export async function runActor() {
  // Run the Actor and wait for it to finish
  const run = await client.actor("r5gMxLV2rOF3J1fxu").call(input);

  // Fetch and print Actor results from the run's dataset (if any)
  console.log("Results from dataset");
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  items.forEach((item) => {
    console.dir(item);
  });
}
