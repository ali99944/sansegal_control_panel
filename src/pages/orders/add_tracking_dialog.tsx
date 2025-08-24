// "use client"

// import Button from "../../components/ui/button";
// import Dialog from "../../components/ui/dialog";
// import { useCreateOrderTracking } from "../../hooks/use-orders";

// interface AddTrackingDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   orderId: number;
// }

// export function AddTrackingDialog({ isOpen, onClose, orderId }: AddTrackingDialogProps) {
//     const { mutate: createTracking, isPending } = useCreateOrderTracking(orderId);
//     // ... useForm hook with validation (question, answer, etc.)
    
//     const handleFormSubmit = (data) => {
//         createTracking(data, { onSuccess: onClose });
//     };

//     const statusOptions = [
//       { label: "قيد المعالجة", value: "processing" },
//       { label: "تم الشحن", value: "shipped" },
//       { label: "مكتمل", value: "delivered" },
//       { label: "ملغي", value: "cancelled" },
//     ];
    
//     return (
//         <Dialog isOpen={isOpen} onClose={onClose} title="إضافة تحديث لحالة الطلب">
//             <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
//                  {/* Status Select Field */}
//                  {/* Location Input Field */}
//                  {/* Description Textarea Field */}
//                  <div className="flex justify-end gap-2 pt-4 border-t">
//                     <Button type="button" variant="secondary" onClick={onClose}>إلغاء</Button>
//                     <Button type="submit" loading={isPending}>إضافة التحديث</Button>
//                 </div>
//             </form>
//         </Dialog>
//     );
// }