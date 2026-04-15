<script setup>
import { ChevronLeft } from "lucide-vue-next";
</script>

<template>
  <button class="back-btn" type="button" v-bind="$attrs">
    <ChevronLeft :size="16" />
  </button>
</template>

<style scoped>
.back-btn {
  border: 1px solid #d1d5db;
  background: #ffffff;
  color: #111827;
  border-radius: 0.6rem;
  padding: 0.45rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.back-btn:hover {
  background: #f3f4f6;
}
</style>
