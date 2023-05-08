// eslint-disable-next-line
import { BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

// import { defineComponent } from 'vue'
// import { SettingFilled, SmileOutlined, SyncOutlined, LoadingOutlined } from '@ant-design/icons-vue'
// export default defineComponent({
//   components: {
//     HomeOutlined,
//     SettingFilled,
//     SmileOutlined,
//     SyncOutlined,
//     LoadingOutlined
//   }
// })

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '' },
    redirect: '/dashboard/workplace',
    children: [

      {
        path: '/addNewRoom',
        name: 'addNewRoom',
        component: () => import('@/views/addNewRoom/addNewRoom'),
        meta: { title: 'menu.addnewroom', keepAlive: true, icon: 'plus-circle' }
      },

      {
        path: '/roomProfile',
        name: 'roomProfile',
        component: () => import('@/views/roomProfile/roomProfile'),
        hidden: true,
        meta: { title: 'menu.roomprofile', keepAlive: false, hidden: true }
        // props: (route) => ({ roomID: route.params.data })
      },

      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        hidden: true,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
          },
          // 外部链接
          {
            path: 'https://www.baidu.com/',
            name: 'Monitor',
            meta: { title: 'menu.dashboard.monitor', target: '_blank' }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/',
        meta: { title: 'menu.profile', icon: 'profile', permission: ['profile'] }
      },
      // Home
      {
        path: '/home',
        name: 'Home',
        component: RouteView,
        redirect: '/home',
        hideChildrenInMenu: true,
        meta: { title: 'menu.all-matching-room', keepAlive: true, icon: 'user' },
        children: [
          {
            path: '/home',
            name: 'HomePage',
            component: () => import('@/views/Home'),
            meta: { title: 'menu.matchingroom.swipe', keepAlive: false },
            hidden: true
          }
        ]
      },

      // MatchingRoom
      {
        path: '/matchingroom',
        name: 'matchingroom',
        component: RouteView,
        redirect: '/matchingroom/Swipe',
        meta: { title: 'menu.matchingroom', keepAlive: true, icon: 'user' },
        children: [
          {
            path: '/matchingroom/Swipe',
            name: 'MatchingRoomSwipe',
            component: () => import('@/views/matchingroom/Swipe'),
            meta: { title: 'menu.matchingroom.swipe', keepAlive: false }
          }
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        hidden: true,
        meta: { title: 'menu.account', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: 'menu.account.center', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: 'menu.account.settings', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/basic',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/basic',
                name: 'BasicSettings',
                component: () => import('@/views/account/settings/BasicSetting'),
                meta: { title: 'account.settings.menuMap.basic', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {
                  title: 'account.settings.menuMap.security',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: 'account.settings.menuMap.custom', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: 'account.settings.menuMap.binding', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: {
                  title: 'account.settings.menuMap.notification',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              }
            ]
          }
        ]
      }
    ]
    // no sidebar
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: BlankLayout,
    redirect: '/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/Login')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
