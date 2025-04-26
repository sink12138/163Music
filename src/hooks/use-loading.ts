import { ref } from 'vue'

/**
 * Boolean
 *
 * @param initValue Init value
 */
export default function useLoading(initValue = false) {
  const loading = ref(initValue)

  function setLoading(value: boolean) {
    loading.value = value
  }
  function startLoading() {
    setLoading(true)
  }
  function endLoading() {
    setLoading(false)
  }

  return {
    loading,
    startLoading,
    endLoading
  }
}
