/**
 * Created by youngwind on 16/8/18.
 * 实例初始化
 */

import _ from '../util';

/**
 * 实例初始化入口
 * @param options {Object} bue实例选项
 * @private
 */
exports._init = function (options) {
    // 这个变量是用来存储遍历DOM过程中生成的当前的Watcher
    // 在实现computed功能的时候需要用到
    this._activeWatcher = null;
    this.$options = options;
    this.$parent = options.parent;
    this.$children = [];
    this._events = {};

    if (!this.$options.isComponent) {
        this.__proto__ = this.$parent; // eslint-disable-line
    }

    // Bue构造函数上定义了一些指令相关的方法,需要将它们引用过来, 以供后面的调用
    _.extend(this.$options, this.constructor.options);

    if (this.$parent) {
        this.$parent.$children.push(this);
        // this.$data = options.parent.$data;
    }

    this.$data = options.data || {};

    // 初始化组件props
    this._initProps();

    // 初始化data, 主要是做Observer,数据监听这一块
    this._initData(this.$data);

    // 初始化计算属性
    this._initComputed();

    // 初始化数据代理
    this._initProxy();
    // 初始化事件
    this._initEvents();

    // 初始化方法
    this._initMethods();

    // binding、watcher、directive是实现动态数据绑定的三大核心对象
    this._initBindings();

    // 指令数组,用于存放解析DOM模板的时候生成的指令
    this._directives = [];

    // 解析DOM模板, 渲染真实的DOM
    if (options.el) {
        this.$mount(options.el);
    }
};
