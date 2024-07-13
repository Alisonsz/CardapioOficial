<template>
    <div>
        <div class="row mb-3 mt-3">
            <div class="col-6"></div>
            <div class="col-6 create-new text-end">
                <button @click="showModalFormCategory = true" type="button" class="btn btn-green new-category">
                    <span class="add-item add-inline add-black ml-1"></span> Adicionar categoria
                </button>
            </div>
        </div>
        <div class="pb-4">
            <div class="row mt-4 mb-0">
                <div class="col-6">
                    <p class="bold-500 mb-0 pb-0">Nome da categoria</p>
                </div>
                <div class="col-6 create-new text-end">
                    <p class="bold-500 mb-0 pb-0">Cardápios</p>
                </div>
            </div>
            <div v-if="allCategories.length === 0">
                <hr><p class="mt-4">Você ainda não adicionou nenhuma categoria ao seu cardápio. Comece agora para atrair cada vez mais clientes!</p>
            </div>
            <div class="table-data" v-for="(category, index) in allCategories" :key="index">
                <hr>
                <div class="row mt-4 mb-0">
                    <div class="col-6">
                        <p class="mb-0 pb-0">{{ category.name }}</p>
                    </div>
                    <div class="col-6 create-new text-end">
                        <span class="mb-0 pb-0 btn-round input-base">{{ getMenuName(category.menu_id) }}</span>
                    </div>
                </div>
            </div>
        </div>
        <Teleport to="body">
            <ModalFormCategory :show="showModalFormCategory" @close="showModalFormCategory = false">
                <template #header>Nova categoria</template>
                <template #body>
                    <FormCategory @close-modal="showModalFormCategory= false" @save-category="saveCategory" :dataMenu="allMenus"/>
                </template>
            </ModalFormCategory>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const showModalFormCategory = ref(false)
const allCategories = ref([])
const allMenus = ref([])

const fetchCategoriesAndMenus = async () => {
    try {
        const response = await axios.get('https://projetoclick.uploading.net.br/public/api/restaurants/1/detailed', {
            headers: {
                'Authorization': 'Bearer 3|XjRorVOeQOmIE0tobq8OJDaXGJURPTudEQLoMpxI08290b45'
            }
        });
        if (response.data) {
            if (response.data.category_products) {
                allCategories.value = response.data.category_products;
            }
            if (response.data.menus) {
                allMenus.value = response.data.menus;
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const getMenuName = (menuId) => {
    const menu = allMenus.value.find(menu => menu.id === menuId);
    return menu ? menu.name : 'nenhum menu';
}

onMounted(() => {
    fetchCategoriesAndMenus();
})
</script>

<script>
import FormCategory from "./FormCategory.vue"

export default {
    name: "NavCategories",
    data() {
        return {
            allMenus: [
                {name: "Cardápio Árabe", id: 1},
                {name: "Cardápio Japonês", id: 2},
                {name: "Cardápio Italiano", id: 3},
                {name: "Cardápio de Saladas", id: 4}
            ]
        }            
    },
    methods: {
        searchCategory(term) {
            for (let i = 0; i < this.allCategories.length; i++) {
                if (this.allCategories[i].name === term) {
                    return i;
                }
            }
            return -1;
        },
        saveCategory(categoryData) {
            if (typeof categoryData.categoryName === "string" && categoryData.categoryName.trim() !== "" && typeof categoryData.selectedMenu === "object") {
                if (!this.allCategories.some(category => category.name.toLowerCase() === categoryData.categoryName.trim().toLowerCase())) {
                    this.allCategories.push({
                        name: categoryData.categoryName.trim(), 
                        products: categoryData.selectedMenu
                    });
                } else {
                    categoryData.selectedMenu.filter((menu) => {
                        if (!this.allCategories[this.searchCategory(categoryData.categoryName.trim())].products.includes(menu)) {
                            this.allCategories[this.searchCategory(categoryData.categoryName.trim())].products.push(menu);
                        }
                    });
                }
            }
        }
    },
    components: {
        FormCategory
    },
    props: {
        dataMenu: Object
    }
}
</script>

<style lang="scss" scoped>
    .create-new {
        text-align: right;
        .new-menu {
            border: 1px solid $gray-line;
            margin-right: 20px;
        }
        button {
            padding-left: 20px;
            padding-right: 20px;
        }
    }

    .table-data .input-base {
        background-color: $light-blue;
        margin-left: 10px;
        padding-top: 9px !important;
        padding-bottom: 9px !important;
        white-space: nowrap;
    }
</style>
