<template>
  <div>
    <v-form>
      <v-container>
        <v-layout>
          <v-flex
            xs12
            md4
          >
            <v-text-field
              v-model="id"
              :counter="5"
              label="ID"
              maxlength="5"
            />
          </v-flex>

          <v-flex
            xs12
            md4
          >
            <v-text-field
              v-model="register_date"
              :counter="10"
              label="登録日時"
              maxlength="10"
            />
          </v-flex>

          <v-flex
            xs12
            md4
          >
            <v-text-field
              v-model="status"
              :counter="10"
              label="ステータス"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <v-btn
      slot="activator"
      color="blue lighten-2"
      dark
      @click="search"
    >
      検索
    </v-btn>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="orders"
      class="elevation-1"
    >
      <template
        slot="items"
        slot-scope="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.register_date }}</td>
        <td class="text-xs-left">{{ props.item.status }}</td>
        <td class="text-xs-left">
          <v-icon
            small
            class="mr-2"
            @click="showItem(props.item.id)"
          >
            more_horiz
          </v-icon>
          <v-icon
            small
            class="mr-2"
            color="green darken-2"
            @click="editItem(props.item.id)"
          >
            edit
          </v-icon>
          <v-icon
            small
            color="red darken-2"
            @click="deleteItem(props.item.id)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          新規登録
        </v-card-title>
        <v-container
          grid-list-sm
          class="pa-4">
          <v-layout
            row
            wrap>
            <v-flex
              xs12
              align-center
              justify-space-between>
              <v-layout align-center>
                <v-avatar
                  size="40px"
                  class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="Name"
                />
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="business"
                placeholder="Company"
              />
            </v-flex>
            <v-flex xs6>
              <v-text-field
                placeholder="Job title"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                type="tel"
                prepend-icon="phone"
                placeholder="(000) 000 - 0000"
                mask="phone"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="notes"
                placeholder="Notes"
              />
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            @click="dialog = false">キャンセル</v-btn>
          <v-btn
            color="primary"
            @click="dialog = false">登録する</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
export default {
  data() {
    return {
      loading: false,
      id: '',
      register_date: '',
      status: '',
      dialog: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: '登録日時', value: 'register_date' },
        { text: 'ステータス', value: 'status' },
        { text: 'アクション', value: 'action' }
      ],
      orders: []
    }
  },
  layout: 'contacts',
  methods: {
    search() {
      this.loading = true
      setTimeout(() => {
        this.orders = [
          {
            id: 1,
            register_date: '2018/12/30',
            status: '処理中'
          },
          {
            id: 2,
            register_date: '2018/12/30',
            status: '処理中'
          },
          {
            id: 3,
            register_date: '2018/12/30',
            status: '処理中'
          },
          {
            id: 4,
            register_date: '2018/12/30',
            status: '処理中'
          },
          {
            id: 5,
            register_date: '2018/12/30',
            status: '処理中'
          },
          {
            id: 6,
            register_date: '2018/12/30',
            status: '処理中'
          }
        ]
        this.loading = false
      }, 3000)
    },
    showItem(id) {
      alert(`show : ${id}`)
    },
    editItem(id) {
      alert(`edit : ${id}`)
    },
    deleteItem(id) {
      alert(`delete : ${id}`)
    }
  }
}
</script>

<style scoped>
</style>
