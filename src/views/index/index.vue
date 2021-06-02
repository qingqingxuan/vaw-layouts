<template>
  <el-card>
    <template #header>
      <div>
        header
      </div>
    </template>
    <div>
      content
    </div>
  </el-card>
</template>

<script>
import store from '@/store'
export default {
  name: 'PersonalCenter',
  data() {
    return {
      state: store.state,
      inputContent: ''
    }
  },
  methods: {
    fixedHeader() {
      store.toggleFixedNavBar(!store.state.isFixedNavBar)
    },
    changeMode() {
      store.changeLayoutMode(store.randomLayouMode())
    },
    changeTheme() {
      store.changeTheme(store.state.theme === 'dark' ? 'light' : 'dark')
    },
    go() {
      this.$router.push({ name: 'pay' })
    }
  }
}
</script>

<style>
.main-container {
  height: 200vh;
}
</style>
