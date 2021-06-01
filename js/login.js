const vue = {
    data(){
        return{
            h1:"登入",
            trademark:"2021~∞ - 六角學院"
        }
    },
methods:{

    clickBtn(){
        const userNameInput = document.querySelector('#username');
        const passWordInput = document.querySelector('#password');

        //mail validation
        const mailValidation =  /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const data = {
            username:userNameInput.value,
            password:passWordInput.value
        }

        if(userNameInput.value != "" && mailValidation.test(userNameInput.value) && passWordInput.value!=""){
            axios.post(`${url}/admin/signin`, data)
            .then((res) => {
            console.log(res);
            if(res.data.success){
                // const token = res.data.token;
                // const expired =  res.data.expired;
                const { token, expired } = res.data;
                console.log(token,expired);
                //token 存在cookie
                document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
                window.location='https://evalin0316.github.io/Vue_apiPractice/product.html';
            }else{
                alert(res.data.message);
                window.location.reload();
            }
        }).catch((error)=>{
           console.log(error);
        });

        }
        
    },
    created(){

    }
}

}
Vue.createApp(vue)
.mount("#app");