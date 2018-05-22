<template>
  <div class="edit">

    <!-- Modal Trigger -->
    <a class="login-modal modal-trigger" href="#modal1"><i class="material-icons">edit</i></a>

    <!-- Modal Structure -->
    <div id="modal1" class="modal">
      <div class="modal-content">
        <h4>Edit Todos :D</h4>

        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">add_box</i>
                <input :id="itemsid" type="text" v-model="edit_input">
                <label for="icon-edit">Edit todos</label>
              </div>
            </div>
          </form>
        </div>  

      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-green btn #eceff1 blue-grey lighten-5 #009688-text teal-text">Cancel</a>
        <a class="modal-close waves-effect waves-green btn">Update Todos</a>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'Edit',
  props: {
    itemsid: String
  },
  data: function() {
    return {
      edit_input: ''
    }
  },
  components: {
  },
  methods: {
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
