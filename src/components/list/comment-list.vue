<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import CommentListItem from './components/comment-list-item.vue'
import Divider from '@/components/common/divider.vue'
import { getComment } from '@/service/comment'

const props = defineProps<{
  type: string
  id: string
}>()

const sortType = ref<number>(2)
const comments = ref<Array<any>>([])
const hasMore = ref<boolean>(true)
const pageNo = ref<number>(1)
const pageSize = ref<number>(20)
const cursor = ref<string>()
const getComments = async () => {
  const params = {
    id: props.id,
    type: props.type,
    pageNo: pageNo.value,
    pageSize: pageSize.value,
    sortType: sortType.value,
    cursor: cursor.value
  }
  const result = (await getComment(params)).data.data
  console.log(result)
  hasMore.value = result.hasMore
  comments.value.push(...result.comments)
  cursor.value = result.cursor
}

const loading = ref<boolean>(false)
const fetchData = async () => {
  if (loading.value || !hasMore.value) return
  try {
    loading.value = true
    await getComments()
    pageNo.value += 1
  } catch (error) {
    console.warn(error)
  } finally {
    loading.value = false
  }
}

const resetData = () => {
  comments.value = []
  hasMore.value = true
  pageNo.value = 1
  pageSize.value = 20
  cursor.value = undefined
}

watch(sortType, () => {
  resetData()
  fetchData()
})

onMounted(() => {
  fetchData()
})
</script>

<template>
  <n-spin :show="loading" class="h-full" content-class="h-full">
    <n-infinite-scroll class="h-full overflow-scroll" :distance="20" @load="fetchData">
      <div class="comment-banner">
        <span class="text-base font-bold">评论区</span>
        <div class="comment-sort">
          <span :class="sortType === 2 ? 'selected-btn' : 'default-btn'" @click="sortType = 2"
            >最热</span
          >
          <span :class="sortType === 3 ? 'selected-btn' : 'default-btn'" @click="sortType = 3"
            >最新</span
          >
        </div>
      </div>
      <div v-for="(item, index) in comments">
        <CommentListItem
          :item="{
            id: props.id,
            commentId: item.commentId,
            type: props.type,
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
    </n-infinite-scroll>
  </n-spin>
</template>

<style lang="scss" scoped>
.comment-banner {
  background-color: rgb(248 250 252);
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  .comment-sort {
    display: flex;
    gap: 12px;
    .selected-btn {
      cursor: pointer;
      font-weight: bold;
    }
    .default-btn {
      cursor: pointer;
      color: #525252;
    }
  }
}
</style>
