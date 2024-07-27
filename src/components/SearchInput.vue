<template>
  <div
    class="flex items-center border border-gray-300 rounded-3xl text-gray-700 overflow-hidden bg-white px-2 py-1 mb-8"
  >
    <input
      type="text"
      required
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Número de rastreo"
      class="px-4 w-full focus:outline-none"
    />
    <button
      type="submit"
      aria-label="Buscar"
      class="flex p-2 items-center justify-center bg-amber-400 text-white h-full rounded-full transition select-none duration-300 transform active:scale-110"
    >
      <SearchSvg />
    </button>
  </div>
</template>

<script setup>
import SearchSvg from '@/components/icons/SearchSvg.vue'

defineProps({
  modelValue: {
    type: [String, Number],
    required: false
  }
})
</script>
