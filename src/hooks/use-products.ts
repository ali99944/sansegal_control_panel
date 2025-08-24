"use client"

import { useGetQuery, useMutationAction } from "./queries-actions"
import type { Product } from "../types/product"
import { useNotifications } from "./use-notification"
import { getApiError } from "../lib/error_handler"
import { useNavigate } from "react-router-dom"

/**
 * Hook to fetch a paginated list of all products.
 */
export function useProducts() {
  return useGetQuery<Product[]>({
    key: ["products"],
    url: "products",
  })
}

/**
 * Hook to fetch a single product's details.
 * @param id The ID of the product to fetch.
 */
export function useProduct(id: number) {
  return useGetQuery<Product>({
    key: ["products", id],
    url: `products/${id}`,
    options: {
      enabled: !!id, // Only run the query if the ID is valid
    },
  })
}

/**
 * Hook for creating a new product.
 */
export function useCreateProduct() {
  const { notify } = useNotifications()
  const navigate = useNavigate()

  return useMutationAction<Product, FormData>({
    method: "post",
    url: "products",
    contentType: "multipart/form-data",
    onSuccessCallback: () => {
      notify.success("تم إنشاء المنتج بنجاح!")
      navigate("/products")
    },
    onErrorCallback: (error) => {
      const err = getApiError(error)
      notify.error(err.message)
    },
  })
}

/**
 * Hook for updating an existing product.
 * @param id The ID of the product to update.
 */
export function useUpdateProduct(id: number) {
  const { notify } = useNotifications()
  const navigate = useNavigate()

  return useMutationAction<Product, FormData>({
    method: "post", // Use POST with _method spoofing for multipart/form-data
    url: `products/${id}`,
    contentType: "multipart/form-data",
    onSuccessCallback: () => {
      notify.success("تم تحديث المنتج بنجاح!")
      navigate("/products")
    },
    onErrorCallback: (error) => {
      const err = getApiError(error)
      notify.error(err.message)
    },
  })
}

/**
 * Hook for deleting a product.
 */
export function useDeleteProduct(product_id: number | undefined) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "delete",
    key: ["products"], // To invalidate the products list on success
    onSuccessCallback: () => {
      notify.success("تم حذف المنتج بنجاح.")
    },
    onErrorCallback: (error) => {
      const err = getApiError(error)
      notify.error(err.message)
    },
    url: `products/${product_id}`, // The base URL, ID will be appended
  })
}