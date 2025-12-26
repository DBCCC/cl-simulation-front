<template>
  <div v-if="open" class="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" @click.self="$emit('close')">
    <div class="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
      <h3 class="text-base font-semibold">Edit Match {{ match?.id }}</h3>
      <p class="mt-1 text-sm text-slate-600">
        {{ teamName(match?.homeTeamId) }} vs {{ teamName(match?.awayTeamId) }}
      </p>

      <div class="mt-4 grid grid-cols-2 gap-3">
        <div>
          <label class="mb-1 block text-xs font-medium text-slate-600">Home Goals</label>
          <input
            class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm"
            type="number" min="0" max="20"
            v-model.number="home"
          />
        </div>
        <div>
          <label class="mb-1 block text-xs font-medium text-slate-600">Away Goals</label>
          <input
            class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm"
            type="number" min="0" max="20"
            v-model.number="away"
          />
        </div>
      </div>

      <div class="mt-4 flex justify-end gap-2">
        <button class="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-200" @click="$emit('close')">
          Cancel
        </button>
        <button
          class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
          :disabled="loading"
          @click="$emit('save', { matchId: match.id, homeGoals: home, awayGoals: away })"
        >
          Save
        </button>
      </div>

      <div v-if="error" class="mt-3 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  open: Boolean,
  match: Object,
  loading: Boolean,
  error: String,
  teamName: { type: Function, required: true },
});
defineEmits(["close", "save"]);

const home = ref(0);
const away = ref(0);

watch(
  () => props.match,
  (m) => {
    home.value = m?.homeGoals ?? 0;
    away.value = m?.awayGoals ?? 0;
  },
  { immediate: true }
);
</script>
