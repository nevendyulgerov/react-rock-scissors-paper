
/**
 * Library: Ammo
 * Version: 1.3.6
 * Standard: ECMAScript 2015
 * Author: Neven Dyulgerov
 * License: Released under the MIT license
 *
 * Description:
 * Provides general purpose utility belt for building front-end applications
 */


/**
 * @description Provide DOM context
 * Contx
 * @param context
 * @returns {*|HTMLDocument}
 */
export const contx = (context) => context || document;


/**
 * @description Event handler for DOM Ready
 * @param callback
 */
export const onDomReady = (callback) => {
  document.addEventListener('DOMContentLoaded', callback);
  return this;
};


/**
 * @description Event handler for hover
 * @param domEls
 * @param onIn
 * @param onOut
 */
export const onHover = (domEls, onIn, onOut) => {
  let lastHovered;
  each(domEls, (el) => {
    el.addEventListener('mouseenter', (e) => {
      lastHovered = e.target;
      onIn(e);
    });
    el.addEventListener('mouseout', (e) => {
      onOut(e, lastHovered);
    });
  });
};


/**
 * @description Delegate event to given selector with className
 * @param event
 * @param className
 * @param callback
 * @param context
 */
export const delegateEvent = (event, className, callback, context) => {
  contx(context).addEventListener(event, (e) => {
    if ( e.target && e.target.classList.contains(className) ) {
      callback(e);
    }
  });
};


/**
 * @description Get node by given selector
 * @param selector
 * @param context
 * @returns {Node}
 */
export const getEl = (selector, context) => contx(context).querySelector(selector);


/**
 * @description Get node list by given selector
 * @param selector
 * @param context
 */
export const getEls = (selector, context) => contx(context).querySelectorAll(selector);


/**
 * @description Remove node from the DOM
 * @param domEl
 */
export const removeEl = (domEl) => {
  domEl.parentNode.removeChild(domEl);
  return this;
};


/**
 * @description Check if element is hovered
 * @param selector
 * @returns {boolean}
 */
export const isHovered = (selector) => {
  const domEl = getEl(selector);
  return domEl.parentNode.querySelector(':hover') === domEl;
};


/**
 * @description Append HTML content after the end of a node
 * @param html
 * @param context
 * @returns {*}
 */
export const appendAfter = (html, context) => {
  contx(context).insertAdjacentHTML('afterend', html.toString());
  return this;
};


/**
 * @description Append HTML content before the end of a node
 * @param html
 * @param context
 * @returns {*}
 */
export const appendBefore = (html, context) => {
  contx(context).insertAdjacentHTML('beforeend', html.toString());
  return this;
};


/**
 * @description Prepend HTML content after the beginning of a node
 * @param html
 * @param context
 * @returns {*}
 */
export const prependAfter = (html, context) => {
  contx(context).insertAdjacentHTML('afterbegin', html.toString());
  return this;
};


/**
 * @description Prepend HTML content before the beginning of a node
 * @param html
 * @param context
 */
export const prependBefore = (html, context) => {
  contx(context).insertAdjacentHTML('beforebegin', html.toString());
  return this;
};


/**
 * @description Linear iterator for object properties
 * @param elements
 * @param callback
 */
export const each = (elements, callback) => {
  Object.keys(elements).forEach((k, i) => {
    callback(elements[k], i);
  });
  return this;
};


/**
 * @description Check if value is of type 'object'
 * @param val
 * @returns {boolean}
 */
export const isObj = val => typeof val === 'object' && !isArr(val) && !isNull(val);


/**
 * @description Check if value is of type 'null'
 * @param val
 * @returns {boolean}
 */
export const isNull = val => val === null;


/**
 * @description Check if value is of type 'number'
 * @param val
 * @returns {boolean}
 */
export const isNum = val => typeof val === 'number' && !isNaN(val);


/**
 * @description Check if value is of type 'function'
 * @param val
 * @returns {boolean}
 */
export const isFunc = val => typeof val === 'function';


/**
 * @description Check if value is of type 'array'
 * @param val
 * @returns {boolean}
 */
export const isArr = val => Array.isArray(val);


/**
 * @description Check if value is of type 'string'
 * @param val
 * @returns {boolean}
 */
export const isStr = val => typeof val === 'string';


/**
 * @description Check if value is of type 'undefined'
 * @param val
 * @returns {boolean}
 */
export const isUndef = val => typeof val === 'undefined';


/**
 * @description Check if value is of type 'boolean'
 * @param val
 * @returns {boolean}
 */
export const isBool = val => typeof val === 'boolean';


/**
 * @description Check if object has property
 * @param obj
 * @param prop
 * @returns {boolean}
 */
export const hasProp = (obj, prop) => obj.hasOwnProperty(prop);


