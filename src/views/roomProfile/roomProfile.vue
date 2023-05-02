
<template>
  <page-header-wrapper>

    <v-app>
      <!-- 這一行要加 不然會有不置中的問題 -->
      <v-navigation-drawer></v-navigation-drawer>
      <!--                              -->

      <!-- 改這個地方!!!!!! -->
      <v-main>

        <h2 class="text-left hahaMR">&nbsp&nbsp&nbsp&nbsp 這裡要接後端的[配對活動名稱] | {{ $t('matchingRoomProfile') }}</h2>
        <hr class="h-color mx-2">
        <div style="text-align: right; margin-top: -15px;">關閉時間 : [這裡接後端時間] | <i class="bi bi-people-fill"></i> [接後端目前人數]/[接後端總共人數]</div>
        <!-- <v-container fluid> -->
        <v-container fluid class="profileBody">
          <div class="avatar profileBody">
            <img src="avatar.png" alt="User Avatar">
          </div>
          <div style="margin-top:10px; font:15px;">
            <div class="name-info">
              <label for="name">{{ $t('name') }}:</label>
              <span id="name"></span>
            </div>

            <div class="email-info">
              <label for="email">{{ $t('email') }}:</label>
              <span id="email"></span>
            </div>

            <div class="id-info">
              <label for="id">{{ $t('my_id') }}:</label>
              <span id="id"></span> 這裡還沒接ID
            </div>
          </div>
        </v-container>
        <v-container fluid style="margin-left:30px;">
          <!-- 新增我的Tag -->
          <v-list>
            <label>新增我的Tag </label>
            <input type="text" v-model="aaa" @keyup.enter="addText" :placeholder="$t('inputRoomName')" class="ladyinput" />
            <button @click="addText"><i class="bi bi-plus-circle hiRP"></i></button>
          </v-list>
          <!-- 推薦我的Tag -->
          <v-list>
            <label>推薦我的Tag </label>
            <button @click="addRec(item.name)" class="hiRec" v-for="(item, index) in matching_rooms" :key="index">{{ item.name }}</button>
          </v-list>
          <v-list>
            <label>我的Tag </label>

            <div class="hiTag" v-for="text in textList" :key="text">{{ text }}</div>

            <!-- <input type="text" v-model="inputText" @keyup.enter="addText" />
        <button @click="addText">Add Text</button>
        <ul>
        <li v-for="text in textList" :key="text">{{ text }}</li>
        </ul> -->
          </v-list>
        </v-container>

        <!-- 這裡以下是FIND TAG -->
        <hr class="h-color mx-2" style="border-style: dashed; border-width: 1px;">

        <v-container fluid style="margin-left:30px;">
          <!-- 新增Find Tag -->
          <v-list>
            <label>新增 Find Tag </label>
            <input type="text" v-model="inputFindText" @keyup.enter="addFindText" :placeholder="$t('inputRoomName')" class="ladyinput" />
            <button @click="addFindText"><i class="bi bi-plus-circle hiRP"></i></button>
          </v-list>
          <!-- 推薦Find Tag -->
          <v-list>
            <label>推薦 Find Tag </label>
            <button @click="addFindRec(item.name)" class="hiRec" v-for="(item, index) in matching_rooms" :key="index">{{ item.name }}</button>
          </v-list>
          <v-list>
            <label>Find Tag </label>

            <div class="hiTag" v-for="f_text in find_textList" :key="f_text">{{ f_text }}</div>

          </v-list>
        </v-container>

        <!-- 這裡是要確認的pop up -->
        <v-container >
          <div style="text-align: right; margin-right:10px;">
            <b-button @click="showPopup = true"><i class="bi bi-arrow-right-circle hiRP"></i></b-button>
          </div>
          <div v-if="showPopup" :show="showPopup" @close="showPopup = false">
            <div class="popup-overlay" v-if="show">
              <div class="popup_RP">

                <h5 class="gaga_RP">[配對活動個人資訊編輯提醒]</h5>
                <p>{{ romm_id }}</p>
                <h6 style="text-align: center; margin-top: 10px;">為了能更好的配對到合適的夥伴，</h6>
                <h6 style="text-align: center;">在按下確認後，即無法再編輯本活動的所設定的個人資訊，</h6>
                <h6 style="text-align: center;">請問您已經確認本活動的個人資訊是您最後的編輯結果了嗎?</h6>

                <div class="ladyhaha_RP">
                  <button @click="showPopup = false" class="ladygaga">不，我再想想</button>
                  <button @click="submitInput" class="ladygaga">對，我確定了</button>
                </div>
                <div class="popup-body">
                  <slot></slot>
                </div>
              </div>
            </div>
          </div>

        </v-container>
        <div>

        </div>
      </v-main>

    </v-app>
  </page-header-wrapper>
</template>

  <script>
//   import ChangeLang from '../components/ChangeLang.vue'
//   import SearchBar from '../components/SearchBar.vue'
//   import axios from 'axios'

  export default {
    props: {
    // roomId: {
    //   type: String
    // }
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
      showPopup: false

    }
  },
//   components: {
//   ChangeLang,
//   SearchBar
//   },
  methods: {
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
  }
  }
  </script>

  <style>
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
    margin-left: 10px;
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
