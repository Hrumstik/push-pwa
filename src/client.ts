import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "1nygsokb",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-05-03",
});

export default client;
