<template>
  <section class="relative">
    <div class="container flex flex-col-reverse lg:flex-row items-center pag-12 mt-14 lg:mt-28">
      <div class="flex flex-1 flex-col items-center lg:items-start">
        <h2 class="text-white text-3xl md:text-4 leg:text-5xl text-center lg:text-left mb-6">{{ $t('room.logintitle4') }}</h2>
        <p class="text-bookmark-grey text-lg text-center lg:text-left mb-6">{{ $t('room.loginmsg4') }}</p>
        <p class="text-bookmark-grey text-lg text-center lg:text-left mb-6">{{ $t('room.loginmsg5') }}</p>
        <p class="text-bookmark-grey text-lg text-center lg:text-left mb-6">{{ $t('room.loginmsg6') }}</p>
        <p class="text-bookmark-grey text-lg text-center lg:text-left mb-6">{{ $t('room.loginmsg7') }}</p>
        <!-- <div class="flex justify-center felx-wrap gap-6">
          <button
            type="button"
            class="btn btn-purple hover:bg-bookmark-white hover:text-black">Discover</button>
        </div> -->
      </div>
      <div class="flex flex-1 items-center justify-end mb-10 md:mb-16 lg:mb-0 z-10">
        <div class="tinder-container">
          <Tinder
            ref="tinder"
            key-name="id"
            :queue.sync="queue"
            :offset-y="10"
            @submit="onSubmit"
            style="width: 355px; height: 450px;"
          >
            <template slot-scope="scope">
              <div
                class="pic"
                :style="{
                  'background-image': `url(${scope.data.image})`
                }"
                @click="logId(scope.data.id)"
              />
            </template>
            <img class="like-pointer" slot="like" src="@/assets/vue-tinder/like-txt.png">
            <img class="nope-pointer" slot="nope" src="@/assets/vue-tinder/nope-txt.png">
            <img class="super-pointer" slot="super" src="@/assets/vue-tinder/like-txt.png">
            <img class="rewind-pointer" slot="rewind" src="@/assets/vue-tinder/rewind-txt.png">
          </Tinder>
          <div class="btns">
            <img src="@/assets/vue-tinder/nope.png" class="btn-icon" @click="decide('nope')">
            <img src="@/assets/vue-tinder/like.png" class="btn-icon" @click="decide('like')">
          </div>
          <div class="null"><p>{{ $t('room.loginmsg8') }}<br>{{ $t('room.loginmsg9') }}</p></div>
        </div>
      </div>
      <div class="hidden md:block overflow-hidden bg-bookmark-purple rounded-l-full absolute h-80 w-2/4 top-32 right-0 lg:-bottom-28 lg:-right-30">
      </div>
    </div>
  </section>
</template>

<script>
import Tinder from 'vue-tinder'
import source from './bingLand'
import '@/index.css'

export default {
  name: 'App',
  components: { Tinder },
  data () {
    return {
      queue: [],
      offset: 0,
      history: [],
      image: [
        'https://i1.sndcdn.com/artworks-lSuIGktDCQ0R2pBJ-VnmRxA-t500x500.jpg',
        'https://apicms.thestar.com.my/uploads/images/2021/10/13/1329408.jpeg',
        'https://cdn.meadd.net/photos/full/73090663.jpg',
        'https://cc.tvbs.com.tw/img/upload/2023/04/11/20230411144313-18f73ec1.jpeg',
        // 'https://i.pinimg.com/originals/b2/70/17/b27017e15b706dd8a0f9aa82927c6b25.jpg',
        'https://s.yimg.com/ny/api/res/1.2/69tDbgu_PxeYD0U5tyCKLA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTk5OA--/https://s.yimg.com/os/zh_Hant_TW/News/MyDaily/201807091107339933_2.jpg'

      ]
    }
  },
  created () {
    this.mock()
  },
  methods: {
    mock (count = 5, append = true) {
      const list = []
      for (let i = 0; i < count; i++) {
        list.push({ id: source[this.offset], image: this.image[this.offset] })
        this.offset++
      }
      if (append) {
        this.queue = this.queue.concat(list)
      } else {
        this.queue.unshift(...list)
      }
    },
    onSubmit ({ item }) {
      if (this.queue.length < 3) {
        this.mock()
      }
      this.history.push(item)
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
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  margin: 0;
  background-color: #20262e;
  overflow-y: scroll;
}

.tinder-container {
  position: relative;
  width: 355px;
  height: 500px;
  margin-left: auto;
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
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}

.btn-icon {
  margin: 0 8px;
  width: 48px;
  height: 48px;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.null {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 24px;
  color: aliceblue;
  margin-top: 50px;
}

.null1 {
    /* margin-top: 250px; */
    margin-right: 5px;
    margin-top: 270px;
    text-align: center;
    font-size: 20px;
    color: white;
    z-index: -1;
}
</style>
