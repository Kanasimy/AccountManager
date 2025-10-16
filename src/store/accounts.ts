import { defineStore } from 'pinia'
//собственный кастомные типы данных
export type AccountType = 'local' | 'ldap'

export interface AccountLabel {
  text: string
}

export interface Account {
  id: string
  label: AccountLabel[]
  type: AccountType
  login: string
  password: string | null
}

export const useAccountsStore = defineStore('accounts', {
  //начальное состояние
  state: () => ({
    accounts: [
      {
        id: 'uid()',
        label: [
          {
            text: '',
          },
        ],
        type: 'local' as AccountType,
        login: '',
        password: '',
      },
    ],
  }),
  actions: {},
})
