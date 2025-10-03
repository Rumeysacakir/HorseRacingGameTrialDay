<script setup lang="ts">
import type { RoundResult } from "../types";
const props = defineProps<{ results: RoundResult[] }>();

function medalClass(position: number) {
  if (position === 1) return "bg-yellow-500";
  if (position === 2) return "bg-gray-400";
  if (position === 3) return "bg-amber-700";
  return "bg-gray-500";
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 min-h-full">
    <h2 class="text-xl font-bold mb-4 text-gray-800">Yarış Sonuçları</h2>
    <div v-if="results.length === 0">
      <p class="text-gray-500">Sonuçlar yarışlar tamamlandıktan sonra burada görünecek</p>
    </div>
    <div v-else class="overflow-y-auto grid grid-cols-3 sm:grid-cols-3 gap-3">
      <div v-for="(result, idx) in results" :key="idx" class="border border-gray-200 rounded p-4">
        <div class="font-semibold text-gray-800 mb-3">Raund {{ result.round }} - {{ result.distance }}m</div>
        <div class="space-y-2">
          <div v-for="pos in result.positions" :key="pos.position" class="flex items-center gap-3">
            <div :class="'w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ' + medalClass(pos.position)">
              {{ pos.position }}
            </div>
            <div class="w-5 h-5 rounded-full" :style="{ backgroundColor: pos.color }"></div>
            <div class="flex-1">
              <div class="font-medium">{{ pos.horse }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
