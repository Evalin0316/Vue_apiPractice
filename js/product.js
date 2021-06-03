let productModal =null;
let delProductModal =null;

const vue={
    data(){
        return{
        apiUrl:'https://vue3-course-api.hexschool.io/api',
        apiPath:'ear077',
        products: [],
        isNew: false,
        templateProduct:{
            imageUrl:[],
        },
    };
    },

    methods:{
        getData(page = 1){
            axios.get(`${this.apiUrl}/${this.apiPath}/admin/products?page=${page}`).then((response)=>{
                if(response.data.success){
                    this.products = response.data.products;
                }else{
                    alert(response.data.message);
                }
            })
        },
        updateProduct(){
            if(this.isNew){
                this.products.push({
                    id:Date.now(),
                    ...this.templateProduct,
                })

            this.templateProduct={
                imageUrl:[],
            };
            productModal.hide();
            }else{
                const index = this.products.findIndex((item) => item.id === this.templateProduct.id);
                this.products[index] = this.templateProduct;
                productModal.hide();
            }
        },
        openModal(isNew,item){
            if(isNew === 'new'){
                this.templateProduct = {
                    imageUrl:[],
                };
                this.isNew=true;
                productModal.show();
            }else if(isNew === 'edit'){
                this.templateProduct = {...item};
                this.isNew = false;
                productModal.show();
            }else if(isNew === 'delete'){
                this.templateProduct= {...item};
                delProductModal.show();
            }
        },
        delProduct() {
            // splice 用法參考
            // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
            // findIndex 用法參考
            // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
            this.products.splice(this.products.findIndex((item) => item.id === this.templateProduct.id), 1);
            delProductModal.hide();
          },
          createImages() {
            this.templateProduct.imagesUrl = [];
            this.templateProduct.imagesUrl.push('');
          },
        },
        mounted() {
          productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
          });
      
          delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
          });
      
          // 取出 Token
          const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
          if (token === '') {
            alert('您尚未登入請重新登入。');
            window.location = 'login.html';
          }
      
          axios.defaults.headers.common.Authorization = token;
      
          this.getData();
        }
      }
      Vue.createApp(vue).
      mount('#app');

