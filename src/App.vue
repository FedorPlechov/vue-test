<template>
  <v-app>
    <v-main>
      <v-container>
        <users-table/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import UsersTable from './components/UsersTable'

export default {
  name: 'App',
  components: {
    UsersTable
  },

  data: () => ({
    //
  }),
}
</script>
