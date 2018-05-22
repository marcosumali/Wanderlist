<template>
  <div class="fblogin">

    <fb:login-button 
      scope="public_profile,email"
      onlogin="checkLoginState();">
    </fb:login-button>

  </div>

</template>

<script>
export default {
  name: 'Login',
  props: {
  },
  data: function() {
    return {
    }
  },
  components: {
  },
  methods: {
    fblogin () {
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '444144236032201',
          cookie     : true,
          xfbml      : true,
          version    : 'v3.0'
        });
          
        FB.AppEvents.logPageView();   
          
      };

      function checkLoginState() {
        FB.getLoginStatus(function(response) {
          // statusChangeCallback(response);
          console.log(response)
        });
      }

      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
