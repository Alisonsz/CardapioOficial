<template>
    <form>
        <div class="row mb-2 mt-3">
            <div class="col-lg-6 d-grid gap-2" v-for="(type, index) in orderTypes" :key="index">
                <input type="checkbox" class="btn-check" :id="'btn-check-'+index" v-model="type.active" autocomplete="off">
                <label class="btn btn-add" :for="'btn-check-'+index"><span class="text">{{ type.type }}</span> <span class="add-item add-right" :class="[type.active ? 'add-on' : 'add-off']"></span></label>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-lg-6 d-grid gap-2">
                <button @click.prevent="$emit('closeModal')" type="button" class="btn btn-cancel" >Cancelar</button>
            </div>
            <div class="col-lg-6 d-grid gap-2">
                <button @click.prevent="$emit('saveModal', dataCompany, $emit('closeModal'))" type="submit" class="btn btn-save">Salvar</button>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: "FormOrderTypes",
        emits: ["closeModal", "saveModal"],
        props: {
            orderTypes: Object
        }
    };
</script>

<style scoped>
    .modal-container form {
        width: 450px !important;
    }
</style>