/**
 * @description Check if object has method
 * @param obj
 * @param method
 * @returns {boolean}
 */
export const hasMethod = (obj, method) => hasProp(obj, method) && isFunc(method);


/**
 * @description Check if object has key
 * @param obj
 * @param key
 * @returns {boolean}
 */
export const hasKey = (obj, key) => getKeys(obj).indexOf(key) > -1;


/**
 * @description Get object keys
 * @param obj
 * @returns {Array}
 */
export const getKeys = obj => Object.keys(obj);


/**
 * @description Iterate over each key of an object
 * @param obj
 * @param callback
 */
export const eachKey = (obj, callback) => {
  Object.keys(obj).forEach((k, i) => callback(obj[k], k, i));
};


/**
 * @description Get url param
 * @param name
 * @returns {Array|{index: number, input: string}|*|string}
 */
export const getUrlParam = (name) => {
  const match = new RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};


/**
 * @description Get random integer between two numbers
 * @param min
 * @param max
 * @returns {*}
 */
export const randomInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


/**
 * @description Iterate recursively
 * @param handler
 * @param complete
 * @param index
 * @returns {*}
 */
export const recurIter = (handler, complete, index) => {
  index = index || 0;
  handler(index, (canRecur) => {
    if ( ! canRecur ) {
      return complete();
    }
    recurIter(handler, complete, ++index);
  });
};


/**
 * @description Poll over an interval of time
 * @param handler
 * @param complete
 * @param interval
 */
export const poll = (handler, complete, interval) => {
  setTimeout(() => {
    handler((canPoll) => {
      if ( canPoll ) {
        return poll(handler, complete, interval);
      }
      complete();
    });
  }, interval);
};


/**
 * @description Buffer high-frequency events
 * @returns {function(*=, *=, *=)}
 */
export const buffer = function() {
  let timers = {};
  return (id, ms, clb) => {
    if ( ! id ) {
      timers[id] = '0';
    }
    if ( timers[id] ) {
      clearTimeout(timers[id]);
    }
    timers[id] = setTimeout(clb, ms);
  };
};


/**
 * @description Local storage API
 * @param key
 * @returns {*}
 */
export const store = function(key) {
  let storage;
  if ( ! isStr(key) ) {
    return new Error("[Storage] Invalid storage key. Provide a key {string}.");
  }

  let storageTemplates = {
    localStorage: {
      getStorage: function() {
        return localStorage;
      },
      setStorageItem: function(key, value) {
        this.getStorage().setItem(key, value);
      },
      getStorageItem: function(key) {
        return this.getStorage().getItem(key);
      },
      removeStorageItem: function(key) {
        this.getStorage().removeItem(key);
      }
    }
  };
  storage = storageTemplates.localStorage;

  const decodeData = function(data) {
    return JSON.parse(data);
  };
  const encodeData = function(data) {
    return JSON.stringify(data);
  };
  const getData = function(key) {
    return decodeData(storage.getStorageItem(key));
  };
  const setData = function(key, data) {
    storage.setStorageItem(key, encodeData(data));
  };
  const removeData = function(key) {
    storage.removeStorageItem(key);
  };

  return {
    getData: function() {
      let data = getData(key);
      return data !== null ? getData(key) : undefined;
    },
    setData: function(newData) {
      setData(key, newData);
      return this;
    },
    removeData: function() {
      removeData(key);
      return this;
    },
    getItem: function(itemKey) {
      let data = this.getData();
      return data[itemKey];
    },
    setItem: function(itemKey, itemValue) {
      let data = this.getData();
      data[itemKey] = itemValue;
      setData(key, data);
      return this;
    },
    removeItem: function(itemKey) {
      let data = this.getData();
      data[itemKey] = undefined;
      setData(key, data);
      return this;
    }
  };
};


/**
 * @description Create sequential execution for async functions
 * @returns {{chain: chain, execute: execute}}
 */
export const sequence = function() {
  let chained = [];
  let value;
  let error;

  const chain = function(func) {
    if ( chained ) {
      chained.push(func);
    }
    return this;
  };
  const execute = function(index) {
    let callback;
    index = typeof index === "number" ? index : 0;
    if ( ! chained || index >= chained.length ) {
      return true;
    }

    callback = chained[index];
    callback({
      resolve(_value) {
        value = _value;
        execute(++index);
      },
      reject(_error) {
        error = _error;
        execute(++index);
      },
      response: {
        value: value,
        error: error
      }
    });
  };

  return {
    chain,
    execute
  };
};


/**
 * @description Set style property for given node
 * @param selection
 * @param index
 * @param prop
 * @param value
 */
