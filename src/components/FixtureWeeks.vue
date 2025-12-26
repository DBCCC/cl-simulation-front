<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <h2 class="text-base font-semibold">Fixture</h2>

    <div class="mt-4 flex flex-wrap gap-3">
      <div v-for="w in orderedWeeks" :key="w" class="rounded-2xl border border-slate-200 p-3 md:min-w-[500px] flex-1">
        <div class="mb-2 text-sm font-semibold">Week {{ w }}</div>

        <div class="space-y-2">
          <div
            v-for="m in weeks[w]"
            :key="m.id"
            class="flex items-center justify-between rounded-xl border border-slate-200 p-2 text-sm"
          >
            <div class="text-slate-700">
              <span class="font-semibold">{{ teamName(m.homeTeamId) }}</span>
              <span class="mx-2 text-slate-500">vs</span>
              <span class="font-semibold">{{ teamName(m.awayTeamId) }}</span>
            </div>
            <div class="text-xs text-slate-500">#{{ m.id }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  weeks: { type: Object, default: () => ({}) },
  teamName: { type: Function, required: true },
});

const orderedWeeks = computed(() =>
  Object.keys(props.weeks)
    .map((x) => Number(x))
    .sort((a, b) => a - b)
);
</script>
