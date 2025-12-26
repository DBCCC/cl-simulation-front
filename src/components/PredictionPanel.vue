<template>
  <section v-if="prediction" class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <h2 class="text-base font-semibold">Prediction</h2>


    <div v-for="row in sortedPrediction" :key="row.teamId" class="flex items-center justify-between py-2 border-b-1 border mt-2 p-3">
  <div class="font-medium">{{ store.teamName(row.teamId) }}</div>
  <div class="text-sm tabular-nums">{{ row.pct }}%</div>
</div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useLeagueStore } from "../composables/useLeagueStore";

const store = useLeagueStore();
defineProps({
  teams: { type: Array, default: () => [] },
  prediction: { type: Object, default: null },
});

const sortedPrediction = computed(() => {
  const pred = store.state.league?.prediction || {};
  return Object.entries(pred)
    .map(([teamId, pct]) => ({ teamId, pct: Number(pct) || 0 }))
    .sort((a, b) => b.pct - a.pct);
});
</script>
