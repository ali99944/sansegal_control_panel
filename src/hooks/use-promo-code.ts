"use client"
import { useGetQuery, useMutationAction } from "./queries-actions"
import type { PromoCode, PromoCodeFormData } from "../types/promo-code"
import { useNotifications } from "./use-notification"
import { getApiError } from "../lib/error_handler"

export function usePromoCodes() {
  return useGetQuery<PromoCode[]>({ key: ["promo-codes"], url: "promo-codes" })
}

export function useCreatePromoCode() {
  const { notify } = useNotifications()
  return useMutationAction<PromoCode, PromoCodeFormData>({
    method: "post",
    url: "promo-codes",
    key: ["promo-codes"],
    onSuccessCallback: () => notify.success("تم إنشاء كود الخصم بنجاح!"),
    onErrorCallback: (error) => notify.error(getApiError(error).message),
  })
}

export function useUpdatePromoCode(id: number) {
  const { notify } = useNotifications()
  return useMutationAction<PromoCode, PromoCodeFormData>({
    method: "put",
    url: `promo-codes/${id}`,
    key: ["promo-codes"],
    onSuccessCallback: () => notify.success("تم تحديث كود الخصم بنجاح!"),
    onErrorCallback: (error) => notify.error(getApiError(error).message),
  })
}

export function useDeletePromoCode() {
  const { notify } = useNotifications()
  return useMutationAction<unknown, { id: number }>({
    method: "delete",
    url: "promo-codes",
    key: ["promo-codes"],
    onSuccessCallback: () => notify.success("تم حذف كود الخصم بنجاح."),
  })
}