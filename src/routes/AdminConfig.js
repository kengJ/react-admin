export default {
    menus: [    // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
        {
            key: '/app/setting', title: '系统设置', icon: 'setting',
            subs: [
                { key: '/app/setting/user', title: '用户管理', component: 'User' },
                { key: '/app/setting/role', title: '权限管理', component: 'RouterEnter', auth: 'auth/testPage' },
            ],
        },
        {
            key: '/app/table', title: '表格', icon: 'copy',
            subs: [
                { key: '/app/table/basicTable', title: '基础表格', component: 'BasicTable'},
                { key: '/app/table/advancedTable', title: '高级表格', component: 'AdvancedTable'},
                { key: '/app/table/asynchronousTable', title: '异步表格', component: 'AsynchronousTable'},
            ],
        },
        {
            key: '/app/cssModule', title: 'cssModule', icon: 'star', component: 'Cssmodule'
        },
    ],
    others: []  // 非菜单相关路由
}