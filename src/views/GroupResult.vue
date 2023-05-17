<template>
  <div>
    <a-card style="marginBottom: 24px;">
      <h1 style="font-weight: bold;">{{ $t('room.result_of') }} : {{ groupID }}</h1>
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
        //   loading: true,
        //   show: [],
          groups: [],
          groupID: this.$route.query.groupID,
          imgUrl: ''
        }
      },
      methods: {

      },
      created () {
      // 看是否登入
      const token = sessionStorage.getItem('token')
      if (!token) {
          const currentUrl = window.location.href
          const pathname = window.location.pathname
          const newUrl = currentUrl.replace(pathname, '/user/login')
          window.location.replace(newUrl)
    }
      // Show出所有room
      console.log('hihi', this.groupID)
        axios.post('/api/v1/group/members', {
          group_id: this.groupID
      }, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then((MRResponse) => {
          this.groups = MRResponse.data.data.map (group => {
            // document.getElementById(group.name).src = group.image
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
              // imageID: document.getElementById('photo').src
              // document.getElementById('photo').src: image
              }
          })
            console.log(this.groups)
            console.log(token)
        })
        .catch((error) => console.log(error), console.log(token))
    }
        }
  </script>
