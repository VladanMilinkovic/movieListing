<template>
  <nav class="pagination" v-if="totalPages > 1">
    <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
      Prev
    </button>

    <button
        v-for="page in visiblePages"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="changePage(page)"
    >
      {{ page }}
    </button>

    <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
      Next
    </button>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}

const visiblePages = computed(() => {
  const range = []
  const min = Math.max(1, props.currentPage - 2)
  const max = Math.min(props.totalPages, props.currentPage + 2)
  for (let i = min; i <= max; i++) {
    range.push(i)
  }
  return range
})
</script>
