<template>
  <page-header-wrapper>

    <!-- 這裡是配對活動名稱 -->
    <div class="input-panel">
      <label for="input-field">{{ $t('roomName') }}</label>
      <input id="input-field" type="text" :placeholder="$t('inputRoomName')" v-model="inputValue" class="ladyinput">

    </div>

    <!-- 這裡是配對日期 -->
    <div style="margin-top: 20px;">
      <label for="date" class="datelabel">{{ $t('dueDate') }}</label>
      <a-date-picker show-time placeholder="Select Time" @change="onChange" @ok="onOk" />
    </div>

    <!-- 這裡是配對人數 -->
    <div class="ladyqua">
      <label for="quantity">{{ $t('roomQuantity') }}</label>
      <input
        id="quantity"
        type="number"
        min="1"
        max="100"
        v-model="quantity"
        class="ladyqua1">
    </div>

    <div class="ladyqua">
      <label for="description">{{ $t('roomDescription') }}</label>
      <textarea class="textArea" id="description" name="description" v-model="description"></textarea>
    </div>

    <div class="ladyhaha">
      <button @click="createMR" class="ladygaga" >{{ $t('add') }}</button>
    </div>

  </page-header-wrapper>
</template>

<script>
// import { CheckCircleOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import axios from 'axios'
  export default {
    // components: {
    //   CheckCircleOutlined
    // },
    setup () {
    // const selectedDateTime = { value: null }
    const selectedDateTime = ref(new Date())
    const onChange = (value, dateString) => {
      console.log('Selected Time: ', value)
      console.log('Formatted Selected Time: ', dateString)
    }
    const onOk = value => {
      selectedDateTime.value = value.toISOString()
      console.log('onOk: ', value.toISOString())
      console.log('onselectedDateTimeOk: ', selectedDateTime.value)
    }
    return {
      onChange,
      onOk,
      // value1: ref()
      selectedDateTime
      // console.log('onselectedDateTimeOk: ', selectedDateTime.value)
      // inputValue: '',
      // quantity: 1,
      // description: '',
      // roomID: '',
      // email: 'user@example.com',
      // is_admin: false,
      // name: ''
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
      name: ''
    }
  },
    // props: {
    //   show: Boolean
    // },
    methods: {
      // close () {
      //   this.$emit('close')
      // },
      createMR () {
        // const router = useRouter()

        if (!this.inputValue) {
          alert('配對空間名稱 ')
          return
        }
        if (!this.selectedDateTime) {
          alert('配對日期 ')
          return
        }
        if (!this.quantity) {
          alert('配對人數 ')
          return
        }
        if (!this.description) {
          alert('配對空間資訊 ')
          return
        }

        axios.post('/api/v1/matching-room/create', {
          name: this.inputValue,
          due_time: this.selectedDateTime,
          min_member_num: 0,
          description: this.description,
          is_forced_matching: false
      })
        .then((mrResponse) => {
          const roomID = mrResponse.data.room_id
          console.log('roomID is', roomID)

          this.$router.push({
            path: '/roomProfile',
            query: { roomID: roomID }
          })
        })

        .catch((error) => console.log(error))

      console.log('輸入的值是：', this.inputValue)
      console.log('輸入的值是：', this.selectedDateTime)
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
