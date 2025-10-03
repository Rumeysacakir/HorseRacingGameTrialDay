<template>
  <div class="p-4">
    <div class="mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">At Yarış Oyunu</h1>
      </div>

      <div class="flex flex-wrap gap-3 justify-center mb-6">
        <button
          @click="onGenerateSchedule"
          :disabled="isRacing || horses.length === 0"
          class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Program Oluştur
        </button>
        <button
          @click="onStartRace"
          :disabled="isRacing || schedule.length === 0"
          class="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Yarışı Başlat
        </button>
        <button
          @click="onReset"
          :disabled="isRacing"
          class="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Sıfırla
        </button>
      </div>

      <div class="grid lg:grid-cols-6 sm:grid-cols-1 xs:grid-cols-1 gap-6 mb-6">
        <HorseList :horses="horses" />
        <div class="col-span-3">
          <RaceTrack 
            v-if="isRacing && currentRoundData"
            :round="currentRoundData"
            :progress="raceProgress"
          />
          <RaceResults :results="results" />
        </div>
        <RaceSchedule :schedule="schedule" />
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRaceStore } from "./stores/race";
import HorseList from "./components/HorseList.vue";
import RaceSchedule from "./components/RaceSchedule.vue";
import RaceTrack from "./components/RaceTrack.vue";
import RaceResults from "./components/RaceResults.vue";

const store = useRaceStore();

onMounted(() => {
  store.generateHorses();
});

const horses = computed(() => store.horses);
const schedule = computed(() => store.schedule);
const isRacing = computed(() => store.isRacing);
const results = computed(() => store.results);
const raceProgress = computed(() => store.raceProgress);
const currentRoundData = computed(() => store.currentRoundData);

const onGenerateSchedule = () => store.generateSchedule();
const onStartRace = () => store.startRace();
const onReset = () => store.reset();
</script>
