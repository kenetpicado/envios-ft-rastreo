<script setup>
import ReloadSvg from '@/components/icons/ReloadSvg.vue';
import PackageDetails from '@/components/PackageDetails.vue'
import SearchInput from '@/components/SearchInput.vue'
import useTrack from '@/composables/useTrack'
import { useHistoryStore } from '@/stores/history';
import { storeToRefs } from 'pinia';

const { search, result, searching, track, searchType } = useTrack()
const { history } = storeToRefs(useHistoryStore())
const { clear } = useHistoryStore()

const types = [
  { label: 'Tracking', value: 'track' },
  { label: 'Guía', value: 'guide' },
]

function showThis(tracking) {
  track.value = tracking
  search()
}

</script>

<template>
  <section class="text-white rounded-b-3xl shadow-xl" style="background: linear-gradient(20deg, #1b9cfd, #004aad)">
    <div class="w-full flex flex-col items-center justify-center mb-[2.5rem]">
      <form @submit.prevent="search" class="text-center py-6 px-4 max-w-xl mt-8">
        <div class="flex items-center justify-center mb-4">
          <a href="https://enviosfasttrackni.com">
            <img src="/logo-blanco.png" alt="Logo" class="w-20 h-auto" />
          </a>
        </div>
        <h5 class="text-2xl lg:text-4xl font-bold mb-8 tracking-wider">¡Rastrea tu paquete!</h5>
        <div class="text-base font-light mb-10 leading-relaxed tracking-wide">
          Ingresa el número de seguimiento y mantente al tanto del progreso de tu paquete en tiempo
          real ⏰
        </div>

        <div class="mb-6 w-full lg:w-56">
          <div class="relative grid grid-cols-2 rounded-full bg-white border p-1">
            <div
              class="absolute top-1 bottom-1 col-span-1 rounded-full bg-[#8f00ff] transition-all duration-300 ease-in-out"
              :class="searchType === 'track' ? 'left-1 w-[calc(50%-0.25rem)]' : 'left-1/2 w-[calc(50%-0.25rem)]'"
            ></div>

            <button
              v-for="item in types"
              :key="item.value"
              class="relative z-10 py-2 text-center text-sm transition-colors duration-300"
              :class="searchType === item.value ? 'text-white' : 'text-[#8f00ff]'"
              @click.prevent="searchType = item.value"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <SearchInput v-model="track" :loading="searching" :searchType="searchType" />
      </form>
    </div>
  </section>
  <section class="bg-white text-gray-800 h-full mb-4">
    <div class="max-w-xl mx-auto flex flex-col items-center justify-center mb-4">
      <div v-if="searching" class="text-gray-400">
        Buscando...
      </div>
      <div v-else-if="!result.details.length && history.length" class="w-full px-6 flex flex-col gap-4 cursor-pointer">
        <div v-for="item in history" :key="item.date" class="border w-full rounded-xl p-3"
          @click="showThis(item.tracking)">
          <div class="flex justify-between items-center">
            <div>
              <div class="text-xs mb-2 text-gray-300">
                {{ new Date(item.date).toLocaleString('es-NI', { timeZone: 'America/Managua' }) }}
              </div>
              <div class="mb-1 text-sm">
                {{ item.tracking.slice(0, 20) }}
              </div>
              <div class="text-xs bg-blue-100 inline-flex py-1 px-2 rounded-lg text-blue-600">
                {{ item.status }}
              </div>
            </div>
            <div>
              <ReloadSvg class="w-7 h-7 text-gray-300" />
            </div>
          </div>
        </div>
        <div class="mx-auto text-sm text-gray-400">
          <button type="button" @click="clear">Borrar historial</button>
        </div>
      </div>
      <div v-if="!result.details.length && !history.length" class="text-gray-400 mt-4">
        No hay historial de búsquedas
      </div>
      <PackageDetails :result="result" />
    </div>
  </section>
</template>
