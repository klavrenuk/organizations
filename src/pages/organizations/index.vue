<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { fetchOrganizations } from '@/entities/organization/model/organizationApi'

import type { Organization} from '@/entities/organization/model/types.ts'
import type { TableColumn } from '@/shared/ui/UTable/types.ts'

import ULoader from '@/shared/ui/ULoader/ULoader.vue'
import UButton from '@/shared/ui/UButton/UButton.vue'
import UPagination from '@/shared/ui/UPagination/UPagination.vue'
import UTable from '@/shared/ui/UTable/UTable.vue'

const itemsPerPage = 10
const tableHeaders:TableColumn[] = [
  {
    key: 'name',
    title: 'Название'
  },
  {
    key: 'director',
    title: 'Директор'
  },
  {
    key: 'phone',
    title: 'Телефон'
  },
  {
    key: 'address',
    title: 'Адрес'
  },
  {
    key: 'control',
    title: ''
  }
];

const organizations = ref<Organization[]>([])
const isLoading = ref<boolean>(true)
const currentPage = ref<number>(1)

const organizationFormatted = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return organizations.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(organizations.value.length / itemsPerPage)
})

const fetchOrg = async() => {
  try {
    isLoading.value = true
    organizations.value = await fetchOrganizations()

  } catch(err) {
    console.error(err)
    alert('Ошибка при получении данных')

  } finally {
    isLoading.value = false
  }
}

onMounted(() => fetchOrg())
</script>

<template>
  <div class="organizations">
    <div class="organizations__control">
      <div>Search</div>

      <UButton>Добавить</UButton>
    </div>

    <ULoader v-if="isLoading" />
    <div v-else>
      <div class="organizations__data">
        <UTable :rows="organizationFormatted" :headers="tableHeaders" />
        <UPagination :total="totalPages" :currentPage="currentPage" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.organizations {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__control {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
}
</style>
