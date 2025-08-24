import { z } from "zod"

// Interface for a single product variant
export interface ProductVariant {
  id: number
  color: string
  image: string
}

export interface ProductImage {
  id: number;
  url: string;
}

export interface ProductSpecification {
  id: number;
  key: string;
  value: string;
}

// Interface for the main product data
export interface Product {
  id: number
  name: {
    en: string
    ar: string
  }
  description: {
    en: string
    ar: string
  }
  image: string
  price: number
  discount?: number
  discount_type?: "percentage" | "fixed"
  stock: number
  status: "active" | "draft"
  specifications: ProductSpecification[];
  variants: ProductVariant[]
  images: ProductImage[];
  created_at: string
}

// Zod schema for form validation (shared between create and update)
export const productFormSchema = z.object({
  ar_name: z.string().min(3, "الاسم بالعربية مطلوب."),
  en_name: z.string().min(3, "الاسم بالإنجليزية مطلوب."),
  ar_description: z.string().min(10, "الوصف بالعربية مطلوب."),
  en_description: z.string().min(10, "الوصف بالإنجليزية مطلوب."),
  original_price: z.coerce.number().min(1, "السعر الأصلي مطلوب."),
  status: z.enum(["active", "draft"], { required_error: "حالة المنتج مطلوبة." }),
  
  // Optional discount fields
  discount: z.coerce.number().optional(),
  discount_type: z.enum(["percentage", "fixed"]).optional(),
  
  // Specifications as an array of objects
  specifications: z.array(z.object({
    key: z.string().min(1, "المفتاح مطلوب"),
    value: z.string().min(1, "القيمة مطلوبة"),
  })).optional(),
})

// Type inferred from the Zod schema
export type ProductFormData = z.infer<typeof productFormSchema>