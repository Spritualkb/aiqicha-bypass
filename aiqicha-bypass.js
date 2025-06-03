// ==UserScript==
// @name         aiqicha bypass
// @namespace    http://tampermonkey.net/
// @version      2025-06-03
// @description  aiqicha bypass
// @author       kkk
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-start
// ==/UserScript==


(function() {
    'use strict';

    // 方法一：设置 localStorage 触发忽略条件
    localStorage.setItem('devtool', 'open');

    // 方法二：劫持检测函数配置 - 修复语法错误
    const originalS = window.s;
    window.s = function() {
        return function(config) {
            if (!config) return;

            // 强制忽略所有检测条件
            config.ignore = () => true;

            // 禁用开发者工具打开时的回调
            config.ondevtoolopen = function(t, e) {
                console.log('Devtools detection bypassed');
                e = () => {}; // 禁用回调函数
            };

            // 禁用定时器清理
            config.clearIntervalWhenDevOpenTrigger = false;
        };
    };

    // 方法三：注释掉有问题的 console 配置
    // Object.defineProperty(window, 'console', {
    //     value: console,
    //     writable: false,
    //     configurable: false
    // });
})();
