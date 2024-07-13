// src/views/MenuView.vue
<template>
    <div class="menu" @skip-categories="skipCategories">
        <div class="menu-new" v-if="dataMenu.length === 0">
            <div class="container-small">
                <h2 class="text-center size-24 bold-700">Criar um novo cardápio</h2>
                <p class="text-center">Para começar, vamos criar seu primeiro cardápio.</p>
                <FormMenu :dataMenu="dataMenu" @save-menu-name="saveMenuName"/>
            </div>
        </div>
        <div class="menu-categories" v-else-if="(typeof dataMenu[0].categories !== 'object' || dataMenu[0].categories.length === 0) && skipStepCategories === false">
            <div class="container-small">
                <h2 class="text-center size-24 bold-700">Meu cardápio</h2>
                <p class="text-center">Agora você precisa adicionar as categorias.</p>
                <FormCategories :dataMenu="dataMenu" @skip-categories="skipCategories" @save-categories="saveCategories"/>
            </div>
        </div>
        <div class="menu-data" v-else>
            <Menu :dataMenu="dataMenu"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '../config';
import FormMenu from "../components/menu/FormMenu.vue";
import FormCategories from "../components/menu/FormCategories.vue";
import Menu from "../components/menu/Menu.vue";

export default {
    name: "MenuView",
    components: {
        FormMenu,
        FormCategories,
        Menu
    },
    methods: {
        async saveMenuName(menuName) {
            if (typeof menuName === "string" && menuName.trim() !== "") {
                try {
                    const response = await axios.post(`${API_BASE_URL}/api/menus`, {
                        name: menuName.trim(),
                        restaurant_id: 1
                    });
                    if (response.status === 201) {
                        // Adiciona o novo menu ao estado dataMenu
                        this.dataMenu.push({ name: menuName.trim(), categories: [] });
                    }
                } catch (error) {
                    console.error('Erro ao salvar o cardápio:', error);
                    // Trate o erro apropriadamente
                }
            }
        },
        saveCategories(allCategories) {
            if (typeof allCategories === "object" && allCategories.length > 0) {
                this.dataMenu[0].categories = allCategories; 
            }
        },
        skipCategories() {
            this.skipStepCategories = true;
        }
    },
    data() {
        return {
            selectedMenu: 0,
            skipStepCategories: false,
            dataMenu: []
        }            
    }
}
</script>
