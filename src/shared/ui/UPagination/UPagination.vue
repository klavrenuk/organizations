<!-- src/shared/ui/Pagination.vue -->
<template>
  <div class="pagination">
    <button
      class="pagination__btn"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      ←
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      class="pagination__btn"
      :class="{ 'pagination__btn--active': page === currentPage }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <button
      class="pagination__btn"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      →
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface PaginationProps {
  currentPage: number
  totalPages: number
}

const props = defineProps<PaginationProps>()
const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
}>()

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page)
  }
}

const visiblePages = computed(() => {
  const delta = 2 // сколько страниц до/после текущей
  const range = []

  for (
    let i = Math.max(1, props.currentPage - delta);
    i <= Math.min(props.totalPages, props.currentPage + delta);
    i++
  ) {
    range.push(i)
  }

  if (range[0] !== 1) {
    range.unshift(1)
    if (range[1] !== 2) range.unshift(-1) // маркер "..."
  }

  if (range[range.length - 1] !== props.totalPages) {
    if (range[range.length - 1] !== props.totalPages - 1) {
      range.push(-1)
    }
    range.push(props.totalPages)
  }

  return range
})
</script>

<style scoped>
.pagination {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 20px;
}

.pagination__btn {
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.pagination__btn:hover:not(:disabled) {
  background: #f0f0f0;
}

.pagination__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination__btn--active {
  background: #1890ff;
  color: white;
  border-color: #1890ff;
}
</style>
