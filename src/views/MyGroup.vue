<template>
  <div>
    <a-input-search placeholder="input search text" style="width: 200px" @search="onSearch" />
    <a-row :gutter="24">
      <a-col
        :sm="24"
        :md="12"
        :xl="8"
        :style="{ marginBottom: '24px' }"
        v-for="(item, index) in groups"
        :key="index">

        <chart-card :title="item.name" total="" style="font-size: 13px;">
          <div>
            <trend flag="up" style="margin-right: 16px;">
              {{ $t('home.groupID') }}：{{ item.groupID }}<br>
              <!-- {{ $t('home.dueDate') }}：{{ item.due_time.toLocaleDateString() }}&nbsp{{ item.due_time.getHours() }}:{{ item.due_time.getMinutes() }}:{{ item.due_time.getSeconds() }}<br> -->
            </trend>
            <div class="chart-card-footer">
              <a-button @click="seeGroup(item.groupID, item.name)" ><a-icon type="monitor"/>{{ $t('group.seeGroupResult') }}</a-button>
            </div>
          </div>
        </chart-card>
      </a-col>
    </a-row>
    <div v-if="groups.length === 0">
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
      data () {
        return {
          loading: true,
          show: [],
          groups: [],
          showMore: false
        }
      },
      methods: {
        onSearch (value) {
          const token = sessionStorage.getItem('token')
          // console.log(token)
          axios.post('/api/v1/search/group/list', {
            prompt: value
          },
          {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
          .then((MRResponse) => {
            // // console.log(MRResponse.data)
            this.groups = MRResponse.data.data.map (group => {
              return {
                  name: group.name,
                  due_time: new Date(group.created_time),
                  groupID: group.group_id
                }
            })
              // console.log(this.groups)
              // console.log(token)
  })
          .catch((error) => console.log(error))
        },
        seeGroup (groupID, name) {
            // console.log('see')
            // console.log(groupID)
            this.$router.push({
            path: '/groupResult',
            query: {
                groupID: groupID,
                groupName: name
                  }
          })
        },
        refreshMR () {
          const token = sessionStorage.getItem('token')
          // console.log(token)
          axios.get('/api/v1/group/my-list', {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
          .then((MRResponse) => {
            // // console.log(MRResponse.data)
            this.groups = MRResponse.data.data.map (group => {
              return {
                  name: group.name,
                  due_time: new Date(group.created_time),
                  groupID: group.group_id
                }
            })
              // console.log(this.groups)
              // console.log(token)
  })
          .catch((error) => console.log(error))
          }
        },
        mounted: function () {
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
    <style>
    span.chart-card-title {
     font-weight: bold;
     font-size: 17px;
 }
   </style>
