<script setup>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import PackageDetails from '@/components/PackageDetails.vue'
import SearchInput from '@/components/SearchInput.vue'
import useTrack from '@/composables/useTrack'

const { search, result, searching, track, clear } = useTrack()

function pasteFrom() {
  navigator.clipboard.readText().then((text) => {
    track.value = text
  })
}
</script>

<template>
  <section class="bg-gulf-blue-950 text-white">
    <Loading v-model:active="searching" :is-full-page="true" />
    <header class="px-4 lg:px-10 py-6">
      <a href="https://enviosdeoccidente.com/">
        <img src="/src/assets/logo.png" alt="" class="w-10 h-auto" />
      </a>
    </header>
    <div class="w-full flex flex-col items-center justify-center mb-6">
      <form @submit.prevent="search" class="text-center py-6 px-4 max-w-xl">
        <h5 class="text-5xl lg:text-4xl font-bold mb-8">¡Rastrea tu paquete!</h5>
        <div class="text-sm font-light mb-10 leading-relaxed">
          Rastrea tu paquete fácilmente con nuestro servicio de seguimiento de envíos. ¡Ingresa el
          número de seguimiento y mantente al tanto del progreso de tu paquete en tiempo real!
        </div>
        <SearchInput v-model="track" />
        <div class="w-full flex justify-between">
          <button
            type="button"
            @click="pasteFrom"
            class="transition select-none duration-300 transform active:scale-110"
          >
            <div class="flex gap-0.5 items-center">
              <span>Pegar</span>
              <img src="/src/assets/clipboard.svg" alt="" class="w-4" />
            </div>
          </button>
          <button
            v-if="track"
            type="button"
            @click="clear"
            class="transition select-none duration-300 transform active:scale-110"
          >
            <div class="flex gap-1 items-center">
              <img src="/src/assets/eraser.svg" alt="" />
            </div>
          </button>
        </div>
      </form>
    </div>
  </section>
  <section class="bg-white text-gray-800 h-full mb-4">
    <div class="w-full flex flex-col items-center justify-center mb-4">
      <PackageDetails :result="result" />
      <div v-if="!result" class="text-center text-xl max-w-xl px-4">
        <img src="/src/assets/brand.jpeg" alt="" class="mx-auto w-full h-auto rounded-lg" />
      </div>
    </div>
  </section>
</template>
