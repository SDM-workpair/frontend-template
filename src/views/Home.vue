<template>
  <div>
    <a-row :gutter="24">
      <a-col
        :sm="24"
        :md="12"
        :xl="6"
        :style="{ marginBottom: '24px' }"
        v-for="(item, index) in matching_rooms"
        :key="index">

        <chart-card :title="item.name" total="">
          <div>
            <trend flag="up" style="margin-right: 16px;">
              {{ $t('home.dueDate') }}：{{ item.due_time.toLocaleDateString() }}&nbsp{{ item.due_time.getHours() }}:{{ item.due_time.getMinutes() }}:{{ item.due_time.getSeconds() }}<br>
              {{ $t('home.minMemberNum') }}：{{ item.min_member_num }}
            </trend>
            <div class="chart-card-footer">
              <a-button @click="joinMR(item.roomID, item.name, item.due_time)" ><a-icon type="plus-circle"/>{{ $t('home.joinRoom') }}</a-button>
            </div>

          </div>
          <!-- <template slot="footer">{{ $t('dashboard.analysis.day-sales') }}<span>￥ 234.56</span></template> -->
        </chart-card>
      </a-col>
    </a-row>
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
        matching_rooms: []

      }
    },
    methods: {

      joinMR (roomID, name, dueDate) {
        this.$router.push({
            path: '/roomProfile',
            query: {
                    roomID: roomID,
                    roomName: name,
                    matchDate: dueDate.toISOString()
                  }
          })
      },
      refreshMR () {
        const token = sessionStorage.getItem('token')
        console.log(token)
        axios.post('/api/v1/search/matching-room/list', {
          prompt: '',
          query_all: true
      }, {
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
                roomID: room.room_id
              }
          })
            console.log(this.matching_rooms)
            console.log(token)
})
        .catch((error) => console.log(error), console.log(token))
        }
      },
      mounted: function () {
        this.refreshMR()
        this.expandDescription()
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
