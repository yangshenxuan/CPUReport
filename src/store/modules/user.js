import { login, userInfo } from '@/api/user'
import Cookies from 'js-cookie'
import md5 from 'js-md5';

const state = {
  userId: Cookies.get('userId'),
  userName: Cookies.get('userName'),
  no: Cookies.get('userNo'),
  userType: Cookies.get('userType'),
  appId: Cookies.get('appId')
}

const mutations = {
  // 重置state
  RESET_STATE: (state) => {
    state.userId = ''
    state.userName = ''
    state.no = ''
    state.userType = ''
    state.appId = ''
  },
  // 用户id
  SET_USER_ID: (state, userId) => {
    state.userId = userId
  },
  // 昵称
  SET_USER_NAME: (state, userName) => {
    state.userName = userName
  },
  // 昵称
  SET_NO: (state, no) => {
    state.no = no
  },
  // 用户类型
  SET_USER_TYPE: (state, userType) => {
    state.userType = userType
  },
  // appId
  SET_APPID: (state, appId) => {
    state.appId = appId
  },
}

const actions = {
  // 用户登录
  login ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login({ no: userInfo.no, pwd: md5(userInfo.pwd) }).then(data => {
        if(data.role == userInfo.userType) {
          commit('SET_USER_ID', data.userId)
          commit('SET_USER_NAME', data.name)
          commit('SET_USER_TYPE', data.role)
          commit('SET_NO', userInfo.no)
          // Cookies
          Cookies.set('userId', data.userId);
          Cookies.set('userName', data.name);
          Cookies.set('userType', data.role);
          Cookies.set('userNo', userInfo.no);
          resolve(data)
        } else {
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 根据省平台的ticket获取用户信息
  getUserInfoByTicket({ commit }, urlObj) {
    return new Promise((resolve, reject) => {
      userInfo({ ticket: urlObj.ticket }).then(data => {
        commit('SET_USER_ID', data.userId)
        commit('SET_USER_NAME', data.name)
        commit('SET_USER_TYPE', data.role)
        commit('SET_APPID', urlObj.appId)
        // Cookies
        Cookies.set('userId', data.userId);
        Cookies.set('userName', data.name);
        Cookies.set('userType', data.role);
        Cookies.set('appId', urlObj.appId);
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout ({ commit }) {
    // 清空token
    Cookies.remove('userId');
    Cookies.remove('userName');
    Cookies.remove('userType');
    Cookies.remove('userNo');
    Cookies.remove('appId');
    commit('RESET_STATE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}