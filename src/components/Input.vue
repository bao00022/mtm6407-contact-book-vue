<script setup>
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div class="field">
    <label class="field-label" :for="name">{{ label }}</label>
    <input
      :id="name"
      :name="name"
      class="field-input"
      :value="props.modelValue"
      v-bind="$attrs"
      @input="handleInput"
    />
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.field-label {
  font-weight: 700;
  color: #1f2937;
}

.field-input {
  width: 100%;
  border: 1px solid #d1d5db;
  background: #f3f4f6;
  border-radius: 0.65rem;
  padding: 0.7rem 0.9rem;
  font-size: 0.98rem;
  color: #111827;
}

.field-input:focus {
  outline: 2px solid #93c5fd;
  border-color: #60a5fa;
  background: #ffffff;
}
</style>
