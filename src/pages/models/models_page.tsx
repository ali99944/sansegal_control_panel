import { useState } from "react"
import { Image as ImageIcon, Plus, Link as LinkIcon, Link2Off, Trash2, Paperclip } from "lucide-react"
import { useModels } from "../../hooks/use-models"
import type { AppModel } from "../../types/model"
import Toolbar from "../../components/ui/toolbar"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { AttachModelDialog } from "./attach_model_dialog"
import { CreateModelDialog } from "./create_model_dialog"
import { DeleteModelDialog } from "./delete_model_dialog"
import { UnlinkModelDialog } from "./unlink_model_dialog"

export default function ModelsPage() {
  const { data: models = [], isLoading, refetch } = useModels()
  console.log(models);
  
  
  // State for dialogs
  const [isCreateOpen, setCreateOpen] = useState(false)
  const [isAttachOpen, setAttachOpen] = useState(false)
  const [isUnlinkOpen, setUnlinkOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)
  
  // State to hold the currently selected model/product for dialogs
  const [selectedModel, setSelectedModel] = useState<AppModel | null>(null)
  const [unlinkTarget, setUnlinkTarget] = useState<{ modelId: number; productId: number; productName: string } | null>(null)

  // --- Statistics ---
  const totalModels = models.length
  const linkedModels = models.filter(m => m.products.length > 0).length
  const tallImages = models.filter(m => m.height > m.width).length

  const kpiCards = [
    { title: "إجمالي الصور", value: totalModels, icon: ImageIcon },
    { title: "الصور المرتبطة بمنتجات", value: linkedModels, icon: LinkIcon },
    { title: "الصور الطولية", value: tallImages, icon: Paperclip },
  ]

  // --- Dialog Triggers ---
  const openAttachDialog = (model: AppModel) => {
    setSelectedModel(model)
    setAttachOpen(true)
  }
  const openDeleteDialog = (model: AppModel) => {
    setSelectedModel(model)
    setDeleteOpen(true)
  }
  const openUnlinkDialog = (modelId: number, productId: number, productName: string) => {
    setUnlinkTarget({ modelId, productId, productName })
    setUnlinkOpen(true)
  }

  return (
    <div className="space-y-6" dir="rtl">
      <Toolbar title="إدارة صور الموديل">
        <Button variant="secondary" onClick={() => setCreateOpen(true)}>
          <Plus className="w-4 h-4 ml-2" />
          إضافة صورة جديدة
        </Button>
      </Toolbar>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiCards.map((card, index) => (
          <Card key={index}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg"><card.icon className="w-6 h-6 text-primary" /></div>
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{isLoading ? "..." : card.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-96 bg-white rounded-lg animate-pulse"></div>)
        ) : (
          models.map(model => (
            <Card key={model.id} className="p-0 overflow-hidden flex flex-col">
              <img src={model.image} alt={`Model ${model.id}`} className="w-full h-64 object-cover" />
              <div className="p-4 flex-grow flex flex-col">
                <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                  <span>{model.width}x{model.height}px</span>
                  <Badge variant="secondary">{model.height > model.width ? 'طولية' : 'عريضة'}</Badge>
                </div>
                
                <div className="space-y-2 flex-grow">
                  <h4 className="font-semibold text-sm">المنتجات المرتبطة:</h4>
                  {model.products.length > 0 ? (
                    model.products.map(product => (
                      <div key={product.id} className="flex items-center justify-between text-xs bg-gray-50 p-1.5 rounded">
                        <span className="truncate">{product.name.ar}</span>
                        <button onClick={() => openUnlinkDialog(model.id, product.id, product.name.ar)} className="text-red-500 hover:text-red-700 p-1">
                            <Link2Off className="w-3 h-3"/>
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400">غير مرتبطة بمنتجات.</p>
                  )}
                </div>

                <div className="flex gap-2 pt-4 mt-4 border-t">
                  <Button variant="secondary" size="sm" className="flex-1" onClick={() => openAttachDialog(model)}>
                    <LinkIcon className="w-4 h-4 ml-1"/> ربط
                  </Button>
                  <Button variant="danger" size="sm" className="flex-1" onClick={() => openDeleteDialog(model)}>
                    <Trash2 className="w-4 h-4 ml-1"/> حذف
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Dialogs */}
      <CreateModelDialog isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} />
      <AttachModelDialog model={selectedModel} isOpen={isAttachOpen} onClose={() => setAttachOpen(false)} />
      <DeleteModelDialog model={selectedModel} isOpen={isDeleteOpen} onClose={() => setDeleteOpen(false)} onSuccess={refetch} />
      <UnlinkModelDialog {...unlinkTarget} isOpen={isUnlinkOpen} onClose={() => setUnlinkOpen(false)} />
    </div>
  )
}