import storage from 'store'
import expirePlugin from 'store/plugins/expire'

// import { login, getInfo, logout } from '@/api/login'

storage.addPlugin(expirePlugin)
const user = {

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录

  }
}

export default user
