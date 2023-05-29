/* eslint-disable */
<template>
  <div id="app">
    <Tinder ref="tinder" key-name="id" :queue.sync="queue" :offset-y="10" @submit="onSubmit">
      <template slot-scope="scope">
        <div
          v-show="queue"
          class="pic"
          :style="{
            'background-image': `url(${scope.data.image})`
          }"
        >
          <span class="info">
            <span class="title">{{ scope.data.name }}</span>
            <span class="rating" v-for="(self_tag, index) in scope.data.self_tag_text" :key="self_tag.id">{{ self_tag }}
              <span v-if="index !== scope.data.self_tag_text.length - 1">&nbsp;</span>
            </span>
          </span>
        </div>
      </template>
      <!-- <template slot-scope="scope">
        <div class="item-name">
          <span class="item-first">{{ scope.name[0] }}</span>
        </div>
      </template> -->
      <img class="like-pointer" slot="like" src="../../assets/vue-tinder/like-txt.png">
      <img class="nope-pointer" slot="nope" src="../../assets/vue-tinder/nope-txt.png">
      <img class="like-pointer" slot="super" src="../../assets/vue-tinder/like-txt.png">
      <img class="rewind-pointer" slot="rewind" src="../../assets/vue-tinder/rewind-txt.png">
    </Tinder>
    <div class="btns">
      <!-- <img src="../../assets/vue-tinder/rewind.png" @click="decide('rewind')"> -->
      <img src="../../assets/vue-tinder/nope.png" @click="decide('nope')">
      <!-- <img src="../../assets/vue-tinder/super-like.png" @click="decide('super')"> -->
      <img style="background-color: white; width:50px;" src="../../assets/vue-tinder/exit.png" @click="leaveRoom">
      <img src="../../assets/vue-tinder/like.png" @click="decide('like')">
      <!-- <img src="../../assets/vue-tinder/help.png" @click="decide('help')"> -->
    </div>
    <div class="null">{{ $t('room.nomember') }}</div>
  </div>
