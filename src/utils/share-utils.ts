export interface ShareData {
    title: string
    text: string
    url: string
  }
  
  export const shareContent = async (data: ShareData): Promise<boolean> => {
    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share(data)
        return true
      } catch (error) {
        console.error("Error sharing:", error)
        return false
      }
    }
  
    // Fallback: Copy to clipboard
    try {
      const shareText = `${data.title}\n${data.text}\n${data.url}`
      await navigator.clipboard.writeText(shareText)
      return true
    } catch (error) {
      console.error("Error copying to clipboard:", error)
      return false
    }
  }
  
  export const downloadFile = async (url: string, filename: string): Promise<void> => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
  
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
  
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error("Error downloading file:", error)
      throw error
    }
  }
  