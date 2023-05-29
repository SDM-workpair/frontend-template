
<template>
  <div>
    <a-card style="marginBottom: 24px;">
      <h1 style="font-weight: bold;">{{ $t('menu.roomprofile') }}</h1>
    </a-card>
    <div class="roomInfoBody"> {{ $t('room.roomName') }} : {{ roomName }}<br>
      {{ $t('home.dueDate') }} : {{ matchDate }}</div>

    <div class="profileBody">
      <img class="avatar" id="photo" alt="User Avatar">
      <div class="name-info">
        <label for="name">{{ $t('room.name') }}:{{ name }}</label>
      </div>

      <div class="email-info">
        <label for="email">{{ $t('room.email') }}:{{ email }}</label>
      </div>

      <div class="id-info">
        <label for="id">{{ $t('room.my_id') }}:{{ lineID }}</label>
      </div>
    </div>

    <div>
      <!-- 新增我的Tag -->

      <label>{{ $t('room.new_my_tag') }}
        <input type="text" v-model="aaa" :placeholder="$t('room.new_my_tag')" class="ladyinput" @keyup.enter="addText" />
        <a-button shape="circle" @click="addText" icon="plus-circle"></a-button>
      </label>
      <!-- 推薦我的Tag -->

      <!-- 這裡的recommand list是寫死的 -->
      <label>{{ $t('room.recommand_my_tag') }}</label>
      <button @click="addRec(item)" class="hiRec" v-for="(item, index) in recommand_list" :key="index">{{ item }}</button>

      <label>{{ $t('room.about_my_tag') }}</label>
      <button @click="removeMyTag(item)" class="hiTag" v-for="(item, index) in textList" :key="index">{{ item }}</button>

    </div>
    <!-- {{ textList }} -->
    <hr class="h-color mx-2" style="border-style: dashed; border-width: 1px;"/>
    <!-- 這裡以下是FIND TAG -->
    <div>
      <!-- <v-container fluid style="margin-left:30px;"> -->
      <!-- 新增Find Tag -->
      <!-- <v-list> -->

      <label>{{ $t('room.new_find_tag') }}
        <input type="text" v-model="inputFindText" :placeholder="$t('room.new_find_tag')" class="ladyinput" @keyup.enter="addFindText"/>
        <a-button shape="circle" @click="addFindText" icon="plus-circle"></a-button>
      </label>
      <!-- </v-list> -->
      <!-- 推薦Find Tag -->
      <!-- <v-list> -->
      <!-- <label>{{ $t('room.new_find_tag') }}
        <button @click="addFindRec(item.name)" class="hiRec" v-for="(item, index) in matching_rooms" :key="index">{{ item.name }}</button>
      </label> -->

      <label>{{ $t('room.recommand_find_tag') }}</label>
      <button @click="addFindRec(item)" v-for="(item, index) in recommand_list1" :key="index" class="hiRec">{{ item }}</button>
      <!-- </v-list>
      <v-list> -->
      <label>{{ $t('room.about_find_tag') }}</label>
      <!-- <div class="hiTag" v-for="f_text in find_textList" :key="f_text">{{ f_text }}</div> -->
      <button @click="removeFindTag(item)" v-for="(item, index) in find_textList" :key="index" class="hiTag">{{ item }}</button>
      <!-- {{ find_textList }} -->
    </div>
    <!--
      </v-list>
    </v-container> -->

    <div>

      <a-button @click="modal2Visible = true">
        Next Step <a-icon type="right-circle" />
      </a-button>

      <a-modal
        v-model="modal2Visible"
        :title="$t('room.msg1')"
        :cancelText="$t('layouts.userLayout.cancel')"
        :okText="$t('layouts.userLayout.ok')"
        okType=""
        centered
        @ok="joinRoom"
      >
        <!-- @ok="modal2Visible = false" -->
        <p>{{ $t('room.msg2') }}</p>
        <p>{{ $t('room.msg3') }}</p>
        <p>{{ $t('room.msg4') }}</p>
      </a-modal>

    </div>

  </div>

</template>

<script>
  import axios from 'axios'
