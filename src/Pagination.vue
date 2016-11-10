<template>
    <div class="vc-pagination-component" :class="align">
        <ul class="pagination">
            <li v-if="!noPrevious">
                <a style="cursor:pointer;" @click="selectPage(current - 1)" aria-label="previous">
                    <span aria-hidden="true">{{ prevText }}</span>
                </a>
            </li>
            <li v-if="showFirstPage" class="first-page">
                <a style="cursor:pointer;" @click="selectPage(1)" aria-label="first-page">
                    <span aria-hidden="true">{{ firstPageText }}</span>
                </a>
            </li>
            <li v-for="page in pages" :class="{ 'active': page.number == current, 'disabled': page.disabled }">
                <a style="cursor:pointer;" @click="selectPage(page.number)" v-text="page.text"></a>
            </li>
            <li v-if="showLastPage" class="last-page">
                <a style="cursor:pointer;" @click="selectPage(totalPages)" aria-label="last-page">
                    <span aria-hidden="true">{{ lastPageText }}</span>
                </a>
            </li>
            <li v-if="!noNext">
                <a style="cursor:pointer;" @click="selectPage(current + 1)" aria-label="next">
                    <span aria-hidden="true">{{ nextText }}</span>
                </a>
            </li>
        </ul>
        <form class="form-inline" v-if="jumpable" @submit.prevent="go">
            {{ goLabel }}到&nbsp;<input type="text" class="form-control" :class="{ 'err-pageto': errPageTo }" v-model="pageTo" />&nbsp;页
            <button class="btn btn-sm btn-info">{{ goLabel }}</button>
        </form>
        <form class="form-inline" v-if="pageSizeEditable">
            <div class="btn-group">
                <button type="button" class="btn btn-default dropdown-toggle" @click.stop="togglePageSizeDropdown" aria-haspopup="true" aria-expanded="false">
                    {{ pageSize }}项/页<span class="caret"></span>
                </button>
                <ul class="dropdown-menu" v-show="showPageSizeDropdown" transition="v-page-dropdown">
                    <li v-for="pz in pageSizeArr" @click="handlePageSizeChange(pz)"><a href="javascript:">{{ pz }}项/页</a></li>
                </ul>
            </div>
        </form>
    </div>
</template>

<style lang="less">
.vc-pagination-component {
    &.center {
        text-align: center;
    }
    &.left {
        text-align: left;
    }
    &.right {
        text-align: right;
    }
    .pagination  {
        vertical-align: middle;

        & > li > a,  & > li > span {
            padding: 0;
            padding-top: 4px;
            padding-bottom: 4px;
            min-width: 35px;
            text-align: center;
        }
        .first-page a,
        .last-page a {
            padding-left: 10px;
            padding-right: 10px;
        }
    }
    .form-inline {
        display: inline-block;
        vertical-align: middle;

        .form-control {
            width: 44px;
        }
    }
    .err-pageto {
        border: 1px solid #F97D7D;
    }
    .dropdown-menu {
        width: 100%;
        min-width: 100%;
        text-align: center;

        a {
            padding: 3px;
        }
    }
    .v-page-dropdown-transition {
        display: inline-block;
    }
    .v-page-dropdown-enter {
        animation: fadeinT .3s;
    }
    .v-page-dropdown-leave {
        animation: fadeoutT .3s;
    }
}

@maxRange: 20px;

/* 淡入-从上 */
@-webkit-keyframes fadeinT {
    0%{opacity:0;-webkit-transform:translateY(-@maxRange);}
    100%{opacity:1;-webkit-transform:translateY(0);}
}
@-moz-keyframes fadeinT {
    0%{opacity:0;-moz-transform:translateY(-@maxRange);}
    100%{opacity:1;-moz-transform:translateY(0);}
}
@-ms-keyframes fadeinT {
    0%{opacity:0;-ms-transform:translateY(-@maxRange);}
    100%{opacity:1;-ms-transform:translateY(0);}
}
@keyframes fadeinT {
    0%{opacity:0;transform:translateY(-@maxRange);}
    100%{opacity:1;transform:translateY(0);}
}

