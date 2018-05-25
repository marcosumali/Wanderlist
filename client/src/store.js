import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    logstatus: false,
    profile: '',
    temp: '',
    weather: ''
  },
  mutations: {
    getTodo (state, payload) {
      state.todos = payload
    },
    addTodo (state, payload) {
      state.todos.push(payload)
    },
    deleteTodo (state, payload) {
      let indexTodo = 0
      state.todos.forEach((item, index) => {
        if (item._id === payload) {
          indexTodo = index
        }
      })
      // console.log(indexTodo)
      state.todos.splice(indexTodo, 1)
    },
    checkToken (state) {
      state.logstatus = true
    },
    getProfile (state, payload) {
      state.profile = payload
    },
    getWeather (state, payload) {
      let weather = payload.data.weather[0].main
      let temp = payload.data.main.temp
      state.weather = weather
      state.temp = temp
    }
  },
  actions: {
    getTodo ({commit}) {
      let token = localStorage.getItem('authkey')
      let config = {
        headers: {'authkey': token}
      }

      axios.get('http://35.198.209.134/todos/list', config)
        .then(results => {
          // console.log(results)
          // console.log(this.state.logstatus)
          commit('getTodo', results.data.list)
        })
        .catch(err => {
          console.log('ERROR get related todos', err)
        })
    },
    checkToken ({commit}) {
      let token = localStorage.getItem('authkey')
      if (!token) {
        // console.log('no token')
        router.go(-1)
      } else {
        commit('checkToken')
        router.push('todolist')
      }
    },
    getProfile ({commit}) {
      let token = localStorage.getItem('authkey')
      let config = {
        headers: {'authkey': token}
      }

      if (token) {
        axios.get('http://35.198.209.134/users/profile', config)
          .then(result => {
            // console.log(result)
            commit('getProfile', result.data.user.email)
          })
          .catch(err => {
            console.log('ERROR get user profile', err)
          })
      }
    },
    getWeather ({commit}) {
      axios.get('http://api.openweathermap.org/data/2.5/weather?id=1642907&units=metric&appid=a874364adcc4f6371380bb71d0c097ae')
        .then(result => {
          // console.log(result)
          commit('getWeather', result)
        })
        .catch(err => {
          console.log('ERROR get weather', err)
        })
    }
  }
})
