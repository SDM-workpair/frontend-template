<template>
  <v-app>
    <!-- 這一行要加 不然會有不置中的問題 -->
    <v-navigation-drawer></v-navigation-drawer>
    <!--                              -->

    <!-- 改這個地方!!!!!! -->
    <v-main>
      <h2 class="text-left hahaMR">&nbsp&nbsp&nbsp&nbsp{{ $t('my_group') }}</h2>
      <hr class="h-color mx-2" />
      <v-container fluid>
        <v-row dense>
          <v-col v-for="(item, index) in matching_rooms" :key="index">
            <v-expand-transition>
              <v-card class="mx-auto" max-width="250">
                <!-- <v-img
                        color="#FFFFF"
                        class="align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="150px"
                        cover
                      > -->
                <!-- <v-card-title class="text-white" v-text="card.title"></v-card-title> -->
                <!-- </v-img> -->

                <v-card-title class="text-left">
                  {{ item.name }}
                </v-card-title>

                <v-card-subtitle class="text-left">
                  {{ $t('dueDate') }}：{{ item.due_time.toLocaleDateString() }}&nbsp{{ item.due_time.getHours() }}:{{
                    item.due_time.getMinutes()
                  }}:{{ item.due_time.getSeconds() }}<br />
                  {{ $t('minMemberNum') }}：{{ item.min_member_num }}
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn color="orange-lighten-2" variant="text">
                    {{ $t('joinRoom') }}
                  </v-btn>

                  <v-spacer></v-spacer>

                  <v-btn
                    :icon="show[index] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                    @click="show[index] = !show[index]"
                  ></v-btn>
                </v-card-actions>

                <div v-show="show[index]">
                  <v-divider></v-divider>

                  <v-card-text>
                    {{ item.description }}
                  </v-card-text>
                </div>
              </v-card>
            </v-expand-transition>
          </v-col>
        </v-row>
      </v-container>

      <!-- 给应用提供合适的间距 -->
      <v-container>
        <!-- 如果使用 vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import ChangeLang from '../components/ChangeLang.vue'
import SearchBar from '../components/SearchBar.vue'
import axios from 'axios'

export default {
  data() {
    return {
      show: [],
      matching_rooms: [],
    }
  },
  components: {
    ChangeLang,
    SearchBar,
  },
  methods: {
    refresh_mr() {
      const token = sessionStorage.getItem('token')
      console.log(token)

      axios
        .get('/api/v1/group/my-list', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((error) => console.log(error))
    },
  },
  mounted: function () {
    this.refresh_mr()
  },
}
</script>

<style>
.hahaMR {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
}
</style>