const style = (selection, prop, value, index) => {
  const currStyle = selection.style.getPropertyValue(prop);
  selection.style.setProperty(prop, isFunc(value) ? (value(selection, currStyle, index) || selection.style.getProperty(prop, currStyle)) : value, '');
};


/**
 * @description Set attribute property for given node
 * @param {object} selection
 * @param {string} prop
 * @param {string/function} value
 * @param {number} index
 */
const attr = (selection, prop, value, index) => {
  const currValue = selection.getAttribute(prop);
  selection.setAttribute(prop, isFunc(value) ? (value(selection, currValue, index) || currValue) : value);
};


/**
 * @description Set innerHTML for given node
 * @param {object} selection
 * @param {(string|function)} value
 * @param {number=} index
 */
const elText = (selection, value, index) => {
  selection.innerHTML = isFunc(value) ? value(selection.innerHTML, index) || selection.innerHTML : value;
};


/**
 * @description Filter nodes based on signature (static - value is a string, dynamic - value is a function)
 * @param {object} selection
 * @param {(string|function)} value
 * @param {string} selector
 * @param {number=} index
 * @returns {*}
 */
const filter = (selection, value, selector, index) => {
  if ( isFunc(value) ) {
    return value(selection, index);
  }
  if ( isStr(value) ) {
    if ( value.indexOf(':') === -1 ) {
      return selection.classList.contains(value);
    }

    const matches = selection.parentNode.querySelectorAll(`${selector}${value}`);
    let isMatch = false;
    each(matches, el => {
      if ( el.isSameNode(selection) && ! isMatch ) {
        isMatch = true;
      }
    });
    return isMatch;
  }
};


/**
 * @description DOM manipulation API for single node
 * @param {(string|object)} selector
 * @param {object=} context
 * @returns {object}
 */
export const select = function(selector, context) {
  let selection = isStr(selector) ? getEl(selector, context) : selector;
  return {
    find(findSelector) {
      selection = getEl(findSelector, selection);
      return this;
    },
    text(value) {
      elText(selection, value, 0);
      return this;
    },
    style(prop, value) {
      style(selection, prop, value, 0);
      return this;
    },
    attr(prop, value) {
      attr(selection, prop, value, 0);
      return this;
    },
    data(data) {
      selection.innerHTML = data;
      return this;
    },
    on(event, callback) {
      selection.addEventListener(event, callback);
      return this;
    },
    get: () => selection
  }
};


/**
 * @description DOM manipulation API for node lists
 * @param {string} selector
 * @param {object=} context
 * @returns {object}
 */
export const selectAll = function(selector, context) {
  let selection = isStr(selector) ? getEls(selector, context) : selector;
  let filtered;
  return {
    filter(value) {
      filtered = [];
      each(selection, (el, index) => {
        if ( filter(el, value, selector, index) ) {
          filtered.push(el);
        }
      });
      selection = filtered;
      return this;
    },
    find(findSelector) {
      if ( filtered ) {
        filtered = getEls(findSelector, filtered.firstChild);
      } else {
        selection = getEls(findSelector, selection.firstChild);
      }
      return this;
    },
    text(value) {
      each(filtered || selection, (el, index) => elText(el, value, index));
      return this;
    },
    style(prop, value) {
      each(filtered || selection, (el, index) => style(el, prop, value, index));
      return this;
    },
    attr(prop, value) {
      each(filtered || selection, (el, index) => attr(el, prop, value, index));
      return this;
    },
    data(data) {
      each(filtered || selection, (el, index) => el.innerHTML = data[index]);
      return this;
    },
    on(event, callback) {
      each(filtered || selection, (el, index) => el.addEventListener(event, callback));
      return this;
    },
    each(handler) {
      each(filtered || selection, handler);
      return this;
    },
    eq(index) {
      const nodes = filtered || selection;
      return nodes.length > 0 && isObj(nodes[index]) ? nodes[index]: undefined;
    },
    index(indexSelector) {
      let matchIndex = -1;
      each(filtered || selection, (el, index) => {
        if ( el.classList.contains(indexSelector) && matchIndex === -1 ) {
          matchIndex = index;
        }
      });
      return matchIndex;
    },
    async(handler, complete) {
      const sequencer = sequence();

      each(filtered || selection, (el, index) => {
        sequencer.chain(seq => handler(seq.resolve, el, index));
      });

      if ( isFunc(complete) ) {
        sequencer.chain(seq => complete());
      }

      sequencer.execute();
      return this;
    },
    get: () => filtered || selection
  }
};


/**
 * @description Convert text to a title text - first word's first letter is upper case
 * @param text
 * @param splitBy
 * @returns {string}
 */
export const titlize = (text, splitBy) => {
  return text.split(splitBy).map((word, index) => index > 0 ? word : word.charAt(0).toUpperCase()+word.slice(1).toLowerCase()).join('');
};
