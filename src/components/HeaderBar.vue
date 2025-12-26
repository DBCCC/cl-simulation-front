<template>
  <div class="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
    <div>
      <h1 class="text-xl font-bold">{{ title }}</h1>
      <p v-if="subtitle" class="mt-1 text-sm text-slate-600">{{ subtitle }}</p>
    </div>

    <div class="flex flex-wrap gap-2">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
});
</script>
