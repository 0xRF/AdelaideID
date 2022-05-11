var vue = new Vue({
el: '#app',
data: {
    token: undefined,
    newToken: "",
  },
  mounted() {
    this.token = Cookies.get("token");

  },
    methods:{
        setToken() {
            Cookies.set("token", this.newToken);
            this.token = this.newToken
        }
    }
})