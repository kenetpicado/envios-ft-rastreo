<template>
  <Transition>
    <div v-if="result.details.length > 0 ?? result.logs.length > 0" class="text-center max-w-xl">
      <div v-for="(detail, index) in result.details" :key="detail" class="mb-4 px-2">
        <span
          :class="{ 'font-bold text-2xl': index == 0 }"
          v-html="detail"
          style="white-space: pre-wrap"
        ></span>
      </div>
      <div v-for="(log, index) in result.logs" class="mb-5" :key="index">
        <div class="flex flex-col items-center justify-center mb-2">
          <span
            class="font-bold flex items-center justify-center w-8 h-8 text-white rounded-full"
            :class="result.logs.length - 1 == index && result.is_completed ? 'bg-green-600' : 'bg-[#8f00ff]'"
          >
            <CheckSvg v-if="result.logs.length - 1 == index && result.is_completed" />
            <label v-else>
              {{ index + 1 }}
            </label>
          </span>
        </div>
        <div class="font-bold text-lg uppercase">
          {{ log.status }}
        </div>
        <div>
          {{ log.formatted }}
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import CheckSvg from '@/components/icons/CheckSvg.vue'

const props = defineProps({
  result: {
    type: Object,
    required: false
  }
})
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.7s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
