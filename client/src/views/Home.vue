<template>
  <div class="home">
    
    <div class="row animated fadeIn">
      <div class="container-form">
        <div class="form col l3 offset-l1 s10 offset-s1">
          <div class="row">
            <form class="col l12 s12">
              <div class="row">
                <div class="container-heading col l12 s12">
                  <p class="form-heading">Register .</p>
                </div>
              </div>
              <div class="row">
                <div class="input-field col l12 s12">
                  <input id="email" type="email" class="validate" v-model="email_register">
                  <label for="email">Email</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col l12 s12">
                  <input id="password" type="password" class="validate" v-model="password_register" @keyup.enter="register">
                  <label for="password">Password</label>
                </div>
              </div>
              <div class="row">
                <a class="waves-effect waves-light btn reg" @click="register">JOIN US</a>
              </div>
              <h4 class="absolute animated slideInLeft">. Friendly todolist for your travel<span class="white-color">ing pleasures .</span></h4>
            </form>
          </div>
        </div>
        <div class="container-img l5 s12">
          <img class="frontimage responsive-img" src="https://storage.googleapis.com/wanderlist-files.madebybastian.com/web-images/bycicle.jpg">
        </div>
      </div>
    </div>

    <footer>
      <a href="http://www.madebybastian.com/" style="color:teal" target="_blank">© 2018 madebybastian.com</a>
    </footer>

  </div>
</template>


<style scoped>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans|Fira+Sans+Extra+Condensed|Hind+Madurai|Khand|Roboto");

.absolute {
  position: absolute;
  margin-left: 50px;
}

.white-color {
  color: white;
}

@media only screen and (max-width: 375px) {
  .container-heading {
    margin-top: 0px !important;
  }

  .form-heading {
    margin-top: 20px;
  }

  .absolute {
    position: relative;
    margin-left: 0px;
  }

  h4 {
    margin-top: 50px;
  }

  .white-color {
    color: black;
  }

  .frontimage {
    margin-top: 0px !important;
    margin-left: 20px !important;
    margin-bottom: 70px;
  }

  .responsive-img {
    max-width: 90% !important;
  }

}

.container-form {
  /* border: 1px solid black; */
  /* height: 700px; */
  margin-top: 30px;
  font-family: "Fira Sans", sans-serif;
  color: black;
}

.container-heading {
  margin-top: 100px;
}

.form-heading {
  font-size: 40px;
  margin-bottom: 0px;
}

.form-heading:hover {
  color: teal;
  text-decoration: underline black;
}

.frontimage {
  /* float: right; */
  /* margin-right: 10vw; */
  margin-top: 40px;
  margin-left: 100px;
  max-height: 600px;
  border-radius: 10px;
}

.reg {
  margin-left: 10px;
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

.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}

.homeimage {
  max-height: 400px;
  border-radius: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  opacity: 0.7;
  transition: width 2s, opacity 2s;
}

.homeimage:hover {
  width: 100%;
  opacity: 1;
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Login from "@/components/Login.vue";

export default {
  name: "home",
  data: function() {
    return {
      email_register: "",
      password_register: ""
    };
  },
  components: {
    HelloWorld,
    Login
  },
  created() {
    this.fbinit();
  },
  methods: {
    register() {
      let obj = {
        email: this.email_register,
        password: this.password_register
      };

      axios
        .post("http://35.198.209.134/users/signup", obj)
        .then(result => {
          // console.log('User sign up successfull ',result)

          let token = result.data.token;
          localStorage.setItem("authkey", token);

          alertify.success(`User registration successful :D`);
          alertify.success(
            `You'll be redirected to your todolist page in a few seconds..`
          );

          setTimeout(() => {
            this.$router.push("todolist");
          }, 2000);
        })
        .catch(err => {
          console.log("ERROR user sign up", err);
        });
    },
    fbinit() {
      window.fbAsyncInit = function() {
        FB.init({
          appId: "444144236032201",
          cookie: true,
          xfbml: true,
          version: "v3.0"
        });

        // FB.AppEvents.logPageView();

        //This function should be here, inside window.fbAsyncInit
        // FB.getLoginStatus(function(response) {
        //   console.log(response);
        // });
      };

      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    }
  }
};
</script>
