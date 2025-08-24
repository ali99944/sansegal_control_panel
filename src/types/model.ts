import { z } from "zod";
import type { Product } from "./product"; // Assuming a base Product type exists
// The main data structure for a photoshoot model
export interface AppModel {
  id: number;
  image: string;
  width: number;
  height: number;
  products: Pick<Product, "id" | "name" | "image">[]; // Products linked to this model
  created_at: string;
}
// Zod schema for the creation form
export const modelFormSchema = z.object({
//   image: z.any().refine((file) => typeof file == typeof File, "صورة الموديل مطلوبة."),
  image: z.any().optional(),
});
// Type inferred from the Zod schema
export type ModelFormData = z.infer<typeof modelFormSchema>;
