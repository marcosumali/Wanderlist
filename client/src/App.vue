<template>
  <div id="app">

    <div v-if="checkToken == false">
      <div class="navbar">
        <nav class="transparent z-depth-0">
          <div class="nav-wrapper">
            <a href="#" class="logo black-text animated fadeIn">Wanderlist</a>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger color-teal"><i class="material-icons">menu</i></a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><Login /></li>
              <li><a href="" class="right-nav black-text" @click.prevent="fblogin">f</a></li>
            </ul>
          </div>
        </nav>
        <ul id="mobile-demo" class="sidenav">
          <!-- <li class="margin-side-bar"><Login /></li> -->
          <li style="margin-top:10px;"><a class="waves-effect waves-light" style="font-weight:bold;font-size:25px;padding-left:20px;"><router-link :to="{ path: '/' }"><li>Home</li></router-link></a></li>
          <hr>
          <li><a class="waves-effect waves-light" style="font-weight:bold;font-size:25px;padding-left:20px;"><router-link :to="{ path: '/mauth' }"><li>Sign In</li></router-link></a></li>
          <li class="margin-side-bar"><a href="" class="right-nav black-text" style="padding-left: 0px;font-size:30px;"  @click.prevent="fblogin">f</a></li>
          <hr>
        </ul>
      </div>
    </div>
    <div v-else>
      <div class="navbar">
        <nav class="transparent z-depth-0">
          <div class="nav-wrapper">
            <!-- <ul id="nav-mobile" class="left hide-on-med-and-down"> -->
              <a class="right-nav black-text" style="text-decoration:none;">Jakarta <sup style="color:#2C9CC2">{{ weather }}</sup> <sup style="font-size:20px;">{{ temp }}°C</sup></a>
              <a href="#" data-target="mobile-demo" class="sidenav-trigger" style="color:#2C9CC2"><i class="material-icons">menu</i></a>
            <!-- </ul> -->
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><a href="" class="right-nav black-text" @click="signout">Sign Out</a></li>
            </ul>
          </div>
        </nav>
        <ul id="mobile-demo" class="sidenav">
          <!-- <hr> -->
          <li><a href="" class="right-nav black-text" style="font-size:25px;padding-left:20px;" @click="signout">Sign Out</a></li>
          <hr>
        </ul>
      </div>
    </div>

    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans|Fira+Sans+Extra+Condensed|Hind+Madurai|Khand|Roboto');

.navbar {
  /* font-family: 'Roboto', sans-serif; */
  font-family: 'Fira Sans', sans-serif;
  /* font-family: 'Khand', sans-serif; */
  /* font-family: 'Hind Madurai', sans-serif; */
  /* font-family: 'Fira Sans Extra Condensed', sans-serif; */
}

.nav-wrapper {
  margin-top: 50px;
  margin-left: 5vw;
  margin-right: 5vw;
}

@media only screen and (max-width: 375px) {
  .color-teal {
    color: teal;
  }

  .responsive-img {
    margin-top: 5px;
    max-width: 70% !important;
  }

  .nav-wrapper {
    margin-top: 20px;
  }

  .container-heading {
    margin-top: 0px;
  }

  .sidenav {
    width: 160px !important;
  }

}

.margin-side-bar, hr {
  margin-left: 20px;
  margin-right: 20px;
}

.logo {
  font-size: 50px;
}

.right-nav {
  font-size: 30px;
}

.right-nav:hover {
  text-decoration: underline teal;
}

#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>


<script>
import Login from '@/components/Login.vue'
import router from './router'
import { mapState } from 'vuex'

export default {
  name: 'App',
  props: {
  },
  data: function() {
    return {
      email: '',
    }
  },
  components: {
    Login,
  },
  created () {
    this.$store.dispatch('getWeather')
  },
  methods: {
    signout () {
      localStorage.removeItem('authkey')
      FB.logout(function(response) {
        // user is now logged out
      });

      alertify.success(`Sign out successful :D`);
      alertify.success(`You'll be redirected to our home page in a few seconds..`);
      
      setTimeout(() => { this.$router.push('home') }, 2000);
    },
    fblogin () {
      FB.login(function(response) {
        // console.log('from login fb',response)
          if (response.authResponse) {
            // console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', {fields: ['name', 'email']}, function(response) {
              // console.log('from /me', response)
              // console.log('Good to see you, ' + response.name + '.');

              axios.post('http://35.198.209.134/users/fblogin', { email: response.email })
                .then(result => {
                  // console.log('FBlogin success', result)
                  
                  let token = result.data.token;
                  localStorage.setItem("authkey", token);

                  alertify.success(`Sign in successful :D`);
                  alertify.success(`You'll be redirected to your todolist page in a few seconds..`);
                  
                  setTimeout(() => { router.push('todolist') }, 2000);            

                })
                .catch(err => {
                  console.log('ERROR FB login',err)
                })

            });
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
      });
    }
  },
  computed: {
    checkToken () {
      return this.$store.state.logstatus
    },
    ...mapState([
      'temp',
      'weather'
    ])
  }
}
</script>
