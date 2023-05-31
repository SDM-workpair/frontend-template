<template>
  <div>
    <a-input-search :placeholder="$t('room.searchRoom')" style="width: 200px" @search="onSearch" />
    <a-row :gutter="24">
      <a-col
        :sm="24"
        :md="12"
        :xl="8"
        :style="{ marginBottom: '24px' }"
        v-for="(item, index) in matching_rooms"
        :key="index">

        <chart-card :title="item.name" total="" style="font-size: 13px;">
          <div>
            <trend flag="up" style="margin-right: 16px;">
              {{ $t('home.roomID') }}：{{ item.roomID }}<br>
              {{ $t('home.dueDate') }}：{{ item.due_time.toLocaleDateString() }}&nbsp{{ item.due_time.getHours() }}:{{ item.due_time.getMinutes() }}:{{ item.due_time.getSeconds() }}<br>
              {{ $t('home.minMemberNum') }}：{{ item.min_member_num }}
            </trend>
            <div class="chart-card-footer">
              <a-button @click="joinMR(item.roomID, item.memberID)" ><a-icon type="import"/>{{ $t('menu.enterMyRoom') }}</a-button>
            </div>

          </div>
          <!-- <template slot="footer">{{ $t('dashboard.analysis.day-sales') }}<span>￥ 234.56</span></template> -->
        </chart-card>
      </a-col>
    </a-row>
    <div v-if="matching_rooms.length === 0">
      {{ $t('home.noSearchResult') }}
    </div>
  </div>
</template>

    <script>
    import axios from 'axios'

    import {
      ChartCard
    } from '@/components'
    import { baseMixin } from '@/store/app-mixin'

    export default {
      name: 'Analysis',
      mixins: [baseMixin],
      components: {
        ChartCard
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
      data () {
        return {
          loading: true,
          show: [],
          matching_rooms: [],
          myRooms: []
        }
      },
      methods: {
        reloadPage () {
            window.onpopstate = () => {
            location.reload()
          }
        },
        onSearch (value) {
        console.log('search value', value)
        const token = sessionStorage.getItem('token')
        // Show出所有room
        axios.post('/api/v1/search/matching-room/list', {
          prompt: value,
          query_all: false
      }, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then((MRResponse) => {
          console.log(MRResponse.data.data)
          this.matching_rooms = MRResponse.data.data.map (room => {
            return {
                name: room.name,
                due_time: new Date(room.due_time),
                description: room.description,
                min_member_num: room.min_member_num,
                roomID: room.room_id,
                showDescription: false
              }
          })

            console.log(this.matching_rooms)
            console.log(this.matching_rooms.length, 'length')
})
        .catch((error) => console.log(error))
      },
        joinMR (roomID, memberID) {
            this.$router.push({
                path: '/matchingroom/Swipe',
                // name: 'Swipe',
                query: {
                roomID: roomID,
                memberID: memberID
                }
          })
        },
        refreshMR () {
          const token = sessionStorage.getItem('token')
          // Show出所有room
          axios.get('/api/v1/matching-room/my-list',
           {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
          .then((MRResponse) => {
            this.matching_rooms = MRResponse.data.data.map (room => {
              return {
                  name: room.name,
                  due_time: new Date(room.due_time),
                  description: room.description,
                  min_member_num: room.min_member_num,
                  roomID: room.room_id,
                  memberID: room.member_id
                }
            })
              console.log(this.matching_rooms)
  })
          .catch((error) => console.log(error))
          }
        },
        mounted: function () {
          this.reloadPage()
          this.refreshMR()
          this.expandDescription()
          const token = sessionStorage.getItem('token')
            if (!token) {
                const currentUrl = window.location.href
                const pathname = window.location.pathname
                const newUrl = currentUrl.replace(pathname, '/user/login')
                window.location.replace(newUrl)
          }
      }
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
          color: rgba(0,0,0,.45);
          cursor: pointer;
          transition: color .32s;
          color: black;
        }
      }
      .analysis-salesTypeRadio {
        position: absolute;
        right: 54px;
        bottom: 12px;
      }
    </style>
