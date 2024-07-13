import { createClient } from "next-sanity";

export const client = createClient({
  projectId: 'uo19r4l4',
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});