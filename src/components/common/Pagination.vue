<template>
  <nav class="pagination" v-if="totalPages > 1">
    <div class="info">
      Showing {{ from }} to {{ to }} of {{ totalResults }} movies
    </div>

    <div class="controls">
      <button :disabled="currentPage === 1" @click="changePage(1)">
        «
      </button>
      <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
        ‹
      </button>

      <span class="page-info">{{ currentPage }} of {{ totalPages }}</span>

      <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
        ›
      </button>
      <button :disabled="currentPage === totalPages" @click="changePage(totalPages)">
        »
      </button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  totalResults: number
  perPage: number
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}

const from = computed(() => (props.currentPage - 1) * props.perPage + 1)
const to = computed(() => Math.min(props.currentPage * props.perPage, props.totalResults))
</script>

