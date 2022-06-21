<template>
  <div>
    <user-form
      :all-users="allUsers"
      @add-user="recursiveSearchByIdAndPush($event)"/>
    <v-card
      class="d-flex flex-column pa-0 mt-6 table"
      outlined
      tile
    >
      <div class="d-flex flex-row wrap">
        <div
          class="flex-grow-1 flex-shrink-0 header-table pl-10"
          @click="changeSortParameter({prop: 'name'})">Имя
        </div>
        <div
          class="flex-grow-0 flex-shrink-0 pl-10  pr-15 header-table"
          @click="changeSortParameter({prop: 'phone'})">Телефон
        </div>
      </div>
      <list-of-users :users="sortedUsers"/>
    </v-card>
  </div>
</template>


<script>
import UserForm from './UserForm'
import ListOfUsers from './ListOfUsers'

export default {
  name: 'UsersList',
  components: {
    ListOfUsers,
    UserForm
  },
  data: () => ({
    users: [],
    sortParameter: {
      prop: null,
      typeSort: null,
    },
  }),
  computed: {
    allUsers () {
      return this.recursiveSearchAllUsers(this.users)
    },
    sortedUsers () {
      if (this.sortParameter.prop === null || this.sortParameter.typeSort === null) return this.users
      return this.recursiveSortUsers(this.sortParameter)
    },
  },
  created () {
    this.getDataFromLocalStorage()
  },
  updated () {
    this.saveDataToLocalStorage()
  },
  methods: {
    recursiveSearchAllUsers (users, allUsers = []) {
      users.forEach(user => {
        allUsers.push({
          name: user.name,
          id: user.id,
          phone: user.phone,
        })
        if (user.employees && user.employees.length > 0) this.recursiveSearchAllUsers(user.employees, allUsers)
      })
      return allUsers
    },
    recursiveSearchByIdAndPush ({id, name, phone, boss}, users = this.users) {
      const newUser = {
        phone,
        name,
        id,
        boss,
        employees: [],
      }
      if (!boss) {
        this.users.push(newUser)
        return
      }
      let bossIndex = users.findIndex((user) => user.id === boss.id)
      if (bossIndex > -1) {
        users[bossIndex].employees.push(newUser)
        return
      }
      users.forEach(user => {
        this.recursiveSearchByIdAndPush({id, name, phone, boss}, user.employees)
      })
    },
    saveDataToLocalStorage () {
      localStorage.setItem('users', JSON.stringify(this.users))
    },
    getDataFromLocalStorage () {
      this.users = JSON.parse(localStorage.getItem('users') || [])
    },
    changeSortParameter ({prop}) {
      this.sortParameter.prop = prop
      switch (this.sortParameter.typeSort) {
        case null:
          this.sortParameter.typeSort = 'increase'
          break
        case 'increase':
          this.sortParameter.typeSort = 'decrease'
          break
        case 'decrease':
          this.sortParameter.typeSort = 'increase'
          break
      }
    },
    recursiveSortUsers ({typeSort, prop}, users = this.users) {
      const sortedUpLevelUsers = this.sortUsers(typeSort, prop, users)
      sortedUpLevelUsers.forEach(user => {
          if (user.employees.length > 1) user.employees = this.recursiveSortUsers({typeSort, prop}, user.employees)
        }
      )
      return sortedUpLevelUsers
    },
    sortUsers (typeSort, prop, users) {
      if (typeSort === 'increase') {
        return users.sort((a, b) => {
          if (a[prop] < b[prop]) return -1
        })
      }
      if (typeSort === 'decrease') {
        return users.sort((a, b) => {
          if (a[prop] > b[prop]) return -1
        })
      }
    }
  },
}
</script>

<style scoped>
.header-table {
  border: 1px solid grey;
  border-bottom: none;
  background-color: burlywood;
  flex-basis: 50%;
}

.header-table:nth-child(2) {
  border-left: none;
}
</style>
