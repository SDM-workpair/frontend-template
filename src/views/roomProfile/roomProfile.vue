
<template>
  <page-header-wrapper>
    <!-- <h2 class="text-left hahaMR">&nbsp&nbsp&nbsp&nbsp 這裡要接後端的[配對活動名稱] | {{ $t('matchingRoomProfile') }}</h2> -->
    <!-- <h1>Input value from Page One: {{ newRoomID }}</h1> -->
    <!-- <hr class="h-color mx-2"> -->
    <!-- <div style="text-align: right; margin-top: -15px;">關閉時間 : [這裡接後端時間] | <i class="bi bi-people-fill"></i> [接後端目前人數]/[接後端總共人數]</div> -->
    <!-- <v-container fluid> -->
    <!-- <v-container fluid class="profileBody"> -->
    <div class="avatar profileBody">
      <img src="avatar.png" alt="User Avatar">
    </div>
    <div style="margin-top:10px; font:15px;">
      <div class="name-info">
        <label for="name">{{ $t('room.name') }}:</label>
        <span id="name"></span>
      </div>

      <div class="email-info">
        <label for="email">{{ $t('room.email') }}:</label>
        <span id="email"></span>
      </div>

      <div class="id-info">
        <label for="id">{{ $t('room.my_id') }}:</label>
        <span id="id"></span> 這裡還沒接ID
      </div>
    </div>
    <!-- </v-container> -->
    <!-- <v-container fluid style="margin-left:30px;"> -->
    <!-- 新增我的Tag -->
    <!-- <v-list> -->
    <label>{{ $t('room.about_my_tag') }}</label>
    <input type="text" v-model="aaa" :placeholder="$t('inputRoomName')" class="ladyinput" />
    <a-button shape="circle" @click="addText"><a-icon type="plus-circle" class="hiRP"/></a-button>
    <!-- </v-list> -->
    <!-- 推薦我的Tag -->
    <!-- <v-list> -->
    <label>推薦我的Tag </label>
    <button @click="addRec(item.name)" class="hiRec" v-for="(item, index) in matching_rooms" :key="index">{{ item.name }}</button>
    <!-- </v-list> -->
    <!-- <v-list> -->
    <label>我的Tag </label>
    <!-- <div class="hiTag" v-for="text in textList" :key="text">{{ text }}</div> -->
    <button @click="removeMyTag(item)" class="hiTag" v-for="(item, index) in textList" :key="index">{{ item }}</button>
    <!-- </v-list>
    </v-container> -->

    <!-- 這裡以下是FIND TAG -->
    <hr class="h-color mx-2" style="border-style: dashed; border-width: 1px;">

    <!-- <v-container fluid style="margin-left:30px;"> -->
    <!-- 新增Find Tag -->
    <!-- <v-list> -->
    <label>新增 Find Tag </label>
    <input type="text" v-model="inputFindText" :placeholder="$t('inputRoomName')" class="ladyinput" />
    <a-button shape="circle" @click="addFindText"><a-icon type="plus-circle" class="hiRP"/></a-button>
    <!-- </v-list> -->
    <!-- 推薦Find Tag -->
    <!-- <v-list> -->
    <label>推薦 Find Tag </label>
    <button @click="addFindRec(item.name)" class="hiRec" v-for="(item, index) in matching_rooms" :key="index">{{ item.name }}</button>
    <!-- </v-list>
      <v-list> -->
    <label>Find Tag </label>

    <!-- <div class="hiTag" v-for="f_text in find_textList" :key="f_text">{{ f_text }}</div> -->
    <button @click="removeFindTag(item)" class="hiTag" v-for="(item, index) in find_textList" :key="index">{{ item }}</button>
    <!--
      </v-list>
    </v-container> -->

    <div>

      <a-button type="primary" @click="modal2Visible = true">
        next step <a-icon type="right-circle" />
      </a-button>

      <a-modal
        v-model="modal2Visible"
        title="[配對活動個人資訊編輯提醒]"
        centered
        @ok="joinRoom"
      >
        <!-- @ok="modal2Visible = false" -->
        <p>為了能更好的配對到合適的夥伴，</p>
        <p>在按下確認後，即無法再編輯本活動的所設定的個人資訊，</p>
        <p>請問您已經確認本活動的個人資訊是您最後的編輯結果了嗎?</p>
      </a-modal>

    </div>

  </page-header-wrapper>

</template>

<script>
  import axios from 'axios'
// console.log('RoomProfile: ', this.newRoomID)
import { ref } from 'vue'
  export default {
    // name: 'roomProfile',
    // params: ['roomID'],
  name: 'RoomProfile',
  setup () {
    // const modal1Visible = ref(false);
    const modal2Visible = ref(false)
    // const setModal1Visible = visible => {
    //   modal1Visible.value = visible;
    // }
    return {
      // modal1Visible,
      modal2Visible
      // setModal1Visible,
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
      memberID: ''
    }
  },
  methods: {
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
        this.itemList.push(this.inputValue)
        this.inputValue = ''
      }
    },
    addText () {
      if (this.aaa) {
        this.textList.push(this.aaa)
        this.aaa = ''
      }
    },
    addRec (item) {
        this.textList.push(item)
        this.inputText = ''
    },
    addFindText () {
      if (this.inputFindText) {
        this.find_textList.push(this.inputFindText)
        this.inputFindText = ''
      }
    },
    addFindRec (item) {
        this.find_textList.push(item)
        this.inputFindText = ''
    },
    joinRoom () {
      this.modal2Visible = false
      // 這是先join room
      const token = sessionStorage.getItem('token')
      console.log(token)
      axios.post('/api/v1/mr-member/create', {
        user: {
          // 這邊之後要改
          email: 'admin@sdm-teamatch.com',
          is_admin: false,
          name: '--'
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
    console.log(joinResponse)
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
            query: { roomID: this.newRoomID, memberID: this.memberID }
          })
  })

  .catch((error) => console.log(error))
  console.log('roomID: ', this.newRoomID, '/ memberID:', this.memberID)
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

    // 這裡是照片的method
    async fetchUserProfile () {
    try {
      const response = await fetch('/api/v1/users/profile/me', {
        credentials: 'include'
      })
      const data = await response.json()
      // 取得姓名和email並更新HTML
      document.getElementById('name').textContent = data.data.name
      document.getElementById('email').textContent = data.data.email
      document.getElementById('id').value = data.data.line_id
      console.log('hihi')
      console.log(data.data.line_id)
      this.originalId = data.data.line_id
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }
  },
  mounted: function () {
    this.refresh_mr()
    this.fetchUserProfile()
    // this.newRoomID = this.$route.query.roomID
  }
  // created () {
  //   const roomID1 = this.$route.query.roomID
  //   // this.newRoomID = roomID1
  //   console.log('roomID1:', roomID1)
  // }
  }
  </script>

  <style>
.ladygaga{
  background-color: white;
  border: 1px solid black;
  /* color: black; */
  padding: 6px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin: 4px;
  cursor: pointer;
  border-radius: 3rem;
  /* flex: 1; */
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
    margin-right: 10px;
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
