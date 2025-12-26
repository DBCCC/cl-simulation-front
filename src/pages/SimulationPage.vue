<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 w-full">
    <div class="w-full px-6 py-4">
      <HeaderBar
        title="Simulation"
        :subtitle="`Current week: ${store.state.league?.currentWeek ?? '-'}${store.state.league?.prediction ? ' (Prediction active)' : ''}`"
      >
        <button
          class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-50 disabled:opacity-60"
          @click="toFixture"
          :disabled="store.state.loading"
        >
          Back to Fixture
        </button>

        <button
          class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-50 disabled:opacity-60"
          @click="reset"
          :disabled="store.state.loading"
        >
          Reset
        </button>

        <button
          class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
          @click="playNext"
          :disabled="store.state.loading"
        >
          Play Next Week
        </button>

        <button
          class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
          @click="playAll"
          :disabled="store.state.loading"
        >
          Play All
        </button>
      </HeaderBar>

      <div v-if="store.state.error" class="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
        {{ store.state.error }}
      </div>

      <main class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StandingsTable
          :standings="store.state.league?.standings ?? []"
          :prediction="store.state.league?.prediction ?? null"
        />

        <MatchesWeek
          v-model="selectedWeek"
          :matches="weekMatches"
          :totalWeeks="totalWeeks"
          :loading="store.state.loading"
          :teamName="store.teamName"
          @edit="openEdit"
        />

        <PredictionPanel
          :teams="store.state.league?.teams ?? []"
          :prediction="store.state.league?.prediction ?? null"
        />
      </main>

      <EditMatchModal
        :open="edit.open"
        :match="edit.match"
        :loading="store.state.loading"
        :error="edit.error"
        :teamName="store.teamName"
        @close="closeEdit"
        @save="saveEdit"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useLeagueStore } from "../composables/useLeagueStore";

import HeaderBar from "../components/HeaderBar.vue";
import StandingsTable from "../components/StandingsTable.vue";
import MatchesWeek from "../components/MatchesWeek.vue";
import EditMatchModal from "../components/EditMatchModal.vue";
import PredictionPanel from "../components/PredictionPanel.vue";

const router = useRouter();
const store = useLeagueStore();

const selectedWeek = ref(1);
const edit = reactive({ open: false, match: null, error: "" });

const totalWeeks = computed(() => {
  const n = store.state.league?.teams?.length ?? 4;
  return (n - 1) * 2;
});

const weekMatches = computed(() => {
  const weeks = store.state.weeks ?? {};
  return weeks[selectedWeek.value] ?? [];
});

function toFixture() {
  router.push("/fixture");
}

async function reset() {
  await store.resetLeague();
  router.push('/')
  selectedWeek.value = 1;
}

async function playNext() {
  const w = store.state.league?.currentWeek ?? 1;
  await store.playWeek(w);
  selectedWeek.value = w;
}

async function playAll() {
  await store.playAll();
  selectedWeek.value = totalWeeks.value;
}

function openEdit(match) {
  edit.error = "";
  edit.open = true;
  edit.match = match;
}

function closeEdit() {
  edit.open = false;
  edit.match = null;
  edit.error = "";
}

async function saveEdit({ matchId, homeGoals, awayGoals }) {
  try {
    await store.editMatch(matchId, homeGoals, awayGoals);
    closeEdit();
  } catch (e) {
    edit.error = e.message;
  }
}

onMounted(async () => {
  if (!store.state.league) await store.refreshLeague();
  if (!store.state.weeks) await store.refreshWeeks();
  selectedWeek.value = 1;
});

watch(totalWeeks, (tw) => {
  if (selectedWeek.value > tw) selectedWeek.value = tw;
});
</script>
