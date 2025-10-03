<script setup lang="ts">
import type { Horse } from "../types";
defineProps<{ horses: Horse[] }>();
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 col-span-1">
    <h2 class="text-xl font-bold mb-4 text-gray-800">At Listesi ({{ horses.length }})</h2>
    <div class="grid grid-cols-1 sm:grid-cols-1 gap-3">
      <div v-for="horse in horses" :key="horse.id" class="flex items-center gap-2 p-2 bg-gray-50 rounded">
        <div class="w-6 h-6 rounded-full flex-shrink-0 text-center border border-black" :style="{ backgroundColor: horse.color }">{{ horse.id }}</div>
        <div class="min-w-0">
          <div class="text-sm font-medium truncate">{{ horse.name }}</div>
          <div class="text-xs text-gray-500">Kondisyon: {{ horse.condition }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
