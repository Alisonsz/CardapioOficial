<script>
import axios from 'axios';

export default {
  name: "FormItem",
  props: {
    allCategories: {
      type: Array,
      default: () => []
    },
    allComplement: {
      type: Array,
      default: () => []
    },
    itemEditData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      imageName: "",
      selectCategory: "",
      selectComplement: "",
      categories: [],
      invalid: {
        name: false,
        price: false
      },
      itemData: {
        id: "",
        active: true,
        name: "",
        price: "",
        image: "",
        description: "",
        complement: [],
        restaurant_id: 1 
      }
    };
  },
  methods: {
    addCategory() {
      if (this.selectCategory !== "") {
        let index = this.categories.findIndex(data => data.name == this.selectCategory);
        if (index < 0) {
          this.categories.push({ name: this.selectCategory, active: true });
        }
        this.selectCategory = "";
      }
    },
    addComplement() {
      if (this.selectComplement !== "") {
        let index = this.itemData.complement.findIndex(data => data.name == this.selectComplement);
        if (index < 0) {
          this.itemData.complement.push({ name: this.selectComplement, active: true });
        }
        this.selectComplement = "";
      }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      this.imageName = file.name;
      var reader = new FileReader();
      reader.onload = (e) => {
        this.itemData.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    valid(data) {
      let isvalid = true;
      for (const field in this.invalid) {
        if (this.invalid.hasOwnProperty(field)) {
          if (typeof data[field] === "string" && data[field] === "") {
            this.invalid[field] = true;
            isvalid = false;
          } else {
            this.invalid[field] = false;
          }
        }
      }
      return isvalid;
    },
    async save() {
      if (this.valid(this.itemData)) {
        if (this.itemData.id) {
          await this.updateItem();
        } else {
          await this.createItem();
        }
        this.$emit('closeModal');
      }
    },
    async createItem() {
      try {
        let formData = new FormData();
        formData.append('name', this.itemData.name);
        formData.append('price', this.itemData.price);
        formData.append('description', this.itemData.description);
        formData.append('restaurant_id', this.itemData.restaurant_id);
        if (this.itemData.image) {
          formData.append('products_photo', this.itemData.image);
          formData.append('products_cover', this.itemData.image);
        }
        const response = await axios.post('https://projetoclick.uploading.net.br/public/api/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        this.$emit('saveItem', response.data);
      } catch (error) {
        console.error('Erro ao criar item:', error);
      }
    },
    async updateItem() {
      try {
        let formData = new FormData();
        formData.append('name', this.itemData.name);
        formData.append('price', this.itemData.price);
        formData.append('description', this.itemData.description);
        formData.append('restaurant_id', this.itemData.restaurant_id);
        if (this.itemData.image) {
          formData.append('products_photo', this.itemData.image);
          formData.append('products_cover', this.itemData.image);
        }
        const response = await axios.post(`https://projetoclick.uploading.net.br/public/api/products/${this.itemData.id}?_method=PUT`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        this.$emit('saveItem', response.data);
      } catch (error) {
        console.error('Erro ao atualizar item:', error);
      }
    }
  },
  emits: ["saveItem", "closeModal"],
  watch: {
    itemEditData: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.itemData = { ...newValue, complement: newValue.complement || [] }; 
          this.categories = newValue.categories || []; 
        } else {
          this.itemData = {
            id: "",
            active: true,
            name: "",
            price: "",
            image: "",
            description: "",
            complement: [],
            restaurant_id: 1 
          };
          this.categories = [];
        }
      }
    }
  }
};
</script>
