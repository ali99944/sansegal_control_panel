// "use client"

// import { useGetQuery, useMutationAction } from "./queries-actions"
// import type { Manager, CreateManagerData, UpdateManagerData, ManagerPermissionsData } from "../types/manager"
// import { useNotifications } from "./use-notification"
// import { getApiError } from "../lib/error_handler"
// import type { Permission } from "../types/permission"

// export function useManagers() {
//   const { notify } = useNotifications()

//   const {
//     data: managers,
//     isLoading,
//     error,
//     refetch,
//   } = useGetQuery<Manager[]>({
//     url: "managers",
//     key: ["managers"],
//   })

//   const createManagerMutation = useMutationAction({
//     method: "post",
//     url: "managers",
//     onSuccessCallback: (data) => {
//       console.log(data)
//       notify.success("تم إنشاء المدير بنجاح")
//       refetch()
//     },
//     onErrorCallback: (error) => {
//       const errorObject = getApiError(error)
//       notify.error(errorObject.message)
//     },
//   })

//   const createManager = (data: CreateManagerData) => {
//     createManagerMutation.mutate(data)
//   }

//   return {
//     managers: managers || [],
//     isLoading,
//     error,
//     refetch,
//     createManager,
//     isCreating: createManagerMutation.isPending,
//   }
// }

// export function useUpdateManager(managerId: number | undefined) {
//   const { notify } = useNotifications()

//   const updateManagerMutation = useMutationAction({
//     method: "put",
//     url: `managers/${managerId}`,
//     onSuccessCallback: (data) => {
//       console.log(data)
//       notify.success("تم تحديث المدير بنجاح")
//     },
//     onErrorCallback: (error) => {
//       console.log(error)
//       notify.error("خطأ في تحديث المدير")
//     },
//   })

//   const updateManager = (data: UpdateManagerData) => {
//     updateManagerMutation.mutate(data)
//   }

//   return {
//     updateManager,
//     isUpdating: updateManagerMutation.isPending,
//   }
// }

// export function useDeleteManager(managerId: number | undefined) {
//   const { notify } = useNotifications()

//   const deleteManagerMutation = useMutationAction({
//     method: "delete",
//     url: `managers/${managerId}`,
//     onSuccessCallback: () => {
//       notify.success("تم حذف المدير بنجاح")
//     },
//     onErrorCallback: (error) => {
//       console.log(error)
//       notify.error("خطأ في حذف المدير")
//     },
//   })

//   const deleteManager = () => {
//     deleteManagerMutation.mutate({})
//   }

//   return {
//     deleteManager,
//     isDeleting: deleteManagerMutation.isPending,
//   }
// }

// export function useUpdateManagerPermissions(managerId: number | undefined) {
//   const { notify } = useNotifications()

//   const updateManagerPermissionsMutation = useMutationAction({
//     method: "post",
//     url: `managers/${managerId}/permissions`,
//     onSuccessCallback: () => {
//       notify.success("تم تحديث الصلاحيات بنجاح")
//     },
//     onErrorCallback: (error) => {
//       console.log(error)
//       notify.error("خطأ في تحديث الصلاحيات")
//     },
//   })

//   const updateManagerPermissions = (data: ManagerPermissionsData) => {
//     updateManagerPermissionsMutation.mutate(data)
//   }

//   return {
//     updateManagerPermissions,
//     isUpdatingPermissions: updateManagerPermissionsMutation.isPending,
//   }
// }

// export function useManagerPermissions(managerId: number) {
//   const {
//     data: permissions,
//     isLoading,
//     error,
//     refetch,
//   } = useGetQuery<Permission[]>({
//     url: `managers/${managerId}/permissions`,
//     key: ["manager-permissions", managerId.toString()],
//   })

//   return {
//     permissions: permissions || [],
//     isLoading,
//     error,
//     refetch,
//   }
// }

// export function useAllPermissions() {
//   const {
//     data: permissions,
//     isLoading,
//     error,
//   } = useGetQuery<Permission[]>({
//     url: "permissions",
//     key: ["permissions"],
//   })

//   return {
//     permissions: permissions || [],
//     isLoading,
//     error,
//   }
// }
