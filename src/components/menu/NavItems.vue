<template>
  <div>
    <div class="row mb-3 mt-3">
      <div class="col-4">
        <div class="input-group mb-3 item-filter">
          <input type="text" class="form-control input-form" placeholder="Buscar produto" v-model="itemTerm">
          <span class="input-group-text input-form" id="basic-addon1"><span class="add-item add-inline icon-search"></span></span>
        </div>
      </div>
      <div class="col-4">
        <select class="form-select item-order input-form" v-model="orderBy" @change="orderList">
          <option value="">Organizar por</option>
          <option value="name">Nome</option>
          <option value="menu">Cardápio</option>
        </select>
      </div>
      <div class="col-4 create-new text-end">
        <button @click="openAddItemModal" type="button" class="btn btn-green new-category">
          <span class="add-item add-inline add-black ml-1"></span> Adicionar novo item
        </button>
      </div>
    </div>
    <div class="pb-4">
      <table class="table mt-3">
        <thead>
          <tr>
            <th scope="col"><span class="bold-500">Nome do produto</span></th>
            <th scope="col"><span class="bold-500">Cardápio</span></th>
            <th scope="col"><span class="bold-500">Valor</span></th>
            <th scope="col"><span class="bold-500">Status</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in searchItems" :key="index">
            <td class="bold-400">
              <img v-if="item.products_photo !== ''" :src="item.products_photo" class="thumb-table">
              <img v-else src="~@/assets/img/img.svg" class="thumb-table">
              {{ item.name }}
            </td>
            <td>{{ item.menu }}</td>
            <td>{{ item.price }}</td>
            <td class="item-actions">
              <label class="switch ml-1">
                <input type="checkbox" v-model="item.active">
                <span class="slider round"></span>
              </label>
              <button class="btn btn-round input-base edit-button" @click="editItem(index)">
                <span class="edit-data"></span>
                <span class="text">Editar</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="loading" class="text-center">
        <p>Carregando...</p>
      </div>
      <div ref="loadMoreTrigger" class="load-more-trigger"></div>
      <div v-if="allItems.length === 0">
        <p class="mt-4">Você ainda não adicionou nenhum item ao seu cardápio. Comece agora para atrair cada vez mais clientes!</p>
      </div>
    </div>
    <teleport to="body">
      <ModalFormItem :show="showModalFormItem" @close="closeModal">
        <template #header>{{ isEditing ? 'Editar item' : 'Novo item' }}</template>
        <template #body>
          <FormItem @close-modal="closeModal" @save-item="saveItem" :allCategories="allCategories" :allComplement="allComplement" :itemEditData="itemData"/>
        </template>
      </ModalFormItem>
    </teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import ModalFormItem from "../ModalBase.vue";
import FormItem from "./FormItem.vue";

const showModalFormItem = ref(false);
const allItems = ref([]);
const itemTerm = ref('');
const orderBy = ref('');
const isEditing = ref(false);
const itemData = ref({});
const allCategories = ref([]); 
const allComplement = ref([]);
const loading = ref(false);
const page = ref(1);
const limit = ref(10); // Número de itens por página

const fetchItems = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`https://projetoclick.uploading.net.br/public/api/products`, {
      params: {
        restaurant_id: 1,
        page: page.value,
        limit: limit.value
      }
    });
    if (response.data.data.length) {
      allItems.value = [...allItems.value, ...response.data.data.map(item => ({
        ...item,
        active: true,
        menu: 'Default Menu'
      }))];
      page.value++;
    }
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
  }
  loading.value = false;
};

const fetchCategories = async () => {
  try {
    const response = await axios.get('https://projetoclick.uploading.net.br/public/api/categories');
    allCategories.value = response.data.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
  }
};

const fetchComplements = async () => {
  try {
    const response = await axios.get('https://projetoclick.uploading.net.br/public/api/complements');
    allComplement.value = response.data.data;
  } catch (error) {
    console.error('Erro ao buscar complementos:', error);
  }
};

const closeModal = () => {
  showModalFormItem.value = false;
  isEditing.value = false;
  itemData.value = {};
};

const saveItem = (newItem) => {
  if (isEditing.value) {
    const index = allItems.value.findIndex(item => item.id === newItem.id);
    allItems.value.splice(index, 1, newItem);
  } else {
    allItems.value.push(newItem);
  }
  closeModal();
};

const editItem = (index) => {
  itemData.value = { ...allItems.value[index] };
  isEditing.value = true;
  showModalFormItem.value = true;
};

const openAddItemModal = () => {
  itemData.value = {
    id: "",
    active: true,
    name: "",
    price: "",
    image: "",
    description: "",
    complement: [],
    restaurant_id: 1
  };
  isEditing.value = false;
  showModalFormItem.value = true;
};

const loadMoreItems = () => {
  if (loading.value) return;
  fetchItems();
};

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadMoreItems();
  }
}, {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
});

onMounted(() => {
  fetchItems();
  fetchCategories();
  fetchComplements();
  observer.observe(document.querySelector('.load-more-trigger'));
});

watch(itemTerm, fetchItems);

const searchItems = computed(() => {
  if (itemTerm.value === '') {
    return allItems.value;
  }
  return allItems.value.filter(item => {
    return item.name.toLowerCase().includes(itemTerm.value.toLowerCase());
  });
});
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

.item-actions {
  width: 240px;
}

.item-filter {
  .form-control {
    border-radius: 9px 0 0 9px !important;
  }
  .input-group-text {
    border-radius: 0 9px 9px 0 !important;
  }
  .icon-search {
    margin-top: -5px;
  }
}

.table thead span {
  display: block;
  padding-bottom: 10px;
}

.table tbody td {
  vertical-align: middle;
  padding-top: 15px;
  padding-bottom: 15px;
}

.table tbody td .switch {
  top: -3px !important;
}

.load-more-trigger {
  height: 20px;
}
</style>
