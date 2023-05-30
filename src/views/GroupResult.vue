<template>
  <div>
    <a-card style="marginBottom: 24px;">
      <h1 style="font-weight: bold;">{{ $t('room.result_of') }} : {{ groupName }}</h1>
    </a-card>
    <a-row :gutter="24">
      <a-col
        :sm="24"
        :md="12"
        :xl="6"
        :style="{ marginBottom: '24px' }"
        v-for="(item, index) in groups"
        :key="index">
        <a-card hoverable style="width: 240px" >
          <template #cover>
            <img :src="item.image" :alt="item.image" />
          </template>
          <a-card-meta :title="item.name">
            <template #description>
              <div> {{ item.email }}</div>
              <div> {{ item.line_id }}</div>
              <!-- <div> {{ item.image }}</div> -->
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'GroupResult',
        data () {
          return {
            groups: [],
            groupID: this.$route.query.groupID,
            groupName: this.$route.query.groupName,
            imgUrl: ''
          }
        },
        methods: {
          // 加载数据的方法
          loadData (groupID) {
            const token = sessionStorage.getItem('token')
            if (!token) {
              const currentUrl = window.location.href
              const pathname = window.location.pathname
              const newUrl = currentUrl.replace(pathname, '/user/login')
              window.location.replace(newUrl)
            }

            axios
              .post('/api/v1/group/members', {
                group_id: groupID
              }, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
              })
              .then((MRResponse) => {
                this.groups = MRResponse.data.data.map(group => {
                  if (group.image === null) {
                    this.imgUrl = 'logo.png'
                  } else {
                    this.imgUrl = group.image
                  }
                  return {
                    email: group.email,
                    name: group.name,
                    line_id: group.line_id,
                    image: this.imgUrl
                  }
                })
              })
              .catch((error) => console.log(error))
          }
        },
        created () {
          this.loadData(this.groupID)
        },
        beforeRouteUpdate (to, from, next) {
          if (to.query.groupID !== from.query.groupID) {
            this.groupID = to.query.groupID
            this.loadData(this.groupID)
          }
          next()
        }
      }
  </script>
