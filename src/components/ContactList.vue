<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container fluid>
    <v-card class="elevation-10">
      <v-card-title class="pa-7">
        Přehled kontaktů
        <v-spacer></v-spacer>

        <v-row>
          <v-col cols="3">
            <v-file-input v-model="csvFile" label="Vybrat soubor" />
          </v-col>
          <v-col cols="2">
            <v-btn
              color="primary"
              outlined
              height="50px"
              min-width="130px"
              @click.prevent="importCSV()"
              >Import</v-btn
            >
          </v-col>
          <v-col cols="3">
            <download-csv :data="contacts" class="mr-2">
              <v-btn color="primary" outlined height="50px" min-width="130px"
                >Export</v-btn
              >
            </download-csv>
          </v-col>
          <v-col cols="1">
            <v-btn
              color="primary"
              height="50px"
              min-width="130px"
              @click.prevent="openNewDialog()"
              >Přidat kontakt</v-btn
            >
          </v-col>
        </v-row>

        <ContactForm v-model="form" @new="addContact" @edit="editContact" />
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="itemHeaders"
          :items="itemsWithIndex"
          item-key="index"
          class="elevation-0"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn-toggle color="primary" dense group>
              <v-btn
                color="blue"
                text
                @click="
                  openEditDialog(item.index - 1, itemsWithIndex[item.index - 1])
                "
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                color="#EF5350"
                text
                @click="deleteContact(item.index - 1)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ContactForm from '@/components/ContactForm'

export default {
  name: 'ContactList',
  components: { ContactForm },
  data() {
    return {
      csvFile: null,
      form: {
        index: 0,
        contact: {
          name: '',
          surname: '',
          email: '',
          phone: '',
          address: '',
        },
        edit: false,
      },
      itemHeaders: [
        {
          text: '#',
          value: 'index',
        },
        {
          text: 'Jméno',
          value: 'name',
        },
        {
          text: 'Příjmení',
          value: 'surname',
        },
        {
          text: 'E-mail',
          value: 'email',
        },
        {
          text: 'Telefon',
          value: 'phone',
        },
        {
          text: 'Adresa',
          value: 'address',
        },
        {
          text: '',
          value: 'actions',
          width: '1px',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    ...mapState(['contacts']),
    itemsWithIndex() {
      return this.contacts.map((items, index) => ({
        ...items,
        index: index + 1,
      }))
    },
  },
  mounted() {
    this.loadStorage()
  },
  methods: {
    ...mapActions([
      'addContact',
      'editContact',
      'deleteContact',
      'loadStorage',
      'importContacts',
    ]),
    openNewDialog() {
      this.form.edit = false
      this.$eventBus.$emit('dialog', true)
    },
    openEditDialog(index, contact) {
      this.form.index = index
      this.form.contact = contact
      this.form.edit = true
      this.$eventBus.$emit('dialog', true)
    },
    importCSV() {
      let importContacts = this.importContacts
      this.$papa.parse(this.csvFile, {
        header: true,
        complete: function (results) {
          importContacts(results.data)
        },
      })
    },
  },
}
</script>
