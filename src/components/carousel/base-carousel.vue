<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { KeyboardArrowLeftRound, KeyboardArrowRightRound } from '@vicons/material'

const props = defineProps<{ total: number; slides: number }>()
const current = ref<number>(0)
const arrowDisabled = reactive({
  prev: computed(() => current.value - props.slides < 0),
  next: computed(() => current.value + props.slides >= props.total)
})

const carouselPrev = () => {
  current.value = current.value - props.slides
}
const carouselNext = () => {
  current.value = current.value + props.slides
}
</script>

<template>
  <div class="carousel-container">
    <div
      class="carousel-arrow"
      :class="arrowDisabled.prev ? 'not-click' : ''"
      @click="carouselPrev"
    >
      <n-icon><KeyboardArrowLeftRound /></n-icon>
    </div>
    <n-carousel
      :slides-per-view="slides"
      :space-between="20"
      :show-dots="false"
      :current-index="current"
    >
      <slot name="default"></slot>
    </n-carousel>
    <div
      class="carousel-arrow"
      :class="arrowDisabled.next ? 'not-click' : ''"
      @click="carouselNext"
    >
      <n-icon><KeyboardArrowRightRound /></n-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel-container {
  width: calc(100% - 20px);
  margin: 10px;
  padding-bottom: 10px;
  display: inline-flex;
  justify-content: center;
  .carousel-arrow {
    height: 100%;
    margin: 0 10px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    font-size: 36px;
    cursor: pointer;
    background-color: #fef2f2;
    transition: 100ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .carousel-arrow:hover {
    background-color: #fca5a5;
    transition: 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .not-click {
    color: #d4d4d4;
    background-color: #fafafa;
    pointer-events: none;
  }
}
</style>
