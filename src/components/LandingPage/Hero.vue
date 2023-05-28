<template>
  <section class="relative">
    <div class="container flex flex-col-reverse lg:flex-row items-center pag-12 mt-14 lg:mt-28">
      <div class="flex flex-1 flex-col items-center lg:items-start">
        <h2 class="text-white text-3xl md:text-4 leg:text-5xl text-center lg:text-left mb-6">The ultime USB
          microphone</h2>
        <p class="text-bookmark-grey text-lg text-center lg:text-left mb-6">Create incomparable recordings with
          your computer. Yeti microphones produce pristine, studio-quality recordings with legendary ease.</p>
        <div class="flex justify-center felx-wrap gap-6">
          <button
            type="button"
            class="btn btn-purple hover:bg-bookmark-white hover:text-black">Discover</button>
        </div>
      </div>
      <div class="flex flex-1 items-center justify-end mb-10 md:mb-16 lg:mb-0 z-10">
        <div style="width: 650px; height: 550px; margin-left: auto;">
          <Tinder
            ref="tinder"
            key-name="id"
            :queue.sync="queue"
            :offset-y="10"
            @submit="onSubmit"
            style="padding-left: 300px;">
            <template slot-scope="scope">
              <div
                class="pic"
                :style="{
                  'background-image': `url(https://cn.bing.com//th?id=OHR.${scope.data.id}_UHD.jpg&pid=hp&w=720&h=1280&rs=1&c=4&r=0)`
                }"
              />
            </template>
            <img class="like-pointer" slot="like" src="@/assets/vue-tinder/like-txt.png">
            <img class="nope-pointer" slot="nope" src="@/assets/vue-tinder/nope-txt.png">
            <img class="super-pointer" slot="super" src="@/assets/vue-tinder/super-txt.png">
            <img class="rewind-pointer" slot="rewind" src="@/assets/vue-tinder/rewind-txt.png">
          </Tinder>
          <div
            class="btns"
            style="left: 580px;">
            <img src="@/assets/vue-tinder/rewind.png" @click="decide('rewind')">
            <img src="@/assets/vue-tinder/nope.png" @click="decide('nope')">
            <img src="@/assets/vue-tinder/super-like.png" @click="decide('super')">
            <img src="@/assets/vue-tinder/like.png" @click="decide('like')">
            <img src="@/assets/vue-tinder/help.png" @click="decide('help')">
          </div>
        </div>
      </div>
      <div
        class="hidden md:block overflow-hidden bg-bookmark-purple rounded-l-full absolute h-80 w-2/4 top-32 right-0 lg:-bottom-28 lg:-right-30">
      </div>

    </div>
  </section>
</template>

<script>
import Tinder from 'vue-tinder'
import source from './bingLand'

export default {
  name: 'App',
  components: { Tinder },
  data () {
    return {
      queue: [],
      offset: 0,
      history: []
    }
  },
  created () {
    this.mock()
  },
  methods: {
    mock (count = 5, append = true) {
      const list = []
      for (let i = 0; i < count; i++) {
        list.push({ id: source[this.offset] })
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

<style>

html,
body {
  height: 100%;
}

body {
  margin: 0;
  background-color: #20262e;
  overflow-y: scroll;
}

#app .vue-tinder {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 23px;
  margin: auto;
  width: calc(100% - 20px);
  height: calc(100% - 23px - 65px - 47px - 16px);
  min-width: 300px;
  max-width: 355px;
  /* width: 355px;
  height: 594px; */
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

/* .btns {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  margin: auto;
  margin-left: auto;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  min-height: 65px;
  max-width: 355px;
  padding-left: 300px;
} */

.btns {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 30px;
  /* margin-right: 593.75px;
  margin-left: 593.75px; */
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: flex-end; /*Align the content to the right*/
  min-width: 300px;
  min-height: 65px;
  max-width: 355px;
  /* padding-right: 300px; */
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
</style>
