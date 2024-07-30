<script setup lang="ts">
import { onMounted, reactive, ref, h, render } from 'vue'
import { useRoute } from 'vue-router'
import { playlistDetail } from '@/service/playlist'
import { getCounts } from '@/utils/count'
import { getTime } from '@/utils/time'
import { PlayArrowRound } from '@vicons/material'
import SongList from '@/components/list/song-list.vue'
import { useNotification } from 'naive-ui'
import CommentList from '@/components/list/comment-list.vue'

const route = useRoute()
const notification = useNotification()
const playlistId = ref<string>('')

const info = reactive({
  name: '' as string,
  description: '' as string,
  creator: {} as any,
  tags: [] as any,
  createTime: 0 as number,
  picUrl: '' as string,
  playCount: 0 as number,
  trackCount: 0 as number,
  commentCount: 0 as number,
  subscribedCount: 0 as number
})

const tracks = ref<Array<any>>([])
const tableData = ref<Array<any>>([])
const offset = ref<number>(20)
const limit = ref<number>(20)
const getPlaylistDetail = async (id: string) => {
  try {
    const result = (await playlistDetail(id)).data.playlist
    info.name = result.name
    info.description = result.description
    info.creator = result.creator
    info.tags = result.tags
    info.createTime = result.createTime
    info.picUrl = result.coverImgUrl
    info.playCount = result.playCount
    info.trackCount = result.trackCount
    info.commentCount = result.commentCount
    info.subscribedCount = result.subscribedCount
    tracks.value = result.tracks
    tableData.value = tracks.value.slice(0, limit.value)
  } catch (error) {
    console.warn('error', error)
  } finally {
  }
}

const resetTracks = () => {
  if (loading.value || tableData.value.length <= limit.value) return
  loading.value = true
  tableData.value = tracks.value.slice(0, limit.value)
  offset.value = 0
  loading.value = false
}

const lazyTracks = () => {
  if (loading.value) return
  loading.value = true
  tableData.value.push(...tracks.value.slice(offset.value, offset.value + limit.value))
  offset.value += limit.value
  loading.value = false
}

const handleExpand = () => {
  notification.create({ title: () => h('b', {}, info.name), content: info.description })
}

const tabVnode = (name: string, count: string | number) =>
  h('div', {}, [
    h('span', { class: 'font-music text-xl' }, name),
    h('span', { class: 'text-xs' }, count)
  ])

const loading = ref<boolean>(false)
const fetchData = async () => {
  if (loading.value) return
  try {
    loading.value = true
    await getPlaylistDetail(playlistId.value)
    console.log(info)
  } catch (error) {
    console.warn(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  playlistId.value = route.query.id as string
  fetchData()
})
</script>

<template>
  <n-spin :show="loading" class="h-full" content-class="h-full">
    <div class="page-container" v-show="!loading">
      <div class="page-banner">
        <div
          class="banner-left"
          :style="{
            backgroundImage: `linear-gradient(to bottom, #17171777, #17171700 30%),url(${info.picUrl}?param=400y400)`
          }"
        >
          <div class="play-counts">
            <n-icon><PlayArrowRound /></n-icon>
            <span>{{ getCounts(info.playCount) }}</span>
          </div>
        </div>
        <div class="banner-right">
          <div class="banner-title">{{ info.name }}</div>
          <div class="banner-description cursor-pointer" @click="handleExpand">
            <n-ellipsis line-clamp="2" :tooltip="false">
              {{ info.description }}
            </n-ellipsis>
          </div>
          <div class="banner-create">
            <div class="banner-creator">
              <n-avatar round size="small" :src="info.creator.avatarUrl" />
              <n-button text class="mx-2">{{ info.creator.nickname }}</n-button>
            </div>
            <div class="banner-tags" v-if="info.tags.length > 0">
              <div>标签:</div>
              <span v-for="(tag, index) in info.tags">
                <span>{{ tag }}</span>
                <span v-if="index + 1 < info.tags.length">、</span>
              </span>
            </div>
            <div class="banner-time">
              <span>{{ getTime(info.createTime) }}创建</span>
            </div>
          </div>
          <div class="banner-buttons">
            <n-button type="error">
              <n-icon size="large"><PlayArrowRound /></n-icon>
              播放全部
            </n-button>
            <n-button ghost>收藏</n-button>
            <n-button ghost>下载</n-button>
          </div>
        </div>
      </div>
      <div class="page-content">
        <n-tabs
          animated
          type="line"
          class="h-full"
          pane-wrapper-class="h-full"
          pane-class="h-full"
          @update:value="resetTracks"
        >
          <n-tab-pane name="song" :tab="tabVnode('歌曲', info.trackCount)">
            <n-infinite-scroll class="h-full overflow-scroll" :distance="40" @load="lazyTracks">
              <SongList :table-data="tableData"></SongList>
            </n-infinite-scroll>
          </n-tab-pane>
          <n-tab-pane name="comment" :tab="tabVnode('评论', getCounts(info.commentCount))">
            <CommentList :id="playlistId" type="2" />
          </n-tab-pane>
        </n-tabs>
      </div>
    </div>
  </n-spin>
</template>

<style lang="scss" scoped>
.page-container {
  height: 100%;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .page-banner {
    width: 80%;
    display: flex;
    gap: 40px;
    .banner-left {
      height: 170px;
      width: 170px;
      border-radius: 10%;
      background-size: cover;
      .play-counts {
        text-align: right;
        padding: 10px;
        color: #f5f5f5;
        cursor: default;
      }
    }
    .banner-right {
      width: calc(100% - 240px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
      .banner-title {
        font-size: 22px;
        font-weight: bold;
      }
      .banner-description {
        width: 100%;
        display: flex;
        gap: 5px;
      }
      .banner-create {
        display: flex;
        align-items: center;
        gap: 20px;
        .banner-creator {
          display: flex;
          align-items: center;
        }
        .banner-tags {
          display: flex;
          span {
            color: #f87171;
          }
        }
      }
      .banner-buttons {
        display: flex;
        gap: 12px;
      }
    }
  }
  .page-content {
    width: 80%;
    position: sticky;
    top: 0;
    height: calc(100% - 160px);
  }
}
</style>
