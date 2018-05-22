import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';

import {
    Todos
} from './data/todoList';

export default {
    /**
   * mock start
   */
    start() {
        let mock = new MockAdapter(axios); // 创建 MockAdapter 实例
        // 获取todo列表
        mock.onGet('/todo/list').reply(config => { //  config 指 前台传过来的值
          let mockTodo = Todos.map(todo => { // 重组 Todos数组，变成我们想要的数据
            return {
              id: todo.id,
              title: todo.title,
              count: todo.record.filter((data) => {
                if (data.checked === false) return true;
                return false;
              }).length, // 过滤到record里面 ‘checked’ 为true的数据，因为它们已经被完成了
              locked: todo.locked,
              isDelete: todo.isDelete
            };
          }).filter(todo => {
            if (todo.isDelete === true) return false; // 过滤掉 ‘isDelete’为true，因为已经被删除了。
            return true;
          });
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, {
                todos: mockTodo // 返回状态为200，并且返回todos数据
              }]);
            }, 200);
          });
        });
        // 新增一条todo
        mock.onPost('/todo/addTodo').reply(config => {
            Todos.push({
            id: Mock.Random.guid(),
            title: 'newList',
            isDelete: false,
            locked: false,
            record: []
            });
            return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200]);
            }, 200);
            });
        });

        //获取单个列表
        mock.onGet('/todo/listId').reply(config => {

          let{
            id
          }=config.params;

          let todo = Todos.find(todo => {
            return id && todo.id==id;
          });

          todo.count = todo.record.filter((data) => {
            return data.checked=false;
          }).length;
          console.log("here is find");
          return new Promise((resolve,reject) => {
            setTimeout(() => {
              resolve([200, {
                todo: todo
              }]);
            }, 200);
          });
        });
        mock.onPost('/todo/addRecord').reply(config => {
          let {
            id,
            text
          } = JSON.parse(config.data);
           // id 是传进来的值唯一待办项的id
          // text 用户新增输入的数据
          Todos.some((t, index) => {
            if (t.id === id) {
              t.record.push({
                text: text,
                isDelete: false,
                checked: false
              });
              return true;
            }
          });
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200]);
            }, 200);
          });
        });

    }
};