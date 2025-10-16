import { defineStore } from 'pinia'
//собственные кастомные типы данных
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

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export const useAccountsStore = defineStore('accounts', {
  //начальное состояние
  state: () => ({
    accounts: [
      {
        id: uid(),
        label: [
          {
            text: '',
          },
        ],
        type: 'local' as AccountType,
        login: 'чувырла',
        password: '',
      },
    ],
  }),
  actions: {
    remove(id: string) {
      this.accounts = this.accounts.filter((a) => a.id !== id)
    },
    addEmpty: function () {
      this.accounts.push({
        id: uid(),
        label: [],
        login: '',
        password: '',
        type: undefined,
      })
    },
  },
})
