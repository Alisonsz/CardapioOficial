<template>
    <div class="container-data">
        <form @submit.prevent="save">  
            <div class="row">
                <div class="col-lg-12 d-grid">
                    <label class="form-label bold-500 mb-1">Nome</label>
                    <input type="text" class="form-control" v-model="dataComplement.name" placeholder="Ex: Hamburguer">
                    <p class="mb-0 mt-1 required-alert" v-show="invalid.name">*Campo obrigatório</p>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-6 d-grid">
                    <div class="w-full search-input">
                        <label class="form-label bold-500 mb-1">Adicionar item</label>
                        <input type="text" class="form-control" placeholder="Digite..." v-model="productTerm">
                        <ul v-if="searchProducts.length" class="w-full rounded search-list" role="list">
                            <li v-for="(product, index) in searchProducts" :key="index">
                                <span>{{ product.name }}</span> <span role="button" class="add-item add-right add-on" @click="selectProduct(product), productTerm=''"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="mt-3 pointer">
                <span role="button" @click="showModalFormItem = true">
                    <span class="add-item add-inline add-black ml-1"></span> Clique aqui para criar e adicionar um novo item
                </span>
            </div>
            <div v-if="dataComplement.items.length">
                <draggable v-model="dataComplement.items" tag="div">
                    <template #item="{ element: item, index }">
                        <div class="list-item accordion mt-3" :id="('accordion-'+index)">
                            <div class="accordion-item">
                                <h2 class="accordion-header" :id="'heading-'+index">
                                    <span>
                                        <span class="add-item add-inline icon-drag ml-1"></span> {{ item.name }}
                                    </span>
                                    <span class="item-actions">
                                        <span class="item-price" @click.prevent="">R$ 
                                            <span v-if="item.extravalue">{{ item.extravalue.toFixed(2) }}</span>
                                            <span v-else>0,00</span>
                                        </span>
                                        <div class="dropdown">
                                            <span class="dropdown-toggle add-item add-inline icon-options ml-1" data-bs-toggle="dropdown" aria-expanded="false"></span>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#" @click="showModalFormItem = true, editItem(index)">Editar</a></li>
                                                <li><a class="dropdown-item" href="#" @click="removeItem(index)">Excluir</a></li>
                                                <li><a class="dropdown-item" href="#" @click="showModalFormAddItem = true, addItem(index)">Adicionar complemento</a></li>
                                            </ul>
                                        </div>
                                    </span>
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="('#item-'+index)" aria-expanded="false" aria-controls="('item-'+index)"></button>
                                </h2>
                                <div :id="('item-'+index)" class="accordion-collapse collapse" :aria-labelledby="'heading-'+index" :data-bs-parent="('#item-'+index)">
                                    <div class="accordion-body">
                                        <div v-if="item.items && item.items.length">
                                            <draggable v-model="item.items" tag="div">
                                                <template #item="{ element: subitem, i }">
                                                    <h2 class="accordion-header mt-2 list-subitem">
                                                        <span>
                                                            <span class="add-item add-inline icon-drag ml-1"></span> {{ subitem.name }}
                                                        </span>
                                                        <span class="item-actions">
                                                            <div class="dropdown">
                                                                <span class="dropdown-toggle add-item add-inline icon-options ml-1" data-bs-toggle="dropdown" aria-expanded="false"></span>
                                                                <ul class="dropdown-menu">
                                                                    <li><a class="dropdown-item" href="#" @click="showModalFormItem = true, editItem(i)">Editar</a></li>
                                                                    <li><a class="dropdown-item" href="#" @click="removeItem(i)">Excluir</a></li>
                                                                </ul>
                                                            </div>
                                                        </span>
                                                    </h2>
                                                </template>
                                            </draggable>
                                        </div>
                                        <div class="bold-500" v-else>
                                            <span class="mt-3 mb-3">Não há subitens cadastrados.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </draggable>
            </div>
            <div class="rules">
                <h2>Regras de uso</h2>
                <p class="hint">Defina as regras de seleção de complementos para os seus clientes.</p>
                <hr>
                <p class="text">
                    A seleção de pelo menos um item é obrigatória?
                    <label class="switch-yn ml-1">
                        <input type="checkbox" v-model="dataComplement.selectOne">
                        <span class="slider round"></span>
                    </label>
                </p>
                <p class="text">
                    Até quantos itens diferentes o usuário pode selecionar?
                </p>
                <input type="number" class="form-control number" v-model="dataComplement.selectNumber">
                <p class="text">
                    O usuário pode selecionar um item mais de uma vez?
                    <label class="switch-yn ml-1">
                        <input type="checkbox" v-model="dataComplement.selectMore">
                        <span class="slider round"></span>
                    </label>
                </p>
                <div v-show="dataComplement.selectMore">
                    <p class="text">
                        Até quantas vezes?
                    </p>
                    <input type="number" class="form-control number" v-model="dataComplement.moreNumber">
                </div>
            </div>
        </form>
        <div class="row mb-3 mt-4 modal-footer">
            <div class="offset-lg-8 col-lg-2 d-grid gap-2">
                <button @click.prevent="$emit('closeModal')" type="button" class="btn btn-cancel">Cancelar</button>
            </div>
            <div class="col-lg-2 d-grid gap-2">
                <button @click.prevent="save" type="submit" class="btn btn-save">Salvar</button>
            </div>
        </div>
        <Teleport to="body">
            <ModalFormAddItem :show="showModalFormAddItem" @close="showModalFormAddItem = false" @newItem="openNewItemForm" @searchItem="openSearchItemForm">
                <template #header>Adicionar item</template>
                <template #body>
                    <FormAddItem @close-modal="showModalFormAddItem= false" @new-item="showModalFormItem = true" @search-item="showModalFormSearchItem = true"/>
                </template>
            </ModalFormAddItem>
            <ModalFormSearchItem :show="showModalFormSearchItem" @close="showModalFormSearchItem = false">
                <template #header>Buscar item</template>
                <template #body>
                    <FormSearchItem @close-modal="showModalFormSearchItem= false" @save-item="saveItem" :idAdd="itemEditData.idAdd"/>
                </template>
            </ModalFormSearchItem>
            <ModalFormItem :show="showModalFormItem" @close="showModalFormItem = false">
                <template #header>Novo item</template>
                <template #body>
                    <FormItem @close-modal="showModalFormItem= false" @save-item="addItemToComplement" :itemEditData="itemEditData"/>
                </template>
            </ModalFormItem>
        </Teleport>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';
    import axios from 'axios';
    import draggable from 'vuedraggable';
    import ModalFormAddItem from "../ModalBase.vue";
    import ModalFormSearchItem from "../ModalBase.vue";
    import ModalFormItem from "../ModalBase.vue";
    import FormAddItem from "./FormAddItem.vue";
    import FormSearchItem from "./FormSearchItem.vue";
    import FormItem from "./FormItem.vue";

    const showModalFormAddItem = ref(false);
    const showModalFormSearchItem = ref(false);
    const showModalFormItem = ref(false);

    const productList = ref([]);
    const productTerm = ref('');
    const searchProducts = computed(() => {
        if (productTerm.value === '') {
            return [];
        }
        let matches = 0;
        return productList.value.filter(product => {
            if (product.name.toLowerCase().includes(productTerm.value.toLowerCase()) && matches < 10) {
                matches++;
                return product;
            }
        });
    });

    const itemEditData = ref({});
    const invalid = ref({ name: false });
    const dataComplement = ref({
        name: "",
        active: true,
        items: [],
        selectOne: true,
        selectNumber: 1,
        selectMore: false,
        moreNumber: 1
    });

    onMounted(() => {
        productList.value = [
            { name: "Granola", extravalue: 2.50 },
            { name: "Banana", extravalue: 1.50 },
            { name: "Morango", extravalue: 2.50 },
            { name: "Leite condensado", extravalue: 3.50 },
            { name: "Paçoca", extravalue: 1.50 },
            { name: "Nutella", extravalue: 5.50 },
            { name: "Coco ralado", extravalue: 2.50 },
            { name: "Leite zero lactose", extravalue: 2.50 },
            { name: "Kiwi", extravalue: 5.50 },
            { name: "Amendoim", extravalue: 1.50 },
            { name: "Castanha do Pará", extravalue: 2.20 },
            { name: "Leite em pó", extravalue: 2.50 },
            { name: "Doce de Leite", extravalue: 2.40 },
            { name: "Mel", extravalue: 2.50 },
            { name: "Granulado de chocolate", extravalue: 2.70 },
            { name: "Goiabada", extravalue: 1.20 },
            { name: "Leite desnatado", extravalue: 2.50 },
            { name: "Bis", extravalue: 1.50 },
            { name: "Frutas vermelhas", extravalue: 3.10 },
            { name: "Brigadeiro", extravalue: 2.50 }
        ];
        productList.value = productList.value.sort((a, b) => a.name.localeCompare(b.name));
    });

    function selectProduct(selectedProduct) {
        if (!dataComplement.value.items.some(product => product.name.toLowerCase() === selectedProduct.name.toLowerCase())) {
            dataComplement.value.items.push(selectedProduct);
        }
    }

    function addItemToComplement(itemData) {
        if (itemData) {
            dataComplement.value.items.push(itemData);
        }
    }

    function openNewItemForm() {
        showModalFormItem.value = true;
    }

    function openSearchItemForm() {
        showModalFormSearchItem.value = true;
    }

    function saveItem(itemData) {
        if (itemData && typeof itemData.idAdd === "number") {
            if (typeof dataComplement.value.items[itemData.idAdd].items === "object") {
                dataComplement.value.items[itemData.idAdd].items.push(itemData);
            } else {
                dataComplement.value.items[itemData.idAdd].items = [itemData];
            }
        } else {
            dataComplement.value.items.push(itemData);
        }
    }

    function editItem(index) {
        if (typeof index === "number") {
            itemEditData.value = dataComplement.value.items[index];
            itemEditData.value.id = index;
        }
    }

    function removeItem(index) {
        if (typeof index === "number") {
            dataComplement.value.items.splice(index, 1);
        }
    }

    function validate(data) {
        let isValid = true;
        for (const field in invalid.value) {
            if (Object.prototype.hasOwnProperty.call(invalid.value, field)) {
                if (typeof data[field] === "string" && data[field] === "") {
                    invalid.value[field] = true;
                    isValid = false;
                } else {
                    invalid.value[field] = false;
                }
            }
        }
        return isValid;
    }

    async function save() {
        if (validate(dataComplement.value)) {
            try {
                const response = await axios.post('https://projetoclick.uploading.net.br/public/api/components', {
                    name: dataComplement.value.name,
                    max_selections: dataComplement.value.selectNumber,
                    min_selections: null,
                    max_item_select: dataComplement.value.moreNumber,
                    is_required: dataComplement.value.selectOne,
                    restaurant_id: 1,
                    items: dataComplement.value.items.map(item => ({
                        name: item.name,
                        extravalue: item.extravalue || 0
                    }))
                }, {
                    headers: {
                        Authorization: 'Bearer 3|XjRorVOeQOmIE0tobq8OJDaXGJURPTudEQLoMpxI08290b45'
                    }
                });
                console.log('Component saved:', response.data);
                dataComplement.value.items = []; // Clear the items after save
                this.$emit('saveComplement', dataComplement.value);
                this.$emit('closeModal');
            } catch (error) {
                console.error('Error saving component:', error);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal-body .container-data {
        width: 600px;
        padding: 0 !important;
    }

    .header {
        .title {
            margin-top: 10px;
        }
        .status label {
            margin-top: 5px;
            float: right;
        }
    }

    .hr-title {
        margin-top: 15px;
    }

    .input-group {
        .block-1 {
            border-color: $gray-line;
            padding-top: 8px;
            background-color: $white-primary;
        }
        .block-2 {
            background-color: $gray-line;
        }
        .block-3 {
            border-radius: 0 9px 9px 0 !important;
        }

    } 

    .form-floating {
        margin-top: -12px;
    }

    .item-description {
        height: 80px;
    }

    .rules {
        border: 1px solid $gray-line;
        border-radius: 9px !important;
        margin-top: 20px;
        padding: 15px;
        h2 {
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 2px
        }
        .hint {
            margin: 5px 0;
        }
        hr {
            margin: 5px 0 20px 0;
        }
        p.text {
            font-size: 16px;
            font-weight: 500;
            margin: 16px 0 0 0;
        }
        input.number {
            width: 50px;
            margin-top: 5px;
        }
    }

    .accordion-button:not(.collapsed) {
        background-color: transparent;
        border: none !important;
        color: $black-secondary;
        box-shadow: none;
    }

    .accordion-header {
        position: relative;
        font-size: 16px;
        height: 45px;
        font-weight: 400;
        padding-top: 13px;
        padding-left: 16px;
    }

    .accordion-button {
        position: absolute;
        top: 0;
        right: 3px;
        width: 40px;
        padding-left: 8px;
        background-color: transparent;
    }

    .accordion-header .icon-drag {
        margin-top: -5px;
    }

    .accordion-header .item-price {
        padding: 6px 14px;
        margin-right: 15px;
        border-radius: 4px;
        position: relative;
        top: 1px;
        position: absolute;
        top: 7px;
        right: 75px;
    }

    .accordion-header .icon-options {
        background-size: 26px 26px;
        height: 26px;
        width: 26px;
        position: absolute;
        top: 8px;
        right: 38px;
    }

    .accordion-body {
        padding-top: 0;
    }

    .item-actions .dropdown {
        position: absolute;
        right: 0;
        top: 0;
    }

    .item-actions .dropdown-toggle::after {
        display: none;
    }

    .item-actions .dropdown li {
        border-top: 1px solid $gray-line;
        padding-top: 10px;
        padding-bottom: 10px;
        list-style: none;
    }

    .item-actions .dropdown li:first-child {
        border-top: none !important;
    }

    .dropdown-menu {
        padding: 2px 15px;
    }

    .list-item .accordion-item {
        background-color: $gray-bg;
    }

    .list-item .accordion-header .item-price {
        background-color: $white-primary;
    }

    .list-subitem {
        background-color: $white-primary;
    }

    .list-subitem .item-price {
        background-color: $gray-bg;
    }
</style>
