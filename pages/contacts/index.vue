<template>
  <div>
    <v-flex>

      <v-toolbar
        color="accent"
        height="45"
        dark
      >
        <v-toolbar-title>
          <v-icon>search</v-icon>
          <span class="hidden-sm-and-down">検索条件</span>
          <v-spacer/>
        </v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-form>
          <v-container>
            <v-layout
              row
              wrap
            >
              <v-flex xs4>
                <v-text-field
                  v-model="id"
                  :counter="5"
                  label="ID"
                  maxlength="5"
                />
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  v-model="register_date"
                  :counter="10"
                  label="登録日時"
                  maxlength="10"
                />
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  v-model="status"
                  :counter="10"
                  label="ステータス"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
        <v-layout justify-center>
          <v-btn
            slot="activator"
            :loading="loading"
            color="blue lighten-2"
            dark
            @click="search"
          >
            検索
          </v-btn>
        </v-layout>
      </v-card>

    </v-flex>
    <br>
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
          <v-tooltip bottom>
            <v-icon
              slot="activator"
              small
              class="mr-2"
              @click="showItem(props.item.id)"
            >
              list
            </v-icon>
            <span>詳細を見る</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-icon
              slot="activator"
              small
              class="mr-2"
              color="green darken-2"
              @click="editItem(props.item.id)"
            >
              edit
            </v-icon>
            <span>編集する</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-icon
              slot="activator"
              small
              color="red darken-2"
              @click="deleteItem(props.item.id)"
            >
              delete
            </v-icon>
            <span>廃止する</span>
          </v-tooltip>
        </td>
      </template>
    </v-data-table>
    <v-tooltip left>
      <v-btn
        slot="activator"
        fab
        bottom
        right
        color="pink"
        dark
        fixed
        @click.stop="newDialog = !newDialog"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <span>登録する</span>
    </v-tooltip>
    <v-dialog
      v-model="newDialog"
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
            @click="newDialog = false">キャンセル</v-btn>
          <v-btn
            color="primary"
            @click="newDialog = false">登録する</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="showDialog"
      fullscreen
      hide-overlay
    >
      <v-card>
        <v-toolbar
          dark
          color="primary">
          <v-icon>list</v-icon>
          <v-toolbar-title>詳細情報</v-toolbar-title>
          <v-spacer/>
          <v-btn
            icon
            dark
            @click="showDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="showedItem.id"
                  label="ID"
                />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="showedItem.register_date"
                  label="登録日時"
                />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="showedItem.status"
                  label="ステータス"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
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
      newDialog: false,
      showDialog: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: '登録日時', value: 'register_date' },
        { text: 'ステータス', value: 'status' },
        { text: '操作', value: 'action' }
      ],
      orders: [],
      showedItem: {
        id: '',
        register_date: '',
        status: ''
      }
    }
  },
  layout: 'contacts',
  methods: {
    search() {
      this.loading = true
      setTimeout(() => {
        if (this.id === '10') {
          this.orders = []
        } else {
          this.orders = [
            {
              id: 1,
              register_date: '2018/12/30',
              status: '処理中'
            },
            {
              id: 2,
              register_date: '2018/12/31',
              status: '完了'
            },
            {
              id: 3,
              register_date: '2019/01/10',
              status: 'キャンセル'
            },
            {
              id: 4,
              register_date: '2019/01/11',
              status: '処理中'
            },
            {
              id: 5,
              register_date: '2019/01/12',
              status: 'キャンセル'
            },
            {
              id: 6,
              register_date: '2019/01/13',
              status: '処理中'
            }
          ]
        }
        this.loading = false
      }, 2000)
    },
    showItem(id) {
      this.showedItem = this.orders.filter(item => item.id === id)[0]
      this.showDialog = true
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
