<template>
    <form>
        <div class="row mb-2 mt-3">
            <div class="accordion col-lg-12 pb-3 category-select" v-for="(group, index) in allGroups" :key="index">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#item-'+index" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        {{ group.group }}
                    </button>
                    </h2>
                    <div :id="'item-'+index" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <div class="d-grid gap-2" v-for="(category, i) in group.categories" :key="i" @click="addCategory(category)">
                                <label class="btn btn-add" :for="'btn-check-'+index"><span class="text">
                                    {{ category }}</span> <span class="add-item add-right" :class="[checkCategory(category) ? 'add-on' : 'add-off']"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="row mt-0">
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
        name: "FormCategories",
        data() {
            return {
                allGroups: [
                    {
                        group: "Comida oriental",
                        categories: ["Comida Japonesa", "Comida Chinesa", "Poke", "Temaki", "Sushi"]
                    },
                    {
                        group: "Comida Italiana",
                        categories: ["Pizza", "Lasanha", "Gnocchi", "Macarrão"]
                    },
                    {
                        group: "Variados",
                        categories: ["Porções", "Lanches", "Salgados", "Hot Dog"]
                    },
                ],
            } 
        },
        methods: {
            checkCategory(category) {
                return this.categories.includes(category) ? true : false;
            },
            addCategory(category) {
                if (this.categories.includes(category)) {
                    var index = this.categories.indexOf(category);
                    if (index > -1) {
                        this.categories.splice(index, 1);
                    }
                } else {
                    this.categories.push(category);
                }
            },         
        },
        emits: ["closeModal", "saveModal"],
        props: {
            categories: Object
        }
    };
</script>

<style scoped>
    .modal-container form {
        width: 450px !important;
    }
</style>