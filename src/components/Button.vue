<script setup>
import { computed } from "vue";
import { Plus, Pencil, Trash2, Check, X } from "lucide-vue-next";

const props = defineProps({
  type: {
    type: String,
    default: "done",
  },
});

const iconMap = {
  add: { icon: Plus, className: "btn-add" },
  edit: { icon: Pencil, className: "btn-edit" },
  delete: { icon: Trash2, className: "btn-delete" },
  cancel: { icon: X, className: "btn-cancel" },
  done: { icon: Check, className: "btn-done" },
};

const config = computed(() => iconMap[props.type] || iconMap.done);
</script>

<template>
  <button class="icon-btn" :class="config.className" v-bind="$attrs">
    <component :is="config.icon" :size="16" />
  </button>
</template>

<style scoped>
.icon-btn {
  border: none;
  border-radius: 0.6rem;
  padding: 0.45rem;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon-btn:hover {
  filter: brightness(1.2);
}

.btn-add {
  background: #4f46e5;
}

.btn-edit {
  background: #2563eb;
}

.btn-delete {
  background: #ef4444;
}

.btn-cancel {
  background: #6b7280;
}

.btn-done {
  background: #22c55e;
}
</style>
