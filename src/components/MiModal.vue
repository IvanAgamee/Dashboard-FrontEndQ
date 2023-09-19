<template>
  <div class="modal" v-if="show">
    <div class="modal__overlay" @click="close"></div>
    <div class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
});

const emits = defineEmits(['close']);

function close() {
  emits('close');
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.modal__content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  z-index: 1000;
}
</style>