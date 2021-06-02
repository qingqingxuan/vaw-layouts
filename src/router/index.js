import Vue from 'vue'
import VueRouter from 'vue-router'

import { Layout } from '../components'
import RouterViewLayout from '@/components/RouterViewLayout'
import store from '../store'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    redirect: '/index/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Layout,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'index',
        name: 'controller',
        component: () => import('@/views/index'),
        meta: {
          title: '控件面板',
          affix: true,
          badge: 'dot'
        }
      },
      {
        path: 'work-place',
        name: 'WorkPlace',
        component: () => import('@/views/index/work-place'),
        meta: {
          title: '工作台'
        }
      }
    ]
  },
  {
    path: '/mall',
    name: 'mall',
    component: Layout,
    meta: {
      title: '商城'
    },
    children: [
      {
        path: 'goods',
        name: 'Goods',
        component: () => import('@/views/mall/goods'),
        meta: {
          title: '商品管理'
        }
      },
      {
        path: 'order',
        name: 'order',
        component: RouterViewLayout,
        meta: {
          title: '订单管理'
        },
        children: [
          {
            path: 'pay-success',
            name: 'PaySuccess',
            component: () => import('@/views/mall/order/pay-success'),
            meta: {
              title: '已支付',
              badge: 'new'
            }
          },
          {
            path: 'all-order',
            name: 'AllOrder',
            component: () => import('@/views/mall/order/all-order'),
            meta: {
              title: '所有订单',
              badge: 1
            }
          }
        ]
      }
    ]
  }
]

store.initPermissionRoute(constantRoutes)

const createRouter = () => new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
