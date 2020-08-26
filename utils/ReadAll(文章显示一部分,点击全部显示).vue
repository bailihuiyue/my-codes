<template>
  <div class="ReadAll">
    <div
      class="bodyFont clearfloat"
      id="bodyFont"
      ref="bodyFont"
      :class="{bodyHeight:contentStatus}"
    >
      <span v-html="content"></span>
    </div>
    <div style="margin-top:5px">
      <a-button
        style="padding:0"
        type="link"
        @click="contentStatus=!contentStatus"
      >{{ contentStatus?$t('sage.readAll'):$t('sage.slideUp') }}</a-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ReadAll',
  props: {
    content: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      contentStatus: false,
      curHeight: 0,
      bodyHeight: 200
    }
  },
  mounted() {
    setTimeout(() => {
      this.contentToggle()
    }, 500)
  },
  methods: {
    contentToggle() {
      this.curHeight = this.$refs.bodyFont.offsetHeight
      if (this.curHeight > this.bodyHeight) {
        this.contentStatus = true
      } else {
        this.contentStatus = false
      }
    }
  },
  computed: {
    showBtn() {
      return this.$refs.bodyFont.offsetHeight > this.bodyHeight
    }
  }
}
</script>

<style lang="less">
.ReadAll {
  margin-top: 20px;
  .bodyFont {
    font-size: 16px;
    color: #333;
    text-align: left;
    // line-height: 58px;
    word-break: break-all;
    word-wrap: break-word;
    // padding-bottom: 30px;
    height: auto;
    overflow: hidden;
    max-height: 100%;
    p {
      margin: 16px 0 0 0;
    }
  }
  .bodyHeight {
    max-height: 200px;
  }
}
</style>