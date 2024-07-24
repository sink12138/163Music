<script setup lang="ts">
import SongCard from '@/components/card/song-card.vue'
import ArtistCard from '@/components/card/artist-card.vue'
import PlaylistCard from '@/components/card/playlist-card.vue'
import AlbumCard from '@/components/card/album-card.vue'
import UserCard from '@/components/card/user-card.vue'
import MoreInfoCard from '@/components/card/more-info-card.vue'
import Divider from '@/components/common/divider.vue'
import { onMounted } from 'vue'
import {
  MusicNoteRound,
  MicRound,
  ArticleRound,
  AlbumRound,
  SupervisedUserCircleRound
} from '@vicons/material'
const props = defineProps<{
  pageData: any
  loading: boolean
}>()
const emit = defineEmits<{
  (e: 'tab', val: string): void
}>()
onMounted(() => {
  console.log(props.pageData)
})
</script>

<template>
  <n-spin :show="loading">
    <n-space vertical class="h-full overflow-y-auto py-4" v-show="!loading">
      <n-space>
        <MoreInfoCard title="单 曲" :message="pageData.song.moreText" @click="$emit('tab', 'song')">
          <template #icon>
            <n-icon><MusicNoteRound /></n-icon>
          </template>
        </MoreInfoCard>
        <SongCard v-for="song in pageData.song.songs" :song="song" />
      </n-space>
      <Divider />
      <n-space>
        <MoreInfoCard
          title="歌 手"
          :message="pageData.artist.moreText"
          @click="$emit('tab', 'artist')"
        >
          <template #icon>
            <n-icon><MicRound /></n-icon>
          </template>
        </MoreInfoCard>
        <ArtistCard v-for="artist in pageData.artist.artists" :artist="artist" />
      </n-space>
      <Divider />
      <n-space>
        <MoreInfoCard
          title="歌 单"
          :message="pageData.playlist.moreText"
          @click="$emit('tab', 'playlist')"
        >
          <template #icon>
            <n-icon><ArticleRound /></n-icon>
          </template>
        </MoreInfoCard>
        <PlaylistCard v-for="playlist in pageData.playlist.playLists" :playlist="playlist" />
      </n-space>
      <Divider />
      <n-space>
        <MoreInfoCard
          title="专 辑"
          :message="pageData.album.moreText"
          @click="$emit('tab', 'album')"
        >
          <template #icon>
            <n-icon><AlbumRound /></n-icon>
          </template>
        </MoreInfoCard>
        <AlbumCard v-for="album in pageData.album.albums" :album="album" />
      </n-space>
      <Divider />
      <n-space>
        <MoreInfoCard
          title="相关用户"
          :message="pageData.user.moreText"
          @click="$emit('tab', 'user')"
        >
          <template #icon>
            <n-icon><SupervisedUserCircleRound /></n-icon>
          </template>
        </MoreInfoCard>
        <UserCard v-for="user in pageData.user.users" :user="user" />
      </n-space>
    </n-space>
  </n-spin>
</template>
