<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 w-full">
    <div class="w-full px-6 py-4">
      <HeaderBar
        :title="'Insider One League'"
      >
        <button
          class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-50 disabled:opacity-60"
          @click="refresh"
          :disabled="store.state.loading"
        >
          Refresh
        </button>
      </HeaderBar>

      <div v-if="store.state.error" class="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
        {{ store.state.error }}
      </div>

      <TeamsList :teams="store.state.league?.teams ?? []" />

      <div class="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div>
          <div class="font-semibold">Generate Fixture</div>
        </div>

        <button
          class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
          @click="generate"
          :disabled="store.state.loading"
        >
          Generate Fixture
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useLeagueStore } from "../composables/useLeagueStore";
import HeaderBar from "../components/HeaderBar.vue";
import TeamsList from "../components/TeamsList.vue";

const router = useRouter();
const store = useLeagueStore();

async function refresh() {
  await store.refreshLeague();
}

async function generate() {
  await store.generateFixture();
  router.push("/fixture");
}

onMounted(async () => {
  if (!store.state.league) await store.refreshLeague();
});
</script>
