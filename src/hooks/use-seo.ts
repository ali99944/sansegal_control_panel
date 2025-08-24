"use client"
import { useGetQuery, useMutationAction } from "./queries-actions"
import type { Seo } from "../types/seo"
import { useNotifications } from "./use-notification"
import { getApiError } from "../lib/error_handler"
import { useNavigate } from "react-router-dom"

export function useSeos() {
  return useGetQuery<Seo[]>({ key: ["seos"], url: "seos" })
}

export function useSeo(id: number) {
  return useGetQuery<Seo>({
    key: ["seos", id],
    url: `seos/${id}`,
    options: { enabled: !!id },
  })
}

export function useUpdateSeo(id: number) {
  const { notify } = useNotifications()
  const navigate = useNavigate()
  return useMutationAction<Seo, FormData>({
    method: "post", // Using POST for FormData with method spoofing
    url: `seos/${id}`,
    key: ["seos", id],
    contentType: "multipart/form-data",
    onSuccessCallback: () => {
      notify.success("تم تحديث بيانات SEO بنجاح!")
      navigate("/seo")
    },
    onErrorCallback: (error) => notify.error(getApiError(error).message),
  })
}