import { useGetQuery, useMutationAction } from "./queries-actions"
import type { AppModel } from "../types/model"
import type { Product } from "../types/product"
import { useNotifications } from "./use-notification"
import { getApiError } from "../lib/error_handler"

/**
 * Hook to fetch all photoshoot models.
 */
export function useModels() {
  return useGetQuery<AppModel[]>({
    key: ["models"],
    url: "models",
  })
}

/**
 * Hook to fetch a simple list of products (for the attach dialog).
 */
export function useProductList() {
  return useGetQuery<Product[]>({
    key: ["product-list"],
    url: "products?list=true", // Assume an endpoint that returns a light version
  })
}

/**
 * Hook to create a new photoshoot model.
 */
export function useCreateModel() {
  const { notify } = useNotifications()
  return useMutationAction<AppModel, FormData>({
    method: "post",
    url: "models",
    key: ["models"],
    contentType: "multipart/form-data",
    onSuccessCallback: () => {
      notify.success("تم رفع صورة الموديل بنجاح!")
    },
    onErrorCallback: (error) => notify.error(getApiError(error).message),
  })
}

/**
 * Hook to delete a photoshoot model.
 */
export function useDeleteModel(id: number | undefined) {
  const { notify } = useNotifications()
  return useMutationAction({
    method: "delete",
    url: `models/${id}`,
    key: ["models"],
    onSuccessCallback: () => {
      notify.success("تم حذف صورة الموديل بنجاح.")
    },
    onErrorCallback: (error) => notify.error(getApiError(error).message),
  })
}

interface AttachModelPayload {
  product_id: number | undefined | null
  model_id: number | undefined
}

/**
 * Hook to attach a model to a product.
 */
export function useAttachModel({ product_id, model_id }: AttachModelPayload) {
  const { notify } = useNotifications()
  
  if(!product_id || !model_id) {
    notify.error("لم يتم اختيار منتج")
  }

  return useMutationAction({
    method: "post",
    key: ["models"], // Invalidate models to refetch linked products
    onSuccessCallback: () => {
      notify.success("تم ربط الموديل بالمنتج بنجاح.")
    },
    onErrorCallback: (error) => notify.error(getApiError(error).message),
    url: `products/${product_id}/models/${model_id}`, // A custom route might be cleaner
  })
}

/**
 * Hook to detach a model from a product.
 */
export function useDetachModel() {
  const { notify } = useNotifications()
  return useMutationAction<unknown, { modelId: number, productId: number }>({
    method: "delete",
    key: ["models"],
    onSuccessCallback: () => {
      notify.success("تم فك ارتباط الموديل بالمنتج.")
    },
    onErrorCallback: (error) => notify.error(getApiError(error).message),
    url: "products/detach-model",
  })
}