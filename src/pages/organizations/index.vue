<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { fetchOrganizations } from '@/entities/organization/model/organizationApi'

import type { Organization} from '@/entities/organization/model/types.ts'

import ULoader from '@/shared/ui/ULoader.vue'
import UButton from '@/shared/ui/UButton.vue'

const organizations = ref<Organization[]>([])
const isLoading = ref<boolean>(true)

const organizationFormatted = computed(() => {
  return organizations.value.slice(0,3)
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
      <div>
        table - {{ organizationFormatted }}
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
