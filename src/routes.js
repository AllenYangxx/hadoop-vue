import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import userHistory from './views/nav1/user-history.vue'
import userRecommend from './views/nav1/user-recommend.vue'
import systemController from './views/nav2/sys-controller.vue'
import systemTry from './views/nav2/sys-try.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/user-history', component: userHistory, name: '用户历史记录' },
            { path: '/user-recommend', component: userRecommend, name: '用户推荐记录' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '推荐系统',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/sys-controller', component: systemController, name: '系统操作' },
            { path: '/sys-try', component: systemTry, name: '用户体验' },
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
    
];

export default routes;