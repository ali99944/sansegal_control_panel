"use client"
import { useMutationAction } from "./queries-actions"
import { type LoginFormData, type Manager } from "../types/manager"
import { useNotifications } from "./use-notification"
import { getApiError } from "../lib/error_handler"
import { useAppDispatch } from "../redux/hook"
import { loginSuccess } from "../redux/reducers/auth_reducer"

export function useLogin() {
  const dispatch = useAppDispatch()
  const { notify } = useNotifications()

  return useMutationAction<{ manager: Manager; token: string }, LoginFormData>({
    method: "post",
    url: "login",
    onSuccessCallback: (data) => {
      dispatch(
        loginSuccess({
          token: data.token,
          manager: data.manager
        })
      )

      location.pathname = '/'
    },
    onErrorCallback: (error) => {
        // The controller already provides a specific error message
        const err = getApiError(error)
        notify.error(err.message)
    },
  })
}