<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
    <h2 class="mb-3 text-base font-semibold">Standings</h2>

    <div class="overflow-x-auto">
      <table class="w-full min-w-[720px] text-sm">
        <thead class="text-left text-slate-600">
          <tr class="border-b border-slate-200">
            <th class="py-2 pr-2">#</th>
            <th class="py-2 pr-2">Team</th>
            <th class="py-2 pr-2">P</th>
            <th class="py-2 pr-2">W</th>
            <th class="py-2 pr-2">D</th>
            <th class="py-2 pr-2">L</th>
            <th class="py-2 pr-2">GF</th>
            <th class="py-2 pr-2">GA</th>
            <th class="py-2 pr-2">GD</th>
            <th class="py-2 pr-2">Pts</th>
            <th v-if="prediction" class="py-2 pr-2">Champ%</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(r, idx) in standings" :key="r.teamId" class="border-b border-slate-100">
            <td class="py-2 pr-2 text-slate-700">{{ idx + 1 }}</td>
            <td class="py-2 pr-2 font-semibold">{{ r.teamName }}</td>
            <td class="py-2 pr-2">{{ r.played }}</td>
            <td class="py-2 pr-2">{{ r.win }}</td>
            <td class="py-2 pr-2">{{ r.draw }}</td>
            <td class="py-2 pr-2">{{ r.loss }}</td>
            <td class="py-2 pr-2">{{ r.gf }}</td>
            <td class="py-2 pr-2">{{ r.ga }}</td>
            <td class="py-2 pr-2">{{ r.gd }}</td>
            <td class="py-2 pr-2 font-semibold">{{ r.points }}</td>
            <td v-if="prediction" class="py-2 pr-2">{{ prediction[r.teamId] ?? 0 }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
defineProps({
  standings: { type: Array, default: () => [] },
  prediction: { type: Object, default: null },
});
</script>
