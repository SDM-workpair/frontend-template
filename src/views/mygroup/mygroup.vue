<template>
  <div>
    <a-row :gutter="24">
      <a-col
        :sm="24"
        :md="12"
        :xl="6"
        :style="{ marginBottom: '24px' }"
        v-for="(item, index) in group_list"
        :key="index">
        <chart-card :title="item.name" total="">
          <div>
            <trend flag="up" style="margin-right: 16px;">
              <div>{{item.name}}</div>
            </trend>
          </div>
        </chart-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// import ChangeLang from '@/../../components/ChangeLang.vue'
// import SearchBar from '@/../../components/SearchBar.vue'
import axios from 'axios'
import {
    ChartCard
} from '@/components'

export default {
  data() {
    return {
      show: [],
      group_list: []
    }
  },
  // components: {
  //   ChangeLang,
  //   SearchBar,
  // },
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
          this.group_list = res.data.data.map(group => {
            return {
              group_id: group.group_id,
              name: group.name,
              room_uuid: group.room_uuid
            }
          }) 
          console.log(this.group_list)
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
