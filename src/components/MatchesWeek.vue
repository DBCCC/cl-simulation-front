<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div class="mb-3 flex items-center justify-between gap-3">
      <h2 class="text-base font-semibold">Matches</h2>
      <div class="flex items-center gap-2">
        <span class="text-sm text-slate-600">Week:</span>
        <select
          class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm disabled:opacity-60"
          :disabled="loading"
          v-model.number="model"
        >
          <option v-for="w in totalWeeks" :key="w" :value="w">Week {{ w }}</option>
        </select>
      </div>
    </div>

    <p v-if="matches.length === 0" class="text-sm text-slate-600">No matches.</p>

    <div class="space-y-2">
      <div
        v-for="m in matches"
        :key="m.id"
        class="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 p-3"
      >
        <div>
          <div class="text-xs text-slate-500">#{{ m.id }}</div>
          <div class="mt-1 flex flex-wrap items-center gap-2 text-sm">
            <span class="font-semibold">{{ teamName(m.homeTeamId) }}</span>
            <span class="text-slate-500">vs</span>
            <span class="font-semibold">{{ teamName(m.awayTeamId) }}</span>
          </div>
        </div>

        <div class="min-w-[90px] text-center text-sm">
          <template v-if="m.played">
            <span class="font-semibold">{{ m.homeGoals }}</span>
            <span class="text-slate-500">:</span>
            <span class="font-semibold">{{ m.awayGoals }}</span>
          </template>
          <template v-else>
            <span class="text-slate-500">Not played</span>
          </template>
        </div>

        <button
          class="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-200"
          @click="$emit('edit', m)"
        >
          Edit
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const model = defineModel({ type: Number, required: true });

defineProps({
  matches: { type: Array, default: () => [] },
  totalWeeks: { type: Number, required: true },
  loading: { type: Boolean, default: false },
  teamName: { type: Function, required: true },
});
defineEmits(["edit"]);
</script>
