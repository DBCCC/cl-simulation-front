<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 w-full">
    <div class="w-full px-6 py-4">
      <HeaderBar
        title="Fixture"
        subtitle="Step 2: Review the full schedule, then start the simulation."
      >
        <button
          class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-50 disabled:opacity-60"
          @click="back"
          :disabled="store.state.loading"
        >
          Back
        </button>

        <button
          class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
          @click="start"
          :disabled="store.state.loading"
        >
          Start Simulation
        </button>
      </HeaderBar>

      <div v-if="store.state.error" class="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
        {{ store.state.error }}
      </div>

      <FixtureWeeks :weeks="store.state.weeks ?? {}" :teamName="store.teamName" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useLeagueStore } from "../composables/useLeagueStore";
import HeaderBar from "../components/HeaderBar.vue";
import FixtureWeeks from "../components/FixtureWeeks.vue";

const router = useRouter();
const store = useLeagueStore();

function back() {
  router.push("/");
}
function start() {
  router.push("/simulation");
}

onMounted(async () => {
  if (!store.state.league) await store.refreshLeague();
  if (!store.state.weeks) await store.refreshWeeks();
});
</script>