</template>

  <script>
  import Tinder from 'vue-tinder'
  import source from './bing'
  import axios from 'axios'

  export default {
    name: 'Swipe',
    components: { Tinder },
    data () {
 return {
      queue: [],
      offset: 0,
      history: [],
      recom: [],
      swipe: [],
      roomID: this.$route.query.roomID,
      memberID: this.$route.query.memberID,
      tag: [],
      email: '',
      name: ''
    }
},
    created () {
      // const roomID = this.$route.query.roomID
      // const memberID = this.$route.query.memberID
      this.mock()
      console.log(this.roomID, this.memberID)
      this.fetchUser()
    },
    methods: {
      // getRecom () {
      //   const token = sessionStorage.getItem('token')
      //   console.log(token)
      //   axios.post('/api/v1/swipe-card/swipe-recommend', {
      //     member_id: '12',
      //     room_uuid: '58102867-1773-4c68-a78f-d6da7124bb2d'
      //   }, {
      //     headers: {
      //       'Authorization': 'Bearer ' + token
      //     }
      //   })
      //   .then((gRResponse) => {
      //     this.recom = gRResponse.data.data.map (member => {
      //       return {
      //         member_id: member.member_id,
      //         room_uuid: member.room_uuid,
      //         recommended_member_id: member.recommended_member_id,
      //         self_tag_text: member.self_tag_text,
      //         find_tag_text: member.find_tag_text,
      //         image: member.image,
      //         name: member.name
      //       }
      //     })
      //       console.log(this.recom)
      //       console.log(this.recom[1].name)
      //       console.log(token)
      //       return this.recom
      //   })
      //   .catch((error) => console.log(error))
      // },
      async leaveRoom () {
        const token = sessionStorage.getItem('token')
        console.log('leave room method', token)
        console.log('leave room method', this.email, this.name)
        const config = {
                          headers: {
                            'Authorization': 'Bearer ' + token
                          },
                          data: {
                                  user:
                                  {
                                      email: this.email,
                                      is_admin: false,
                                      name: this.name
                                  },
                                  matching_room:
                                  {
                                    room_id: this.roomID
                                  }
                          }
                        }
        axios.delete('/api/v1/mr-member/', config)
        .then((leaveR) => {
          console.log(leaveR)
          const currentUrl = window.location.href
          const pathname = window.location.pathname
          const newUrl = currentUrl.replace(pathname, '/home')
          window.location.replace(newUrl)
        })
        .catch((error) => console.log('失敗囉廢物', error))
      },
      fetchUser () {
      const token = sessionStorage.getItem('token')
      console.log(token)
      axios.get('/api/v1/users/profile/me', {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then((userR) => {
          this.email = userR.data.data.email
          this.name = userR.data.data.name
          console.log('fetch method', userR)
        })

        .catch((error) => console.log(error))
    },
      mock (count = 5, append = true) {
        const token = sessionStorage.getItem('token')
        // console.log(this.roomID)
        axios.post('/api/v1/swipe-card/swipe-recommend', {
          member_id: this.memberID,
          room_id: this.roomID
        }, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then((gRResponse) => {
          this.recom = gRResponse.data.data.map (member => {
            return {
              member_id: member.member_id,
              room_id: member.room_id,
              recommended_member_id: member.recommended_member_id,
              self_tag_text: member.self_tag_text,
              find_tag_text: member.find_tag_text,
              image: member.image,
              name: member.name
            }
          })
          console.log(this.recom)
          console.log(this.recom[0].name)
          console.log(this.recom.length)
          console.log(this.offset)
          console.log(this.recom[0].self_tag_text)
          const list = []
          for (let i = 0; i < this.recom.length; i++) {
            list.push({ id: source[this.offset], image: this.recom[this.offset].image, name: this.recom[this.offset].name, recommended_member_id: this.recom[this.offset].recommended_member_id, self_tag_text: this.recom[this.offset].self_tag_text })
            this.offset++
          }
          console.log('這是list', list)
          // for (let i = 0; i < count; i++) {
          //   list.push({ id: source[this.offset] })
          //   this.offset++
          // }
          if (append) {
            this.queue = this.queue.concat(list)
          } else {
            this.queue.unshift(...list)
          }
          })
      .catch((error) => console.log(error))
      },
      onSubmit (choice) {
        if (choice.type === 'like' || choice.type === 'super') {
          const token = sessionStorage.getItem('token')
          console.log(token)
          axios.post('/api/v1/swipe-card/swipe', {
            member_id: this.memberID,
            room_id: this.roomID,
            target_member_id: choice.item.recommended_member_id,
            is_liked: true,
            is_hated: false
          }, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
          .then((swipeResponse) => {
            this.swipe = swipeResponse.data.data.map (swipeMember => {
              return {
                member_id: swipeMember.member_id,
                room_id: swipeMember.room_id,
                target_member_id: swipeMember.recommended_member_id,
                is_liked: swipeMember.is_liked,
                is_hated: swipeMember.is_hated
              }
            })
        })
      }
      if (choice.type === 'nope') {
          const token = sessionStorage.getItem('token')
          console.log(token)
          axios.post('/api/v1/swipe-card/swipe', {
            member_id: this.memberID,
            room_id: this.roomID,
            target_member_id: choice.item.recommended_member_id,
            is_liked: false,
            is_hated: true
          }, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
          .then((swipeResponse) => {
            this.swipe = swipeResponse.data.data.map (swipeMember => {
              return {
                member_id: swipeMember.member_id,
                room_id: swipeMember.room_id,
                target_member_id: swipeMember.recommended_member_id,
                is_liked: swipeMember.is_liked,
                is_hated: swipeMember.is_hated
              }
            })
        })
      }
        if (this.queue.length < 3) {
          this.mock()
        }
        this.history.push(choice.item)
      },
      async decide (choice) {
        this.$refs.tinder.decide(choice)
        }
    }
    // mounted: function () {
    //   this.mock()
    // }
  }
  </script>

  <style>
  html,
  body {
    height: 100%;
  }

  body {
    margin: 0;
    background-color: #20262e;
    overflow: hidden;
  }

  #app .vue-tinder {
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 23px;
    margin: auto;
    width: calc(100% - 20px);
    height: calc(100% - 20px - 65px - 47px - 16px);
    min-width: 300px;
    max-width: 355px;
  }

  .nope-pointer,
  .like-pointer {
    position: absolute;
    z-index: 1;
    top: 20px;
    width: 100px;
    height: 100px;
  }

  .nope-pointer {
    right: 10px;
  }

  .like-pointer {
    left: 10px;
  }

  .super-pointer {
    position: absolute;
    z-index: 1;
    bottom: 80px;
    left: 0;
    right: 0;
    margin: auto;
    width: 112px;
    height: 78px;
  }

  .rewind-pointer {
    position: absolute;
    z-index: 1;
    top: 20px;
    right: 10px;
    width: 112px;
    height: 78px;
  }

  .pic {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  .btns {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 30px;
    margin: auto;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 300px;
    max-width: 355px;
  }

  .btns img {
    margin-right: 12px;
    box-shadow: 0 4px 9px rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .btns img:nth-child(2n + 1) {
    width: 65px;
  }

  .btns img:nth-child(2n) {
    width: 65px;
  }

  .btns img:nth-last-child(1) {
    margin-right: 0;
  }

  /* .title {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px;
    width: 100%;
    font-family: sans-serif;
    font-size: 18px;
    color: #fff;
    text-shadow: 0 0 1px #000;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.7) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    text-transform: uppercase;
    font-size: 24px;
    width: 100%;
    display: block;
} */

  .info {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px;
    width: 100%;
    font-family: sans-serif;
    font-size: 18px;
    color: #fff;
    text-shadow: 0 0 1px #000;
    /* -webkit-text-stroke: 1px black;*/
    background: rgb(0, 0, 0);
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.7) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  .title {
    text-transform: uppercase;
    font-size: 24px;
    width: 100%;
    display: block;
  }

  .tag {
    margin-right: 5px;
    display: inline-block;
  }

  .null {
    margin-top: 250px;
    text-align: center;
    font-size: 24px;
    z-index: -1;
}
  </style>
