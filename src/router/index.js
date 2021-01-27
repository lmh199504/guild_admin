import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
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
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/myviews/home/index'),
        name: 'home',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/set',
    component: Layout,
    redirect: '/set/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/myviews/set/index'),
        name: 'set',
        meta: { title: '设置', noCache: true }
      }
    ]
  },
  {
    path: '/changepassword',
    component: Layout,
    redirect: '/changepassword/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/myviews/changepassword/index'),
        name: 'changepassword',
        meta: { title: '修改密码', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  /** when your routing map is too long, you can split it into small modules **/
  {
    path: '/goddessManage',
    component: Layout,
    name: 'goddessManage',
    redirect: 'noRedirect',
    meta: { title: '女神管理', icon: 'n_anchor' },
    children: [
      {
        path: 'goddessRecruit',
        component: () => import('@/myviews/goddessManage/goddessRecruit/index'),
        name: 'goddessRecruit',
        meta: { title: '女神招募' }
      },
      {
        path: 'goddessList',
        component: () => import('@/myviews/goddessManage/goddessList/index'),
        name: 'goddessList',
        meta: { title: '女神列表' }
      },
      {
        path: 'goddessCallLog',
        component: () => import('@/myviews/goddessManage/goddessCallLog/index'),
        name: 'goddessCallLog',
        meta: { title: '通话记录' }
      },
      {
        path: 'goddnessIncome',
        component: () => import('@/myviews/goddessManage/goddnessIncome/index'),
        name: 'goddnessIncome',
        meta: { title: '收益明细' }
      },
      {
        path: 'goddessCash',
        component: () => import('@/myviews/goddessManage/goddessCash/index'),
        name: 'goddessCash',
        meta: { title: '女神提现记录' }
      }
    ]
  },
  {
    path: '/finance',
    component: Layout,
    name: 'finance',
    redirect: 'noRedirect',
    meta: { title: '财务管理', icon: 'ghmx' },
    children: [
      {
        path: 'cashLog',
        component: () => import('@/myviews/finance/cashLog/index'),
        name: 'cashLog',
        meta: { title: '提现记录' }
      },
      {
        path: 'balanceDetails',
        component: () => import('@/myviews/finance/balanceDetails/index'),
        name: 'balanceDetails',
        meta: { title: '余额明细' }
      }
    ]
  },
  {
    path: '/subGuild',
    component: Layout,
    name: 'subGuild',
    redirect: 'noRedirect',
    alwaysShow: true,
    meta: { title: '子公会管理', icon: 'second_level', roles: ['admin'] },
    children: [
      {
        path: 'subGuildList',
        component: () => import('@/myviews/subGuild/subGuildList/index'),
        name: 'subGuildList',
        meta: { title: '子公会列表', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/reportList',
    component: Layout,
    redirect: '/reportList/index',
    meta: { title: '举报列表', icon: 'report' },
    children: [
      {
        path: 'index',
        component: () => import('@/myviews/reportList/index'),
        name: 'reportList',
        meta: { title: '举报列表' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
