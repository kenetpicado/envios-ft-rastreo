import { useHistoryStore } from '@/stores/history'
import { toast } from '@/utils/toast.js'
import axios from 'axios'
import { ref } from 'vue'

export function useTrack() {
  const BASE_URL = 'https://ft-backend-production.up.railway.app'
  const SECONDARY_URL = 'https://scrape-it-production.up.railway.app'
  //const BASE_URL = 'http://localhost:3001'
  const searching = ref(false)
  const track = ref('')
  const history = useHistoryStore()

  const result = ref({
    details: [],
    logs: []
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

    if (track.value.length < 5) {
      toast.error('El número de rastreo debe tener al menos 5 caracteres')
      return
    }

    try {
      searching.value = true
      resetValues()
      const { data } = await axios.get(`${BASE_URL}/search`, {
        params: { track: track.value }
      })

      if (data.details.length > 1) {
        result.value = data
        history.setTracking(track.value, data.details[0])
      } else {
        searchInEverest()
      }
    } catch (error) {
      toast.error('Error al buscar el paquete')
    } finally {
      searching.value = false
    }
  }

  async function searchInEverest() {
    try {
      searching.value = true
      const { data } = await axios.get(`${SECONDARY_URL}/everest`, {
        params: { track: track.value }
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

  return { search, result, searching, track, clear }
}

export default useTrack
