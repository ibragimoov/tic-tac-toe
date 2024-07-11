import { ref } from 'vue'

export const useCopyToClipboard = () => {
  const isCopied = ref<boolean>(false)

  const copyToClipboard = async () => {
    try {
      const url = window.location.href
      await navigator.clipboard.writeText(url)

      isCopied.value = true

      setTimeout(() => {
        isCopied.value = false
      }, 2000)
    } catch (err) {
      console.error('Не удалось скопировать ссылку:', err)
    }
  }

  return {
    copyToClipboard,
    isCopied
  }
}