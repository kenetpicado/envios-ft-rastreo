<template>
  <Transition>
    <div v-if="result" class="text-center max-w-xl">
      <div class="space-y-2 mb-8">
        <h5 class="text-3xl font-bold mb-4">
          {{ result.status }}
        </h5>
        <div v-if="result.search" class="font-bold">
          {{ result.search }}
        </div>
        <div>
          {{ result.date }}
        </div>
        <div class="font-bold">
          {{ result.track }}
        </div>
        <div>
          {{ result.guide }}
        </div>
        <div>
          {{ result.info }}
        </div>
      </div>
      <div v-if="result.history?.length > 0">
        <div v-for="(log, index) in result.history" class="mb-5" :key="index">
          <div class="flex flex-col items-center justify-center mb-2">
            <span
              class="font-bold flex items-center justify-center w-8 h-8 text-white rounded-full"
              :class="
                result.history.length - 1 == index && isCompleted ? 'bg-green-500' : 'bg-amber-400 '
              "
            >
              <CheckSvg v-if="result.history.length - 1 == index && isCompleted" />
              <label v-else>
                {{ index + 1 }}
              </label>
            </span>
          </div>
          <div class="font-bold text-lg uppercase">
            {{ dictionary[log.title] ?? log.title }}
          </div>
          <div>
            {{ log.date }}
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { dictionary } from '@/utils/dictionary'
import CheckSvg from '@/components/icons/CheckSvg.vue'
import { computed } from 'vue'

const props = defineProps({
  result: {
    type: Object,
    required: false
  }
})

const isCompleted = computed(() => props.result?.image.includes('status_4'))
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
