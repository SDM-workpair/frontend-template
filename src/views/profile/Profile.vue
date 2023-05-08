<template>
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
</template>

<script>
import axios from 'axios'

import { ChartCard } from '@/components'
import { baseMixin } from '@/store/app-mixin'

export default {
  name: 'Analysis',
  mixins: [baseMixin],
  components: {
    ChartCard,
  },
  //   setup () {
  //   const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  //   const activeKey = ref(['1'])
  //   watch(activeKey, val => {
  //     console.log(val)
  //   })
  //   return {
  //     text,
  //     activeKey
  //   }
  // },
  data() {
    return {
      loading: true,
      show: [],
      matching_rooms: [],
    }
  },
  methods: {
    joinMR(roomID, name, dueDate) {
      this.$router.push({
        path: '/roomProfile',
        query: {
          roomID: roomID,
          roomName: name,
          matchDate: dueDate.toISOString(),
        },
      })
    },
    refreshMR() {
      const token = sessionStorage.getItem('token')
      console.log(token)
      axios
        .post(
          '/api/v1/search/matching-room/list',
          {
            prompt: '',
            query_all: true,
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        )
        .then((MRResponse) => {
          this.matching_rooms = MRResponse.data.data.map((room) => {
            return {
              name: room.name,
              due_time: new Date(room.due_time),
              description: room.description,
              min_member_num: room.min_member_num,
              roomID: room.room_id,
            }
          })
          console.log(this.matching_rooms)
          console.log(token)
        })
        .catch((error) => console.log(error), console.log(token))
    },
  },
  mounted: function () {
    this.refreshMR()
    this.expandDescription()
  },
}
</script>

<style lang="less" scoped>
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}

.antd-pro-pages-dashboard-analysis-twoColLayout {
  position: relative;
  display: flex;
  display: block;
  flex-flow: row wrap;
}

.antd-pro-pages-dashboard-analysis-salesCard {
  height: calc(100% - 24px);
  :deep(.ant-card-head) {
    position: relative;
  }
}

.dashboard-analysis-iconGroup {
  i {
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    transition: color 0.32s;
    color: black;
  }
}
.analysis-salesTypeRadio {
  position: absolute;
  right: 54px;
  bottom: 12px;
}
</style>
