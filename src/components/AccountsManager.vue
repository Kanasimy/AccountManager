<script setup lang="ts">
import {
  NFlex,
  NCard,
  NThing,
  NAlert
} from 'naive-ui'

</script>

<template>
  <n-card class="accounts__card">
    <n-flex class="accounts__toolbar" align="center">
      <n-thing class="accounts__heading" title="Учетные записи"/>
      <n-button class="accounts__add-btn" size="large" type="default">+</n-button>

    </n-flex>

    <n-alert class="accounts__alert" type="info" show-icon closable>
      Для указания нескольких меток для одной пары логин/пароль используйте
      разделитель ;
    </n-alert>
  </n-card>
</template>

<style scoped>
.accounts__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
</style>
