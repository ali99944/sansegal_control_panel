"use client"
import { useGetQuery, useMutationAction } from "./queries-actions"
import type { Policy, PolicyFormData } from "../types/policy"
import { useNotifications } from "./use-notification"
import { getApiError } from "../lib/error_handler"
import { useNavigate } from "react-router-dom"

export function usePolicies() {
  return useGetQuery<Policy[]>({ key: ["policies"], url: "policies" })
}
export function usePolicy(id: number) {
  return useGetQuery<Policy>({ key: ["policies", id], url: `policies/${id}`, options: { enabled: !!id } })
}
export function useUpdatePolicy(id: number) {
  const { notify } = useNotifications()
  const navigate = useNavigate()
  return useMutationAction<Policy, PolicyFormData>({
    method: "put",
    url: `policies/${id}`,
    key: ["policies", id],
    onSuccessCallback: () => {
      notify.success("تم تحديث السياسة بنجاح!")
      navigate("/policies")
    },
    onErrorCallback: (error) => notify.error(getApiError(error).message),
  })
}