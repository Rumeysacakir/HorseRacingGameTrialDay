<script setup lang="ts">
import type { Round } from "../types";
defineProps<{ schedule: Round[] }>();
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 col-span-2">
    <h2 class="text-xl font-bold mb-4 text-gray-800">Yarış Programı</h2>
    <div v-if="schedule.length === 0">
      <p class="text-gray-500">Program oluşturmak için "Program Oluştur" butonuna tıklayın</p>
    </div>
    <div v-else class="space-y-3">
      <div v-for="round in schedule" :key="round.round" class="border border-gray-200 rounded p-3">
        <div class="font-semibold text-gray-800 mb-2">Raund {{ round.round }} - {{ round.distance }}m</div>
        <div class="flex flex-wrap gap-1 justify-between">
          <div
            v-for="horse in round.horses"
            :key="horse.id"
            class="w-6 h-6 rounded-full text-center border border-black flex-shrink-0"
            :style="{ backgroundColor: horse.color }"
            :title="horse.name"
          >{{ horse.id }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
