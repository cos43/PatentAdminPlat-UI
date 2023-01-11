import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(Router)

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

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
export const constantRoutes = [{
  path: '/redirect', component: Layout, hidden: true, children: [{
    path: '/redirect/:path(.*)', component: () => import('@/views/redirect/index')
  }]
}, {
  path: '/register', component: () => import('@/views/users/components/RegisterComponent'), hidden: true
}, {
  path: '/auth-redirect', component: () => import('@/views/login/auth-redirect'), hidden: true
}, {
  path: '/404', component: () => import('@/views/error-page/404'), hidden: true
}, {
  path: '/401', component: () => import('@/views/error-page/401'), hidden: true
}, {
  path: '/', component: Layout, redirect: '/dashboard', children: [{
    path: 'dashboard',
    component: () => import('@/views/users/dashboard/index'),
    name: 'Dashboard',
    meta: { title: '专利管理系统', icon: 'dashboard', affix: true }
  }]
}, {
  path: '/login', component: () => import('@/views/users/login')
}, {
  path: '/search', component: Layout, children: [{
    path: 'index',
    component: () => import('@/views/users/index'),
    name: 'SearchIndex',
    meta: { title: '专利检索', icon: 'search' }
  }, {
    path: 'form',
    component: () => import('@/views/users/search/formSearch'),
    name: 'FormSearch',
    hidden: true,
    meta: { title: '表格检索', icon: 'search' }
  }, {
    path: 'advanced',
    component: () => import('@/views/users/search/advancedSearch'),
    name: 'AdvancedSearch',
    hidden: true,
    meta: { title: '高级检索', icon: 'search' }
  }, {
    path: 'results',
    component: () => import('@/views/users/search/results'),
    name: 'SearchResults',
    hidden: true,
    meta: { title: '检索结果' }
  }, {
    path: 'detail/:id',
    component: () => import('@/views/users/search/detail'),
    name: 'SearchDetail',
    hidden: true,
    meta: { title: '检索详情' }
  }]
}, {
  path: '/patent', component: Layout, meta: { title: '我的专利', icon: 'patent' }, children: [{
    path: 'home',
    component: () => import('@/views/users/patent/dashboard/index'),
    name: 'Patent',
    meta: { title: '首页', icon: 'home' }
  }, {
    path: 'claim',
    component: () => import('@/views/users/patent/patentClaimList'),
    name: 'Patent',
    meta: { title: '专利管理', icon: 'patent' }
  }, {
    path: 'report',
    hidden: true,
    component: () => import('@/views/users/patent/report'),
    name: 'Report',
    meta: { title: '我的报告', icon: 'report' }
  }, {
    path: 'package',
    component: () => import('@/views/users/patent/package'),
    name: 'Pack',
    meta: { title: '工艺包', icon: 'pack' }
  }, {
    path: 'package/:id',
    component: () => import('@/views/users/patent/packageDetail'),
    name: 'Pack',
    hidden: true,
    meta: { title: '工艺包详情', icon: 'pack' }
  }, {
    path: 'analysis',
    name: 'analysis',
    meta: { title: '分析', icon: 'analysis' },
    component: () => import('@/views/users/patent/analysis/analysis'),
    children: [{
      path: 'associationGraph',
      component: () => import('@/views/users/patent/analysis/packageAssociationGraph'),
      name: 'associationGraph',
      meta: { title: '关系图谱', icon: 'related' }
    }, {
      path: 'technicalGraph',
      component: () => import('@/views/users/patent/analysis/technicalGraph'),
      name: 'technicalGraph',
      meta: { title: '技术图谱', icon: 'techGraph' }
    }
    ]
  }]
}, {
  path: '/explore', component: Layout, meta: { title: '我的探索', icon: 'guide' }, children: [{
    path: 'follow',
    component: () => import('@/views/users/explore/patentFollowList.vue'),
    name: 'Follow',
    meta: { title: '我的关注', icon: 'focus' }
  }, {
    path: 'queries',
    component: () => import('@/views/users/explore/queriesList.vue'),
    name: 'Queries',
    meta: { title: '我的搜索', icon: 'search' }
  }, {
    path: 'analysis',
    name: 'Pack',
    meta: { title: '分析', icon: 'analysis' },
    component: () => import('@/views/users/explore/analysis/analysis'),
    children: [{
      path: 'associationGraph',
      component: () => import('@/views/users/explore/analysis/focusAssociationGraph1'),
      name: 'associationGraph1',
      meta: { title: '关系图谱', icon: 'related' }
    }, {
      path: 'technicalGraph',
      component: () => import('@/views/users/explore/analysis/technicalGraph'),
      name: 'technicalGraph',
      meta: { title: '技术图谱', icon: 'techGraph' }
    }]
  }]
}, {
  path: '/dept', component: Layout, meta: { title: '我的团队', icon: 'el-icon-s-help' }, children: [{
    path: 'index',
    component: () => import('@/views/users/explore/dept/index.vue'),
    name: 'dept',
    meta: { title: '团队一览', icon: 'el-icon-more' }
  }, {
    path: 'apply',
    name: 'apply',
    meta: { title: '我的申请', icon: 'el-icon-document-add' },
    component: () => import('@/views/users/explore/dept/dept.vue')
  }]
},

{
  path: '/report', component: Layout, meta: { title: '我的报告', icon: 'report' }, children: [{
    path: 'list',
    component: () => import('@/views/users/report/reportList'),
    name: 'NoveltyReportGenerator',
    meta: { title: '报告管理', icon: 'report' }
  }, {
    path: 'noveltyReportGenerator',
    component: () => import('@/views/users/report/NoveltyReportGenerator'),
    name: 'NoveltyReportGenerator',
    meta: { title: '生成查新报告', icon: 'new' }
  }]
},
{
  path: '/trade', component: Layout, meta: { title: '我的交易', icon: 'trade' }, children: [{
    path: 'home',
    component: () => import('@/views/users/trade/dashboard/index'),
    name: 'tradingInformation',
    meta: { title: '首页', icon: 'home' }
  }, {
    path: 'information',
    component: () => import('@/views/users/trade/tradingInformation'),
    name: 'tradingInformation',
    meta: { title: '交易信息', icon: 'tradeInfo' }
  }, {
    path: 'estimate',
    component: () => import('@/views/users/trade/patentValuation'),
    name: 'patentValuation',
    meta: { title: '专利估价', icon: 'estimate' }
  }]
},

{
  path: '/profile', component: Layout, children: [{
    path: 'index',
    component: () => import('@/views/users/profile/index'),
    name: 'Profile',
    meta: { title: '个人资料', icon: 'profile' }
  }]
}, {
  path: '/history', component: Layout, children: [{
    path: 'index',
    component: () => import('@/views/users/history'),
    name: 'History',
    meta: { title: '操作历史', icon: 'history' }
  }]
}]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [// {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },
  //
  // /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
  //
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },
  //
  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },
  //
  // // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }), routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
