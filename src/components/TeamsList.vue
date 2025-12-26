<template>

  <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <h2 class="text-base font-semibold">Teams</h2>

    <div class="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
      <div
        v-for="t in teams"
        :key="t.id"
        class="rounded-2xl border border-slate-200 p-3"
      >
        <!-- Header -->
        <div class="flex items-center justify-between">
          <div class="font-semibold">
            <template v-if="editingId !== t.id">
              {{ t.name }}
            </template>
            <input
              v-else
              v-model="draft.name"
              class="rounded-lg border px-2 py-1 text-sm"
            />
          </div>

          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-500">#{{ t.id }}</span>

            <button
              v-if="editingId !== t.id"
              @click="startEdit(t)"
              class="text-xs text-blue-600 hover:underline"
            >
              Edit
            </button>
          </div>
        </div>

        <!-- Power -->
        <div class="mt-2 text-sm text-slate-700">
          Power:
          <template v-if="editingId !== t.id">
            <span class="font-semibold">{{ t.power }}</span>
          </template>
          <input
            v-else
            type="number"
            min="1"
            max="100"
            v-model.number="draft.power"
            class="ml-2 w-20 rounded-lg border px-2 py-1 text-sm"
          />
        </div>

        <!-- Actions -->
        <div v-if="editingId === t.id" class="mt-3 flex gap-2">
          <button
            @click="save(t.id)"
            class="rounded-lg bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
          >
            Save
          </button>
          <button
            @click="cancel"
            class="rounded-lg border px-3 py-1 text-xs hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useLeagueStore } from "../composables/useLeagueStore";

defineProps({
  teams: { type: Array, default: () => [] },
});

const store = useLeagueStore();

const editingId = ref(null);
const draft = ref({ name: "", power: 0 });

function startEdit(team) {
  editingId.value = team.id;
  draft.value = {
    name: team.name,
    power: team.power,
  };
}

async function save(teamId) {
  await store.updateTeam(teamId, {
    name: draft.value.name,
    power: draft.value.power,
  });
  editingId.value = null;
}

function cancel() {
  editingId.value = null;
}
</script>
