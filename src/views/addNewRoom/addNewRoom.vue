<template>
  <page-header-wrapper>

    <!-- 這裡是配對活動名稱 -->
    <div class="input-panel">
      <label for="input-field">{{ $t('room.roomName') }}</label>
      <input id="input-field" type="text" :placeholder="$t('room.inputRoomName')" v-model="inputValue" class="ladyinput">

    </div>

    <!-- 這裡是配對日期 -->
    <div style="margin-top: 20px;">
      <label for="date" class="datelabel">{{ $t('room.dueDate') }}</label>
      <a-date-picker
        v-model="selectedDateTime"
        show-time
        :placeholder="$t('room.inputDate')"
        :disabled-date="disabledDate"
        format="YYYY-MM-DD HH:mm:ss"
        @change="onChange"
        @ok="onOk" />
    </div>
    <!-- <div>
      <a-date-picker v-model="selectedDate" @change="formatDate"></a-date-picker>
      <p>Formatted Date: {{ formattedDate }}</p>
    </div> -->
    <!-- <a-date-picker
      v-model="value1"
      format="YYYY-MM-DD HH:mm:ss"
      :disabled-date="disabledDate"
      :disabled-time="disabledDateTime"
      :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
    /> -->

    <!-- 這裡是配對人數 -->
    <div class="ladyqua">
      <label for="quantity">{{ $t('room.minMemberNum') }}</label>
      <input
        id="quantity"
        type="number"
        min="1"
        max="100"
        v-model="quantity"
        class="ladyqua1">
    </div>

    <div class="ladyqua">
      <label for="description">{{ $t('room.roomDescription') }}</label>
      <textarea class="textArea" id="description" name="description" v-model="description"></textarea>
    </div>

    <div class="ladyhaha">
      <button @click="createMR" class="ladygaga" >{{ $t('room.add') }}</button>
    </div>

  </page-header-wrapper>
</template>

<script>
// import { CheckCircleOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import axios from 'axios'
import moment from 'moment'
  export default {
    // components: {
    //   CheckCircleOutlined
    // },
    setup () {
    // const selectedDateTime = { value: null }
    const token = sessionStorage.getItem('token')
            if (!token) {
                const currentUrl = window.location.href
                const pathname = window.location.pathname
                const newUrl = currentUrl.replace(pathname, '/user/login')
                window.location.replace(newUrl)
          }
    const selectedDateTime = ref(new Date())
    const onChange = (value, dateString) => {
      console.log('Selected Time: ', value)
      console.log('Formatted Selected Time: ', dateString)
    }
    const onOk = value => {
      selectedDateTime.value = value.toISOString()
      console.log('onOk: ', value.toISOString())
      console.log('onselectedDateTimeOk: ', selectedDateTime.value)
      console.log('onselectedDateTimeOk: ', this.formatDate(selectedDateTime.value))
    }
    // const range = (start, end) => {
    //   const result = [];
    //   for (let i = start; i < end; i++) {
    //     result.push(i);
    //   }
    //   return result;
    // };
    const disabledDate = current => {
      // Can not select days before today and today
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      // return current < moment().endOf('day')-1
      return current < yesterday
    }
    // const disabledDateTime = () => {
    //   return {
    //     disabledHours: () => range(0, 24).splice(4, 20),
    //     disabledMinutes: () => range(30, 60),
    //     disabledSeconds: () => [55, 56],
    //   };
    // };
    return {
      onChange,
      onOk,
      selectedDateTime,
      moment,
      value1: ref(),
      disabledDate
      // disabledDateTime
    }
  },

    data () {
    return {
      inputValue: '',
      quantity: 1,
      description: '',
      // 這裡是要join MR這裡是要join MR
      roomID: '',
      email: 'user@example.com',
      is_admin: false,
      name: '',
      // selectedDate: null,
      formattedDate: null
    }
  },
    // props: {
    //   show: Boolean
    // },
    methods: {
      formatDate (value) {
        if (value) {
        const date = new Date(value)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0')
        // const timezoneOffset = date.getTimezoneOffset()
        // const timezoneOffsetHours = Math.floor(Math.abs(timezoneOffset) / 60).toString().padStart(2, '0')
        // const timezoneOffsetMinutes = (Math.abs(timezoneOffset) % 60).toString().padStart(2, '0')
        // const timezoneSign = timezoneOffset <= 0 ? '+' : '-'
        // const timezoneSign = timezoneOffset <= '+08'

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`
        // const formattedTimezone = `${timezoneSign}${timezoneOffsetHours}${timezoneOffsetMinutes}`

        this.formattedDate = `${formattedDate}+08`
      } else {
        this.formattedDate = null
      }
        },
      createMR () {
        // const router = useRouter()

        if (!this.inputValue) {
          alert('room.error_name ')
          return
        }
        if (!this.selectedDateTime) {
          alert('room.error_date ')
          return
        }
        // if (!this.quantity) {
        //   alert('配對人數 ')
        //   return
        // }
        // if (!this.description) {
        //   alert('配對空間資訊 ')
        //   return
        // }
        this.formatDate(this.selectedDateTime)
        const token = sessionStorage.getItem('token')
        console.log(token)
        axios.post('/api/v1/matching-room/create', {
          name: this.inputValue,
          due_time: this.formattedDate,
          min_member_num: 0,
          description: this.description,
          is_forced_matching: false
      }, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then((mrResponse) => {
          const roomID = mrResponse.data.room_id
          console.log('roomID is', roomID)

          this.$router.push({
            path: '/roomProfile',
            query: {
                    roomID: roomID,
                    roomName: this.inputValue,
                    matchDate: this.selectedDateTime
                  }
          })
        })

        .catch((error) => console.log(error))

      console.log('輸入的值是：', this.inputValue)
      console.log('輸入的值是：', this.formattedDate)
      console.log('輸入的值是：', this.quantity)
      console.log('輸入的值是：', this.description)

      // this.$emit('close')
    }
    }

  }
  </script>

  <style>

  .gaga{
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
    background-color:rgb(235, 233, 233);
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
  height:35px;
  /* margin-top: 90px; */
}

.dp__input{
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

.datelabel{
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
.ladygaga{
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

.ladyhaha{
  /* margin-left: 370px; */

}

.ladyqua{
  margin-top: 10px;

}

.ladyqua1{
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
