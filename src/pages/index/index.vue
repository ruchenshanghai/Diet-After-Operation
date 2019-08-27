<template>
  <div class="main-container">

    <view class="weui-cells weui-cells_after-title top-search-view">
      <view class="weui-cell ">
        <icon type="search" size="24"></icon>
        <view class="weui-cell__hd">
          <picker @change="rangeIndexChange" :value="searchRangeIndex" :range="searchRangeOptions">
            <view class="weui-select">{{SEARCH_RANGE_OPTIONS[searchRangeIndex].label}}</view>
          </picker>
        </view>
        <view class="weui-cell__bd">
          <input class="weui-input" placeholder="搜索食物查看对应建议"
                 v-model="searchStr" @input="searchStrChange"/>
        </view>
      </view>
    </view>

    <viwe v-if="searchResult" class="content-view">
      <view v-for="res in searchResult"  class="weui-cells weui-cells_after-title">
        <view class="weui-cell ">
          <icon v-if="res[ONE_MONTH_KEY]" type="success" size="24"></icon>
          <icon v-else type="cancel" size="24"></icon>
          <view class="weui-cell__hd">{{ res.name }}</view>
          <view class="weui-cell__bd">{{ DEFINED_LABEL[res[ONE_MONTH_KEY]] }}</view>
        </view>
      </view>
    </viwe>

  </div>
</template>

<script>
import DATA_SOURCE from './source'
const ONE_MONTH_KEY = 'one-month'
const SEARCH_RANGE_OPTIONS = [
  {
    label: '一个月内',
    key: ONE_MONTH_KEY
  }
]
const DEFINED_LABEL = {
  true: '可以吃',
  false: '不可以吃'
}

export default {
  data () {
    return {
      searchStr: null,
      searchRangeIndex: null,
      searchRangeOptions: SEARCH_RANGE_OPTIONS.map(o => o.label),
      searchResult: null,
      SEARCH_RANGE_OPTIONS,
      ONE_MONTH_KEY,
      DEFINED_LABEL
    }
  },

  methods: {
    rangeIndexChange (e) {
      this.searchRangeIndex = e.detail.value
    },
    searchStrChange () {
      if (this.searchStr) {
        this.searchResult = DATA_SOURCE.filter(item => item.name.indexOf(this.searchStr) > -1)
      } else {
        this.searchResult = null
      }
    }
  },

  created () {
    this.searchRangeIndex = 0
    this.searchResult = null
  }
}
</script>

<style lang="scss" scoped>
  .main-container {
    .weui-cell__hd {
      padding: 0 10px;
    }
    display: flex;
    flex-direction: column;
    height: 100vh;

    .top-search-view {
      flex: 1;
    }
    .content-view {
      flex: 10000;
      overflow-y: scroll;
    }
  }
</style>