// console.log('RoomProfile: ', this.newRoomID)
import { ref } from 'vue'
  export default {

  name: 'RoomProfile',
  setup () {
    const modal2Visible = ref(false)
    return {
      modal2Visible
    }
  },
  data () {
    return {
      show: [],
      // 注意:這個matching room list要改成recommand的tag
      matching_rooms: [],
      editing: false,
      originalId: '',
      newId: '',
      inputText: '',
      textList: [],
      find_textList: [],
      showPopup: false,
      inputValue: '',
      itemList: [],
      aaa: '',
      inputFindText: '',
      newRoomID: this.$route.query.roomID,
      roomName: this.$route.query.roomName,
      matchDate: this.$route.query.matchDate,
      memberID: 0,
      email: '',
      name: '',
      photo: '',
      lineID: '',
      recommand_list: ['FRONTEND', 'BACKEND'],
      recommand_list1: ['PRETTY', 'UGLY']
    }
  },
  methods: {
    getRecTag () {
      const token = sessionStorage.getItem('token')
      console.log(token)
      axios.post('/api/v1/matching-room/rcmed-tag', {
        room_id: this.newRoomID
  }, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
  .then((getRecTagResponse) => {
        console.log('getRecTagResponse', getRecTagResponse)
        this.recommand_list = getRecTagResponse.data.data.slice(0)
        this.recommand_list1 = getRecTagResponse.data.data.slice(0)
      })
  .catch((error) => console.log(error))
    },
    removeFindTag (item) {
      // this.find_textList.remove(item)
      const i = this.find_textList.indexOf(item)
        if (i > -1) { // only splice array when item is found
          this.find_textList.splice(i, 1) // 2nd parameter means remove one item only
          }
    },
    removeMyTag (item) {
      // this.textList.splice(index, 1)
      const i = this.textList.indexOf(item)
        if (i > -1) { // only splice array when item is found
          this.textList.splice(i, 1) // 2nd parameter means remove one item only
          }
    },
    addItem () {
      if (this.inputValue) {
        this.itemList.push(this.inputValue.toUpperCase())
        this.inputValue = ''
      }
    },
    addText () {
      if (this.aaa) {
        this.textList.push(this.aaa.toUpperCase())
        this.aaa = ''
      }
    },
    addRec (item) {
        this.textList.push(item)
        this.inputText = ''
        const i = this.recommand_list.indexOf(item)
        if (i > -1) { // only splice array when item is found
          this.recommand_list.splice(i, 1) // 2nd parameter means remove one item only
          }
    },
    addFindText () {
      if (this.inputFindText) {
        this.find_textList.push(this.inputFindText.toUpperCase())
        this.inputFindText = ''
      }
    },
    addFindRec (item) {
        this.find_textList.push(item)
        this.inputFindText = ''
        const i = this.recommand_list1.indexOf(item)
        if (i > -1) { // only splice array when item is found
          this.recommand_list1.splice(i, 1) // 2nd parameter means remove one item only
          }
    },
    joinRoom () {
      this.modal2Visible = false
      // 這是先join room
      const token = sessionStorage.getItem('token')
      console.log(token)
      axios.post('/api/v1/mr-member/create', {
        user: {
          // 這邊之後要改
          email: this.email,
          is_admin: false,
          name: this.name
        },
        matching_room: {
          room_id: this.newRoomID
  }
  }, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
  .then((joinResponse) => {
    console.log('這是加入room的 response ', joinResponse)
    this.memberID = joinResponse.data.data.member_id
    console.log('這是加入room的member id: ', this.memberID)
    // 這是POST my tag
    console.log(this.textList)
      axios.post('/api/v1/mr-member-tag/create-self-tag', {
        mr_member: { member_id: this.memberID },
        tag_text_list: this.textList,

        matching_room: { room_id: this.newRoomID }
  }, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
  .then((addMyResponse) => console.log(addMyResponse))
  .catch((error) => console.log(error))

    // 這是POST find tag
    console.log(this.find_textList)
      axios.post('/api/v1/mr-member-tag/create-find-tag', {
        mr_member: {
          member_id: this.memberID
         },
        tag_text_list: this.find_textList,
        matching_room: {
            room_id: this.newRoomID
        }
  }, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
  .then((addFindResponse) => console.log('addFindResponse', addFindResponse))
  .catch((error) => console.log(error))
    // 傳值到matching room
  this.$router.push({
            path: '/matchingroom/Swipe',
            // name: 'Swipe',
            query: {
              roomID: this.newRoomID,
              memberID: this.memberID
              // my_tag_list: this.textList,
              // find_tag_list: this.find_textList
            }
          })
  console.log('roomID: ', this.newRoomID, '/ memberID:', this.memberID)
})

  .catch((error) => console.log(error))
    },

//   refresh_mr () {
//     axios.post('/api/v1/search/matching-room/list', {
//       user_email: '',
//       prompt: '',
//       query_all: true
//   })
//     .then((mrResponse) => {
//  this.matching_rooms = mrResponse.data.data.map
//         (room => {
//         return {
//           name: room.name,
//           due_time: new Date(room.due_time),
//           description: room.description,
//           min_member_num: room.min_member_num
//         }
//       })
//         console.log(this.matching_rooms)
// })
//     .catch((error) => console.log(error))
//     },

    fetchUser () {
      const token = sessionStorage.getItem('token')
      console.log(token)
      console.log('安安你好')
      axios.get('/api/v1/users/profile/me', {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then((uaserR) => {
          this.email = uaserR.data.data.email
          this.name = uaserR.data.data.name
          this.photo = uaserR.data.data.image
          this.lineID = uaserR.data.data.line_id
          document.getElementById('photo').src = this.photo
          console.log('email:', this.email)
          console.log('response:', uaserR)
        })

        .catch((error) => console.log(error))
    }
  },
  mounted: function () {
    this.getRecTag ()
    this.fetchUser()
  }
  }
  </script>

  <style>
.ladyinput {
  /* flex: 1; */
  padding: 0.5rem;
  border-radius: 1rem;
  border: 1px solid black;
  background-color: white;
  margin-left: 0.5rem;
  width: 400px;
}

  .gaga_RP{
    text-align: center;
    color: rgb(209, 7, 7);
    margin-top: 30px;
    font-weight: bold;
  }
  .ladyhaha_RP{
    text-align: center;
    margin-top: 20px;
  }
  .popup_RP {
    background-color:rgb(235, 233, 233);
    /* padding: 1rem; */
    border-radius: 1rem;
    width: 600px;
    height: 230px;
    /* max-width: 90%;
    max-height: 90%; */
    /* overflow-y: auto; */
    /* border-color: black;
    border-width: 10px; */
    /* margin-top: 90px; */
  }

  .hiRP{
    /* margin-left: 10px; */
    font-size: 2rem;
    border:10px;
  }

  .hahaMR {
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
margin-top: 80px;
}

.avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: gray;
    margin-top: 50px;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .name-info {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .email-info {
    margin-top: 10px;
  }
  label {
    display: flex;
    /* margin-right: 10px; */
    margin: 10px;

  }
  .tagBody{
    display: flex;
    flex-direction: column;
    align-items: left;
    font-family: Arial, sans-serif;
    margin-top: 10px;
  }
  .roomInfoBody{
    display: flex;
    flex-direction: column;
    align-items: right;
    font-family: Arial, sans-serif;
  }
  .profileBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
  }
  .profile_h1 {
    margin-top: 20px;
  }

  .hiProfile {
    margin-right: 20px;
    font-size: 1rem;
  }

  .hiTag{
    background-color: white;
    border: 1px solid black;
    color: black;
    padding: 10px;
    text-align: center;
    display: inline-block;
    width: auto;
    /* text-decoration: none; */
    /* display: inline-block; */
    font-size: 15px;
    margin: 4px;
    cursor: pointer;
    border-radius: 1.2rem;

  }
  .hiTag:hover {
  opacity: 1; /* 按鈕變暗 */
  border: 1px solid grey;
  color: grey;
  cursor: pointer; /* 滑鼠游標變成手指狀 */
}

  .hiRec{
    background-color: black;
    border: 1px solid black;
    color: white;
    padding: 10px;
    text-align: center;
    display: inline-block;
    width: auto;
    /* text-decoration: none; */
    /* display: inline-block; */
    font-size: 15px;
    margin: 4px;
    cursor: pointer;
    border-radius: 1.2rem;

  }

  .hiRec:hover {
  opacity: 0.8; /* 按鈕變暗 */
  cursor: pointer; /* 滑鼠游標變成手指狀 */
}

  </style>
