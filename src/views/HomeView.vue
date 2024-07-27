<script setup>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import PackageDetails from '@/components/PackageDetails.vue'
import SearchInput from '@/components/SearchInput.vue'
import useTrack from '@/composables/useTrack'

const { search, result, searching, track } = useTrack()

</script>

<template>
  <section
    class="text-white rounded-b-3xl shadow-xl"
    style="background: linear-gradient(20deg, #1b9cfd, #004aad)"
  >
    <Loading v-model:active="searching" :is-full-page="true" />
    <header class="px-4 lg:px-10 py-4">
      <a href="">
        <img src="/logo-blanco.png" alt="" class="w-20 h-auto" />
      </a>
    </header>
    <div class="w-full flex flex-col items-center justify-center mb-6">
      <form @submit.prevent="search" class="text-center py-6 px-4 max-w-xl">
        <h5 class="text-2xl lg:text-4xl font-bold mb-8">
          <div class="mb-1">📦</div>
          ¡Rastrea tu paquete!
        </h5>
        <div class="text-base font-light mb-10 leading-relaxed">
          Ingresa el número de seguimiento y mantente al tanto del progreso de tu paquete en tiempo
          real ⏰
        </div>
        <SearchInput v-model="track" />
      </form>
    </div>
  </section>
  <section class="bg-white text-gray-800 h-full mb-4">
    <div class="w-full flex flex-col items-center justify-center mb-4">
      <div v-if="!result" class="text-gray-500 mt-4">Aquí verás el estado de tu paquete 😊</div>
      <PackageDetails :result="result" />
    </div>
  </section>
</template>
