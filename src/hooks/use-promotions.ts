"use client"

import { useGetQuery, useMutationAction } from "./queries-actions"
import type { Promotion, PromotionFormData } from "../types/promotion"
import { useNotifications } from "./use-notification"
import { getApiError } from "../lib/error_handler"

export function usePromotions() {
  return useGetQuery<Promotion[]>({
    key: ["promotions"],
    url: "promotions",
  })
}

export function useCreatePromotion() {
  const { notify } = useNotifications()
  return useMutationAction<Promotion, PromotionFormData>({
    method: "post",
    url: "promotions",
    key: ["promotions"],
    onSuccessCallback: () => {
      notify.success("تم إنشاء العرض الترويجي بنجاح!")
    },
    onErrorCallback: (error) => notify.error(getApiError(error).message),
  })
}

export function useUpdatePromotion(id: number) {
  const { notify } = useNotifications()
  return useMutationAction<Promotion, PromotionFormData>({
    method: "put",
    url: `promotions/${id}`,
    key: ["promotions"],
    onSuccessCallback: () => {
      notify.success("تم تحديث العرض الترويجي بنجاح!")
    },
    onErrorCallback: (error) => notify.error(getApiError(error).message),
  })
}

export function useDeletePromotion() {
  const { notify } = useNotifications()
  return useMutationAction<unknown, { id: number }>({
    method: "delete",
    url: "promotions", // ID will be appended
    key: ["promotions"],
    onSuccessCallback: () => {
      notify.success("تم حذف العرض الترويجي بنجاح.")
    },
    onErrorCallback: (error) => notify.error(getApiError(error).message),
  })
}