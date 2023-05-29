<!-- <template>
  <section class="relative">
    <div class="container flex flex-col-reverse lg:flex-row items-center pag-12 mt-14 lg:mt-28">
      <div class="flex flex-1 flex-col items-center lg:items-start">
        <h2 class="text-white text-3xl md:text-4 leg:text-5xl text-center lg:text-left mb-6">TeaMatch 你的組隊神器</h2>
        <p class="text-bookmark-grey text-lg text-center lg:text-left mb-6">開學到了教室卻發現沒有認識的人可以一起討論嗎？<br>
          要分組做課堂報告卻找不到合得來的隊友嗎？<br>
          TeamMatch 就是你最強的隊友！<br>
          只需要像交友軟體一樣左滑右滑就可以找到適合的夥伴
        </p>
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
                  backgroundImage: getImageUrl(scope.data.id)
                }"
                @click="logId(scope.data.id)"
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
            <img src="@/assets/vue-tinder/nope.png" @click="decide('nope')">
            <img src="@/assets/vue-tinder/like.png" @click="decide('like')">
          </div>
          <div class="null"><p>錯過的就錯過囉<br>好好把握每次的機會！</p></div>
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
import '@/index.css'

export default {
  name: 'App',
  components: { Tinder },
  data () {
    return {
      queue: [],
      offset: 0,
      history: [],
      idolList: ['idol1.jpg', 'idol2.jpg', 'idol3.jpg', 'idol4.jpg', 'idol5.jpg']
    }
  },
  created () {
    this.mock()
  },
  methods: {
    getImageUrl () {
      return (img) => require('@/assets/idols/' + img)
  },
    logId (id) {
    console.log(id)
  },
    mock (count = 5, append = true) {
      const list = []
      for (let i = 0; i < count; i++) {
        list.push({ id: this.idolList[this.offset] })
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
  margin: auto;
  left: 0;
  right: 0;
  bottom: 30px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 120px;
  min-height: 65px;
  max-width: 120px;
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

.null {
    margin-top: 250px;
    margin-left: 180px;
    text-align: center;
    font-size: 24px;
    z-index: -1;
    color: aliceblue;
}
</style> -->

<!-- <template>
  <section class="relative">
    <div class="container flex flex-col-reverse lg:flex-row items-center pag-12 mt-14 lg:mt-28">
      <div class="flex flex-1 flex-col items-center lg:items-start">
        <h2 class="text-white text-3xl md:text-4 leg:text-5xl text-center lg:text-left mb-6">TeaMatch 你的組隊神器</h2>
        <p class="text-bookmark-grey text-lg text-center lg:text-left mb-6">開學到了教室卻發現沒有認識的人可以一起討論嗎？<br>
          要分組做課堂報告卻找不到合得來的隊友嗎？<br>
          TeamMatch 就是你最強的隊友！<br>
          只需要像交友軟體一樣左滑右滑就可以找到適合的夥伴
        </p>
      </div>
      <div class="flex flex-1 items-center justify-end mb-10 md:mb-16 lg:mb-0 z-10">
        <div class="tinder-container">
          <Tinder
            ref="tinder"
            key-name="id"
            :queue.sync="queue"
            :offset-y="10"
            @submit="onSubmit"
            style="width: 355px; height: 400px;"
          >
            <template slot-scope="scope">
              <div
                class="pic"
                :style="{
                  backgroundImage: getImageUrl(scope.data.id)
                }"
                @click="logId(scope.data.id)"
              />
            </template>
            <img class="like-pointer" slot="like" src="@/assets/vue-tinder/like-txt.png">
            <img class="nope-pointer" slot="nope" src="@/assets/vue-tinder/nope-txt.png">
            <img class="super-pointer" slot="super" src="@/assets/vue-tinder/super-txt.png">
            <img class="rewind-pointer" slot="rewind" src="@/assets/vue-tinder/rewind-txt.png">
          </Tinder>
          <div class="btns">
            <img src="@/assets/vue-tinder/nope.png" class="btn-icon" @click="decide('nope')">
            <img src="@/assets/vue-tinder/like.png" class="btn-icon" @click="decide('like')">
          </div>
          <div class="null"><p>錯過的就錯過囉<br>好好把握每次的機會！</p></div>
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
import '@/index.css'

export default {
  name: 'App',
  components: { Tinder },
  data () {
    return {
      queue: [],
      offset: 0,
      history: [],
      idolList: ['idol1.jpg', 'idol2.jpg', 'idol3.jpg', 'idol4.jpg', 'idol5.jpg']
    }
  },
  created () {
    this.mock()
  },
  methods: {
    getImageUrl () {
      return (img) => require('@/assets/idols/' + img)
    },
    logId (id) {
      console.log(id)
    },
    mock (count = 5, append = true) {
      const list = []
      for (let i = 0; i < count; i++) {
        list.push({ id: this.idolList[this.offset] })
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

.pic {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.btns {
  position: absolute;
  bottom: 30px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.btn-icon {
  margin-right: 12px;
  width: 65px;
  height: 65px;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.null {
  margin-top: 250px;
  margin-left: 180px;
  text-align: center;
  font-size: 24px;
  z-index: -1;
  color: aliceblue;
}

@media (max-width: 1024px) {
  .null {
    margin-top: 150px;
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    text-align: center;
  }

  .tinder-container {
    margin-left: auto;
    margin-right: auto;
  }

  .btns {
    position: static;
    margin-top: 20px;
    justify-content: center;
  }

  .null {
    margin-left: auto;
    margin-right: auto;
  }
}
</style> -->

<template>
  <section class="relative">
    <div class="container flex flex-col-reverse lg:flex-row items-center pag-12 mt-14 lg:mt-28">
      <div class="flex flex-1 flex-col items-center lg:items-start">
        <h2 class="text-white text-3xl md:text-4 leg:text-5xl text-center lg:text-left mb-6">TeaMatch 你的組隊神器</h2>
        <p class="text-bookmark-grey text-lg text-center lg:text-left mb-6">開學到了教室卻發現沒有認識的人可以一起討論嗎？<br>
          要分組做課堂報告卻找不到合得來的隊友嗎？<br>
          TeamMatch 就是你最強的隊友！<br>
          只需要像交友軟體一樣左滑右滑就可以找到適合的夥伴
        </p>
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
                  backgroundImage: getImageUrl(scope.data.id)
                }"
                @click="logId(scope.data.id)"
              />
            </template>
            <img class="like-pointer" slot="like" src="@/assets/vue-tinder/like-txt.png">
            <img class="nope-pointer" slot="nope" src="@/assets/vue-tinder/nope-txt.png">
            <img class="super-pointer" slot="super" src="@/assets/vue-tinder/super-txt.png">
            <img class="rewind-pointer" slot="rewind" src="@/assets/vue-tinder/rewind-txt.png">
          </Tinder>
          <div class="btns">
            <img src="@/assets/vue-tinder/nope.png" class="btn-icon" @click="decide('nope')">
            <img src="@/assets/vue-tinder/like.png" class="btn-icon" @click="decide('like')">
          </div>
          <div class="null"><p>錯過的就錯過囉<br>好好把握每次的機會！</p></div>
        </div>
      </div>
      <div class="hidden md:block overflow-hidden bg-bookmark-purple rounded-l-full absolute h-80 w-2/4 top-32 right-0 lg:-bottom-28 lg:-right-30">
      </div>
    </div>
  </section>
</template>

<script>
import Tinder from 'vue-tinder'
import '@/index.css'

export default {
  name: 'App',
  components: { Tinder },
  data () {
    return {
      queue: [],
      offset: 0,
      history: [],
      idolList: ['idol1.jpg', 'idol2.jpg', 'idol3.jpg', 'idol4.jpg', 'idol5.jpg']
    }
  },
  created () {
    this.mock()
  },
  methods: {
    getImageUrl () {
      return (img) => require('@/assets/idols/' + img)
    },
    logId (id) {
      console.log(id)
    },
    mock (count = 5, append = true) {
      const list = []
      for (let i = 0; i < count; i++) {
        list.push({ id: this.idolList[this.offset] })
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
}
</style>
