"use client"

import { useGetQuery, useMutationAction } from "./queries-actions"
import type { Testimonial, TestimonialFormData } from "../types/testimonial"
import { useNotifications } from "./use-notification"
import { getApiError } from "../lib/error_handler"

export function useTestimonials() {
  return useGetQuery<Testimonial[]>({
    key: ["testimonials"],
    url: "testimonials",
  })
}

export function useCreateTestimonial() {
  const { notify } = useNotifications()
  return useMutationAction<Testimonial, TestimonialFormData>({
    method: "post",
    url: "testimonials",
    key: ["testimonials"],
    onSuccessCallback: () => {
      notify.success("تمت إضافة الشهادة بنجاح!")
    },
    onErrorCallback: (error) => notify.error(getApiError(error).message),
  })
}

export function useUpdateTestimonial(id: number) {
  const { notify } = useNotifications()
  return useMutationAction<Testimonial, TestimonialFormData>({
    method: "put",
    url: `testimonials/${id}`,
    key: ["testimonials"],
    onSuccessCallback: () => {
      notify.success("تم تحديث الشهادة بنجاح!")
    },
    onErrorCallback: (error) => notify.error(getApiError(error).message),
  })
}

export function useDeleteTestimonial() {
  const { notify } = useNotifications()
  return useMutationAction<unknown, { id: number }>({
    method: "delete",
    url: "testimonials", // ID will be appended
    key: ["testimonials"],
    onSuccessCallback: () => {
      notify.success("تم حذف الشهادة بنجاح.")
    },
    onErrorCallback: (error) => notify.error(getApiError(error).message),
  })
}