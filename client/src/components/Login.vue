<template>
    <div class="login">

        <!-- Modal Trigger -->
        <a class="right-nav black-text waves-effect waves-light login-modal modal-trigger" href="#modal">Sign In</a>

        <!-- Modal Structure -->
        <div id="modal" class="modal">
            <div class="modal-content">
                <h4>Sign In</h4>

                <div class="row">
                    <form class="col s12">
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">email</i>
                                <input id="icon_email_reg" type="text" class="validate" v-model="email_login">
                                <label for="icon_email">Email</label>
                            </div>
                            <div class="input-field col s12">
                                <i class="material-icons prefix">android</i>
                                <input id="icon-password_reg" type="password" class="validate" v-model="password_login" @keyup.enter="signin">
                                <label for="icon-password">Password</label>
                            </div>
                            <small style="color:grey">Psst..The form can be quite hard to click. Maybe you should use 'tab' on your keyboard instead..</small>
                        </div>
                    </form>
                </div>
    
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-green btn #eceff1 blue-grey lighten-5 #009688-text teal-text">Cancel</a>
                <a class="modal-close waves-effect waves-green btn" @click="signin">Sign In</a>
            </div>
        </div>

    </div>

</template>

<script>
export default {
  name: 'Login',
  props: {
  },
  data: function() {
    return {
        email_login: '',
        password_login: ''

    }
  },
  components: {
  },
  methods: {
    signin () {

        let obj = {
        email: this.email_login,
        password: this.password_login
        }

        axios.post('http://localhost:3000/users/signin', obj)
            .then(result => {
                // console.log('User sign in successfull ',result)

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans|Fira+Sans+Extra+Condensed|Hind+Madurai|Khand|Roboto');

.login-modal {
    font-family: 'Fira Sans', sans-serif;
    font-size: 30px;
    color: black;
}

.login-modal:hover {
  text-decoration: underline teal;
}

.login {
    color: black;
    font-family: 'Fira Sans', sans-serif;
}

.modal-content, .row, .check { padding-bottom: 0px; margin-bottom: 0px; }

/* .modal { height: 30% !important } */

.btn { margin-left: 10px; margin-right: 10px; }


</style>
