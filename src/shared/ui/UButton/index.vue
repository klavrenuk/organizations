<template>
  <button
    class="button"
    :class="[
      `button--${variant}`,
      { 'button--disabled': disabled },
      { 'button--loading': loading }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="!loading" class="button__content">
      <slot />
    </span>
    <span v-else class="button__loader">⏳</span>
  </button>
</template>

<script setup lang="ts">
export interface ButtonProps {
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: opacity 0.2s;
}

.button--primary {
  background-color: #1890ff;
  color: white;
}

.button--secondary {
  background-color: #f0f0f0;
  color: #333;
}

.button--disabled,
.button--loading {
  opacity: 0.6;
  cursor: not-allowed;
}

.button__loader {
  display: inline-block;
}
</style>
