<template>
    <div class="profile container-data">
        <div class="row">
            <div class="col-lg-6">
                <div class="row">
                    <div class="col profile-image">
                        <img :src="dataCompany.image">
                    </div>
                    <div class="col d-flex align-items-center justify-content-center profile-logo">
                        <img :src="dataCompany.logo">
                    </div>
                </div>
            </div>
            <div class="col-lg-6 information">
                <h3>Informações Gerais <span class="edit-data" @click="showModalCompany = true"></span></h3>
                <hr/>
                <p>
                    <span class="trade">{{ dataCompany.trade }}</span>
                    <span> - {{ dataCompany.company }}</span>
                </p>
                <p>
                    <span>{{ dataCompany.address }}</span>
                    <span>, {{ dataCompany.number }}</span>
                    <span> - {{ dataCompany.neighborhood }}</span>
                    <span> - {{ dataCompany.city }}</span>
                    <span>/{{ dataCompany.state }}</span>
                    <span> - {{ dataCompany.postalCode }}</span>
                </p>
                <p>{{ dataCompany.registrationNumber }}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <div class="categories">
                    <hr/>
                    <h3>Categorias <span class="edit-data" @click="showModalCategories = true"></span></h3>
                    <p class="hint">Atenção: As categorias poderão ser editadas somente de 20 em 20 dias.</p>
                    <ul>
                        <li class="input-base" v-for="(category, index) in dataCompany.categories" :key="index">{{ category }}</li>
                    </ul>
                </div>
                <div class="preparation-time">
                    <hr/>
                    <h3>Tempo médio de preparo <router-link  to="/tempo" class="edit-data"></router-link></h3>
                    <p class="hint">Esse será o tempo médio de preparo que o estabelecimento terá para preparar o pedido.</p>
                    <ul>
                        <li v-for="(preparation, index) in dataCompany.preparationTime" :key="index">{{ preparation.type }} <span class="input-base">{{ preparation.time }}</span></li>
                    </ul>                    
                </div>
                <div class="order-types">
                    <hr/>
                    <h3>Formas de pedidos aceitas <span class="edit-data" @click="showModalOrderTypes = true"></span></h3>
                    <p class="hint">Essas serão as formas com que o cliente poderá pedir do seu estabelecimento através do aplicativo.</p>
                    <ul>
                        <li class="input-base" v-for="(type, index) in dataCompany.orderTypes" :key="index" :class="[type.active ? '' : 'inactive']">{{ type.type }}</li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="description">
                    <hr/>
                    <h3>Descrição</h3>
                    <p class="desc-info">{{ dataCompany.description }}</p>
                </div>
                <div class="withdrawal">
                    <h3>Instruções para retirada</h3>
                    <p class="desc-info">{{ dataCompany.withdrawal }}</p>
                </div>
                <div class="opening-hours">
                    <h3>Horários de funcionamento <router-link  to="/horarios" class="edit-data"></router-link></h3>
                    <p>{{ dataCompany.openingHours }}</p>
                </div>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <ModalCategories :show="showModalCategories" @close="showModalCategories = false">
            <template #header>Categorias</template>
            <template #body>
                <FormCategories @close-modal="showModalCategories = false" @save-modal="saveCategories" :categories="dataCompany.categories"/>
            </template>
        </ModalCategories>
        <ModalOrderTypes :show="showModalOrderTypes" @close="showModalOrderTypes = false">
            <template #header>Formas de pedidos aceitas</template>
            <template #body>
                <FormOrderTypes @close-modal="showModalOrderTypes = false" @save-modal="saveOrderTypes" :orderTypes="dataCompany.orderTypes"/>
            </template>
        </ModalOrderTypes>
        <ModalCompany :show="showModalCompany" @close="showModalCompany = false">
            <template #header>Informações gerais</template>
            <template #body>
                <FormCompany @close-modal="showModalCompany = false" @save-modal="saveCompany" :dataCompany="dataCompany"/>
            </template>
        </ModalCompany>
    </Teleport>
</template>

<script setup>
    import { ref } from 'vue'

    import ModalCategories from "../components/ModalBase.vue"
    const showModalCategories = ref(false)

    import ModalOrderTypes from "../components/ModalBase.vue"
    const showModalOrderTypes = ref(false)

    import ModalCompany from "../components/ModalBase.vue"
    const showModalCompany = ref(false)
</script>

<script>
    import FormCategories from "../components/profile/FormCategories.vue"
    import FormOrderTypes from "../components/profile/FormOrderTypes.vue"
    import FormCompany from "../components/profile/FormCompany.vue"
    
    export default {
        name: "ProfileView",
        components: {
            FormCategories,
            FormOrderTypes,
            FormCompany
        },
        methods: {
            saveCategories(data) {
                this.dataCompany.categories = data;
                this.$emit('closeModal');
            },
            saveOrderTypes(data) {
                this.dataCompany.orderTypes = data;
                this.$emit('closeModal');
            },
            saveCompany(data) {
                this.dataCompany = data;
                this.$emit('closeModal');
            }
        },
        data() {
            return {
                dataCompany: {
                    image: "/img/image.png",
                    logo: "/img/logo2.png",
                    trade: "Tatá Sushi",
                    company: "Tatá Sushi alimentos LTDA",
                    registrationNumber: "202.230.234/0001-23",
                    postalCode: "02938-000",
                    address: "R. João Cachoeira",
                    number: "278",
                    neighborhood: "Itaim Bibi",
                    city: "São Paulo",                
                    state: "SP",     
                    description: "O TATÁ Sushi é comandado pelos sócios Leonardo Young, vencedor do MasterChef Brasil, Luizinho Hirata, conhecido como um dos grandes responsáveis pelo sucesso do restaurante KOI e Tito Livio Capobianco Jr.",           
                    withdrawal: "Essas serão as instruções de retirada que aparecerão ao cliente após realizar um pedido no seu estabelecimento. Coloque detalhes para facilitar a experiência do cliente.",  
                    openingHours: "Segunda à Sexta: Das 11h00 até 19h00\nSábado e Domingo: Das 13h00 até 19h00",  
                    categories: ["Comida Japonesa", "Poke", "Temaki"],  
                    preparationTime: [{type: "Normal", time: "20min"},{type: "Outros", time: "45min"}],  
                    orderTypes: [{type: "Retirada", active: false}, {type: "Comer no local", active: true}]  
                }
            }            
        }
    }
</script>

<style lang="scss" scoped>
    .profile-logo {
        text-align: center;
    }
    .description {
        padding-top: 18px;
        hr {
            display: none;
        }
    }
    .information {
        .trade {
            font-weight: 500;
        }
        p, span {
            font-size: 16px;
        }
    }
    .opening-hours {
        white-space: pre;
    }
    .categories ul, .preparation-time ul, .order-types ul {
        padding-left: 0;
        li {
            list-style-type: none;
            display: inline-block;            
            margin-right: 15px;
        }
        .input-base {
            border-radius: 18px;
            padding-top: 12px;
            padding-bottom: 12px;
        }
        li.input-base, li span.input-base {
            background-color: $light-blue;
        }
        li span.input-base {
            display: inline-block; 
            margin-left: 5px; 
        }
        li.inactive {
            background-color: $gray-bg;
        }
    }
</style>