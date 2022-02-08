<template>
  <section class="todoapp">
    <header class="header">
      <div class="title">What's Next To Do ?</div>
      <input
        class="new-todo"
        placeholder="接下来要做什么?"
        autofocus
        v-model="newTodo"
        @keyup.enter="addTodo"
      />
    </header>
    <section class="main" v-show="showTodos">
      <input class="toggle-all" id="toggle-all" type="checkbox" v-model="allDone" />
      <label for="toggle-all">一键全部完成</label>
      <ul class="todo-list">
        <template v-if="filteredTodos.length > 0">
          <li
            v-for="(todo, index) in filteredTodos"
            :key="'todo-' + index"
            :class="{ completed: todo.completed, editing: todo === editedTodo}"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="editTodo(todo)" v-cloak>{{ todo.title }}</label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <input
              class="edit"
              v-model="todo.title"
              v-focus="todo === editedTodo"
              @keyup.13="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)"
              @blur="doneEdit(todo)"
            />
          </li>
        </template>
        <li v-else class="text-center">
          <div>You completed All things !</div>
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="showTodos">
      <span class="todo-count">
        <strong v-cloak>{{ activeCount }}</strong> item
      </span>
      <ul class="filters">
        <li>
          <a href="#/" :class="{ selected: visibility === 'all' }" @click="visibility='all'">all</a>
        </li>
        <li>
          <a
            href="#/active"
            :class="{ selected: visibility === 'active' }"
            @click="visibility='active'"
          >active</a>
        </li>
        <li>
          <a
            href="#/completed"
            :class="{ selected: visibility === 'completed' }"
            @click="visibility='completed'"
          >completed</a>
        </li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" v-show="completedCount">clear</button>
    </footer>
  </section>
</template>
<script>
var STORAGE_KEY = "todos";
window.todoStorage = {
  fetch() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (err) {
      return [];
    }
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

var filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.completed),
  completed: todos => todos.filter(todo => todo.completed)
};
var visibility = location.hash.substr(location.hash.indexOf("/") + 1);
visibility = visibility === "" ? "all" : visibility;

export default {
  name: "todo",
  data() {
    return {
      newTodo: "",
      todos: todoStorage.fetch(),
      editedTodo: null,
      beforeEditCache: "",
      visibility
    };
  },
  beforeRouteEnter(to, from, next) {
    // console.log('beforeRouteEnter 1 ')
    next();
  },
  beforeRouteUpdate(to, from, next) {
    // console.log('beforeRouteUpdate 2 ')
    next();
  },
  beforeRouteLeave(to, from, next) {
    // console.log('beforeRouteLeave 3 ')
  },
  created() {
    // console.log('todo ', this.$route)
  },
  // 计算属性
  computed: {
    showTodos() {
      return this.todos.length > 0;
    },
    activeCount() {
      return filters.active(this.todos).length;
    },
    completedCount() {
      return filters.completed(this.todos).length;
    },
    allDone: {
      get() {
        return this.activeCount === 0;
      },
      set(value) {
        this.todos.map(todo => {
          todo.completed = value;
        });
      }
    },
    filteredTodos() {
      return filters[this.visibility](this.todos);
    }
  },
  // 属性观察
  watch: {
    todos: {
      deep: true,
      handler: todoStorage.save
    }
  },
  // 方法集合
  methods: {
    addTodo() {
      this.newTodo = this.newTodo.trim();
      if (!this.newTodo) {
        return;
      }
      this.todos.unshift({
        title: this.newTodo,
        completed: false
      });
      this.newTodo = "";
    },
    removeTodo(todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    editTodo(todo) {
      this.editedTodo = todo;
      this.beforeEditCache = todo.title;
    },
    doneEdit(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },
    cancelEdit(todo) {
      if (this.editedTodo) {
        todo.title = this.beforeEditCache;
        this.editedTodo = null;
      }
    },
    removeCompleted() {
      this.todos = filters.active(this.todos);
    }
  },
  // 指令集合
  directives: {
    focus: {
      update(el) {
        el.focus();
      }
    }
  }
};
</script>
<style scoped>
button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:focus {
  outline: 0;
}

.hidden {
  display: none;
}
.text-center {
  text-align: center;
  color: #ccc;
  padding: 10px 0;
}
.todoapp {
  background: #fff;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  margin: 10px auto;
}

.todoapp input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp .title {
  width: 100%;
  font-size: 30px;
  font-weight: 100;
  text-align: center;
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
  color: rgba(175, 47, 47, 0.6);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}

.new-todo,
.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: #333;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.new-todo {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}

.toggle-all {
  text-align: center;
  border: none;
  /* Mobile Safari */
  opacity: 0;
  position: absolute;
}

.toggle-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -13px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.toggle-all + label:before {
  content: "❯";
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
  color: #737373;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
  color: #333;
}

.todo-list li {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li.editing {
  border-bottom: none;
  padding: 0;
}

.todo-list li.editing .edit {
  display: block;
  width: 506px;
  padding: 12px 16px;
  margin: 0 0 0 43px;
}

.todo-list li.editing .view {
  display: none;
}

.todo-list li .toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
}

.todo-list li .toggle {
  opacity: 0;
}

.todo-list li .toggle + label {
  /*
		Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
		IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
	*/
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center left;
}

.todo-list li .toggle:checked + label {
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
}

.todo-list li label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

.todo-list li.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}

.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
  color: #af5b5e;
}

.todo-list li .destroy:after {
  content: "×";
}

.todo-list li:hover .destroy {
  display: block;
}

.todo-list li .edit {
  display: none;
}

.todo-list li.editing:last-child {
  margin-bottom: -1px;
}

.footer {
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-count {
  float: left;
  text-align: left;
}

.todo-count strong {
  font-weight: 300;
}

.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  /* position: absolute;
    right: 0;
    left: 0; */
  z-index: 233;
}

.filters li {
  display: inline;
}

.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

.filters li a:hover {
  border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}

.clear-completed,
html .clear-completed:active {
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
}

.clear-completed:hover {
  text-decoration: underline;
}

.info {
  margin: 65px auto 0;
  color: #bfbfbf;
  font-size: 10px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  text-align: center;
}

.info p {
  line-height: 1;
}

.info a {
  color: inherit;
  text-decoration: none;
  font-weight: 400;
}

.info a:hover {
  text-decoration: underline;
}

/*
	Hack to remove background from Mobile Safari.
	Can't use it globally since it destroys checkboxes in Firefox
*/
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .toggle-all,
  .todo-list li .toggle {
    background: none;
  }

  .todo-list li .toggle {
    height: 40px;
  }
}

@media (max-width: 430px) {
  .footer {
    height: 50px;
  }

  .filters {
    bottom: 10px;
  }
}

.help {
  color: #333;
  text-decoration: none;
}

[v-cloak] {
  display: none !important;
}
</style>
