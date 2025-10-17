<script setup lang="ts">
import { NForm, NFormItem, NFlex, NCard, NThing, NAlert, NInput, NSelect, NIcon } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useAccountsStore, type AccountLabel, type AccountType } from '@/stores/accounts'
import { watch, reactive, onMounted } from 'vue'

const typeOptions = [
  { label: 'Локальная', value: 'local' },
  { label: 'LDAP', value: 'ldap' },
]

const rules = {
  login: [{ required: true, message: 'Введите логин', trigger: 'blur' }],
  password: [{ required: true, message: 'Введите пароль', trigger: 'blur' }],
}

const store = useAccountsStore()
const { accounts } = storeToRefs(store)
// Локальные текстовые метки: reactive делает объект реактивным,
// Record<string, string> описывает объект "строка → строка"
const labelTexts = reactive<Record<string, string>>({})

// следим за изменениями массива accounts
watch(
  () => store.accounts,
  (val) => {
    localStorage.setItem('accounts', JSON.stringify(val))
  },
  { deep: true }
)
// при загрузке заполняем черновики текущими значениями
onMounted(() => {
  accounts.value.forEach((a) => {
    labelTexts[a.id] = formatLabelValue(a.label)
  })
})

function handleRemove(id: string) {
  store.remove(id)
}

function handleAdd() {
  store.addEmpty()
}

function handleUpdateType(id: string, value: AccountType) {
  const type = value as AccountType
  store.update(id, { type, password: value === 'ldap' ? null : '' })
}

function handleLabelUpdate(id:string, value: string ) {
  store.update(id, { label: parseLabelValue(value) })
}

function parseLabelValue(value: string): AccountLabel[] {
  return value
    .split(';')
    .map(token => token.trim())
    .filter(token => token.length > 0)
    .map(token => ({ text: token }))
}

function formatLabelValue(labels: AccountLabel[]): string {
  return labels.map(label => label.text).join(';')
}


</script>

<template>
  <n-card class="accounts__card">
    <n-flex class="accounts__toolbar" align="center">
      <n-thing class="accounts__heading" title="Учетные записи" />
      <n-button class="accounts__add-btn" size="large" type="default" @click="handleAdd()">
        <template #icon>
          <n-icon size="24">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="1em"
              height="1em"
              fill="currentColor"
            >
              <path
                d="M368.5 240H272v-96.5c0-8.8-7.2-16-16-16s-16 7.2-16 16V240h-96.5c-8.8 0-16 7.2-16 16 0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7H240v96.5c0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7 8.8 0 16-7.2 16-16V272h96.5c8.8 0 16-7.2 16-16s-7.2-16-16-16z"
              />
            </svg>
          </n-icon>
        </template>
      </n-button>
    </n-flex>

    <n-alert class="accounts__alert" type="info" show-icon closable>
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </n-alert>

    <div class="accounts__table">
      <div class="accounts__table-header">
        <span class="accounts__th">Метки</span>
        <span class="accounts__th">Тип записи</span>
        <span class="accounts__th">Логин</span>
        <span class="accounts__th">Пароль</span>
        <span class="accounts__th" aria-hidden="true" />
      </div>
      <n-form
        autocomplete="off"
        :model="account"
        :rules="rules"
        label-placement="top"
        v-for="account in accounts"
        :key="account.id"
        class="accounts__row"
      >
        <n-input
          v-model:value="labelTexts[account.id]"
          :value="formatLabelValue(account.label)"
          maxlength="50"
          placeholder="Метки"
          @blur="() => handleLabelUpdate(account.id, labelTexts[account.id])"
        />
        <n-select v-model:value="account.type" :options="typeOptions" @update:value ="(value) => handleUpdateType(account.id, value)" />
        <n-form-item label="Логин" path="login">
          <n-input v-model:value="account.login" placeholder="Логин" maxlength="100" />
        </n-form-item>
        <n-form-item label="Пароль" path="password" v-if="account.type === 'local'">
          <n-input
            v-model:value="account.password"
            type="password"
            placeholder="Пароль"
            maxlength="100"
          />
        </n-form-item>
        <div class="actions__cell">
          <n-icon class="accounts__icon" size="24" @click="handleRemove(account.id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 16 16"
            >
              <g fill="none">
                <path
                  d="M6.5 7v4a.5.5 0 0 0 1 0V7a.5.5 0 0 0-1 0zM9 6.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zM10 4h3a.5.5 0 0 1 0 1h-.553l-.752 6.776A2.5 2.5 0 0 1 9.21 14H6.79a2.5 2.5 0 0 1-2.485-2.224L3.552 5H3a.5.5 0 0 1 0-1h3a2 2 0 1 1 4 0zM8 3a1 1 0 0 0-1 1h2a1 1 0 0 0-1-1zM4.559 5l.74 6.666A1.5 1.5 0 0 0 6.79 13h2.42a1.5 1.5 0 0 0 1.49-1.334L11.442 5H4.56z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </n-icon>
        </div>
      </n-form>
    </div>
  </n-card>
</template>

<style scoped>
.accounts__card {
  margin: 16px;
  width: auto;
}
.accounts__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.accounts__alert {
  margin-bottom: 16px;
}

.accounts__table {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.accounts__table-header,
.accounts__row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 25px;
  gap: 12px;
  align-items: center;
}

.accounts__row {
  padding: 12px;
  border: 1px solid rgba(224, 224, 230, 0.7);
  border-radius: 8px;
}

.accounts__table-header {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.6);
  padding: 0 4px;
}

.accounts__th {
  text-align: left;
  margin-left: 12px;
}

.accounts__password {
  min-height: 34px;
  display: flex;
  align-items: center;
}

.accounts__icon {
  opacity: 0.8;
  cursor: pointer;
}

.accounts__icon:hover {
  opacity: 1;
}

@media (max-width: 960px) {
  .accounts__table-header {
    display: none;
  }

  .accounts__table {
    gap: 16px;
  }

  .accounts__row {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
