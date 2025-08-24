"use client"

import { useGetQuery, useMutationAction } from "./queries-actions"
import type { AppSettings, SettingsFormData } from "../types/settings"
import { useNotifications } from "./use-notification"
import { getApiError } from "../lib/error_handler"

export function useSettings() {
  return useGetQuery<AppSettings>({
    key: ["settings"],
    url: "settings",
  })
}

export function useUpdateSettings() {
  const { notify } = useNotifications()
  return useMutationAction<void, SettingsFormData>({
    method: "post",
    url: "settings",
    key: ["settings"], // Invalidate settings query on success
    onSuccessCallback: () => {
      notify.success("تم حفظ الإعدادات بنجاح!")
    },
    onErrorCallback: (error) => notify.error(getApiError(error).message),
  })
}