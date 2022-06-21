<template>
  <v-container class="pa-0 main-container">
    <div
      v-for="(user, index) in users"
      :key="user.id">
      <div
        class="d-flex flex-row wrap pl-0 ml-0"
      >
        <div
          :style="{marginLeft: paddingLeftForSubLevel}"
          class="flex-grow-1 flex-shrink-0 pl-10 name"><span
          v-if="user.employees && user.employees.length > 0 || level>0">+ </span>{{ user.name }}
        </div>
        <div
          class="flex-grow-0 flex-shrink-0 pl-10  pr-15 phone">{{ user.phone }}
        </div>

      </div>
      <template v-if="user.employees && user.employees.length > 0">
        <list-of-users
          :key="index"
          :level="level+1"
          :users="user.employees"/>
      </template>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'ListOfUsers',
  props: {
    users: {
      type: Array,
      required: true
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({}),
  computed: {
    paddingLeftForSubLevel () {
      return this.level * 20 + 'px'
    },
    isSubLevel () {
      return this.level > 0
    },
  },

}
</script>

<style>
.name {
  border: 1px solid grey;
  border-left: 1.5px solid grey;
}

.phone {
  border: 1px solid grey;
  flex-basis: 50%
}

</style>
