import type { InjectionKey, Ref } from 'vue'

const currentTimeKey = Symbol('currentTime') as InjectionKey<Ref>
const durationKey = Symbol('duration') as InjectionKey<Ref>
const isPlayKey = Symbol('isPlay') as InjectionKey<Ref>
// const percentageKey = Symbol('percentage') as InjectionKey<Ref>

export { currentTimeKey, durationKey, isPlayKey }
