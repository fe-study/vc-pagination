import Vue from 'vue'
import vcPagination from '../dist/build.js'

new Vue({
	el: '#app',
	data () {
		return {
            bools: {
                'true': true,
                'false': false
            },
            simple: false,
            align: 'center',
            displayNum: 6,
            edgeNum: 2,
            total: 200,
            current: 1,
            pageSize: 20,
            pageSizeEditable: true, 
            pageSizeArr: [10, 20, 40, 100],
            jumpable: true,
            goLabel: '跳转',
            invilidPageHandler: null,
            onPageChange: null,
            onPageSizeChange: null,

            pageSizeArrStr: '', // just for demo
		}
	},
    methods: {
        setPageSizeArr: function () {
            this.pageSizeArr = this.pageSizeArrStr.replace(/\s/, '').split(',')
        }
    },
	components: {
        vcPagination
	}
})
