<template>
  <v-dialog v-model="dialog" max-width="600">
    <form
      class="flex flex-wrap justify-between sm:justify-center"
      @submit.prevent="submit"
    >
      <v-card>
        <v-card-title class="pa-7">
          {{ value.edit ? 'Upravit kontakt' : 'Nový kontakt' }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="value.contact.name"
                label="Jméno"
                outlined
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="value.contact.surname"
                label="Příjmení"
                outlined
              />
            </v-col>
          </v-row>
          <v-text-field v-model="value.contact.email" label="E-mail" outlined />
          <v-text-field
            v-model="value.contact.phone"
            label="Telefon"
            outlined
          />
          <v-textarea v-model="value.contact.address" label="Adresa" outlined />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            type="submit"
            height="40px"
            min-width="130px"
            color="primary"
            depressed
          >
            Uložit
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script>
export default {
  name: 'ContactForm',
  props: {
    value: {
      type: Object,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  created() {
    const model = this
    this.$eventBus.$on('dialog', function (dialog) {
      model.dialog = dialog
      if (!model.value.edit) {
        model.clearForm()
      }
    })
  },
  methods: {
    clearForm() {
      this.value.contact = {
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: '',
      }
    },
    submit() {
      if (!this.value.edit) {
        this.$emit('new', this.value.contact)
      } else {
        this.$emit('edit', {
          index: this.value.index,
          contact: this.value.contact,
        })
      }
      this.clearForm()
      this.close()
    },
    close() {
      this.dialog = false
    },
  },
}
</script>
