import { useHistoryStore } from '@/stores/history'
import { toast } from '@/utils/toast.js'
import axios from 'axios'
import { ref } from 'vue'

export function useTrack() {
  const BASE_URL = 'https://ft-backend-production.up.railway.app'
  // const BASE_URL = 'http://localhost:3001'
  const searching = ref(false)
  const track = ref('')
  const history = useHistoryStore()
  const searchType = ref('track')

  const result = ref({
    details: [],
    logs: []
  })

  const params = ref({})

  const search = async () => {
    if (!track.value) {
      toast.error('Ingresa un número de rastreo')
      return
    }

    if (track.value.includes(' ')) {
      toast.error('No se permiten espacios en blanco')
      return
    }

    if (track.value.length < 5) {
      toast.error('El número de rastreo debe tener al menos 5 caracteres')
      return
    }

    try {
      searching.value = true
      resetValues()

      if (searchType.value === 'track') {
        params.value = { track: track.value }
      } else {
        params.value = { guide: track.value }
      }

      const { data } = await axios.get(`${BASE_URL}/search`, {
        params: params.value
      })

      if (data.details.length > 1) {
        history.setTracking(track.value, data.details[0])
      }

      result.value = data
    } catch (error) {
      toast.error('Error al buscar el paquete')
    } finally {
      searching.value = false
    }
  }

  function resetValues() {
    result.value = { details: [], logs: [] }
  }

  function clear() {
    track.value = ''
  }

  return { search, result, searching, track, clear, searchType }
}

export default useTrack
