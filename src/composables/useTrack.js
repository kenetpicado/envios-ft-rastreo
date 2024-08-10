import { toast } from '@/utils/toast.js'
import axios from 'axios'
import { ref } from 'vue'

export function useTrack() {
  //const BASE_URL = 'https://donut.strain-team.com'
  const BASE_URL = 'http://localhost:3000'
  const searching = ref(false)
  const track = ref('')

  const result = ref({
    details: [],
    logs: [],
    is_completed: false
  })

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
      const { data } = await axios.get(`${BASE_URL}/everest`, {
        params: { track: track.value }
      })
      result.value.details = data.details
      result.value.logs = data.logs
      result.value.is_completed = data.is_completed
    } catch (error) {
      toast.error(error?.message || 'Error al buscar el paquete')
    } finally {
      searching.value = false
    }
  }

  function resetValues() {
    result.value = { details: [], logs: [], is_completed: false }
  }

  function clear() {
    track.value = ''
  }

  return { search, result, searching, track, clear }
}

export default useTrack
