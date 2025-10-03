<script setup lang="ts">
import type { Round } from "../types";
defineProps<{ round: Round; progress: Record<number, number> }>();
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 class="text-xl font-bold mb-4 text-gray-800">Raund {{ round.round }} - {{ round.distance }}m</h2>
    <div class="space-y-2">
      <div v-for="horse, index in round.horses" :key="horse.id" class="relative">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-sm font-medium">{{ index + 1 }}. Kulvar</span>
        </div>
        <div class="relative bg-gray-200 h-8 rounded-full overflow-hidden">
          <div
            class="absolute top-0 left-0 h-full transition-all duration-100 ease-linear flex items-center justify-end pr-2"
            :style="{ width: (progress[horse.id] || 0) + '%' }"
          >
            <span class="text-black font-bold">
              <div class="w-6 h-6 rounded-full text-center" :style="{ backgroundColor: horse.color }">{{ horse.id }}</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
