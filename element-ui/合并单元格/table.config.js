/*
 * @Author: kongsiying
 * @Date: 2021-01-29 15:05:36
 * @Last Modified by: hanyanbin
 * @Last Modified time: 2021-04-28 16:15:28
 */
const fakeDatas = [
    {
        dispatchName: '调度组1',
        dataCenter: 'DC_1',
        cluster: '集群1',
        application: 'Web'
    },{
        dispatchName: '调度组1',
        dataCenter: 'DC_2',
        cluster: '集群2',
        application: 'Web'
    },{
        dispatchName: '调度组2',
        dataCenter: 'DC_3',
        cluster: '集群3',
        application: 'Frontend'
    },{
        dispatchName: '调度组3',
        dataCenter: 'DC_4',
        cluster: '集群4',
        application: 'Bac'
    },{
        dispatchName: '调度组3',
        dataCenter: 'DC_5',
        cluster: '集群5',
        application: 'Bac'
    },
]
export { fakeDatas } 

export default function () {
    const config = {
        table: {
            size: 'medium',
            stripe: false,
            'span-method': this.arraySpanMethod
        },
        id: 'dispatch-group-list',
        view: {
            showColumnCtrl: true,
            showIconBtn: false, // 不生效
            options: [{
                code: 'table-header-add',
                label: '新增调度组',
                icon: 'el-icon-plus',
                event: 'onAddDispatchGroup'
            }],
        },
        columns: [
            {
                label: '名称',
                prop: 'dispatchName'
            },
            {
                label: '数据中心',
                prop: 'dataCenter'
            },
            {
                label: '部署集群',
                prop: 'cluster',
            },
            {
                label: '应用',
                prop: 'application'
            },
            {
                type: 'action',
                label: '操作',
                width: '250px',
                prop: 'action',
                props: {
                    type: 'textDropDown',
                    options: [
                        {
                            code: 'table-inner-handleScale',
                            label: '调度策略',
                            event: 'onClickDispatchStrategy',
                            type: 'primary',
                        },
                        {
                            code: 'table-inner-view',
                            label: '伸缩履历',
                            event: 'onFlexibleResumeAction',
                            type: 'primary',
                        },
                        {
                            code: 'table-inner-edit',
                            label: '编辑',
                            event: 'onEditTableAction',
                            type: 'primary',
                        },
                        {
                            code: 'table-inner-delete',
                            label: '删除',
                            event: 'onDeleteTableAction',
                            type: 'primary',
                        }
                    ]
                }
            }
        ]
    };
    const option = [
        { index: 0, field: "dispatchName" },
    ]
    const depOption = [
        {index: 4, field: 'action', depIndex: 0, depField: 'dispatchName'}
    ]
    return {
        data: [],
        config,
        option,
        depOption
    }
}
