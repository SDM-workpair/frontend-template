<template>
  <page-header-wrapper>
    <!-- 改這個地方!!!!!! -->
    <v-main>
      <hr class="h-color mx-2" />
      <v-container fluid>
        <v-row dense>
          <v-col v-for="(item, index) in matching_rooms" :key="index">
            <v-expand-transition>
              <v-card class="mx-auto" max-width="250">
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
  </page-header-wrapper>
</template>

<script>
// import { CheckCircleOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import axios from 'axios'
export default {
  // setup() {
  //   const selectedDateTime = ref(new Date())
  //   const onChange = (value, dateString) => {
  //     console.log('Selected Time: ', value)
  //     console.log('Formatted Selected Time: ', dateString)
  //   }
  //   const onOk = (value) => {
  //     selectedDateTime.value = value.toISOString()
  //     console.log('onOk: ', value.toISOString())
  //     console.log('onselectedDateTimeOk: ', selectedDateTime.value)
  //   }
  //   return {
  //     onChange,
  //     onOk,
  //     selectedDateTime
  //   }
  // },
  data() {
    return {
      show: [],
      matching_rooms: []
    }
  },
  methods: {
    refreshMR() {
      const token = sessionStorage.getItem('token');
      console.log(token)  
      // axios.get('/api/v1/group/my-list', {
      //     headers: {
      //       'Authorization': 'Bearer ' + token
      //     }
      //   })
      //   .then(
      //     (mr_response) => {
      //     console.log(mr_response.data)
      //   })
      //   .catch((error) => console.log(error))
    }
  },
  mounted:function(){
    this.refreshMR()
  }
}
</script>

<style>
.gaga {
  padding: 1rem;
  margin-bottom: 1px;
  color: black;
  font: bold;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(248, 245, 245, 0.7); */
  background-color: transparent;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: rgb(235, 233, 233);
  padding: 1rem;
  border-radius: 1rem;
  width: 600px;
  height: 540px;
  /* max-width: 90%;
    max-height: 90%; */
  overflow-y: auto;
  /* border-color: black;
    border-width: 10px; */
  margin-top: 90px;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  font-size: 1.5rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.popup-body {
  margin-top: 1rem;
}

.input-panel {
  display: flex;
  align-items: center;
  height: 20;
}

.ladyinput {
  flex: 1;
  padding: 0.5rem;
  border-radius: 1rem;
  border: 1px solid black;
  background-color: white;
  margin-left: 0.5rem;
  width: 400px;
}

.ant-calendar-picker-input {
  padding: 0.5rem;
  border-radius: 0.9rem;
  margin-left: 1.5rem;
  border: 1px solid black;
  /* width: 500px; */
  height: 35px;
  /* margin-top: 90px; */
}

.dp__input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 1rem;
  border: 1px solid black;
  background-color: white;

  /* width: 430px; */
}

.dp__input_icon {
  color: #95959500;
}

.datelabel {
  position: relative;
  /* top: 35px; */
}

.v3dp__datepicker {
  width: 400px;
  left: 105px;
}

.textArea {
  width: 100%;
  height: 100px;
  padding: 12px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
  margin-top: 10px;
  flex: 1;
  border-radius: 1rem;
  border: 1px solid black;
  background-color: white;
}

/* 按鈕的css */
.ladygaga {
  background-color: white;
  border: 1px solid black;
  color: black;
  padding: 10px;
  /* text-align: center; */
  /* text-decoration: none; */
  /* display: inline-block; */
  font-size: 15px;
  margin: 4px;
  cursor: pointer;
  border-radius: 1.2rem;
  flex: 1;
}

.ladyhaha {
  /* margin-left: 370px; */
}

.ladyqua {
  margin-top: 10px;
}

.ladyqua1 {
  margin-top: 10px;
  flex: 1;
  padding: 0.5rem;
  border-radius: 1rem;
  border: 1px solid black;
  background-color: white;
  margin-left: 2.5rem;
  width: 70px;
}
</style>
