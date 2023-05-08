/* eslint-disable */
<template>
  <div id="app">
    <Tinder ref="tinder" key-name="id" :queue.sync="queue" :offset-y="10" @submit="onSubmit">
      <template slot-scope="scope">
        <div
          v-show="queue"
          class="pic"
          :style="{
            'background-image': `url(https://cn.bing.com//th?id=OHR.${scope.data.id}_UHD.jpg&pid=hp&w=720&h=1280&rs=1&c=4&r=0)`
          }"
        >
          <span class="title">{{ scope.data.name }}</span>
        </div>
      </template>
      <!-- <template slot-scope="scope">
        <div class="item-name">
          <span class="item-first">{{ scope.name[0] }}</span>
        </div>
      </template> -->
      <img class="like-pointer" slot="like" src="../../assets/vue-tinder/like-txt.png">
      <img class="nope-pointer" slot="nope" src="../../assets/vue-tinder/nope-txt.png">
      <img class="super-pointer" slot="super" src="../../assets/vue-tinder/super-txt.png">
      <img class="rewind-pointer" slot="rewind" src="../../assets/vue-tinder/rewind-txt.png">
    </Tinder>
    <div class="btns">
      <img src="../../assets/vue-tinder/rewind.png" @click="decide('rewind')">
      <img src="../../assets/vue-tinder/nope.png" @click="decide('nope')">
      <img src="../../assets/vue-tinder/super-like.png" @click="decide('super')">
      <img src="../../assets/vue-tinder/like.png" @click="decide('like')">
      <img src="../../assets/vue-tinder/help.png" @click="decide('help')">
    </div>
  </div>
</template>

  <script>
  import Tinder from 'vue-tinder'
  import source from './bing'
  import axios from 'axios'

  export default {
    name: 'App',
    components: { Tinder },
    data: () => ({
      queue: [],
      offset: 0,
      history: [],
      recom: [],
      swipe: [],
      roomID: this.$route.query.roomID,
      memberID: this.$route.query.memberID
    }),
    created () {
      this.mock()
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
      mock (count = 5, append = true) {
        const token = sessionStorage.getItem('token')
        console.log(token)
        axios.post('/api/v1/swipe-card/swipe-recommend', {
          member_id: this.memberID,
          room_uuid: this.roomID
        }, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then((gRResponse) => {
          this.recom = gRResponse.data.data.map (member => {
            return {
              member_id: member.member_id,
              room_uuid: member.room_uuid,
              recommended_member_id: member.recommended_member_id,
              self_tag_text: member.self_tag_text,
              find_tag_text: member.find_tag_text,
              image: member.image,
              name: member.name
            }
          })
            console.log(this.recom)
            console.log(this.recom[1].name)
            const list = []
            for (let i = 0; i < this.recom.length; i++) {
              list.push({ id: source[this.offset], name: this.recom[this.offset].name, recommended_member_id: this.recom[this.offset].recommended_member_id })
              this.offset++
            }
            console.log(list)
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
        if (choice.type === 'like') {
          const token = sessionStorage.getItem('token')
          console.log(token)
          axios.post('/api/v1/swipe-card/swipe', {
            member_id: this.memberID,
            room_uuid: this.roomID,
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
                room_uuid: swipeMember.room_uuid,
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
            room_uuid: this.roomID,
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
                room_uuid: swipeMember.room_uuid,
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
        if (choice === 'rewind') {
          if (this.history.length) {
            this.$refs.tinder.rewind([this.history.pop()])
          }
        } else if (choice === 'help') {
          window.open('https://shanlh.github.io/vue-tinder')
        } else {
          this.$refs.tinder.decide(choice)
        }
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
    width: 64px;
    height: 64px;
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
    width: 53px;
  }

  .btns img:nth-child(2n) {
    width: 65px;
  }

  .btns img:nth-last-child(1) {
    margin-right: 0;
  }

  .title {
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
    text-transform: uppercase;
    font-size: 24px;
    width: 100%;
    display: block;
}
  </style>