/* 淡出-向上 */
@-webkit-keyframes fadeoutT{
    0%{opacity:1;-webkit-transform:translateY(0);}
    100%{opacity:0;-webkit-transform:translateY(-@maxRange);}
}
@-moz-keyframes fadeoutT{
    0%{opacity:1;-moz-transform:translateY(0);}
    100%{opacity:0;-moz-transform:translateY(-@maxRange);}
}
@-ms-keyframes fadeoutT{
    0%{opacity:1;-ms-transform:translateY(0);}
    100%{opacity:0;-ms-transform:translateY(-@maxRange);}
}
@keyframes fadeoutT{
    0%{opacity:1;transform:translateY(0);}
    100%{opacity:0;transform:translateY(-@maxRange);}
}
</style>

<script>
const COMPONENT_NS = 'PAGINATION'

export default {
    name: 'vc-pagination',
    props: {
        simple: { // 普通版本
            type: Boolean,
            default: false
        },
        align: {
            type: String,
            default: 'center'
        },
        prevText: {
            type: String,
            default: '‹'
        },
        nextText: {
            type: String,
            default: '›'
        },
        firstPageText: {
            type: String,
            default: '首页'
        },
        lastPageText: {
            type: String,
            default: '末页'
        },
        displayNum: { // 可看见的页码数目
            type: Number,
            coerce: function (val) {
                return Number(val)
            },
            default: 6
        },
        edgeNum: { // 当页码较多时，前后空余的可选页码数量
            type: Number,
            coerce: function (val) {
                return Number(val)
            },
            default: 2
        },
        current: { // 当前页码数
            twoWay: true,
            type: Number,
            coerce: function (val) {
                return Number(val)
            },
            validator: function (value) {
                return value > 0
            },
            default: 1
        },
        pageSize: { // 页面数据量
            twoWay: true,
            type: Number,
            coerce: function (val) {
                return Number(val)
            },
            validator: function (value) {
                return value > 0
            },
            default: 10
        },
        total: { // 全部结果集数目
            type: Number,
            coerce: function (val) {
                return Number(val)
            },
            default: 0
        },
        onPageChange: {
            type: Function,
            default: function () {}
        },
        jumpable: { // 是否显示跳转控件（页码输入框和跳转按钮）
            type: Boolean,
            default: true
        },
        goLabel: { // 跳转按钮的文案
            type: String,
            default: '跳转'
        },
        invalidCallback: {
            type: Function,
            default: function () {}
        },
        pageSizeEditable: {
            type: Boolean,
            default: true 
        },
        pageSizeArr: {
            type: Array,
            default: function () {
                return [10, 20, 40, 100]
            }
        },
        onPageSizeChange: {
            type: Function,
            default: function () {}
        }
    },
    data: function () {
        return {
            pageTo: void 666,
            errPageTo: false,
            showPageSizeDropdown: false
        }
    },
    computed: {
        noPrevious: function () {
            return this.current === 1
        },
        noNext: function () {
            return this.current === this.totalPages
        },
        showFirstPage: function () {
            return this.edgeNum === 0 && (this.totalPages - 2 >= this.displayNum)
        },
        showLastPage: function () {
            return this.edgeNum === 0 && (this.totalPages - 2 >= this.displayNum)
        },
        pages: function () {
            return getPages(this.current, this.totalPages, this.edgeNum, this.displayNum)
        },
        totalPages: function () {
            return getTotalPages(this.pageSize, this.total)
        },
    },
    created: function () {
        document.addEventListener('click', function (e) {
            this.showPageSizeDropdown = false
        }.bind(this), false)
    },
    methods: {
        isValidPageTo: function (page) {
            var info
            if (isNaN(page)) {
                info = '页码必须为数字!'
                console.error(info)
                this.$dispatch(COMPONENT_NS, {action: 'invalidNum', data: info }, name)
                return false
            }
            if (page < 0 || page > this.totalPages) {
                info = '页码不在正确的范围内!'
                console.error(info)
                this.$dispatch(COMPONENT_NS, {action: 'invalidNum', data: info }, name)
                return false
            }
            return true
        },
        go: function () {
            if (this.isValidPageTo(this.pageTo)) {
                this.current = +this.pageTo
            } else {
                this.invalidCallback && this.invalidCallback(this.pageTo)
            } 
            this.pageTo = void 666 
        },
        selectPage: function (num) {
            if (this.current != num && num > 0 && num <= this.totalPages) {
                this.current = num
                this.$emit('page-change')
            }
        },
        selectSize: function (size) {
            if (this.pageSize != size && size > 0) {
                this.pageSize = size
                if (this.current > this.totalPages) {
                    this.selectPage(this.totalPages)
                }
                else {
                    this.$emit('page-change')
                }
            }
        },
        togglePageSizeDropdown: function () {
            this.showPageSizeDropdown = !this.showPageSizeDropdown
        },
        handlePageSizeChange: function (p) {
            this.pageSize = p
            this.current = 1
            this.onPageSizeChange && this.onPageSizeChange()
        }
    },
    watch: {
        'simple': {
            immediate: true,
            handler (val) {
                if (val) {
                    this.jumpable = false
                    this.pageSizeEditable = false
                } else {
                    this.jumpable = true
                    this.pageSizeEditable = true
                }
            }
        },
        'pageTo': function (val) {
            if (val === void 0) return
            if (!this.isValidPageTo(val)) {
                this.errPageTo = true
            } else {
                this.errPageTo = false
            }
            this.onPageChange && this.onPageChange()
        }
    },
    beforeDestroy: function () {

    }
}

