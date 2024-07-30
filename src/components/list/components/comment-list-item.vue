<script setup lang="ts">
import { ref, watch } from 'vue'
import { commentFloor } from '@/service/comment'
import { getCounts } from '@/utils/count'
import { FavoriteBorderRound } from '@vicons/material'
import Divider from '@/components/common/divider.vue'
import ReplyListItem from './reply-list-item.vue'

const props = defineProps<{
  item: any
}>()

const limit = ref<number>(5)
const time = ref<string>()
const hasMore = ref<boolean>()
const replys = ref<Array<any>>([])
const collapseExpand = ref<boolean>(false)
const getReplys = async () => {
  const params = {
    parentCommentId: props.item.commentId,
    id: props.item.id,
    type: props.item.type,
    limit: limit.value,
    time: time.value
  }
  const result = (await commentFloor(params)).data.data
  replys.value.push(...result.comments)
  time.value = result.time
  hasMore.value = result.hasMore
  console.log(result)
}

const loading = ref<boolean>(false)
const fetchData = async () => {
  if (loading.value) return
  try {
    loading.value = true
    await getReplys()
  } catch (error) {
    console.warn(error)
  } finally {
    loading.value = false
  }
}

const resetData = () => {
  replys.value = []
  time.value = undefined
  hasMore.value = true
}

watch(collapseExpand, () => {
  if (collapseExpand.value) fetchData()
  else resetData()
})
</script>

<template>
  <div class="comment-item">
    <div class="item-info">
      <div class="info-basic">
        <n-avatar size="large" :src="item.picUrl + '?param=144y144'" />
        <div class="info-create">
          <n-button text>{{ item.name }}</n-button>
          <div class="text-xs">{{ item.time }}</div>
        </div>
      </div>
      <n-button text>
        <n-icon> <FavoriteBorderRound /> </n-icon>
        {{ getCounts(item.likedCount) }}
      </n-button>
    </div>
    <div class="item-content">
      {{ item.content }}
    </div>
    <div v-if="item.replyCount > 0" :class="collapseExpand ? 'item-floor-expand' : 'item-floor'">
      <n-collapse @item-header-click="collapseExpand = !collapseExpand">
        <n-collapse-item :title="`${item.replyCount}条回复`" name="replay">
          <n-spin :show="loading">
            <div v-for="(item, index) in replys">
              <ReplyListItem
                :item="{
                  name: item.user.nickname,
                  time: item.timeStr,
                  picUrl: item.user.avatarUrl,
                  content: item.content,
                  likedCount: item.likedCount,
                  replyCount: item.replyCount
                }"
                :index="index"
              />
              <Divider />
            </div>
          </n-spin>
          <n-button class="ml-5 text-red-400" v-if="hasMore" text @click="fetchData"
            >查看更多...</n-button
          >
        </n-collapse-item>
      </n-collapse>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment-item {
  padding: 10px 20px 0 20px;
  .item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info-basic {
      display: flex;
      gap: 12px;
    }
  }
  .item-content {
    margin: 10px 0;
  }
  .item-floor {
    padding: 5px;
    border-radius: 6px;
  }
  .item-floor-expand {
    padding: 5px;
    border-radius: 6px;
    background-color: #fef2f2;
  }
}
</style>
