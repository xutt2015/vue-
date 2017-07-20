/**
 * Created by youngwind on 16/8/18.
 */

import Bue from '../src/index';

var child = Bue.extend({
    template: '#child-template',
    data: {
        name: 'xutt2',
        age: '25'
    },
    methods: {
        dispatchName: function () {
            this.$dispatch('child-name', this.name);
        },
        broadcastName: function () {
            this.$broadcast('parent-name', this.name);
        }
    },
    events: {
        'child-name': function (name) {
            this.name = name;
            return true;
        },
        'child-age': function (age) {
            this.age = age;
        },
        'parent-name': function (name) {
            this.name = name;
            return true;
        },
        'parent-age': function (age) {
            this.age = age;
        }
    }
});

Bue.component('child', child);

var recursiveChild = Bue.extend({
    template: '#recursive-child-template',
    data: {
        name: 'xutt3',
        age: '25'
    },
    methods: {
        dispatchName: function () {
            this.$dispatch('child-name', this.name);
        },
        dispatchAge: function () {
            this.$dispatch('child-age', this.age);
        }
    },
    events: {
        'parent-name': function (name) {
            this.name = name;
        },
        'parent-age': function (age) {
            this.age = age;
        }
    }
});

Bue.component('recursive-child', recursiveChild);

const app = new Bue({
    el: '#app',
    data: {
        name: 'xutt1',
        age: '25',
        sex: '女',
        items: [
            {
                title: 'aaa'
            },
            {
                title: 'bbb'
            },
            {
                title: 'ccc'
            }
        ]
    },
    events: {
        'child-name': function (name) {
            this.name = name;
        },
        'child-age': function (age) {
            this.age = age;
        }
    },
    methods: {
        broadcastName: function () {
            this.$broadcast('parent-name', this.name);
        },
        broadcastAge: function () {
            this.$broadcast('parent-age', this.age);
        }
    },
    computed: {
        info: function () {
            return `计算出来的属性-> 姓名: ${this.name}, 年龄: ${this.age}`;
        }
    }
});

app.$watch('name', function(newVal) {
    console.log('更改name' + newVal);
});
app.$watch('name', function(newVal) {
    console.log('更改name' + newVal);
});
app.$watch('sex', function(newVal) {
    console.log('更改sex' + newVal);
});

window.app = app;