/**
 * @工具方法
 * 集日月之精华... 
 * 好吧，抄来的...
 */

function getTotalPages (pageSize, total) {
    var totalPages = pageSize < 1 ? 1 : Math.ceil(total / pageSize)
    return Math.max(totalPages || 0, 1)
}

// Create page object used in template
function makePage (number, text, isActive) {
    return {
        number: number,
        text: text,
        disabled: number === -1,
    }
}

/**
 * Calculate start and end point of pagination links depending on
 * current and num_display_entries.
 * @return {Array}
 */
function getInterval (current, pageCount, num_display_entries) {
    //var num_display_entries = 6
    var ne_half = Math.ceil(num_display_entries / 2)
    var np = pageCount
    var upper_limit = np - num_display_entries
    var start = current > ne_half ? Math.max(Math.min(current - ne_half, upper_limit), 0) : 0
    var end = current > ne_half ? Math.min(current + ne_half, np) : Math.min(num_display_entries, np)
    return [start, end]
}

function getPages (current, totalPages, num_edge_entries, num_display_entries) {
    var ret = []
    //var num_edge_entries = 2
    var skip_text = '...'
    var np = totalPages
    var interval = getInterval(current - 1, totalPages, num_display_entries)

    // Generate starting points
    if (interval[0] > 0 && num_edge_entries > 0) {
        var end = Math.min(num_edge_entries, interval[0])
        for (var i = 0; i < end; i++) {
            var page = makePage(i + 1, i + 1)
            ret.push(page)
        }
        if (num_edge_entries < interval[0]) {
            var page = makePage(-1, skip_text)
            ret.push(page)
        }
    }
    // Generate interval links
    for (var i = interval[0]; i < interval[1]; i++) {
        var page = makePage(i + 1, i + 1)
        ret.push(page)
    }
    // Generate ending points
    if (interval[1] < np && num_edge_entries > 0) {
        if (np - num_edge_entries > interval[1]) {
            var page = makePage(-1, skip_text)
            ret.push(page)
        }
        var begin = Math.max(np - num_edge_entries, interval[1])
        for (var i = begin; i < np; i++) {
            var page = makePage(i + 1, i + 1)
            ret.push(page)
        }
    }

    return ret
}
</script>
