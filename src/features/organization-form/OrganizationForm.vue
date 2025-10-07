<template>
  <form @submit.prevent="onSubmit" class="organization-form">
    <div class="form-group">
      <label for="name" class="form-label">Название</label>
      <UInput
        id="name"
        v-model="form.name"
        :error="!!errors.name"
        placeholder="ООО Ромашка"
      />
      <span v-if="errors.name" class="form-error">{{ errors.name }}</span>
    </div>

    <div class="form-group">
      <label for="director" class="form-label">ФИО директора</label>
      <UInput
        id="director"
        v-model="form.director"
        :error="!!errors.director"
        placeholder="Иванов И.И."
      />
      <span v-if="errors.director" class="form-error">{{ errors.director }}</span>
    </div>

    <div class="form-group">
      <label for="phone" class="form-label">Номер телефона</label>
      <UInput
        id="phone"
        v-model="form.phone"
        :error="!!errors.phone"
        placeholder="+7 000 123 45 67"
      />
      <span v-if="errors.phone" class="form-error">{{ errors.phone }}</span>
    </div>

    <h3 class="form-section-title">Адрес</h3>

    <div class="form-group">
      <label for="city" class="form-label">Город</label>
      <UInput
        id="city"
        v-model="form.city"
        :error="!!errors.city"
        placeholder="Москва"
      />
      <span v-if="errors.city" class="form-error">{{ errors.city }}</span>
    </div>

    <div class="form-group">
      <label for="street" class="form-label">Улица</label>
      <UInput
        id="street"
        v-model="form.street"
        :error="!!errors.street"
        placeholder="Ленина"
      />
      <span v-if="errors.street" class="form-error">{{ errors.street }}</span>
    </div>

    <div class="form-group">
      <label for="house" class="form-label">Дом</label>
      <UInput
        id="house"
        v-model="form.house"
        :error="!!errors.house"
        placeholder="10"
      />
      <span v-if="errors.house" class="form-error">{{ errors.house }}</span>
    </div>

    <div class="form-actions">
      <UButton
        type="submit"
        variant="primary"
        :disabled="!isFormValid"
      >
        {{ isEditing ? 'Сохранить' : 'Добавить' }}
      </UButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'

import type { Organization } from '@/entities/organization/model/types.ts'

import { UInput } from '@/shared/ui'
import { UButton } from '@/shared/ui'

const props = defineProps<{
  organization?: Organization
}>()

const emit = defineEmits<{
  (e: 'submit', data: FormData): void
  (e: 'cancel'): void
}>()

interface FormData {
  name: string
  director: string
  phone: string
  city: string
  street: string
  house: string
}

const form = reactive<FormData>({
  name: '',
  director: '',
  phone: '',
  city: '',
  street: '',
  house: ''
})

const isEditing = computed(() => !!props.organization)

// Валидация
const errors = computed(() => {
  const errs: Record<keyof FormData, string> = {
    name: '',
    director: '',
    phone: '',
    city: '',
    street: '',
    house: ''
  }

  if (!form.name.trim()) errs.name = 'Обязательное поле'
  if (!form.director.trim()) errs.director = 'Обязательное поле'
  if (!form.phone.trim()) errs.phone = 'Обязательное поле'
  if (!form.city.trim()) errs.city = 'Обязательное поле'
  if (!form.street.trim()) errs.street = 'Обязательное поле'
  if (!form.house.trim()) errs.house = 'Обязательное поле'

  return errs
})

const isFormValid = computed(() => {
  return Object.values(errors.value).every(error => error === '')
})

// Заполнение формы при редактировании
onMounted(() => {
  if (props.organization) {
    const addr = parseAddress(props.organization.address)
    form.name = props.organization.name
    form.director = props.organization.director
    form.phone = props.organization.phone
    form.city = addr.city
    form.street = addr.street
    form.house = addr.house
  }
})

const onSubmit = () => {
  if (isFormValid.value) {
    emit('submit', { ...form })
  }
}

// Вспомогательная функция для разбора адреса (если address — строка)
function parseAddress(addressStr: string) {
  // Формат: "г. Москва, ул. Ленина, д. 1"
  const clean = (s: string) => s.replace(/^[гулд]\.\s*/, '')
  const parts = addressStr.split(', ').map(clean)
  return {
    city: parts[0] || '',
    street: parts[1] || '',
    house: parts[2] || ''
  }
}
</script>

<style scoped>
.organization-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-section-title {
  margin: 20px 0 12px;
  font-size: 16px;
  color: #333;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-weight: 500;
  color: #333;
}

.form-error {
  color: #ff4d4f;
  font-size: 12px;
}

.form-actions {
  margin-top: 16px;
}
</style>
