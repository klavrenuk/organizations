<template>
  <div class="table-wrapper">
    <table class="table">
      <thead v-if="headers.length > 0">
      <tr>
        <th
          v-for="(header, index) in headers"
          :key="index"
          class="table__header-cell"
        >
          {{ header.title }}
        </th>
      </tr>
      </thead>

      <tbody>
      <tr
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        class="table__row"
      >
        <td
          v-for="(cell, index) in headers"
          :key="cell.key"
          class="table__cell"
        >
          <div v-if="cell.key !== 'control'">
            {{ row[cell.key] }}
          </div>
          <div v-else>
            control
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <div v-if="rows.length === 0" class="table__empty">
      {{ emptyText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@/shared/ui/UTable/types.ts'

export interface TableProps {
  headers?: TableColumn[]
  rows: TableColumn[]
  emptyText?: string
}

withDefaults(defineProps<TableProps>(), {
  headers: () => [],
  emptyText: 'Нет данных'
})
</script>

<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  min-width: 400px;
}

.table__header-cell,
.table__cell {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.table__header-cell {
  background-color: #f9f9f9;
  font-weight: 600;
  color: #333;
}

.table__row:hover {
  background-color: #fafafa;
}

.table__empty {
  text-align: center;
  padding: 24px;
  color: #888;
  font-style: italic;
}
</style>
