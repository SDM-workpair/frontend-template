<template>
  <div :class="wrpCls">

    <span class="ant-dropdown-trigger ant-pro-global-header-index-action" @click="handleBellClick">
      <a href="#">
        <a-badge :count="messageCount">
          <a-icon type="bell" />
        </a-badge>
      </a>
    </span>

    <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
    <select-lang :class="prefixCls" />
    <br>

    <a-drawer :title="$t('nav.notification')" :visible="drawerVisible" :width="350" :closable="true" @close="handleDrawerClose">
      <p v-for="(item, index) in myList" :key="index">{{ item.content }}</p>
    </a-drawer>

  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import SelectLang from '@/components/SelectLang'
import axios from 'axios'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    SelectLang
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMenu: true,
      currentUser: {},
      messageCount: 0,
      drawerVisible: false,
      token: null
    }
  },
  computed: {
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
  },
  created () {
    this.token = sessionStorage.getItem('token')
    console.log('initWebSocket')
    this.initWebSocket()
  },
  mounted () {
    if (!this.token) {
      const currentUrl = window.location.href
      const pathname = window.location.pathname
      const newUrl = currentUrl.replace(pathname, '/user/login')
      window.location.replace(newUrl)
    }

    setTimeout(() => {
      const currentUrl = window.location.href
      const pathname = window.location.pathname
      const newUrl = currentUrl.replace(pathname, '/user/login')
    }, 2000)
    // this.initWebSocket()
    fetch('/api/v1/notification/my-list', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.unread_num)
      this.messageCount = data.unread_num
    })
    .catch(error => {
      console.error('Failed to fetch notifications:', error)
    })
  },
  methods: {
    async handleBellClick () {
      console.log('open')
      this.messageCount = 0

      fetch('/api/v1/notification/my-list', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.data)
        this.myList = data.data
        this.myList = this.myList.reverse()
        this.drawerVisible = true
      })
      .catch(error => {
        console.error('Failed to fetch notifications:', error)
      })
      fetch('/api/v1/notification/set-read', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      })
    },

    handleDrawerClose () {
      // Close the drawer
      this.drawerVisible = false
    },

    initWebSocket () {
      // const url = `ws://0.0.0.0:8000/ws/${this.token}`
      // const url = `ws://35.212.156.71:8000/ws/${this.token}`
      console.log('heeeeeeeeeeee', this.token)
      // const url = `ws://0.0.0.0:8000/ws/${this.token}`
      const url = `ws://0.0.0.0:8000/ws/${this.token}`
      const socket = new WebSocket(url)

      socket.onopen = () => {
        console.log('WebSocket connected')
      }

      socket.onmessage = (event) => {
        console.log('Received message:', event.data)
        console.log('Received message:', event)
        this.messageCount = this.messageCount + 1
      }

      socket.onclose = () => {
        console.log('WebSocket disconnected')
        // Reconnect
        setTimeout(() => {
          this.initWebSocket()
        }, 3000)
      }
    }
  }
}
</script>
