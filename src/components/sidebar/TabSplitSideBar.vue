<template>
  <div
    class="vaw-tab-split-side-bar-wrapper"
    :class="[!state.isCollapse ? 'open-status' : 'close-status']"
  >
    <div class="tab-split-tab-wrapper">
      <Logo
        class="tab-split-logo-wrapper"
        :show-title="false"
      />
      <el-scrollbar
        class="scrollbar"
        wrap-class="scrollbar-wrap-class"
      >
        <div class="tab-split-content-wrapper">
          <div
            v-for="item of tabs"
            :key="item.path"
            class="label-item-wrapper"
            :class="{'vaw-tab-split-item-is-active' : item.active}"
            @click="changeTab(item)"
          >
            <SvgIcon :icon-class="item.meta ? item.meta.icon || 'el-icon-menu' : 'el-icon-menu'" />
            <span>{{ item.meta ? item.meta.title : item.name }}</span>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="tab-split-menu-wrapper">
      <Logo
        class="tab-split-logo-wrapper"
        :show-logo="false"
      />
      <ScrollerMenu>
        <template v-for="item of routes">
          <SideBarItem
            :key="item.path"
            :full-path="getFullPath(item)"
            :item="item"
          />
        </template>
      </ScrollerMenu>
    </div>
    <div class="mobile-shadow"></div>
  </div>
</template>

<script>
import store from '../../store'
import path from 'path'
export default {
  name: 'TabSplitSideBar',
  props: {
    showLogo: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      state: store.state,
      currentTab: null,
      basePath: null,
      tabs: null,
      routes: []
    }
  },
  watch: {
    currentTab(newVal) {
      this.routes = newVal.children
      this.basePath = newVal.path
    },
    // 监听路由，改变当前选择的 tab
    $route(newVal) {
      if (!newVal.name) return
      const paths = newVal.fullPath.split('/').filter((it) => it !== '')
      if (this.basePath === '/' + paths[0]) return
      this.changeTab(
        this.tabs.find((it) => it.path === '/' + paths[0]),
        false
      )
    }
  },
  mounted() {
    this.tabs = store.getSplitTabs().map((it, index) => {
      return {
        ...it,
        active: index === 0
      }
    })
    const paths = this.$route.fullPath.split('/').filter((it) => it !== '')
    this.changeTab(
      this.tabs.find((it) => it.path === '/' + paths[0]),
      false
    )
  },
  methods: {
    getFullPath(item) {
      return path.resolve(this.basePath, item.path)
    },
    // inited 标志是否要查找第一个元素
    changeTab(item, inited = true) {
      this.tabs.forEach((it) => {
        it.active = it.path === item.path
      })
      this.currentTab = item || null
      if (inited) {
        this.findPath(this.currentTab, this.currentTab.path)
      }
    },
    findPath(tab, fullPath) {
      const firstItem = tab.children[0]
      if (firstItem.children && firstItem.children.length > 0) {
        this.findPath(firstItem, path.resolve(fullPath, firstItem.path))
      } else {
        this.$router.push({ path: path.resolve(fullPath, firstItem.path) })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/variables.scss';
.open-status {
  width: $menuWidth;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.12);
  transition: all $transitionTime;
}
.close-status {
  width: $minMenuWidth;
  box-shadow: none;
  transition: all $transitionTime;
}
.scrollbar {
  height: calc(100% - #{$logoHeight}) !important;
}
.vaw-tab-split-side-bar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  height: 100%;
  box-sizing: border-box;
  z-index: 999;
  .tab-split-tab-wrapper {
    position: relative;
    top: 0;
    left: 0;
    width: $tabSplitMenuWidth;
    min-width: $tabSplitMenuWidth;
    max-width: $tabSplitMenuWidth;
    overflow: hidden;
    height: 100%;
    .tab-split-logo-wrapper {
      max-width: $tabSplitMenuWidth;
      min-width: $tabSplitMenuWidth;
    }
    .tab-split-content-wrapper {
      position: relative;
      @mixin after {
        content: '';
        position: absolute;
        left: 2px;
        top: 2px;
        right: 2px;
        bottom: 2px;
        border-radius: 3px;
        z-index: -1;
      }
      .label-item-wrapper {
        position: relative;
        min-height: $logoHeight * 1.2;
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        font-size: 18px;
        z-index: 1;
        & > i {
          font-size: 16px;
        }
        & > span {
          font-size: 12px;
          line-height: 14px;
          margin-top: 5px;
        }
        &:hover {
          cursor: pointer;
        }
        &:hover::after {
          @include after;
        }
      }
      .vaw-tab-split-item-is-active::after {
        @include after;
      }
    }
  }
  .tab-split-menu-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: $tabSplitMenuWidth;
    overflow-x: hidden;
  }
  .vaw-menu-wrapper {
    overflow-x: hidden;
    color: white;
  }
}
.is-mobile {
  .open-status {
    width: $menuWidth;
    transform: translateX(0);
    transition: transform $transitionTime;
    box-shadow: 2px 0 8px #191a23;
  }
  .close-status {
    width: $menuWidth;
    transform: translateX(-$menuWidth);
    transition: transform $transitionTime;
    box-shadow: none;
  }
}
</style>
<style lang="scss">
@import '../../assets/styles/variables.scss';
.scrollbar-wrap-class {
  overflow-x: hidden !important;
}
.el-menu {
  overflow: hidden !important;
  border-right: none !important;
}
::v-deep {
  .el-menu--collapse .el-submenu__title span {
    display: none !important;
  }
  .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
    display: none !important;
  }
}
</style>
