<template>
  <div class="register">

    <div class="row">
      <div class="logres-container col l8 offset-l2 s10 offset-s1">

        <div class="signin col l6 s12 no-padding">
          <h4 sty>Sign In</h4>

          <div class="row">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">email</i>
                  <input id="icon_email_reg" type="text" class="validate" v-model="email_login">
                  <label for="icon_email_reg">Email</label>
                </div>
                <div class="input-field col s12">
                  <i class="material-icons prefix">android</i>
                  <input id="icon-password_reg" type="password" class="validate" v-model="password_login" @keyup.enter="signin">
                  <label for="icon-password">Password</label>
                </div>
              </div>
            </form>
            <a class="waves-effect waves-green btn col l10 offset-l1 s10 offset-s1" @click="signin">Sign In</a>
          </div>

        </div>
      </div>
    </div>

    <footer>
      <a href="http://www.madebybastian.com/" style="color:teal" target="_blank">© 2018 madebybastian.com</a>
    </footer>  

  </div>
</template>

<style scoped>

.logres-container {
  /* border: 1px solid black; */
  min-height: 100px;
}

.signup {
  /* border: 1px solid red; */
  min-height: 50px;
  padding: 20px 40px 20px 40px;
}

.signin {
  /* border: 1px solid blue; */
  min-height: 50px;
  padding: 20px 40px 20px 40px;
}

.logo {
  color: #009900;
}

.logo-bg {
  background-color: #009900;
}

.no-padding {
  padding-left: 0px;
  padding-right: 0px;
}

footer {
  margin-bottom: 30px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  font-weight: bold;
  text-align: center;
}


</style>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'register',
  data () {
    return {
      email_login: '',
      password_login: ''
    }
  },
  components: {
    HelloWorld,
  },
  methods: {
    signin () {
      let obj = {
        email: this.email_login,
        password: this.password_login
      }

      axios.post('http://35.198.209.134/users/signin', obj)
        .then(result => {

          let token = result.data.token;
          localStorage.setItem("authkey", token);

          alertify.success(`Sign in successful :D`);
          alertify.success(`You'll be redirected to your todolist page in a few seconds..`);
          
          setTimeout(() => { this.$router.push('todolist') }, 2000);            
        })
        .catch(err => {
          console.log('ERROR user sign in',err)
        })
    }

  }
}
</script>

