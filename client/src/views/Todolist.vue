<template>
  <div class="todolist">
    <!-- <h1>This is an about page</h1> -->
    <div class="name animated flash">
      {{ getProfile }}
    </div>
    <img class="logo animated fadeIn" src="https://storage.googleapis.com/wanderlist-files.madebybastian.com/web-images/wanderlist.jpg">
    <div class="row">
      <div class="input-container">
        <div class="input-section col l5 s11">
        <!-- <form class="input-section col l5 s11"> -->
          <div class="row">
            <div class="input-field col l12 s12">
              <input id="input" type="text" class="validate" v-model="todo" @keyup.enter="addTodo">
              <label for="input">New Todos</label>
              <span class="helper-text" data-error="Incorrect" data-success="Success !">Click on '+' button OR press Enter to create new todos..</span>
            </div>
          </div>
        <!-- </form> -->
        </div>
        <div class="btn-section">
          <i class="medium material-icons" @click="addTodo">add_circle_outline</i>
        </div>
      </div>
    </div>
    <div class="row" style="margin-bottom: 100px;">
      <div class="todos-container col l12 s12 animated slideInLeft" v-for="(items, index) in getTodo" :key="index">
        <div class="todos-border col l5 s12">
          <div class="todos">
            <div class="row todos-outer"> 
              <div class="container-inner col l12 s12">
                <div class="todos-row col l10 s10">
                  <p>
                    <label>
                      <div v-if="items.status == false">
                        <input type="checkbox" @click="updateStatus(items)" />
                        <span class="todos-text">{{ items.todo }}</span>
                      </div>
                      <div v-else>
                        <input type="checkbox" @click="updateStatus(items)" checked/>
                        <span class="todos-text">{{ items.todo }}</span>
                      </div>
                    </label>
                  </p>
                </div>
                <!-- <div class="todos-row col l1 s1"> -->
                  <!-- <i class="material-icons">edit</i> -->
                  <!-- <Edit :itemsid="items._id" /> -->
                <!-- </div> -->
                <div class="todos-row col l1 s1">
                  <i class="material-icons" @click="deleteTodo(items)">close</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <footer>
      <a href="http://www.madebybastian.com/" style="color:#2C9CC2" target="_blank">© 2018 madebybastian.com</a>
    </footer>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans|Fira+Sans+Extra+Condensed|Hind+Madurai|Khand|Roboto');

@media only screen and (max-width: 375px) {
    img {
      width: 80%;
      height: 80%;
    }
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

a {
  color: #2C9CC2 !important;
}

.btn {
  color: black;
  background-color: white;
  padding: 0px;
  margin: 0px;
}

.todolist {
  font-family: 'Fira Sans', sans-serif;
}

.name {
  font-size: 20px;
  text-align: right;
  margin-right: 5vw;
}

.name:hover {
  color: teal;
  text-decoration: underline;
}

.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.input-container, .todos-container, .container-inner, .todos-outer {
  display: flex;
  justify-content: center;
}

.input-section, .btn-section, .todos, .todos-row {
  align-self: center;
}

.btn-section {
  margin-left: 0px !important;
}

.input-section {
  margin-left: 0px !important;
}

.todos-container {
  /* border: 1px solid red; */
}

.todos-border {
  /* border: 1px solid black; */
  border-radius: 10px;
  margin-bottom: 5px;
  margin-left: 0px !important;
  box-shadow: 2px 2px 20px grey;
}

.todos {
  border: 1px solid white;
  max-height: 55px;
}

.todos-text {
  color: black;
  font-size: 20px !important;
}

.material-icons:hover {
  cursor: pointer;
}

</style>

<script>
import Edit from '@/components/Edit.vue'

export default {
  name: 'Todolist',
  props: {
  },
  data: function() {
    return {
      todo: ''
    }
  },
  components: {
    Edit,
  },
  methods: {
    addTodo () {
      let obj = { todo: this.todo }
      let token = localStorage.getItem('authkey')
      let config = { headers: {'authkey': token} }

      axios.post('http://35.198.209.134/todos/', obj, config)
        .then(result => {
          this.$store.commit('addTodo', result.data.todo)
          this.todo = ''
          alertify.success(`Adding new todos successful :D`);
          // console.log(result)
        })
        .catch(err => {
          console.log('ERROR post new todo', err)
        })
    },
    deleteTodo (items) {
      // console.log(items)
      let url = 'http://35.198.209.134/todos/delete?id=' + items._id
      let token = localStorage.getItem('authkey')
      let config = { headers: {'authkey': token} }

      axios.delete(url, config)
        .then(result => {
          // console.log(result)
          this.$store.commit('deleteTodo', items._id)
          alertify.success(`Delete todo successful :D`);
        })
        .catch(err => {
          console.log('ERROR delete todo', err)
        })
    },
    updateStatus (items) {
      // console.log(items)
      let token = localStorage.getItem('authkey')
      let config = { headers: {'authkey': token} }

      axios.put('http://35.198.209.134/todos/status', { _id: items._id }, config)
        .then(result => {
          // console.log('==========',result)
          alertify.success(`Update status successful: ${result.data.todo_updated.todo}`);
        })
        .catch(err => {
          console.log('ERROR update status todo', err)
        })
    }
  },
  created () {
    this.$store.dispatch('checkToken')
    this.$store.dispatch('getTodo')
    this.$store.dispatch('getProfile')
  },
  computed: {
    getTodo () {
      return this.$store.state.todos
    },
    getProfile () {
      return this.$store.state.profile
    }
  }
}
</script>


