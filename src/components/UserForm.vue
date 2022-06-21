<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="600px"
      persistent
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          class="mt-5"
          color="primary"
          dark
          v-on="on"
        >
          Добавить
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="flex-nowrap justify-space-between">
          <span class="text-h5 ">Добавление пользователя</span>
          <v-btn
            class="mx-2"
            color="primary"
            dark
            fab
            small
            @click="dialog = false"
          >
            <v-icon dark>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model.trim="user.name"
                  :rules="rulesForName"
                  label="Имя*"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-mask="'+7 ### ### ## ##'"
                  v-model.trim="user.phone"
                  :rules="rulesForPhone"
                  label="Телефон*"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  v-model="user.boss"
                  :items="allUsers"
                  item-text="name"
                  item-value="id"
                  label="Начальник"
                  return-object
                />
              </v-col>
            </v-row>
          </v-container>
          <small>*обязательные поля</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="blue darken-1"
            text
            @click="submitHandler"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'UserForm',
  props: {
    allUsers: {
      type: Array,
      required: true,
    },
  },
  emits: ['add-user'],
  data: () => ({
    user: {
      name: null,
      phone: null,
      boss: null,
    },
    dialog: false,
    rulesForName: [
      value => value ? !!value.trim() || 'Required' : 'Required',
    ],
    rulesForPhone: [
      value => value && value.length > 15 || ' 10 characters'
    ]
  }),
  computed: {
    isInvalidForm () {
      const {name, phone} = this.user
      if (!name) return true
      if (phone && phone.length !== 16) return true
      return false
    },
  },
  methods: {
    submitHandler () {
      if (this.isInvalidForm) return
      const id = Date.now()
      this.$emit('add-user', {...this.user, id})
      this.resetForm()
      this.dialog = false
    },
    resetForm () {
      this.user = {
        name: null,
        phone: null,
        boss: null,
      }
    }
  },

}
</script>

<style scoped>

</style>
