import { toast } from '@/utils/toast.js'
import axios from 'axios'
import { ref } from 'vue'

export function useTrack() {
  const BASE_URL = 'https://donut.strain-team.com'
  // const BASE_URL = 'http://127.0.0.1:8000'
  const searching = ref(false)
  const result = ref(null)
  const track = ref('')

  const search = async () => {
    if (!track.value) {
      toast.error('Ingresa un número de rastreo')
      return
    }

    if (track.value.includes(' ')) {
      toast.error('No se permiten espacios en blanco')
      return
    }

    if (track.value.length > 40) {
      toast.error('El número de rastreo no puede superar los 40 caracteres')
      return
    }

    try {
      resetValues()
      searching.value = true
      const { data } = await axios.post(`${BASE_URL}/api/track`, { track: track.value })
      result.value = data
      result.value.search = track.value
      track.value = ''
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al buscar el paquete')
    } finally {
      searching.value = false
    }
  }

  function resetValues() {
    result.value = null
  }

  function clear() {
    track.value = ''
  }

  return { search, result, searching, track, clear }
}

export default useTrack
