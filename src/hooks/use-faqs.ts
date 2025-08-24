"use client"

import { useGetQuery, useMutationAction } from "./queries-actions"
import type { Faq, FaqCategory, FaqFormData, CategoryFormData } from "../types/faq"
import { useNotifications } from "./use-notification"
import { getApiError } from "../lib/error_handler"

// --- FAQ Hooks ---

export function useFaqs() {
  return useGetQuery<Faq[]>({ key: ["faqs"], url: "faqs" })
}

export function useCreateFaq() {
  const { notify } = useNotifications()
  return useMutationAction<Faq, FaqFormData>({
    method: "post",
    url: "faqs",
    key: ["faqs"],
    onSuccessCallback: () => notify.success("تم إنشاء السؤال بنجاح!"),
    onErrorCallback: (error) => notify.error(getApiError(error).message),
  })
}

export function useUpdateFaq(id: number) {
  const { notify } = useNotifications()
  return useMutationAction<Faq, FaqFormData>({
    method: "put",
    url: `faqs/${id}`,
    key: ["faqs"],
    onSuccessCallback: () => notify.success("تم تحديث السؤال بنجاح!"),
    onErrorCallback: (error) => notify.error(getApiError(error).message),
  })
}

export function useDeleteFaq() {
  const { notify } = useNotifications()
  return useMutationAction<unknown, { id: number }>({
    method: "delete",
    key: ["faqs"],
    onSuccessCallback: () => notify.success("تم حذف السؤال بنجاح."),
    url: "faqs",
  })
}

// --- FAQ Category Hooks ---

export function useFaqCategories() {
  return useGetQuery<FaqCategory[]>({ key: ["faq-categories"], url: "faq-categories" })
}

export function useCreateFaqCategory() {
  const { notify } = useNotifications()
  return useMutationAction<FaqCategory, CategoryFormData>({
    method: "post",
    url: "faq-categories",
    key: ["faq-categories"], // Important: Invalidate categories to update dropdowns
    onSuccessCallback: () => notify.success("تم إنشاء الفئة بنجاح!"),
    onErrorCallback: (error) => notify.error(getApiError(error).message),
  })
}