<template>
    <div class="container-data">
        <form @submit.prevent="saveItem">
            <div class="row mb-3">
                <div class="col-12">
                    <label class="form-label">Nome</label>
                    <input type="text" class="form-control" v-model="newItem.name" required>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12">
                    <label class="form-label">Preço</label>
                    <input type="number" class="form-control" v-model="newItem.extravalue" step="0.01" required>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12 d-grid gap-2">
                    <button type="submit" class="btn btn-save">Salvar</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const newItem = ref({
    name: '',
    extravalue: 0
});

function saveItem() {
    if (newItem.value.name && newItem.value.extravalue) {
        this.$emit('save-item', newItem.value);
        this.$emit('closeModal');
        newItem.value = { name: '', extravalue: 0 }; 
    }
}
</script>

<style scoped>
.container-data {
    width: 400px;
    padding: 20px;
}
</style>
