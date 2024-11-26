// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/array.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUniqueItem = addUniqueItem;
exports.moveItem = moveItem;
exports.removeItem = removeItem;
function addUniqueItem(arr, item) {
  if (arr.indexOf(item) === -1) arr.push(item);
}
function removeItem(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1) arr.splice(index, 1);
}
// Adapted from array-move
function moveItem([...arr], fromIndex, toIndex) {
  const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
  if (startIndex >= 0 && startIndex < arr.length) {
    const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
    const [item] = arr.splice(fromIndex, 1);
    arr.splice(endIndex, 0, item);
  }
  return arr;
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/subscription-manager.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscriptionManager = void 0;
var _array = require("./array.mjs");
class SubscriptionManager {
  constructor() {
    this.subscriptions = [];
  }
  add(handler) {
    (0, _array.addUniqueItem)(this.subscriptions, handler);
    return () => (0, _array.removeItem)(this.subscriptions, handler);
  }
  notify(a, b, c) {
    const numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions) return;
    if (numSubscriptions === 1) {
      /**
       * If there's only a single handler we can just call it without invoking a loop.
       */
      this.subscriptions[0](a, b, c);
    } else {
      for (let i = 0; i < numSubscriptions; i++) {
        /**
         * Check whether the handler exists before firing as it's possible
         * the subscriptions were modified during this loop running.
         */
        const handler = this.subscriptions[i];
        handler && handler(a, b, c);
      }
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
exports.SubscriptionManager = SubscriptionManager;
},{"./array.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/array.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/velocity-per-second.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.velocityPerSecond = velocityPerSecond;
/*
  Convert velocity into velocity per second

  @param [number]: Unit per frame
  @param [number]: Frame duration in ms
*/
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1000 / frameDuration) : 0;
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/warn-once.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warnOnce = warnOnce;
const warned = new Set();
function warnOnce(condition, message, element) {
  if (condition || warned.has(message)) return;
  console.warn(message);
  if (element) console.warn(element);
  warned.add(message);
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/GlobalConfig.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotionGlobalConfig = void 0;
const MotionGlobalConfig = exports.MotionGlobalConfig = {
  skipAnimations: false,
  useManualTiming: false
};
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/noop.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = void 0;
const noop = any => any;
exports.noop = noop;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/render-step.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRenderStep = createRenderStep;
function createRenderStep(runNextFrame) {
  /**
   * We create and reuse two queues, one to queue jobs for the current frame
   * and one for the next. We reuse to avoid triggering GC after x frames.
   */
  let thisFrame = new Set();
  let nextFrame = new Set();
  /**
   * Track whether we're currently processing jobs in this step. This way
   * we can decide whether to schedule new jobs for this frame or next.
   */
  let isProcessing = false;
  let flushNextFrame = false;
  /**
   * A set of processes which were marked keepAlive when scheduled.
   */
  const toKeepAlive = new WeakSet();
  let latestFrameData = {
    delta: 0.0,
    timestamp: 0.0,
    isProcessing: false
  };
  function triggerCallback(callback) {
    if (toKeepAlive.has(callback)) {
      step.schedule(callback);
      runNextFrame();
    }
    callback(latestFrameData);
  }
  const step = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing;
      const queue = addToCurrentFrame ? thisFrame : nextFrame;
      if (keepAlive) toKeepAlive.add(callback);
      if (!queue.has(callback)) queue.add(callback);
      return callback;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: callback => {
      nextFrame.delete(callback);
      toKeepAlive.delete(callback);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: frameData => {
      latestFrameData = frameData;
      /**
       * If we're already processing we've probably been triggered by a flushSync
       * inside an existing process. Instead of executing, mark flushNextFrame
       * as true and ensure we flush the following frame at the end of this one.
       */
      if (isProcessing) {
        flushNextFrame = true;
        return;
      }
      isProcessing = true;
      [thisFrame, nextFrame] = [nextFrame, thisFrame];
      // Clear the next frame queue
      nextFrame.clear();
      // Execute this frame
      thisFrame.forEach(triggerCallback);
      isProcessing = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData);
      }
    }
  };
  return step;
}
},{}],"../../.nvm/versions/node/v22.11.0/lib/node_modules/parcel-bundler/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/batcher.mjs":[function(require,module,exports) {
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRenderBatcher = createRenderBatcher;
exports.stepsOrder = void 0;
var _GlobalConfig = require("../utils/GlobalConfig.mjs");
var _renderStep = require("./render-step.mjs");
const stepsOrder = exports.stepsOrder = ["read",
// Read
"resolveKeyframes",
// Write/Read/Write/Read
"update",
// Compute
"preRender",
// Compute
"render",
// Write
"postRender" // Compute
];
const maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
  let runNextFrame = false;
  let useDefaultElapsed = true;
  const state = {
    delta: 0.0,
    timestamp: 0.0,
    isProcessing: false
  };
  const flagRunNextFrame = () => runNextFrame = true;
  const steps = stepsOrder.reduce((acc, key) => {
    acc[key] = (0, _renderStep.createRenderStep)(flagRunNextFrame);
    return acc;
  }, {});
  const {
    read,
    resolveKeyframes,
    update,
    preRender,
    render,
    postRender
  } = steps;
  const processBatch = () => {
    const timestamp = _GlobalConfig.MotionGlobalConfig.useManualTiming ? state.timestamp : performance.now();
    runNextFrame = false;
    state.delta = useDefaultElapsed ? 1000 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
    state.timestamp = timestamp;
    state.isProcessing = true;
    // Unrolled render loop for better per-frame performance
    read.process(state);
    resolveKeyframes.process(state);
    update.process(state);
    preRender.process(state);
    render.process(state);
    postRender.process(state);
    state.isProcessing = false;
    if (runNextFrame && allowKeepAlive) {
      useDefaultElapsed = false;
      scheduleNextBatch(processBatch);
    }
  };
  const wake = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!state.isProcessing) {
      scheduleNextBatch(processBatch);
    }
  };
  const schedule = stepsOrder.reduce((acc, key) => {
    const step = steps[key];
    acc[key] = (process, keepAlive = false, immediate = false) => {
      if (!runNextFrame) wake();
      return step.schedule(process, keepAlive, immediate);
    };
    return acc;
  }, {});
  const cancel = process => {
    for (let i = 0; i < stepsOrder.length; i++) {
      steps[stepsOrder[i]].cancel(process);
    }
  };
  return {
    schedule,
    cancel,
    state,
    steps
  };
}
},{"../utils/GlobalConfig.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/GlobalConfig.mjs","./render-step.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/render-step.mjs","process":"../../.nvm/versions/node/v22.11.0/lib/node_modules/parcel-bundler/node_modules/process/browser.js"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/frame.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frameSteps = exports.frameData = exports.frame = exports.cancelFrame = void 0;
var _noop = require("../utils/noop.mjs");
var _batcher = require("./batcher.mjs");
const {
  schedule: frame,
  cancel: cancelFrame,
  state: frameData,
  steps: frameSteps
} = (0, _batcher.createRenderBatcher)(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : _noop.noop, true);
exports.frameSteps = frameSteps;
exports.frameData = frameData;
exports.cancelFrame = cancelFrame;
exports.frame = frame;
},{"../utils/noop.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/noop.mjs","./batcher.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/batcher.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/sync-time.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.time = void 0;
var _GlobalConfig = require("../utils/GlobalConfig.mjs");
var _frame = require("./frame.mjs");
let now;
function clearTime() {
  now = undefined;
}
/**
 * An eventloop-synchronous alternative to performance.now().
 *
 * Ensures that time measurements remain consistent within a synchronous context.
 * Usually calling performance.now() twice within the same synchronous context
 * will return different values which isn't useful for animations when we're usually
 * trying to sync animations to the same frame.
 */
const time = exports.time = {
  now: () => {
    if (now === undefined) {
      time.set(_frame.frameData.isProcessing || _GlobalConfig.MotionGlobalConfig.useManualTiming ? _frame.frameData.timestamp : performance.now());
    }
    return now;
  },
  set: newTime => {
    now = newTime;
    queueMicrotask(clearTime);
  }
};
},{"../utils/GlobalConfig.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/GlobalConfig.mjs","./frame.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/frame.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectMotionValues = exports.MotionValue = void 0;
exports.motionValue = motionValue;
var _subscriptionManager = require("../utils/subscription-manager.mjs");
var _velocityPerSecond = require("../utils/velocity-per-second.mjs");
var _warnOnce = require("../utils/warn-once.mjs");
var _syncTime = require("../frameloop/sync-time.mjs");
var _frame = require("../frameloop/frame.mjs");
/**
 * Maximum time between the value of two frames, beyond which we
 * assume the velocity has since been 0.
 */
const MAX_VELOCITY_DELTA = 30;
const isFloat = value => {
  return !isNaN(parseFloat(value));
};
const collectMotionValues = exports.collectMotionValues = {
  current: undefined
};
/**
 * `MotionValue` is used to track the state and velocity of motion values.
 *
 * @public
 */
class MotionValue {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   *
   * @internal
   */
  constructor(init, options = {}) {
    /**
     * This will be replaced by the build step with the latest version number.
     * When MotionValues are provided to motion components, warn if versions are mixed.
     */
    this.version = "11.11.17";
    /**
     * Tracks whether this value can output a velocity. Currently this is only true
     * if the value is numerical, but we might be able to widen the scope here and support
     * other value types.
     *
     * @internal
     */
    this.canTrackVelocity = null;
    /**
     * An object containing a SubscriptionManager for each active event.
     */
    this.events = {};
    this.updateAndNotify = (v, render = true) => {
      const currentTime = _syncTime.time.now();
      /**
       * If we're updating the value during another frame or eventloop
       * than the previous frame, then the we set the previous frame value
       * to current.
       */
      if (this.updatedAt !== currentTime) {
        this.setPrevFrameValue();
      }
      this.prev = this.current;
      this.setCurrent(v);
      // Update update subscribers
      if (this.current !== this.prev && this.events.change) {
        this.events.change.notify(this.current);
      }
      // Update render subscribers
      if (render && this.events.renderRequest) {
        this.events.renderRequest.notify(this.current);
      }
    };
    this.hasAnimated = false;
    this.setCurrent(init);
    this.owner = options.owner;
  }
  setCurrent(current) {
    this.current = current;
    this.updatedAt = _syncTime.time.now();
    if (this.canTrackVelocity === null && current !== undefined) {
      this.canTrackVelocity = isFloat(this.current);
    }
  }
  setPrevFrameValue(prevFrameValue = this.current) {
    this.prevFrameValue = prevFrameValue;
    this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(subscription) {
    if ("development" !== "production") {
      (0, _warnOnce.warnOnce)(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
    }
    return this.on("change", subscription);
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new _subscriptionManager.SubscriptionManager();
    }
    const unsubscribe = this.events[eventName].add(callback);
    if (eventName === "change") {
      return () => {
        unsubscribe();
        /**
         * If we have no more change listeners by the start
         * of the next frame, stop active animations.
         */
        _frame.frame.read(() => {
          if (!this.events.change.getSize()) {
            this.stop();
          }
        });
      };
    }
    return unsubscribe;
  }
  clearListeners() {
    for (const eventManagers in this.events) {
      this.events[eventManagers].clear();
    }
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   *
   * @internal
   */
  attach(passiveEffect, stopPassiveEffect) {
    this.passiveEffect = passiveEffect;
    this.stopPassiveEffect = stopPassiveEffect;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(v, render = true) {
    if (!render || !this.passiveEffect) {
      this.updateAndNotify(v, render);
    } else {
      this.passiveEffect(v, this.updateAndNotify);
    }
  }
  setWithVelocity(prev, current, delta) {
    this.set(current);
    this.prev = undefined;
    this.prevFrameValue = prev;
    this.prevUpdatedAt = this.updatedAt - delta;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(v, endAnimation = true) {
    this.updateAndNotify(v);
    this.prev = v;
    this.prevUpdatedAt = this.prevFrameValue = undefined;
    endAnimation && this.stop();
    if (this.stopPassiveEffect) this.stopPassiveEffect();
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    if (collectMotionValues.current) {
      collectMotionValues.current.push(this);
    }
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const currentTime = _syncTime.time.now();
    if (!this.canTrackVelocity || this.prevFrameValue === undefined || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
      return 0;
    }
    const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
    // Casts because of parseFloat's poor typing
    return (0, _velocityPerSecond.velocityPerSecond)(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   *
   * @internal
   */
  start(startAnimation) {
    this.stop();
    return new Promise(resolve => {
      this.hasAnimated = true;
      this.animation = startAnimation(resolve);
      if (this.events.animationStart) {
        this.events.animationStart.notify();
      }
    }).then(() => {
      if (this.events.animationComplete) {
        this.events.animationComplete.notify();
      }
      this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    if (this.animation) {
      this.animation.stop();
      if (this.events.animationCancel) {
        this.events.animationCancel.notify();
      }
    }
    this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.clearListeners();
    this.stop();
    if (this.stopPassiveEffect) {
      this.stopPassiveEffect();
    }
  }
}
exports.MotionValue = MotionValue;
function motionValue(init, options) {
  return new MotionValue(init, options);
}
},{"../utils/subscription-manager.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/subscription-manager.mjs","../utils/velocity-per-second.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/velocity-per-second.mjs","../utils/warn-once.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/warn-once.mjs","../frameloop/sync-time.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/sync-time.mjs","../frameloop/frame.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/frame.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/memo.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memo = memo;
function memo(callback) {
  let result;
  return () => {
    if (result === undefined) result = callback();
    return result;
  };
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/supports.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportsScrollTimeline = void 0;
var _memo = require("../../../utils/memo.mjs");
const supportsScrollTimeline = exports.supportsScrollTimeline = (0, _memo.memo)(() => window.ScrollTimeline !== undefined);
},{"../../../utils/memo.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/memo.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/GroupPlaybackControls.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupPlaybackControls = void 0;
var _supports = require("../render/dom/scroll/supports.mjs");
class GroupPlaybackControls {
  constructor(animations) {
    // Bound to accomodate common `return animation.stop` pattern
    this.stop = () => this.runAll("stop");
    this.animations = animations.filter(Boolean);
  }
  then(onResolve, onReject) {
    return Promise.all(this.animations).then(onResolve).catch(onReject);
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(propName) {
    return this.animations[0][propName];
  }
  setAll(propName, newValue) {
    for (let i = 0; i < this.animations.length; i++) {
      this.animations[i][propName] = newValue;
    }
  }
  attachTimeline(timeline, fallback) {
    const subscriptions = this.animations.map(animation => {
      if ((0, _supports.supportsScrollTimeline)() && animation.attachTimeline) {
        return animation.attachTimeline(timeline);
      } else {
        return fallback(animation);
      }
    });
    return () => {
      subscriptions.forEach((cancel, i) => {
        cancel && cancel();
        this.animations[i].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(time) {
    this.setAll("time", time);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(speed) {
    this.setAll("speed", speed);
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    let max = 0;
    for (let i = 0; i < this.animations.length; i++) {
      max = Math.max(max, this.animations[i].duration);
    }
    return max;
  }
  runAll(methodName) {
    this.animations.forEach(controls => controls[methodName]());
  }
  flatten() {
    this.runAll("flatten");
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
exports.GroupPlaybackControls = GroupPlaybackControls;
},{"../render/dom/scroll/supports.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/supports.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/time-conversion.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secondsToMilliseconds = exports.millisecondsToSeconds = void 0;
/**
 * Converts seconds to milliseconds
 *
 * @param seconds - Time in seconds.
 * @return milliseconds - Converted time in milliseconds.
 */
const secondsToMilliseconds = seconds => seconds * 1000;
exports.secondsToMilliseconds = secondsToMilliseconds;
const millisecondsToSeconds = milliseconds => milliseconds / 1000;
exports.millisecondsToSeconds = millisecondsToSeconds;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/utils/velocity.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcGeneratorVelocity = calcGeneratorVelocity;
var _velocityPerSecond = require("../../../utils/velocity-per-second.mjs");
const velocitySampleDuration = 5; // ms
function calcGeneratorVelocity(resolveValue, t, current) {
  const prevT = Math.max(t - velocitySampleDuration, 0);
  return (0, _velocityPerSecond.velocityPerSecond)(current - resolveValue(prevT), t - prevT);
}
},{"../../../utils/velocity-per-second.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/velocity-per-second.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/errors.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warning = exports.invariant = void 0;
var _noop = require("./noop.mjs");
let warning = exports.warning = _noop.noop;
let invariant = exports.invariant = _noop.noop;
if ("development" !== "production") {
  exports.warning = warning = (check, message) => {
    if (!check && typeof console !== "undefined") {
      console.warn(message);
    }
  };
  exports.invariant = invariant = (check, message) => {
    if (!check) {
      throw new Error(message);
    }
  };
}
},{"./noop.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/noop.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/clamp.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clamp = void 0;
const clamp = (min, max, v) => {
  if (v > max) return max;
  if (v < min) return min;
  return v;
};
exports.clamp = clamp;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/spring/find.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcAngularFreq = calcAngularFreq;
exports.findSpring = findSpring;
exports.minDuration = exports.minDamping = exports.maxDuration = exports.maxDamping = void 0;
var _errors = require("../../../utils/errors.mjs");
var _clamp = require("../../../utils/clamp.mjs");
var _timeConversion = require("../../../utils/time-conversion.mjs");
const safeMin = 0.001;
const minDuration = exports.minDuration = 0.01;
const maxDuration = exports.maxDuration = 10.0;
const minDamping = exports.minDamping = 0.05;
const maxDamping = exports.maxDamping = 1;
function findSpring({
  duration = 800,
  bounce = 0.25,
  velocity = 0,
  mass = 1
}) {
  let envelope;
  let derivative;
  (0, _errors.warning)(duration <= (0, _timeConversion.secondsToMilliseconds)(maxDuration), "Spring duration must be 10 seconds or less");
  let dampingRatio = 1 - bounce;
  /**
   * Restrict dampingRatio and duration to within acceptable ranges.
   */
  dampingRatio = (0, _clamp.clamp)(minDamping, maxDamping, dampingRatio);
  duration = (0, _clamp.clamp)(minDuration, maxDuration, (0, _timeConversion.millisecondsToSeconds)(duration));
  if (dampingRatio < 1) {
    /**
     * Underdamped spring
     */
    envelope = undampedFreq => {
      const exponentialDecay = undampedFreq * dampingRatio;
      const delta = exponentialDecay * duration;
      const a = exponentialDecay - velocity;
      const b = calcAngularFreq(undampedFreq, dampingRatio);
      const c = Math.exp(-delta);
      return safeMin - a / b * c;
    };
    derivative = undampedFreq => {
      const exponentialDecay = undampedFreq * dampingRatio;
      const delta = exponentialDecay * duration;
      const d = delta * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq, 2) * duration;
      const f = Math.exp(-delta);
      const g = calcAngularFreq(Math.pow(undampedFreq, 2), dampingRatio);
      const factor = -envelope(undampedFreq) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    /**
     * Critically-damped spring
     */
    envelope = undampedFreq => {
      const a = Math.exp(-undampedFreq * duration);
      const b = (undampedFreq - velocity) * duration + 1;
      return -safeMin + a * b;
    };
    derivative = undampedFreq => {
      const a = Math.exp(-undampedFreq * duration);
      const b = (velocity - undampedFreq) * (duration * duration);
      return a * b;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = (0, _timeConversion.secondsToMilliseconds)(duration);
  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
const rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
},{"../../../utils/errors.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/errors.mjs","../../../utils/clamp.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/clamp.mjs","../../../utils/time-conversion.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/time-conversion.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/spring/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spring = spring;
var _timeConversion = require("../../../utils/time-conversion.mjs");
var _velocity = require("../utils/velocity.mjs");
var _find = require("./find.mjs");
const durationKeys = ["duration", "bounce"];
const physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
  return keys.some(key => options[key] !== undefined);
}
function getSpringOptions(options) {
  let springOptions = {
    velocity: 0.0,
    stiffness: 100,
    damping: 10,
    mass: 1.0,
    isResolvedFromDuration: false,
    ...options
  };
  // stiffness/damping/mass overrides duration/bounce
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    const derived = (0, _find.findSpring)(options);
    springOptions = {
      ...springOptions,
      ...derived,
      mass: 1.0
    };
    springOptions.isResolvedFromDuration = true;
  }
  return springOptions;
}
function spring({
  keyframes,
  restDelta,
  restSpeed,
  ...options
}) {
  const origin = keyframes[0];
  const target = keyframes[keyframes.length - 1];
  /**
   * This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
   * to reduce GC during animation.
   */
  const state = {
    done: false,
    value: origin
  };
  const {
    stiffness,
    damping,
    mass,
    duration,
    velocity,
    isResolvedFromDuration
  } = getSpringOptions({
    ...options,
    velocity: -(0, _timeConversion.millisecondsToSeconds)(options.velocity || 0)
  });
  const initialVelocity = velocity || 0.0;
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  const initialDelta = target - origin;
  const undampedAngularFreq = (0, _timeConversion.millisecondsToSeconds)(Math.sqrt(stiffness / mass));
  /**
   * If we're working on a granular scale, use smaller defaults for determining
   * when the spring is finished.
   *
   * These defaults have been selected emprically based on what strikes a good
   * ratio between feeling good and finishing as soon as changes are imperceptible.
   */
  const isGranularScale = Math.abs(initialDelta) < 5;
  restSpeed || (restSpeed = isGranularScale ? 0.01 : 2);
  restDelta || (restDelta = isGranularScale ? 0.005 : 0.5);
  let resolveSpring;
  if (dampingRatio < 1) {
    const angularFreq = (0, _find.calcAngularFreq)(undampedAngularFreq, dampingRatio);
    // Underdamped spring
    resolveSpring = t => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
    };
  } else if (dampingRatio === 1) {
    // Critically damped spring
    resolveSpring = t => target - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
  } else {
    // Overdamped spring
    const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
    resolveSpring = t => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      // When performing sinh or cosh values can hit Infinity so we cap them here
      const freqForT = Math.min(dampedAngularFreq * t, 300);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
    };
  }
  return {
    calculatedDuration: isResolvedFromDuration ? duration || null : null,
    next: t => {
      const current = resolveSpring(t);
      if (!isResolvedFromDuration) {
        let currentVelocity = 0.0;
        /**
         * We only need to calculate velocity for under-damped springs
         * as over- and critically-damped springs can't overshoot, so
         * checking only for displacement is enough.
         */
        if (dampingRatio < 1) {
          currentVelocity = t === 0 ? (0, _timeConversion.secondsToMilliseconds)(initialVelocity) : (0, _velocity.calcGeneratorVelocity)(resolveSpring, t, current);
        }
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(target - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t >= duration;
      }
      state.value = state.done ? target : current;
      return state;
    }
  };
}
},{"../../../utils/time-conversion.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/time-conversion.mjs","../utils/velocity.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/utils/velocity.mjs","./find.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/spring/find.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/utils/calc-duration.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcGeneratorDuration = calcGeneratorDuration;
exports.maxGeneratorDuration = void 0;
/**
 * Implement a practical max duration for keyframe generation
 * to prevent infinite loops
 */
const maxGeneratorDuration = exports.maxGeneratorDuration = 20000;
function calcGeneratorDuration(generator) {
  let duration = 0;
  const timeStep = 50;
  let state = generator.next(duration);
  while (!state.done && duration < maxGeneratorDuration) {
    duration += timeStep;
    state = generator.next(duration);
  }
  return duration >= maxGeneratorDuration ? Infinity : duration;
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/utils/create-generator-easing.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGeneratorEasing = createGeneratorEasing;
var _calcDuration = require("../../animation/generators/utils/calc-duration.mjs");
var _timeConversion = require("../../utils/time-conversion.mjs");
/**
 * Create a progress => progress easing function from a generator.
 */
function createGeneratorEasing(options, scale = 100, createGenerator) {
  const generator = createGenerator({
    ...options,
    keyframes: [0, scale]
  });
  const duration = Math.min((0, _calcDuration.calcGeneratorDuration)(generator), _calcDuration.maxGeneratorDuration);
  return {
    type: "keyframes",
    ease: progress => generator.next(duration * progress).value / scale,
    duration: (0, _timeConversion.millisecondsToSeconds)(duration)
  };
}
},{"../../animation/generators/utils/calc-duration.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/utils/calc-duration.mjs","../../utils/time-conversion.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/time-conversion.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/number.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixNumber = void 0;
/*
  Value in range from progress

  Given a lower limit and an upper limit, we return the value within
  that range as expressed by progress (usually a number from 0 to 1)

  So progress = 0.5 would change

  from -------- to

  to

  from ---- to

  E.g. from = 10, to = 20, progress = 0.5 => 15

  @param [number]: Lower limit of range
  @param [number]: Upper limit of range
  @param [number]: The progress between lower and upper limits expressed 0-1
  @return [number]: Value as calculated from progress within range (not limited within range)
*/
const mixNumber = (from, to, progress) => {
  return from + (to - from) * progress;
};
exports.mixNumber = mixNumber;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/progress.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.progress = void 0;
/*
  Progress within given range

  Given a lower limit and an upper limit, we return the progress
  (expressed as a number 0-1) represented by the given value, and
  limit that progress to within 0-1.

  @param [number]: Lower limit
  @param [number]: Upper limit
  @param [number]: Value to find progress within given range
  @return [number]: Progress of value within range as expressed 0-1
*/
const progress = (from, to, value) => {
  const toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};
exports.progress = progress;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/offsets/fill.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fillOffset = fillOffset;
var _number = require("../mix/number.mjs");
var _progress = require("../progress.mjs");
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = (0, _progress.progress)(0, remaining, i);
    offset.push((0, _number.mixNumber)(min, 1, offsetProgress));
  }
}
},{"../mix/number.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/number.mjs","../progress.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/progress.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/offsets/default.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOffset = defaultOffset;
var _fill = require("./fill.mjs");
function defaultOffset(arr) {
  const offset = [0];
  (0, _fill.fillOffset)(offset, arr.length - 1);
  return offset;
}
},{"./fill.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/offsets/fill.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/utils/is-motion-value.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMotionValue = void 0;
const isMotionValue = value => Boolean(value && value.getVelocity);
exports.isMotionValue = isMotionValue;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/resolve-element.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveElements = resolveElements;
var _errors = require("../../../utils/errors.mjs");
function resolveElements(elements, scope, selectorCache) {
  var _a;
  if (typeof elements === "string") {
    let root = document;
    if (scope) {
      (0, _errors.invariant)(Boolean(scope.current), "Scope provided, but no element detected.");
      root = scope.current;
    }
    if (selectorCache) {
      (_a = selectorCache[elements]) !== null && _a !== void 0 ? _a : selectorCache[elements] = root.querySelectorAll(elements);
      elements = selectorCache[elements];
    } else {
      elements = root.querySelectorAll(elements);
    }
  } else if (elements instanceof Element) {
    elements = [elements];
  }
  /**
   * Return an empty array
   */
  return Array.from(elements || []);
}
},{"../../../utils/errors.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/errors.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDOMKeyframes = isDOMKeyframes;
function isDOMKeyframes(keyframes) {
  return typeof keyframes === "object" && !Array.isArray(keyframes);
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animate/resolve-subjects.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveSubjects = resolveSubjects;
var _resolveElement = require("../../render/dom/utils/resolve-element.mjs");
var _isDomKeyframes = require("../utils/is-dom-keyframes.mjs");
function resolveSubjects(subject, keyframes, scope, selectorCache) {
  if (typeof subject === "string" && (0, _isDomKeyframes.isDOMKeyframes)(keyframes)) {
    return (0, _resolveElement.resolveElements)(subject, scope, selectorCache);
  } else if (subject instanceof NodeList) {
    return Array.from(subject);
  } else if (Array.isArray(subject)) {
    return subject;
  } else {
    return [subject];
  }
}
},{"../../render/dom/utils/resolve-element.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/resolve-element.mjs","../utils/is-dom-keyframes.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/utils/is-generator.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isGenerator = isGenerator;
function isGenerator(type) {
  return typeof type === "function";
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcNextTime = calcNextTime;
/**
 * Given a absolute or relative time definition and current/prev time state of the sequence,
 * calculate an absolute time for the next keyframes.
 */
function calcNextTime(current, next, prev, labels) {
  var _a;
  if (typeof next === "number") {
    return next;
  } else if (next.startsWith("-") || next.startsWith("+")) {
    return Math.max(0, current + parseFloat(next));
  } else if (next === "<") {
    return prev;
  } else {
    return (_a = labels.get(next)) !== null && _a !== void 0 ? _a : current;
  }
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/wrap.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrap = void 0;
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};
exports.wrap = wrap;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/utils/is-easing-array.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEasingArray = void 0;
const isEasingArray = ease => {
  return Array.isArray(ease) && typeof ease[0] !== "number";
};
exports.isEasingArray = isEasingArray;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/utils/get-easing-for-segment.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEasingForSegment = getEasingForSegment;
var _wrap = require("../../utils/wrap.mjs");
var _isEasingArray = require("./is-easing-array.mjs");
function getEasingForSegment(easing, i) {
  return (0, _isEasingArray.isEasingArray)(easing) ? easing[(0, _wrap.wrap)(0, easing.length, i)] : easing;
}
},{"../../utils/wrap.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/wrap.mjs","./is-easing-array.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/utils/is-easing-array.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/sequence/utils/edit.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addKeyframes = addKeyframes;
exports.eraseKeyframes = eraseKeyframes;
var _getEasingForSegment = require("../../../easing/utils/get-easing-for-segment.mjs");
var _array = require("../../../utils/array.mjs");
var _number = require("../../../utils/mix/number.mjs");
function eraseKeyframes(sequence, startTime, endTime) {
  for (let i = 0; i < sequence.length; i++) {
    const keyframe = sequence[i];
    if (keyframe.at > startTime && keyframe.at < endTime) {
      (0, _array.removeItem)(sequence, keyframe);
      // If we remove this item we have to push the pointer back one
      i--;
    }
  }
}
function addKeyframes(sequence, keyframes, easing, offset, startTime, endTime) {
  /**
   * Erase every existing value between currentTime and targetTime,
   * this will essentially splice this timeline into any currently
   * defined ones.
   */
  eraseKeyframes(sequence, startTime, endTime);
  for (let i = 0; i < keyframes.length; i++) {
    sequence.push({
      value: keyframes[i],
      at: (0, _number.mixNumber)(startTime, endTime, offset[i]),
      easing: (0, _getEasingForSegment.getEasingForSegment)(easing, i)
    });
  }
}
},{"../../../easing/utils/get-easing-for-segment.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/utils/get-easing-for-segment.mjs","../../../utils/array.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/array.mjs","../../../utils/mix/number.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/number.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/sequence/utils/sort.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareByTime = compareByTime;
function compareByTime(a, b) {
  if (a.at === b.at) {
    if (a.value === null) return 1;
    if (b.value === null) return -1;
    return 0;
  } else {
    return a.at - b.at;
  }
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/sequence/create.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAnimationsFromSequence = createAnimationsFromSequence;
exports.getValueTransition = getValueTransition;
var _createGeneratorEasing = require("../../easing/utils/create-generator-easing.mjs");
var _default = require("../../utils/offsets/default.mjs");
var _fill = require("../../utils/offsets/fill.mjs");
var _progress = require("../../utils/progress.mjs");
var _timeConversion = require("../../utils/time-conversion.mjs");
var _isMotionValue = require("../../value/utils/is-motion-value.mjs");
var _resolveSubjects = require("../animate/resolve-subjects.mjs");
var _isGenerator = require("../generators/utils/is-generator.mjs");
var _calcTime = require("./utils/calc-time.mjs");
var _edit = require("./utils/edit.mjs");
var _sort = require("./utils/sort.mjs");
const defaultSegmentEasing = "easeInOut";
function createAnimationsFromSequence(sequence, {
  defaultTransition = {},
  ...sequenceTransition
} = {}, scope, generators) {
  const defaultDuration = defaultTransition.duration || 0.3;
  const animationDefinitions = new Map();
  const sequences = new Map();
  const elementCache = {};
  const timeLabels = new Map();
  let prevTime = 0;
  let currentTime = 0;
  let totalDuration = 0;
  /**
   * Build the timeline by mapping over the sequence array and converting
   * the definitions into keyframes and offsets with absolute time values.
   * These will later get converted into relative offsets in a second pass.
   */
  for (let i = 0; i < sequence.length; i++) {
    const segment = sequence[i];
    /**
     * If this is a timeline label, mark it and skip the rest of this iteration.
     */
    if (typeof segment === "string") {
      timeLabels.set(segment, currentTime);
      continue;
    } else if (!Array.isArray(segment)) {
      timeLabels.set(segment.name, (0, _calcTime.calcNextTime)(currentTime, segment.at, prevTime, timeLabels));
      continue;
    }
    let [subject, keyframes, transition = {}] = segment;
    /**
     * If a relative or absolute time value has been specified we need to resolve
     * it in relation to the currentTime.
     */
    if (transition.at !== undefined) {
      currentTime = (0, _calcTime.calcNextTime)(currentTime, transition.at, prevTime, timeLabels);
    }
    /**
     * Keep track of the maximum duration in this definition. This will be
     * applied to currentTime once the definition has been parsed.
     */
    let maxDuration = 0;
    const resolveValueSequence = (valueKeyframes, valueTransition, valueSequence, elementIndex = 0, numSubjects = 0) => {
      const valueKeyframesAsList = keyframesAsList(valueKeyframes);
      const {
        delay = 0,
        times = (0, _default.defaultOffset)(valueKeyframesAsList),
        type = "keyframes",
        ...remainingTransition
      } = valueTransition;
      let {
        ease = defaultTransition.ease || "easeOut",
        duration
      } = valueTransition;
      /**
       * Resolve stagger() if defined.
       */
      const calculatedDelay = typeof delay === "function" ? delay(elementIndex, numSubjects) : delay;
      /**
       * If this animation should and can use a spring, generate a spring easing function.
       */
      const numKeyframes = valueKeyframesAsList.length;
      const createGenerator = (0, _isGenerator.isGenerator)(type) ? type : generators === null || generators === void 0 ? void 0 : generators[type];
      if (numKeyframes <= 2 && createGenerator) {
        /**
         * As we're creating an easing function from a spring,
         * ideally we want to generate it using the real distance
         * between the two keyframes. However this isn't always
         * possible - in these situations we use 0-100.
         */
        let absoluteDelta = 100;
        if (numKeyframes === 2 && isNumberKeyframesArray(valueKeyframesAsList)) {
          const delta = valueKeyframesAsList[1] - valueKeyframesAsList[0];
          absoluteDelta = Math.abs(delta);
        }
        const springTransition = {
          ...remainingTransition
        };
        if (duration !== undefined) {
          springTransition.duration = (0, _timeConversion.secondsToMilliseconds)(duration);
        }
        const springEasing = (0, _createGeneratorEasing.createGeneratorEasing)(springTransition, absoluteDelta, createGenerator);
        ease = springEasing.ease;
        duration = springEasing.duration;
      }
      duration !== null && duration !== void 0 ? duration : duration = defaultDuration;
      const startTime = currentTime + calculatedDelay;
      const targetTime = startTime + duration;
      /**
       * If there's only one time offset of 0, fill in a second with length 1
       */
      if (times.length === 1 && times[0] === 0) {
        times[1] = 1;
      }
      /**
       * Fill out if offset if fewer offsets than keyframes
       */
      const remainder = times.length - valueKeyframesAsList.length;
      remainder > 0 && (0, _fill.fillOffset)(times, remainder);
      /**
       * If only one value has been set, ie [1], push a null to the start of
       * the keyframe array. This will let us mark a keyframe at this point
       * that will later be hydrated with the previous value.
       */
      valueKeyframesAsList.length === 1 && valueKeyframesAsList.unshift(null);
      /**
       * Add keyframes, mapping offsets to absolute time.
       */
      (0, _edit.addKeyframes)(valueSequence, valueKeyframesAsList, ease, times, startTime, targetTime);
      maxDuration = Math.max(calculatedDelay + duration, maxDuration);
      totalDuration = Math.max(targetTime, totalDuration);
    };
    if ((0, _isMotionValue.isMotionValue)(subject)) {
      const subjectSequence = getSubjectSequence(subject, sequences);
      resolveValueSequence(keyframes, transition, getValueSequence("default", subjectSequence));
    } else {
      const subjects = (0, _resolveSubjects.resolveSubjects)(subject, keyframes, scope, elementCache);
      const numSubjects = subjects.length;
      /**
       * For every element in this segment, process the defined values.
       */
      for (let subjectIndex = 0; subjectIndex < numSubjects; subjectIndex++) {
        /**
         * Cast necessary, but we know these are of this type
         */
        keyframes = keyframes;
        transition = transition;
        const thisSubject = subjects[subjectIndex];
        const subjectSequence = getSubjectSequence(thisSubject, sequences);
        for (const key in keyframes) {
          resolveValueSequence(keyframes[key], getValueTransition(transition, key), getValueSequence(key, subjectSequence), subjectIndex, numSubjects);
        }
      }
    }
    prevTime = currentTime;
    currentTime += maxDuration;
  }
  /**
   * For every element and value combination create a new animation.
   */
  sequences.forEach((valueSequences, element) => {
    for (const key in valueSequences) {
      const valueSequence = valueSequences[key];
      /**
       * Arrange all the keyframes in ascending time order.
       */
      valueSequence.sort(_sort.compareByTime);
      const keyframes = [];
      const valueOffset = [];
      const valueEasing = [];
      /**
       * For each keyframe, translate absolute times into
       * relative offsets based on the total duration of the timeline.
       */
      for (let i = 0; i < valueSequence.length; i++) {
        const {
          at,
          value,
          easing
        } = valueSequence[i];
        keyframes.push(value);
        valueOffset.push((0, _progress.progress)(0, totalDuration, at));
        valueEasing.push(easing || "easeOut");
      }
      /**
       * If the first keyframe doesn't land on offset: 0
       * provide one by duplicating the initial keyframe. This ensures
       * it snaps to the first keyframe when the animation starts.
       */
      if (valueOffset[0] !== 0) {
        valueOffset.unshift(0);
        keyframes.unshift(keyframes[0]);
        valueEasing.unshift(defaultSegmentEasing);
      }
      /**
       * If the last keyframe doesn't land on offset: 1
       * provide one with a null wildcard value. This will ensure it
       * stays static until the end of the animation.
       */
      if (valueOffset[valueOffset.length - 1] !== 1) {
        valueOffset.push(1);
        keyframes.push(null);
      }
      if (!animationDefinitions.has(element)) {
        animationDefinitions.set(element, {
          keyframes: {},
          transition: {}
        });
      }
      const definition = animationDefinitions.get(element);
      definition.keyframes[key] = keyframes;
      definition.transition[key] = {
        ...defaultTransition,
        duration: totalDuration,
        ease: valueEasing,
        times: valueOffset,
        ...sequenceTransition
      };
    }
  });
  return animationDefinitions;
}
function getSubjectSequence(subject, sequences) {
  !sequences.has(subject) && sequences.set(subject, {});
  return sequences.get(subject);
}
function getValueSequence(name, sequences) {
  if (!sequences[name]) sequences[name] = [];
  return sequences[name];
}
function keyframesAsList(keyframes) {
  return Array.isArray(keyframes) ? keyframes : [keyframes];
}
function getValueTransition(transition, key) {
  return transition && transition[key] ? {
    ...transition,
    ...transition[key]
  } : {
    ...transition
  };
}
const isNumber = keyframe => typeof keyframe === "number";
const isNumberKeyframesArray = keyframes => keyframes.every(isNumber);
},{"../../easing/utils/create-generator-easing.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/utils/create-generator-easing.mjs","../../utils/offsets/default.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/offsets/default.mjs","../../utils/offsets/fill.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/offsets/fill.mjs","../../utils/progress.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/progress.mjs","../../utils/time-conversion.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/time-conversion.mjs","../../value/utils/is-motion-value.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/utils/is-motion-value.mjs","../animate/resolve-subjects.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animate/resolve-subjects.mjs","../generators/utils/is-generator.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/utils/is-generator.mjs","./utils/calc-time.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs","./utils/edit.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/sequence/utils/edit.mjs","./utils/sort.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/sequence/utils/sort.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/store.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visualElementStore = void 0;
const visualElementStore = exports.visualElementStore = new WeakMap();
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/transform.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformProps = exports.transformPropOrder = void 0;
/**
 * Generate a list of every possible transform key.
 */
const transformPropOrder = exports.transformPropOrder = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"];
/**
 * A quick lookup for transform props.
 */
const transformProps = exports.transformProps = new Set(transformPropOrder);
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/default-transitions.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultTransition = void 0;
var _transform = require("../../render/html/utils/transform.mjs");
const underDampedSpring = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
};
const criticallyDampedSpring = target => ({
  type: "spring",
  stiffness: 550,
  damping: target === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
});
const keyframesTransition = {
  type: "keyframes",
  duration: 0.8
};
/**
 * Default easing curve is a slightly shallower version of
 * the default browser easing curve.
 */
const ease = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
};
const getDefaultTransition = (valueKey, {
  keyframes
}) => {
  if (keyframes.length > 2) {
    return keyframesTransition;
  } else if (_transform.transformProps.has(valueKey)) {
    return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes[1]) : underDampedSpring;
  }
  return ease;
};
exports.getDefaultTransition = getDefaultTransition;
},{"../../render/html/utils/transform.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/transform.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/get-value-transition.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValueTransition = getValueTransition;
function getValueTransition(transition, key) {
  return transition ? transition[key] || transition["default"] || transition : undefined;
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/use-instant-transition-state.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instantAnimationState = void 0;
const instantAnimationState = exports.instantAnimationState = {
  current: false
};
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFinalKeyframe = getFinalKeyframe;
const isNotNull = value => value !== null;
function getFinalKeyframe(keyframes, {
  repeat,
  repeatType = "loop"
}, finalKeyframe) {
  const resolvedKeyframes = keyframes.filter(isNotNull);
  const index = repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : resolvedKeyframes.length - 1;
  return !index || finalKeyframe === undefined ? resolvedKeyframes[index] : finalKeyframe;
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/cubic-bezier.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cubicBezier = cubicBezier;
var _noop = require("../utils/noop.mjs");
/*
  Bezier function generator
  This has been modified from Gaëtan Renaudeau's BezierEasing
  https://github.com/gre/bezier-easing/blob/master/src/index.js
  https://github.com/gre/bezier-easing/blob/master/LICENSE
  
  I've removed the newtonRaphsonIterate algo because in benchmarking it
  wasn't noticiably faster than binarySubdivision, indeed removing it
  usually improved times, depending on the curve.
  I also removed the lookup table, as for the added bundle size and loop we're
  only cutting ~4 or so subdivision iterations. I bumped the max iterations up
  to 12 to compensate and this still tended to be faster for no perceivable
  loss in accuracy.
  Usage
    const easeOut = cubicBezier(.17,.67,.83,.67);
    const x = easeOut(0.5); // returns 0.627...
*/
// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
const calcBezier = (t, a1, a2) => (((1.0 - 3.0 * a2 + 3.0 * a1) * t + (3.0 * a2 - 6.0 * a1)) * t + 3.0 * a1) * t;
const subdivisionPrecision = 0.0000001;
const subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - x;
    if (currentX > 0.0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  // If this is a linear gradient, return linear easing
  if (mX1 === mY1 && mX2 === mY2) return _noop.noop;
  const getTForX = aX => binarySubdivide(aX, 0, 1, mX1, mX2);
  // If animation is at start/end, return t without easing
  return t => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}
},{"../utils/noop.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/noop.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/modifiers/mirror.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mirrorEasing = void 0;
// Accepts an easing function and returns a new one that outputs mirrored values for
// the second half of the animation. Turns easeIn into easeInOut.
const mirrorEasing = easing => p => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
exports.mirrorEasing = mirrorEasing;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/modifiers/reverse.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reverseEasing = void 0;
// Accepts an easing function and returns a new one that outputs reversed values.
// Turns easeIn into easeOut.
const reverseEasing = easing => p => 1 - easing(1 - p);
exports.reverseEasing = reverseEasing;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/back.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backOut = exports.backInOut = exports.backIn = void 0;
var _cubicBezier = require("./cubic-bezier.mjs");
var _mirror = require("./modifiers/mirror.mjs");
var _reverse = require("./modifiers/reverse.mjs");
const backOut = exports.backOut = /*@__PURE__*/(0, _cubicBezier.cubicBezier)(0.33, 1.53, 0.69, 0.99);
const backIn = exports.backIn = /*@__PURE__*/(0, _reverse.reverseEasing)(backOut);
const backInOut = exports.backInOut = /*@__PURE__*/(0, _mirror.mirrorEasing)(backIn);
},{"./cubic-bezier.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/cubic-bezier.mjs","./modifiers/mirror.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/modifiers/mirror.mjs","./modifiers/reverse.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/modifiers/reverse.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/anticipate.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.anticipate = void 0;
var _back = require("./back.mjs");
const anticipate = p => (p *= 2) < 1 ? 0.5 * (0, _back.backIn)(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
exports.anticipate = anticipate;
},{"./back.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/back.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/circ.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.circOut = exports.circInOut = exports.circIn = void 0;
var _mirror = require("./modifiers/mirror.mjs");
var _reverse = require("./modifiers/reverse.mjs");
const circIn = p => 1 - Math.sin(Math.acos(p));
exports.circIn = circIn;
const circOut = exports.circOut = (0, _reverse.reverseEasing)(circIn);
const circInOut = exports.circInOut = (0, _mirror.mirrorEasing)(circIn);
},{"./modifiers/mirror.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/modifiers/mirror.mjs","./modifiers/reverse.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/modifiers/reverse.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/is-zero-value-string.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isZeroValueString = void 0;
/**
 * Check if the value is a zero value string like "0px" or "0%"
 */
const isZeroValueString = v => /^0[^.\s]+$/u.test(v);
exports.isZeroValueString = isZeroValueString;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/is-none.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNone = isNone;
var _isZeroValueString = require("../../utils/is-zero-value-string.mjs");
function isNone(value) {
  if (typeof value === "number") {
    return value === 0;
  } else if (value !== null) {
    return value === "none" || value === "0" || (0, _isZeroValueString.isZeroValueString)(value);
  } else {
    return true;
  }
}
},{"../../utils/is-zero-value-string.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/is-zero-value-string.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/is-numerical-string.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumericalString = void 0;
/**
 * Check if value is a numerical string, ie a string that is purely a number eg "100" or "-100.1"
 */
const isNumericalString = v => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);
exports.isNumericalString = isNumericalString;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCSSVariableToken = exports.isCSSVariableName = void 0;
const checkStringStartsWith = token => key => typeof key === "string" && key.startsWith(token);
const isCSSVariableName = exports.isCSSVariableName = /*@__PURE__*/checkStringStartsWith("--");
const startsAsVariableToken = /*@__PURE__*/checkStringStartsWith("var(--");
const isCSSVariableToken = value => {
  const startsWithToken = startsAsVariableToken(value);
  if (!startsWithToken) return false;
  // Ensure any comments are stripped from the value as this can harm performance of the regex.
  return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
exports.isCSSVariableToken = isCSSVariableToken;
const singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/css-variables-conversion.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVariableValue = getVariableValue;
exports.parseCSSVariable = parseCSSVariable;
var _errors = require("../../../utils/errors.mjs");
var _isNumericalString = require("../../../utils/is-numerical-string.mjs");
var _isCssVariable = require("./is-css-variable.mjs");
/**
 * Parse Framer's special CSS variable format into a CSS token and a fallback.
 *
 * ```
 * `var(--foo, #fff)` => [`--foo`, '#fff']
 * ```
 *
 * @param current
 */
const splitCSSVariableRegex =
// eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function parseCSSVariable(current) {
  const match = splitCSSVariableRegex.exec(current);
  if (!match) return [,];
  const [, token1, token2, fallback] = match;
  return [`--${token1 !== null && token1 !== void 0 ? token1 : token2}`, fallback];
}
const maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
  (0, _errors.invariant)(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`);
  const [token, fallback] = parseCSSVariable(current);
  // No CSS variable detected
  if (!token) return;
  // Attempt to read this CSS variable off the element
  const resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    const trimmed = resolved.trim();
    return (0, _isNumericalString.isNumericalString)(trimmed) ? parseFloat(trimmed) : trimmed;
  }
  return (0, _isCssVariable.isCSSVariableToken)(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
}
},{"../../../utils/errors.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/errors.mjs","../../../utils/is-numerical-string.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/is-numerical-string.mjs","./is-css-variable.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/numbers/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scale = exports.number = exports.alpha = void 0;
var _clamp = require("../../../utils/clamp.mjs");
const number = exports.number = {
  test: v => typeof v === "number",
  parse: parseFloat,
  transform: v => v
};
const alpha = exports.alpha = {
  ...number,
  transform: v => (0, _clamp.clamp)(0, 1, v)
};
const scale = exports.scale = {
  ...number,
  default: 1
};
},{"../../../utils/clamp.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/clamp.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/numbers/units.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vw = exports.vh = exports.px = exports.progressPercentage = exports.percent = exports.degrees = void 0;
const createUnitType = unit => ({
  test: v => typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
  parse: parseFloat,
  transform: v => `${v}${unit}`
});
const degrees = exports.degrees = /*@__PURE__*/createUnitType("deg");
const percent = exports.percent = /*@__PURE__*/createUnitType("%");
const px = exports.px = /*@__PURE__*/createUnitType("px");
const vh = exports.vh = /*@__PURE__*/createUnitType("vh");
const vw = exports.vw = /*@__PURE__*/createUnitType("vw");
const progressPercentage = exports.progressPercentage = {
  ...percent,
  parse: v => percent.parse(v) / 100,
  transform: v => percent.transform(v * 100)
};
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/unit-conversion.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.positionalValues = exports.positionalKeys = exports.isNumOrPxType = void 0;
exports.removeNonTranslationalTransform = removeNonTranslationalTransform;
var _transform = require("../../html/utils/transform.mjs");
var _index = require("../../../value/types/numbers/index.mjs");
var _units = require("../../../value/types/numbers/units.mjs");
const positionalKeys = exports.positionalKeys = new Set(["width", "height", "top", "left", "right", "bottom", "x", "y", "translateX", "translateY"]);
const isNumOrPxType = v => v === _index.number || v === _units.px;
exports.isNumOrPxType = isNumOrPxType;
const getPosFromMatrix = (matrix, pos) => parseFloat(matrix.split(", ")[pos]);
const getTranslateFromMatrix = (pos2, pos3) => (_bbox, {
  transform
}) => {
  if (transform === "none" || !transform) return 0;
  const matrix3d = transform.match(/^matrix3d\((.+)\)$/u);
  if (matrix3d) {
    return getPosFromMatrix(matrix3d[1], pos3);
  } else {
    const matrix = transform.match(/^matrix\((.+)\)$/u);
    if (matrix) {
      return getPosFromMatrix(matrix[1], pos2);
    } else {
      return 0;
    }
  }
};
const transformKeys = new Set(["x", "y", "z"]);
const nonTranslationalTransformKeys = _transform.transformPropOrder.filter(key => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
  const removedTransforms = [];
  nonTranslationalTransformKeys.forEach(key => {
    const value = visualElement.getValue(key);
    if (value !== undefined) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  return removedTransforms;
}
const positionalValues = exports.positionalValues = {
  // Dimensions
  width: ({
    x
  }, {
    paddingLeft = "0",
    paddingRight = "0"
  }) => x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
  height: ({
    y
  }, {
    paddingTop = "0",
    paddingBottom = "0"
  }) => y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
  top: (_bbox, {
    top
  }) => parseFloat(top),
  left: (_bbox, {
    left
  }) => parseFloat(left),
  bottom: ({
    y
  }, {
    top
  }) => parseFloat(top) + (y.max - y.min),
  right: ({
    x
  }, {
    left
  }) => parseFloat(left) + (x.max - x.min),
  // Transform
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14)
};
// Alias translate longform names
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;
},{"../../html/utils/transform.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/transform.mjs","../../../value/types/numbers/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/numbers/index.mjs","../../../value/types/numbers/units.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/numbers/units.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/test.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testValueType = void 0;
/**
 * Tests a provided value against a ValueType
 */
const testValueType = v => type => type.test(v);
exports.testValueType = testValueType;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/type-auto.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auto = void 0;
/**
 * ValueType for "auto"
 */
const auto = exports.auto = {
  test: v => v === "auto",
  parse: v => v
};
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/dimensions.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findDimensionValueType = exports.dimensionValueTypes = void 0;
var _index = require("../../../value/types/numbers/index.mjs");
var _units = require("../../../value/types/numbers/units.mjs");
var _test = require("./test.mjs");
var _typeAuto = require("./type-auto.mjs");
/**
 * A list of value types commonly used for dimensions
 */
const dimensionValueTypes = exports.dimensionValueTypes = [_index.number, _units.px, _units.percent, _units.degrees, _units.vw, _units.vh, _typeAuto.auto];
/**
 * Tests a dimensional value against the list of dimension ValueTypes
 */
const findDimensionValueType = v => dimensionValueTypes.find((0, _test.testValueType)(v));
exports.findDimensionValueType = findDimensionValueType;
},{"../../../value/types/numbers/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/numbers/index.mjs","../../../value/types/numbers/units.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/numbers/units.mjs","./test.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/test.mjs","./type-auto.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/type-auto.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/KeyframesResolver.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyframeResolver = void 0;
exports.flushKeyframeResolvers = flushKeyframeResolvers;
var _unitConversion = require("../dom/utils/unit-conversion.mjs");
var _frame = require("../../frameloop/frame.mjs");
const toResolve = new Set();
let isScheduled = false;
let anyNeedsMeasurement = false;
function measureAllKeyframes() {
  if (anyNeedsMeasurement) {
    const resolversToMeasure = Array.from(toResolve).filter(resolver => resolver.needsMeasurement);
    const elementsToMeasure = new Set(resolversToMeasure.map(resolver => resolver.element));
    const transformsToRestore = new Map();
    /**
     * Write pass
     * If we're measuring elements we want to remove bounding box-changing transforms.
     */
    elementsToMeasure.forEach(element => {
      const removedTransforms = (0, _unitConversion.removeNonTranslationalTransform)(element);
      if (!removedTransforms.length) return;
      transformsToRestore.set(element, removedTransforms);
      element.render();
    });
    // Read
    resolversToMeasure.forEach(resolver => resolver.measureInitialState());
    // Write
    elementsToMeasure.forEach(element => {
      element.render();
      const restore = transformsToRestore.get(element);
      if (restore) {
        restore.forEach(([key, value]) => {
          var _a;
          (_a = element.getValue(key)) === null || _a === void 0 ? void 0 : _a.set(value);
        });
      }
    });
    // Read
    resolversToMeasure.forEach(resolver => resolver.measureEndState());
    // Write
    resolversToMeasure.forEach(resolver => {
      if (resolver.suspendedScrollY !== undefined) {
        window.scrollTo(0, resolver.suspendedScrollY);
      }
    });
  }
  anyNeedsMeasurement = false;
  isScheduled = false;
  toResolve.forEach(resolver => resolver.complete());
  toResolve.clear();
}
function readAllKeyframes() {
  toResolve.forEach(resolver => {
    resolver.readKeyframes();
    if (resolver.needsMeasurement) {
      anyNeedsMeasurement = true;
    }
  });
}
function flushKeyframeResolvers() {
  readAllKeyframes();
  measureAllKeyframes();
}
class KeyframeResolver {
  constructor(unresolvedKeyframes, onComplete, name, motionValue, element, isAsync = false) {
    /**
     * Track whether this resolver has completed. Once complete, it never
     * needs to attempt keyframe resolution again.
     */
    this.isComplete = false;
    /**
     * Track whether this resolver is async. If it is, it'll be added to the
     * resolver queue and flushed in the next frame. Resolvers that aren't going
     * to trigger read/write thrashing don't need to be async.
     */
    this.isAsync = false;
    /**
     * Track whether this resolver needs to perform a measurement
     * to resolve its keyframes.
     */
    this.needsMeasurement = false;
    /**
     * Track whether this resolver is currently scheduled to resolve
     * to allow it to be cancelled and resumed externally.
     */
    this.isScheduled = false;
    this.unresolvedKeyframes = [...unresolvedKeyframes];
    this.onComplete = onComplete;
    this.name = name;
    this.motionValue = motionValue;
    this.element = element;
    this.isAsync = isAsync;
  }
  scheduleResolve() {
    this.isScheduled = true;
    if (this.isAsync) {
      toResolve.add(this);
      if (!isScheduled) {
        isScheduled = true;
        _frame.frame.read(readAllKeyframes);
        _frame.frame.resolveKeyframes(measureAllKeyframes);
      }
    } else {
      this.readKeyframes();
      this.complete();
    }
  }
  readKeyframes() {
    const {
      unresolvedKeyframes,
      name,
      element,
      motionValue
    } = this;
    /**
     * If a keyframe is null, we hydrate it either by reading it from
     * the instance, or propagating from previous keyframes.
     */
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      if (unresolvedKeyframes[i] === null) {
        /**
         * If the first keyframe is null, we need to find its value by sampling the element
         */
        if (i === 0) {
          const currentValue = motionValue === null || motionValue === void 0 ? void 0 : motionValue.get();
          const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
          if (currentValue !== undefined) {
            unresolvedKeyframes[0] = currentValue;
          } else if (element && name) {
            const valueAsRead = element.readValue(name, finalKeyframe);
            if (valueAsRead !== undefined && valueAsRead !== null) {
              unresolvedKeyframes[0] = valueAsRead;
            }
          }
          if (unresolvedKeyframes[0] === undefined) {
            unresolvedKeyframes[0] = finalKeyframe;
          }
          if (motionValue && currentValue === undefined) {
            motionValue.set(unresolvedKeyframes[0]);
          }
        } else {
          unresolvedKeyframes[i] = unresolvedKeyframes[i - 1];
        }
      }
    }
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    this.isComplete = true;
    this.onComplete(this.unresolvedKeyframes, this.finalKeyframe);
    toResolve.delete(this);
  }
  cancel() {
    if (!this.isComplete) {
      this.isScheduled = false;
      toResolve.delete(this);
    }
  }
  resume() {
    if (!this.isComplete) this.scheduleResolve();
  }
}
exports.KeyframeResolver = KeyframeResolver;
},{"../dom/utils/unit-conversion.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/unit-conversion.mjs","../../frameloop/frame.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/frame.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/utils/sanitize.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitize = void 0;
// If this number is a decimal, make it just five decimal places
// to avoid exponents
const sanitize = v => Math.round(v * 100000) / 100000;
exports.sanitize = sanitize;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/utils/float-regex.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.floatRegex = void 0;
const floatRegex = exports.floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/utils/is-nullish.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNullish = isNullish;
function isNullish(v) {
  return v == null;
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/utils/single-color-regex.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singleColorRegex = void 0;
const singleColorRegex = exports.singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/utils.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitColor = exports.isColorString = void 0;
var _floatRegex = require("../utils/float-regex.mjs");
var _isNullish = require("../utils/is-nullish.mjs");
var _singleColorRegex = require("../utils/single-color-regex.mjs");
/**
 * Returns true if the provided string is a color, ie rgba(0,0,0,0) or #000,
 * but false if a number or multiple colors
 */
const isColorString = (type, testProp) => v => {
  return Boolean(typeof v === "string" && _singleColorRegex.singleColorRegex.test(v) && v.startsWith(type) || testProp && !(0, _isNullish.isNullish)(v) && Object.prototype.hasOwnProperty.call(v, testProp));
};
exports.isColorString = isColorString;
const splitColor = (aName, bName, cName) => v => {
  if (typeof v !== "string") return v;
  const [a, b, c, alpha] = v.match(_floatRegex.floatRegex);
  return {
    [aName]: parseFloat(a),
    [bName]: parseFloat(b),
    [cName]: parseFloat(c),
    alpha: alpha !== undefined ? parseFloat(alpha) : 1
  };
};
exports.splitColor = splitColor;
},{"../utils/float-regex.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/utils/float-regex.mjs","../utils/is-nullish.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/utils/is-nullish.mjs","../utils/single-color-regex.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/utils/single-color-regex.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/rgba.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rgba = exports.rgbUnit = void 0;
var _clamp = require("../../../utils/clamp.mjs");
var _index = require("../numbers/index.mjs");
var _sanitize = require("../utils/sanitize.mjs");
var _utils = require("./utils.mjs");
const clampRgbUnit = v => (0, _clamp.clamp)(0, 255, v);
const rgbUnit = exports.rgbUnit = {
  ..._index.number,
  transform: v => Math.round(clampRgbUnit(v))
};
const rgba = exports.rgba = {
  test: /*@__PURE__*/(0, _utils.isColorString)("rgb", "red"),
  parse: /*@__PURE__*/(0, _utils.splitColor)("red", "green", "blue"),
  transform: ({
    red,
    green,
    blue,
    alpha: alpha$1 = 1
  }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + (0, _sanitize.sanitize)(_index.alpha.transform(alpha$1)) + ")"
};
},{"../../../utils/clamp.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/clamp.mjs","../numbers/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/numbers/index.mjs","../utils/sanitize.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/utils/sanitize.mjs","./utils.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/utils.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/hex.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hex = void 0;
var _rgba = require("./rgba.mjs");
var _utils = require("./utils.mjs");
function parseHex(v) {
  let r = "";
  let g = "";
  let b = "";
  let a = "";
  // If we have 6 characters, ie #FF0000
  if (v.length > 5) {
    r = v.substring(1, 3);
    g = v.substring(3, 5);
    b = v.substring(5, 7);
    a = v.substring(7, 9);
    // Or we have 3 characters, ie #F00
  } else {
    r = v.substring(1, 2);
    g = v.substring(2, 3);
    b = v.substring(3, 4);
    a = v.substring(4, 5);
    r += r;
    g += g;
    b += b;
    a += a;
  }
  return {
    red: parseInt(r, 16),
    green: parseInt(g, 16),
    blue: parseInt(b, 16),
    alpha: a ? parseInt(a, 16) / 255 : 1
  };
}
const hex = exports.hex = {
  test: /*@__PURE__*/(0, _utils.isColorString)("#"),
  parse: parseHex,
  transform: _rgba.rgba.transform
};
},{"./rgba.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/rgba.mjs","./utils.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/utils.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/hsla.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hsla = void 0;
var _index = require("../numbers/index.mjs");
var _units = require("../numbers/units.mjs");
var _sanitize = require("../utils/sanitize.mjs");
var _utils = require("./utils.mjs");
const hsla = exports.hsla = {
  test: /*@__PURE__*/(0, _utils.isColorString)("hsl", "hue"),
  parse: /*@__PURE__*/(0, _utils.splitColor)("hue", "saturation", "lightness"),
  transform: ({
    hue,
    saturation,
    lightness,
    alpha: alpha$1 = 1
  }) => {
    return "hsla(" + Math.round(hue) + ", " + _units.percent.transform((0, _sanitize.sanitize)(saturation)) + ", " + _units.percent.transform((0, _sanitize.sanitize)(lightness)) + ", " + (0, _sanitize.sanitize)(_index.alpha.transform(alpha$1)) + ")";
  }
};
},{"../numbers/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/numbers/index.mjs","../numbers/units.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/numbers/units.mjs","../utils/sanitize.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/utils/sanitize.mjs","./utils.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/utils.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.color = void 0;
var _hex = require("./hex.mjs");
var _hsla = require("./hsla.mjs");
var _rgba = require("./rgba.mjs");
const color = exports.color = {
  test: v => _rgba.rgba.test(v) || _hex.hex.test(v) || _hsla.hsla.test(v),
  parse: v => {
    if (_rgba.rgba.test(v)) {
      return _rgba.rgba.parse(v);
    } else if (_hsla.hsla.test(v)) {
      return _hsla.hsla.parse(v);
    } else {
      return _hex.hex.parse(v);
    }
  },
  transform: v => {
    return typeof v === "string" ? v : v.hasOwnProperty("red") ? _rgba.rgba.transform(v) : _hsla.hsla.transform(v);
  }
};
},{"./hex.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/hex.mjs","./hsla.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/hsla.mjs","./rgba.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/rgba.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/utils/color-regex.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorRegex = void 0;
const colorRegex = exports.colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/complex/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyseComplexValue = analyseComplexValue;
exports.complex = void 0;
var _index = require("../color/index.mjs");
var _colorRegex = require("../utils/color-regex.mjs");
var _floatRegex = require("../utils/float-regex.mjs");
var _sanitize = require("../utils/sanitize.mjs");
function test(v) {
  var _a, _b;
  return isNaN(v) && typeof v === "string" && (((_a = v.match(_floatRegex.floatRegex)) === null || _a === void 0 ? void 0 : _a.length) || 0) + (((_b = v.match(_colorRegex.colorRegex)) === null || _b === void 0 ? void 0 : _b.length) || 0) > 0;
}
const NUMBER_TOKEN = "number";
const COLOR_TOKEN = "color";
const VAR_TOKEN = "var";
const VAR_FUNCTION_TOKEN = "var(";
const SPLIT_TOKEN = "${}";
// this regex consists of the `singleCssVariableRegex|rgbHSLValueRegex|digitRegex`
const complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
  const originalValue = value.toString();
  const values = [];
  const indexes = {
    color: [],
    number: [],
    var: []
  };
  const types = [];
  let i = 0;
  const tokenised = originalValue.replace(complexRegex, parsedValue => {
    if (_index.color.test(parsedValue)) {
      indexes.color.push(i);
      types.push(COLOR_TOKEN);
      values.push(_index.color.parse(parsedValue));
    } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
      indexes.var.push(i);
      types.push(VAR_TOKEN);
      values.push(parsedValue);
    } else {
      indexes.number.push(i);
      types.push(NUMBER_TOKEN);
      values.push(parseFloat(parsedValue));
    }
    ++i;
    return SPLIT_TOKEN;
  });
  const split = tokenised.split(SPLIT_TOKEN);
  return {
    values,
    split,
    indexes,
    types
  };
}
function parseComplexValue(v) {
  return analyseComplexValue(v).values;
}
function createTransformer(source) {
  const {
    split,
    types
  } = analyseComplexValue(source);
  const numSections = split.length;
  return v => {
    let output = "";
    for (let i = 0; i < numSections; i++) {
      output += split[i];
      if (v[i] !== undefined) {
        const type = types[i];
        if (type === NUMBER_TOKEN) {
          output += (0, _sanitize.sanitize)(v[i]);
        } else if (type === COLOR_TOKEN) {
          output += _index.color.transform(v[i]);
        } else {
          output += v[i];
        }
      }
    }
    return output;
  };
}
const convertNumbersToZero = v => typeof v === "number" ? 0 : v;
function getAnimatableNone(v) {
  const parsed = parseComplexValue(v);
  const transformer = createTransformer(v);
  return transformer(parsed.map(convertNumbersToZero));
}
const complex = exports.complex = {
  test,
  parse: parseComplexValue,
  createTransformer,
  getAnimatableNone
};
},{"../color/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/index.mjs","../utils/color-regex.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/utils/color-regex.mjs","../utils/float-regex.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/utils/float-regex.mjs","../utils/sanitize.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/utils/sanitize.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/complex/filter.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filter = void 0;
var _index = require("./index.mjs");
var _floatRegex = require("../utils/float-regex.mjs");
/**
 * Properties that should default to 1 or 100%
 */
const maxDefaults = new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v) {
  const [name, value] = v.slice(0, -1).split("(");
  if (name === "drop-shadow") return v;
  const [number] = value.match(_floatRegex.floatRegex) || [];
  if (!number) return v;
  const unit = value.replace(number, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number !== value) defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
const functionRegex = /\b([a-z-]*)\(.*?\)/gu;
const filter = exports.filter = {
  ..._index.complex,
  getAnimatableNone: v => {
    const functions = v.match(functionRegex);
    return functions ? functions.map(applyDefaultFilter).join(" ") : v;
  }
};
},{"./index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/complex/index.mjs","../utils/float-regex.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/utils/float-regex.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/number-browser.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browserNumberValueTypes = void 0;
var _units = require("../../../value/types/numbers/units.mjs");
const browserNumberValueTypes = exports.browserNumberValueTypes = {
  // Border props
  borderWidth: _units.px,
  borderTopWidth: _units.px,
  borderRightWidth: _units.px,
  borderBottomWidth: _units.px,
  borderLeftWidth: _units.px,
  borderRadius: _units.px,
  radius: _units.px,
  borderTopLeftRadius: _units.px,
  borderTopRightRadius: _units.px,
  borderBottomRightRadius: _units.px,
  borderBottomLeftRadius: _units.px,
  // Positioning props
  width: _units.px,
  maxWidth: _units.px,
  height: _units.px,
  maxHeight: _units.px,
  top: _units.px,
  right: _units.px,
  bottom: _units.px,
  left: _units.px,
  // Spacing props
  padding: _units.px,
  paddingTop: _units.px,
  paddingRight: _units.px,
  paddingBottom: _units.px,
  paddingLeft: _units.px,
  margin: _units.px,
  marginTop: _units.px,
  marginRight: _units.px,
  marginBottom: _units.px,
  marginLeft: _units.px,
  // Misc
  backgroundPositionX: _units.px,
  backgroundPositionY: _units.px
};
},{"../../../value/types/numbers/units.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/numbers/units.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/transform.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformValueTypes = void 0;
var _index = require("../../../value/types/numbers/index.mjs");
var _units = require("../../../value/types/numbers/units.mjs");
const transformValueTypes = exports.transformValueTypes = {
  rotate: _units.degrees,
  rotateX: _units.degrees,
  rotateY: _units.degrees,
  rotateZ: _units.degrees,
  scale: _index.scale,
  scaleX: _index.scale,
  scaleY: _index.scale,
  scaleZ: _index.scale,
  skew: _units.degrees,
  skewX: _units.degrees,
  skewY: _units.degrees,
  distance: _units.px,
  translateX: _units.px,
  translateY: _units.px,
  translateZ: _units.px,
  x: _units.px,
  y: _units.px,
  z: _units.px,
  perspective: _units.px,
  transformPerspective: _units.px,
  opacity: _index.alpha,
  originX: _units.progressPercentage,
  originY: _units.progressPercentage,
  originZ: _units.px
};
},{"../../../value/types/numbers/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/numbers/index.mjs","../../../value/types/numbers/units.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/numbers/units.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/type-int.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.int = void 0;
var _index = require("../../../value/types/numbers/index.mjs");
const int = exports.int = {
  ..._index.number,
  transform: Math.round
};
},{"../../../value/types/numbers/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/numbers/index.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/number.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numberValueTypes = void 0;
var _index = require("../../../value/types/numbers/index.mjs");
var _units = require("../../../value/types/numbers/units.mjs");
var _numberBrowser = require("./number-browser.mjs");
var _transform = require("./transform.mjs");
var _typeInt = require("./type-int.mjs");
const numberValueTypes = exports.numberValueTypes = {
  ..._numberBrowser.browserNumberValueTypes,
  ..._transform.transformValueTypes,
  zIndex: _typeInt.int,
  size: _units.px,
  // SVG
  fillOpacity: _index.alpha,
  strokeOpacity: _index.alpha,
  numOctaves: _typeInt.int
};
},{"../../../value/types/numbers/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/numbers/index.mjs","../../../value/types/numbers/units.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/numbers/units.mjs","./number-browser.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/number-browser.mjs","./transform.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/transform.mjs","./type-int.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/type-int.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/defaults.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultValueType = exports.defaultValueTypes = void 0;
var _index = require("../../../value/types/color/index.mjs");
var _filter = require("../../../value/types/complex/filter.mjs");
var _number = require("./number.mjs");
/**
 * A map of default value types for common values
 */
const defaultValueTypes = exports.defaultValueTypes = {
  ..._number.numberValueTypes,
  // Color props
  color: _index.color,
  backgroundColor: _index.color,
  outlineColor: _index.color,
  fill: _index.color,
  stroke: _index.color,
  // Border props
  borderColor: _index.color,
  borderTopColor: _index.color,
  borderRightColor: _index.color,
  borderBottomColor: _index.color,
  borderLeftColor: _index.color,
  filter: _filter.filter,
  WebkitFilter: _filter.filter
};
/**
 * Gets the default ValueType for the provided value key
 */
const getDefaultValueType = key => defaultValueTypes[key];
exports.getDefaultValueType = getDefaultValueType;
},{"../../../value/types/color/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/index.mjs","../../../value/types/complex/filter.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/complex/filter.mjs","./number.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/number.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnimatableNone = getAnimatableNone;
var _index = require("../../../value/types/complex/index.mjs");
var _filter = require("../../../value/types/complex/filter.mjs");
var _defaults = require("./defaults.mjs");
function getAnimatableNone(key, value) {
  let defaultValueType = (0, _defaults.getDefaultValueType)(key);
  if (defaultValueType !== _filter.filter) defaultValueType = _index.complex;
  // If value is not recognised as animatable, ie "none", create an animatable version origin based on the target
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : undefined;
}
},{"../../../value/types/complex/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/complex/index.mjs","../../../value/types/complex/filter.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/complex/filter.mjs","./defaults.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/defaults.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/make-none-animatable.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeNoneKeyframesAnimatable = makeNoneKeyframesAnimatable;
var _index = require("../../../value/types/complex/index.mjs");
var _animatableNone = require("../../dom/value-types/animatable-none.mjs");
/**
 * If we encounter keyframes like "none" or "0" and we also have keyframes like
 * "#fff" or "200px 200px" we want to find a keyframe to serve as a template for
 * the "none" keyframes. In this case "#fff" or "200px 200px" - then these get turned into
 * zero equivalents, i.e. "#fff0" or "0px 0px".
 */
const invalidTemplates = new Set(["auto", "none", "0"]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
  let i = 0;
  let animatableTemplate = undefined;
  while (i < unresolvedKeyframes.length && !animatableTemplate) {
    const keyframe = unresolvedKeyframes[i];
    if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && (0, _index.analyseComplexValue)(keyframe).values.length) {
      animatableTemplate = unresolvedKeyframes[i];
    }
    i++;
  }
  if (animatableTemplate && name) {
    for (const noneIndex of noneKeyframeIndexes) {
      unresolvedKeyframes[noneIndex] = (0, _animatableNone.getAnimatableNone)(name, animatableTemplate);
    }
  }
}
},{"../../../value/types/complex/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/complex/index.mjs","../../dom/value-types/animatable-none.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/DOMKeyframesResolver.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOMKeyframesResolver = void 0;
var _isNone = require("../../animation/utils/is-none.mjs");
var _cssVariablesConversion = require("./utils/css-variables-conversion.mjs");
var _isCssVariable = require("./utils/is-css-variable.mjs");
var _unitConversion = require("./utils/unit-conversion.mjs");
var _dimensions = require("./value-types/dimensions.mjs");
var _KeyframesResolver = require("../utils/KeyframesResolver.mjs");
var _makeNoneAnimatable = require("../html/utils/make-none-animatable.mjs");
class DOMKeyframesResolver extends _KeyframesResolver.KeyframeResolver {
  constructor(unresolvedKeyframes, onComplete, name, motionValue, element) {
    super(unresolvedKeyframes, onComplete, name, motionValue, element, true);
  }
  readKeyframes() {
    const {
      unresolvedKeyframes,
      element,
      name
    } = this;
    if (!element || !element.current) return;
    super.readKeyframes();
    /**
     * If any keyframe is a CSS variable, we need to find its value by sampling the element
     */
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      let keyframe = unresolvedKeyframes[i];
      if (typeof keyframe === "string") {
        keyframe = keyframe.trim();
        if ((0, _isCssVariable.isCSSVariableToken)(keyframe)) {
          const resolved = (0, _cssVariablesConversion.getVariableValue)(keyframe, element.current);
          if (resolved !== undefined) {
            unresolvedKeyframes[i] = resolved;
          }
          if (i === unresolvedKeyframes.length - 1) {
            this.finalKeyframe = keyframe;
          }
        }
      }
    }
    /**
     * Resolve "none" values. We do this potentially twice - once before and once after measuring keyframes.
     * This could be seen as inefficient but it's a trade-off to avoid measurements in more situations, which
     * have a far bigger performance impact.
     */
    this.resolveNoneKeyframes();
    /**
     * Check to see if unit type has changed. If so schedule jobs that will
     * temporarily set styles to the destination keyframes.
     * Skip if we have more than two keyframes or this isn't a positional value.
     * TODO: We can throw if there are multiple keyframes and the value type changes.
     */
    if (!_unitConversion.positionalKeys.has(name) || unresolvedKeyframes.length !== 2) {
      return;
    }
    const [origin, target] = unresolvedKeyframes;
    const originType = (0, _dimensions.findDimensionValueType)(origin);
    const targetType = (0, _dimensions.findDimensionValueType)(target);
    /**
     * Either we don't recognise these value types or we can animate between them.
     */
    if (originType === targetType) return;
    /**
     * If both values are numbers or pixels, we can animate between them by
     * converting them to numbers.
     */
    if ((0, _unitConversion.isNumOrPxType)(originType) && (0, _unitConversion.isNumOrPxType)(targetType)) {
      for (let i = 0; i < unresolvedKeyframes.length; i++) {
        const value = unresolvedKeyframes[i];
        if (typeof value === "string") {
          unresolvedKeyframes[i] = parseFloat(value);
        }
      }
    } else {
      /**
       * Else, the only way to resolve this is by measuring the element.
       */
      this.needsMeasurement = true;
    }
  }
  resolveNoneKeyframes() {
    const {
      unresolvedKeyframes,
      name
    } = this;
    const noneKeyframeIndexes = [];
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      if ((0, _isNone.isNone)(unresolvedKeyframes[i])) {
        noneKeyframeIndexes.push(i);
      }
    }
    if (noneKeyframeIndexes.length) {
      (0, _makeNoneAnimatable.makeNoneKeyframesAnimatable)(unresolvedKeyframes, noneKeyframeIndexes, name);
    }
  }
  measureInitialState() {
    const {
      element,
      unresolvedKeyframes,
      name
    } = this;
    if (!element || !element.current) return;
    if (name === "height") {
      this.suspendedScrollY = window.pageYOffset;
    }
    this.measuredOrigin = _unitConversion.positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    unresolvedKeyframes[0] = this.measuredOrigin;
    // Set final key frame to measure after next render
    const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
    if (measureKeyframe !== undefined) {
      element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
    }
  }
  measureEndState() {
    var _a;
    const {
      element,
      name,
      unresolvedKeyframes
    } = this;
    if (!element || !element.current) return;
    const value = element.getValue(name);
    value && value.jump(this.measuredOrigin, false);
    const finalKeyframeIndex = unresolvedKeyframes.length - 1;
    const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
    unresolvedKeyframes[finalKeyframeIndex] = _unitConversion.positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    if (finalKeyframe !== null && this.finalKeyframe === undefined) {
      this.finalKeyframe = finalKeyframe;
    }
    // If we removed transform values, reapply them before the next render
    if ((_a = this.removedTransforms) === null || _a === void 0 ? void 0 : _a.length) {
      this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
        element.getValue(unsetTransformName).set(unsetTransformValue);
      });
    }
    this.resolveNoneKeyframes();
  }
}
exports.DOMKeyframesResolver = DOMKeyframesResolver;
},{"../../animation/utils/is-none.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/is-none.mjs","./utils/css-variables-conversion.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/css-variables-conversion.mjs","./utils/is-css-variable.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs","./utils/unit-conversion.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/unit-conversion.mjs","./value-types/dimensions.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/dimensions.mjs","../utils/KeyframesResolver.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/KeyframesResolver.mjs","../html/utils/make-none-animatable.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/make-none-animatable.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/is-animatable.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAnimatable = void 0;
var _index = require("../../value/types/complex/index.mjs");
/**
 * Check if a value is animatable. Examples:
 *
 * ✅: 100, "100px", "#fff"
 * ❌: "block", "url(2.jpg)"
 * @param value
 *
 * @internal
 */
const isAnimatable = (value, name) => {
  // If the list of keys tat might be non-animatable grows, replace with Set
  if (name === "zIndex") return false;
  // If it's a number or a keyframes array, we can animate it. We might at some point
  // need to do a deep isAnimatable check of keyframes, or let Popmotion handle this,
  // but for now lets leave it like this for performance reasons
  if (typeof value === "number" || Array.isArray(value)) return true;
  if (typeof value === "string" && (
  // It's animatable if we have a string
  _index.complex.test(value) || value === "0") &&
  // And it contains numbers and/or colors
  !value.startsWith("url(") // Unless it starts with "url("
  ) {
    return true;
  }
  return false;
};
exports.isAnimatable = isAnimatable;
},{"../../value/types/complex/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/complex/index.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/utils/can-animate.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canAnimate = canAnimate;
var _errors = require("../../../utils/errors.mjs");
var _isGenerator = require("../../generators/utils/is-generator.mjs");
var _isAnimatable = require("../../utils/is-animatable.mjs");
function hasKeyframesChanged(keyframes) {
  const current = keyframes[0];
  if (keyframes.length === 1) return true;
  for (let i = 0; i < keyframes.length; i++) {
    if (keyframes[i] !== current) return true;
  }
}
function canAnimate(keyframes, name, type, velocity) {
  /**
   * Check if we're able to animate between the start and end keyframes,
   * and throw a warning if we're attempting to animate between one that's
   * animatable and another that isn't.
   */
  const originKeyframe = keyframes[0];
  if (originKeyframe === null) return false;
  /**
   * These aren't traditionally animatable but we do support them.
   * In future we could look into making this more generic or replacing
   * this function with mix() === mixImmediate
   */
  if (name === "display" || name === "visibility") return true;
  const targetKeyframe = keyframes[keyframes.length - 1];
  const isOriginAnimatable = (0, _isAnimatable.isAnimatable)(originKeyframe, name);
  const isTargetAnimatable = (0, _isAnimatable.isAnimatable)(targetKeyframe, name);
  (0, _errors.warning)(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". ${originKeyframe} is not an animatable value - to enable this animation set ${originKeyframe} to a value animatable to ${targetKeyframe} via the \`style\` property.`);
  // Always skip if any of these are true
  if (!isOriginAnimatable || !isTargetAnimatable) {
    return false;
  }
  return hasKeyframesChanged(keyframes) || (type === "spring" || (0, _isGenerator.isGenerator)(type)) && velocity;
}
},{"../../../utils/errors.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/errors.mjs","../../generators/utils/is-generator.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/utils/is-generator.mjs","../../utils/is-animatable.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/is-animatable.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/BaseAnimation.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseAnimation = void 0;
var _syncTime = require("../../frameloop/sync-time.mjs");
var _KeyframesResolver = require("../../render/utils/KeyframesResolver.mjs");
var _useInstantTransitionState = require("../../utils/use-instant-transition-state.mjs");
var _canAnimate = require("./utils/can-animate.mjs");
var _getFinalKeyframe = require("./waapi/utils/get-final-keyframe.mjs");
/**
 * Maximum time allowed between an animation being created and it being
 * resolved for us to use the latter as the start time.
 *
 * This is to ensure that while we prefer to "start" an animation as soon
 * as it's triggered, we also want to avoid a visual jump if there's a big delay
 * between these two moments.
 */
const MAX_RESOLVE_DELAY = 40;
class BaseAnimation {
  constructor({
    autoplay = true,
    delay = 0,
    type = "keyframes",
    repeat = 0,
    repeatDelay = 0,
    repeatType = "loop",
    ...options
  }) {
    // Track whether the animation has been stopped. Stopped animations won't restart.
    this.isStopped = false;
    this.hasAttemptedResolve = false;
    this.createdAt = _syncTime.time.now();
    this.options = {
      autoplay,
      delay,
      type,
      repeat,
      repeatDelay,
      repeatType,
      ...options
    };
    this.updateFinishedPromise();
  }
  /**
   * This method uses the createdAt and resolvedAt to calculate the
   * animation startTime. *Ideally*, we would use the createdAt time as t=0
   * as the following frame would then be the first frame of the animation in
   * progress, which would feel snappier.
   *
   * However, if there's a delay (main thread work) between the creation of
   * the animation and the first commited frame, we prefer to use resolvedAt
   * to avoid a sudden jump into the animation.
   */
  calcStartTime() {
    if (!this.resolvedAt) return this.createdAt;
    return this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt;
  }
  /**
   * A getter for resolved data. If keyframes are not yet resolved, accessing
   * this.resolved will synchronously flush all pending keyframe resolvers.
   * This is a deoptimisation, but at its worst still batches read/writes.
   */
  get resolved() {
    if (!this._resolved && !this.hasAttemptedResolve) {
      (0, _KeyframesResolver.flushKeyframeResolvers)();
    }
    return this._resolved;
  }
  /**
   * A method to be called when the keyframes resolver completes. This method
   * will check if its possible to run the animation and, if not, skip it.
   * Otherwise, it will call initPlayback on the implementing class.
   */
  onKeyframesResolved(keyframes, finalKeyframe) {
    this.resolvedAt = _syncTime.time.now();
    this.hasAttemptedResolve = true;
    const {
      name,
      type,
      velocity,
      delay,
      onComplete,
      onUpdate,
      isGenerator
    } = this.options;
    /**
     * If we can't animate this value with the resolved keyframes
     * then we should complete it immediately.
     */
    if (!isGenerator && !(0, _canAnimate.canAnimate)(keyframes, name, type, velocity)) {
      // Finish immediately
      if (_useInstantTransitionState.instantAnimationState.current || !delay) {
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate((0, _getFinalKeyframe.getFinalKeyframe)(keyframes, this.options, finalKeyframe));
        onComplete === null || onComplete === void 0 ? void 0 : onComplete();
        this.resolveFinishedPromise();
        return;
      }
      // Finish after a delay
      else {
        this.options.duration = 0;
      }
    }
    const resolvedAnimation = this.initPlayback(keyframes, finalKeyframe);
    if (resolvedAnimation === false) return;
    this._resolved = {
      keyframes,
      finalKeyframe,
      ...resolvedAnimation
    };
    this.onPostResolved();
  }
  onPostResolved() {}
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(resolve, reject) {
    return this.currentFinishedPromise.then(resolve, reject);
  }
  flatten() {
    this.options.type = "keyframes";
    this.options.ease = "linear";
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise(resolve => {
      this.resolveFinishedPromise = resolve;
    });
  }
}
exports.BaseAnimation = BaseAnimation;
},{"../../frameloop/sync-time.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/sync-time.mjs","../../render/utils/KeyframesResolver.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/KeyframesResolver.mjs","../../utils/use-instant-transition-state.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/use-instant-transition-state.mjs","./utils/can-animate.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/utils/can-animate.mjs","./waapi/utils/get-final-keyframe.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/inertia.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inertia = inertia;
var _index = require("./spring/index.mjs");
var _velocity = require("./utils/velocity.mjs");
function inertia({
  keyframes,
  velocity = 0.0,
  power = 0.8,
  timeConstant = 325,
  bounceDamping = 10,
  bounceStiffness = 500,
  modifyTarget,
  min,
  max,
  restDelta = 0.5,
  restSpeed
}) {
  const origin = keyframes[0];
  const state = {
    done: false,
    value: origin
  };
  const isOutOfBounds = v => min !== undefined && v < min || max !== undefined && v > max;
  const nearestBoundary = v => {
    if (min === undefined) return max;
    if (max === undefined) return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  };
  let amplitude = power * velocity;
  const ideal = origin + amplitude;
  const target = modifyTarget === undefined ? ideal : modifyTarget(ideal);
  /**
   * If the target has changed we need to re-calculate the amplitude, otherwise
   * the animation will start from the wrong position.
   */
  if (target !== ideal) amplitude = target - origin;
  const calcDelta = t => -amplitude * Math.exp(-t / timeConstant);
  const calcLatest = t => target + calcDelta(t);
  const applyFriction = t => {
    const delta = calcDelta(t);
    const latest = calcLatest(t);
    state.done = Math.abs(delta) <= restDelta;
    state.value = state.done ? target : latest;
  };
  /**
   * Ideally this would resolve for t in a stateless way, we could
   * do that by always precalculating the animation but as we know
   * this will be done anyway we can assume that spring will
   * be discovered during that.
   */
  let timeReachedBoundary;
  let spring$1;
  const checkCatchBoundary = t => {
    if (!isOutOfBounds(state.value)) return;
    timeReachedBoundary = t;
    spring$1 = (0, _index.spring)({
      keyframes: [state.value, nearestBoundary(state.value)],
      velocity: (0, _velocity.calcGeneratorVelocity)(calcLatest, t, state.value),
      // TODO: This should be passing * 1000
      damping: bounceDamping,
      stiffness: bounceStiffness,
      restDelta,
      restSpeed
    });
  };
  checkCatchBoundary(0);
  return {
    calculatedDuration: null,
    next: t => {
      /**
       * We need to resolve the friction to figure out if we need a
       * spring but we don't want to do this twice per frame. So here
       * we flag if we updated for this frame and later if we did
       * we can skip doing it again.
       */
      let hasUpdatedFrame = false;
      if (!spring$1 && timeReachedBoundary === undefined) {
        hasUpdatedFrame = true;
        applyFriction(t);
        checkCatchBoundary(t);
      }
      /**
       * If we have a spring and the provided t is beyond the moment the friction
       * animation crossed the min/max boundary, use the spring.
       */
      if (timeReachedBoundary !== undefined && t >= timeReachedBoundary) {
        return spring$1.next(t - timeReachedBoundary);
      } else {
        !hasUpdatedFrame && applyFriction(t);
        return state;
      }
    }
  };
}
},{"./spring/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/spring/index.mjs","./utils/velocity.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/utils/velocity.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/ease.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.easeOut = exports.easeInOut = exports.easeIn = void 0;
var _cubicBezier = require("./cubic-bezier.mjs");
const easeIn = exports.easeIn = /*@__PURE__*/(0, _cubicBezier.cubicBezier)(0.42, 0, 1, 1);
const easeOut = exports.easeOut = /*@__PURE__*/(0, _cubicBezier.cubicBezier)(0, 0, 0.58, 1);
const easeInOut = exports.easeInOut = /*@__PURE__*/(0, _cubicBezier.cubicBezier)(0.42, 0, 0.58, 1);
},{"./cubic-bezier.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/cubic-bezier.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/utils/is-bezier-definition.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBezierDefinition = void 0;
const isBezierDefinition = easing => Array.isArray(easing) && typeof easing[0] === "number";
exports.isBezierDefinition = isBezierDefinition;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/utils/map.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.easingDefinitionToFunction = void 0;
var _errors = require("../../utils/errors.mjs");
var _cubicBezier = require("../cubic-bezier.mjs");
var _noop = require("../../utils/noop.mjs");
var _ease = require("../ease.mjs");
var _circ = require("../circ.mjs");
var _back = require("../back.mjs");
var _anticipate = require("../anticipate.mjs");
var _isBezierDefinition = require("./is-bezier-definition.mjs");
const easingLookup = {
  linear: _noop.noop,
  easeIn: _ease.easeIn,
  easeInOut: _ease.easeInOut,
  easeOut: _ease.easeOut,
  circIn: _circ.circIn,
  circInOut: _circ.circInOut,
  circOut: _circ.circOut,
  backIn: _back.backIn,
  backInOut: _back.backInOut,
  backOut: _back.backOut,
  anticipate: _anticipate.anticipate
};
const easingDefinitionToFunction = definition => {
  if ((0, _isBezierDefinition.isBezierDefinition)(definition)) {
    // If cubic bezier definition, create bezier curve
    (0, _errors.invariant)(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`);
    const [x1, y1, x2, y2] = definition;
    return (0, _cubicBezier.cubicBezier)(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    // Else lookup from table
    (0, _errors.invariant)(easingLookup[definition] !== undefined, `Invalid easing type '${definition}'`);
    return easingLookup[definition];
  }
  return definition;
};
exports.easingDefinitionToFunction = easingDefinitionToFunction;
},{"../../utils/errors.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/errors.mjs","../cubic-bezier.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/cubic-bezier.mjs","../../utils/noop.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/noop.mjs","../ease.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/ease.mjs","../circ.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/circ.mjs","../back.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/back.mjs","../anticipate.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/anticipate.mjs","./is-bezier-definition.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/utils/is-bezier-definition.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/pipe.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pipe = void 0;
/**
 * Pipe
 * Compose other transformers to run linearily
 * pipe(min(20), max(40))
 * @param  {...functions} transformers
 * @return {function}
 */
const combineFunctions = (a, b) => v => b(a(v));
const pipe = (...transformers) => transformers.reduce(combineFunctions);
exports.pipe = pipe;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/hsla-to-rgba.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hslaToRgba = hslaToRgba;
// Adapted from https://gist.github.com/mjackson/5311256
function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
function hslaToRgba({
  hue,
  saturation,
  lightness,
  alpha
}) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;
    red = hueToRgb(p, q, hue + 1 / 3);
    green = hueToRgb(p, q, hue);
    blue = hueToRgb(p, q, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha
  };
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/immediate.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixImmediate = mixImmediate;
function mixImmediate(a, b) {
  return p => p > 0 ? b : a;
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/color.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixLinearColor = exports.mixColor = void 0;
var _number = require("./number.mjs");
var _errors = require("../errors.mjs");
var _hslaToRgba = require("../hsla-to-rgba.mjs");
var _hex = require("../../value/types/color/hex.mjs");
var _rgba = require("../../value/types/color/rgba.mjs");
var _hsla = require("../../value/types/color/hsla.mjs");
var _immediate = require("./immediate.mjs");
// Linear color space blending
// Explained https://www.youtube.com/watch?v=LKnqECcg6Gw
// Demonstrated http://codepen.io/osublake/pen/xGVVaN
const mixLinearColor = (from, to, v) => {
  const fromExpo = from * from;
  const expo = v * (to * to - fromExpo) + fromExpo;
  return expo < 0 ? 0 : Math.sqrt(expo);
};
exports.mixLinearColor = mixLinearColor;
const colorTypes = [_hex.hex, _rgba.rgba, _hsla.hsla];
const getColorType = v => colorTypes.find(type => type.test(v));
function asRGBA(color) {
  const type = getColorType(color);
  (0, _errors.warning)(Boolean(type), `'${color}' is not an animatable color. Use the equivalent color code instead.`);
  if (!Boolean(type)) return false;
  let model = type.parse(color);
  if (type === _hsla.hsla) {
    // TODO Remove this cast - needed since Motion's stricter typing
    model = (0, _hslaToRgba.hslaToRgba)(model);
  }
  return model;
}
const mixColor = (from, to) => {
  const fromRGBA = asRGBA(from);
  const toRGBA = asRGBA(to);
  if (!fromRGBA || !toRGBA) {
    return (0, _immediate.mixImmediate)(from, to);
  }
  const blended = {
    ...fromRGBA
  };
  return v => {
    blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
    blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
    blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
    blended.alpha = (0, _number.mixNumber)(fromRGBA.alpha, toRGBA.alpha, v);
    return _rgba.rgba.transform(blended);
  };
};
exports.mixColor = mixColor;
},{"./number.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/number.mjs","../errors.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/errors.mjs","../hsla-to-rgba.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/hsla-to-rgba.mjs","../../value/types/color/hex.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/hex.mjs","../../value/types/color/rgba.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/rgba.mjs","../../value/types/color/hsla.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/hsla.mjs","./immediate.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/immediate.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/visibility.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invisibleValues = void 0;
exports.mixVisibility = mixVisibility;
const invisibleValues = exports.invisibleValues = new Set(["none", "hidden"]);
/**
 * Returns a function that, when provided a progress value between 0 and 1,
 * will return the "none" or "hidden" string only when the progress is that of
 * the origin or target.
 */
function mixVisibility(origin, target) {
  if (invisibleValues.has(origin)) {
    return p => p <= 0 ? origin : target;
  } else {
    return p => p >= 1 ? target : origin;
  }
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/complex.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMixer = getMixer;
exports.mixArray = mixArray;
exports.mixComplex = void 0;
exports.mixObject = mixObject;
var _number = require("./number.mjs");
var _color = require("./color.mjs");
var _pipe = require("../pipe.mjs");
var _errors = require("../errors.mjs");
var _index = require("../../value/types/color/index.mjs");
var _index2 = require("../../value/types/complex/index.mjs");
var _isCssVariable = require("../../render/dom/utils/is-css-variable.mjs");
var _visibility = require("./visibility.mjs");
var _immediate = require("./immediate.mjs");
function mixNumber(a, b) {
  return p => (0, _number.mixNumber)(a, b, p);
}
function getMixer(a) {
  if (typeof a === "number") {
    return mixNumber;
  } else if (typeof a === "string") {
    return (0, _isCssVariable.isCSSVariableToken)(a) ? _immediate.mixImmediate : _index.color.test(a) ? _color.mixColor : mixComplex;
  } else if (Array.isArray(a)) {
    return mixArray;
  } else if (typeof a === "object") {
    return _index.color.test(a) ? _color.mixColor : mixObject;
  }
  return _immediate.mixImmediate;
}
function mixArray(a, b) {
  const output = [...a];
  const numValues = output.length;
  const blendValue = a.map((v, i) => getMixer(v)(v, b[i]));
  return p => {
    for (let i = 0; i < numValues; i++) {
      output[i] = blendValue[i](p);
    }
    return output;
  };
}
function mixObject(a, b) {
  const output = {
    ...a,
    ...b
  };
  const blendValue = {};
  for (const key in output) {
    if (a[key] !== undefined && b[key] !== undefined) {
      blendValue[key] = getMixer(a[key])(a[key], b[key]);
    }
  }
  return v => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v);
    }
    return output;
  };
}
function matchOrder(origin, target) {
  var _a;
  const orderedOrigin = [];
  const pointers = {
    color: 0,
    var: 0,
    number: 0
  };
  for (let i = 0; i < target.values.length; i++) {
    const type = target.types[i];
    const originIndex = origin.indexes[type][pointers[type]];
    const originValue = (_a = origin.values[originIndex]) !== null && _a !== void 0 ? _a : 0;
    orderedOrigin[i] = originValue;
    pointers[type]++;
  }
  return orderedOrigin;
}
const mixComplex = (origin, target) => {
  const template = _index2.complex.createTransformer(target);
  const originStats = (0, _index2.analyseComplexValue)(origin);
  const targetStats = (0, _index2.analyseComplexValue)(target);
  const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
  if (canInterpolate) {
    if (_visibility.invisibleValues.has(origin) && !targetStats.values.length || _visibility.invisibleValues.has(target) && !originStats.values.length) {
      return (0, _visibility.mixVisibility)(origin, target);
    }
    return (0, _pipe.pipe)(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
  } else {
    (0, _errors.warning)(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
    return (0, _immediate.mixImmediate)(origin, target);
  }
};
exports.mixComplex = mixComplex;
},{"./number.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/number.mjs","./color.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/color.mjs","../pipe.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/pipe.mjs","../errors.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/errors.mjs","../../value/types/color/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/index.mjs","../../value/types/complex/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/complex/index.mjs","../../render/dom/utils/is-css-variable.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs","./visibility.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/visibility.mjs","./immediate.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/immediate.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mix = mix;
var _complex = require("./complex.mjs");
var _number = require("./number.mjs");
function mix(from, to, p) {
  if (typeof from === "number" && typeof to === "number" && typeof p === "number") {
    return (0, _number.mixNumber)(from, to, p);
  }
  const mixer = (0, _complex.getMixer)(from);
  return mixer(from, to);
}
},{"./complex.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/complex.mjs","./number.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/number.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/interpolate.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpolate = interpolate;
var _errors = require("./errors.mjs");
var _clamp = require("./clamp.mjs");
var _pipe = require("./pipe.mjs");
var _progress = require("./progress.mjs");
var _noop = require("./noop.mjs");
var _index = require("./mix/index.mjs");
function createMixers(output, ease, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || _index.mix;
  const numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease) {
      const easingFunction = Array.isArray(ease) ? ease[i] || _noop.noop : ease;
      mixer = (0, _pipe.pipe)(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
/**
 * Create a function that maps from a numerical input array to a generic output array.
 *
 * Accepts:
 *   - Numbers
 *   - Colors (hex, hsl, hsla, rgb, rgba)
 *   - Complex (combinations of one or more numbers or strings)
 *
 * ```jsx
 * const mixColor = interpolate([0, 1], ['#fff', '#000'])
 *
 * mixColor(0.5) // 'rgba(128, 128, 128, 1)'
 * ```
 *
 * TODO Revist this approach once we've moved to data models for values,
 * probably not needed to pregenerate mixer functions.
 *
 * @public
 */
function interpolate(input, output, {
  clamp: isClamp = true,
  ease,
  mixer
} = {}) {
  const inputLength = input.length;
  (0, _errors.invariant)(inputLength === output.length, "Both input and output ranges must be the same length");
  /**
   * If we're only provided a single input, we can just make a function
   * that returns the output.
   */
  if (inputLength === 1) return () => output[0];
  if (inputLength === 2 && input[0] === input[1]) return () => output[1];
  // If input runs highest -> lowest, reverse both arrays
  if (input[0] > input[inputLength - 1]) {
    input = [...input].reverse();
    output = [...output].reverse();
  }
  const mixers = createMixers(output, ease, mixer);
  const numMixers = mixers.length;
  const interpolator = v => {
    let i = 0;
    if (numMixers > 1) {
      for (; i < input.length - 2; i++) {
        if (v < input[i + 1]) break;
      }
    }
    const progressInRange = (0, _progress.progress)(input[i], input[i + 1], v);
    return mixers[i](progressInRange);
  };
  return isClamp ? v => interpolator((0, _clamp.clamp)(input[0], input[inputLength - 1], v)) : interpolator;
}
},{"./errors.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/errors.mjs","./clamp.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/clamp.mjs","./pipe.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/pipe.mjs","./progress.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/progress.mjs","./noop.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/noop.mjs","./mix/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/index.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/offsets/time.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertOffsetToTimes = convertOffsetToTimes;
function convertOffsetToTimes(offset, duration) {
  return offset.map(o => o * duration);
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/keyframes.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultEasing = defaultEasing;
exports.keyframes = keyframes;
var _ease = require("../../easing/ease.mjs");
var _isEasingArray = require("../../easing/utils/is-easing-array.mjs");
var _map = require("../../easing/utils/map.mjs");
var _interpolate = require("../../utils/interpolate.mjs");
var _default = require("../../utils/offsets/default.mjs");
var _time = require("../../utils/offsets/time.mjs");
function defaultEasing(values, easing) {
  return values.map(() => easing || _ease.easeInOut).splice(0, values.length - 1);
}
function keyframes({
  duration = 300,
  keyframes: keyframeValues,
  times,
  ease = "easeInOut"
}) {
  /**
   * Easing functions can be externally defined as strings. Here we convert them
   * into actual functions.
   */
  const easingFunctions = (0, _isEasingArray.isEasingArray)(ease) ? ease.map(_map.easingDefinitionToFunction) : (0, _map.easingDefinitionToFunction)(ease);
  /**
   * This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
   * to reduce GC during animation.
   */
  const state = {
    done: false,
    value: keyframeValues[0]
  };
  /**
   * Create a times array based on the provided 0-1 offsets
   */
  const absoluteTimes = (0, _time.convertOffsetToTimes)(
  // Only use the provided offsets if they're the correct length
  // TODO Maybe we should warn here if there's a length mismatch
  times && times.length === keyframeValues.length ? times : (0, _default.defaultOffset)(keyframeValues), duration);
  const mapTimeToKeyframe = (0, _interpolate.interpolate)(absoluteTimes, keyframeValues, {
    ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
  });
  return {
    calculatedDuration: duration,
    next: t => {
      state.value = mapTimeToKeyframe(t);
      state.done = t >= duration;
      return state;
    }
  };
}
},{"../../easing/ease.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/ease.mjs","../../easing/utils/is-easing-array.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/utils/is-easing-array.mjs","../../easing/utils/map.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/utils/map.mjs","../../utils/interpolate.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/interpolate.mjs","../../utils/offsets/default.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/offsets/default.mjs","../../utils/offsets/time.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/offsets/time.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/drivers/driver-frameloop.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frameloopDriver = void 0;
var _syncTime = require("../../../frameloop/sync-time.mjs");
var _frame = require("../../../frameloop/frame.mjs");
const frameloopDriver = update => {
  const passTimestamp = ({
    timestamp
  }) => update(timestamp);
  return {
    start: () => _frame.frame.update(passTimestamp, true),
    stop: () => (0, _frame.cancelFrame)(passTimestamp),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => _frame.frameData.isProcessing ? _frame.frameData.timestamp : _syncTime.time.now()
  };
};
exports.frameloopDriver = frameloopDriver;
},{"../../../frameloop/sync-time.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/sync-time.mjs","../../../frameloop/frame.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/frame.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/MainThreadAnimation.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainThreadAnimation = void 0;
exports.animateValue = animateValue;
var _KeyframesResolver = require("../../render/utils/KeyframesResolver.mjs");
var _index = require("../generators/spring/index.mjs");
var _inertia = require("../generators/inertia.mjs");
var _keyframes = require("../generators/keyframes.mjs");
var _BaseAnimation = require("./BaseAnimation.mjs");
var _pipe = require("../../utils/pipe.mjs");
var _index2 = require("../../utils/mix/index.mjs");
var _calcDuration = require("../generators/utils/calc-duration.mjs");
var _timeConversion = require("../../utils/time-conversion.mjs");
var _clamp = require("../../utils/clamp.mjs");
var _errors = require("../../utils/errors.mjs");
var _driverFrameloop = require("./drivers/driver-frameloop.mjs");
var _getFinalKeyframe = require("./waapi/utils/get-final-keyframe.mjs");
var _isGenerator = require("../generators/utils/is-generator.mjs");
const generators = {
  decay: _inertia.inertia,
  inertia: _inertia.inertia,
  tween: _keyframes.keyframes,
  keyframes: _keyframes.keyframes,
  spring: _index.spring
};
const percentToProgress = percent => percent / 100;
/**
 * Animation that runs on the main thread. Designed to be WAAPI-spec in the subset of
 * features we expose publically. Mostly the compatibility is to ensure visual identity
 * between both WAAPI and main thread animations.
 */
class MainThreadAnimation extends _BaseAnimation.BaseAnimation {
  constructor(options) {
    super(options);
    /**
     * The time at which the animation was paused.
     */
    this.holdTime = null;
    /**
     * The time at which the animation was cancelled.
     */
    this.cancelTime = null;
    /**
     * The current time of the animation.
     */
    this.currentTime = 0;
    /**
     * Playback speed as a factor. 0 would be stopped, -1 reverse and 2 double speed.
     */
    this.playbackSpeed = 1;
    /**
     * The state of the animation to apply when the animation is resolved. This
     * allows calls to the public API to control the animation before it is resolved,
     * without us having to resolve it first.
     */
    this.pendingPlayState = "running";
    /**
     * The time at which the animation was started.
     */
    this.startTime = null;
    this.state = "idle";
    /**
     * This method is bound to the instance to fix a pattern where
     * animation.stop is returned as a reference from a useEffect.
     */
    this.stop = () => {
      this.resolver.cancel();
      this.isStopped = true;
      if (this.state === "idle") return;
      this.teardown();
      const {
        onStop
      } = this.options;
      onStop && onStop();
    };
    const {
      name,
      motionValue,
      element,
      keyframes
    } = this.options;
    const KeyframeResolver$1 = (element === null || element === void 0 ? void 0 : element.KeyframeResolver) || _KeyframesResolver.KeyframeResolver;
    const onResolved = (resolvedKeyframes, finalKeyframe) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe);
    this.resolver = new KeyframeResolver$1(keyframes, onResolved, name, motionValue, element);
    this.resolver.scheduleResolve();
  }
  flatten() {
    super.flatten();
    // If we've already resolved the animation, re-initialise it
    if (this._resolved) {
      Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes));
    }
  }
  initPlayback(keyframes$1) {
    const {
      type = "keyframes",
      repeat = 0,
      repeatDelay = 0,
      repeatType,
      velocity = 0
    } = this.options;
    const generatorFactory = (0, _isGenerator.isGenerator)(type) ? type : generators[type] || _keyframes.keyframes;
    /**
     * If our generator doesn't support mixing numbers, we need to replace keyframes with
     * [0, 100] and then make a function that maps that to the actual keyframes.
     *
     * 100 is chosen instead of 1 as it works nicer with spring animations.
     */
    let mapPercentToKeyframes;
    let mirroredGenerator;
    if (generatorFactory !== _keyframes.keyframes && typeof keyframes$1[0] !== "number") {
      if ("development" !== "production") {
        (0, _errors.invariant)(keyframes$1.length === 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${keyframes$1}`);
      }
      mapPercentToKeyframes = (0, _pipe.pipe)(percentToProgress, (0, _index2.mix)(keyframes$1[0], keyframes$1[1]));
      keyframes$1 = [0, 100];
    }
    const generator = generatorFactory({
      ...this.options,
      keyframes: keyframes$1
    });
    /**
     * If we have a mirror repeat type we need to create a second generator that outputs the
     * mirrored (not reversed) animation and later ping pong between the two generators.
     */
    if (repeatType === "mirror") {
      mirroredGenerator = generatorFactory({
        ...this.options,
        keyframes: [...keyframes$1].reverse(),
        velocity: -velocity
      });
    }
    /**
     * If duration is undefined and we have repeat options,
     * we need to calculate a duration from the generator.
     *
     * We set it to the generator itself to cache the duration.
     * Any timeline resolver will need to have already precalculated
     * the duration by this step.
     */
    if (generator.calculatedDuration === null) {
      generator.calculatedDuration = (0, _calcDuration.calcGeneratorDuration)(generator);
    }
    const {
      calculatedDuration
    } = generator;
    const resolvedDuration = calculatedDuration + repeatDelay;
    const totalDuration = resolvedDuration * (repeat + 1) - repeatDelay;
    return {
      generator,
      mirroredGenerator,
      mapPercentToKeyframes,
      calculatedDuration,
      resolvedDuration,
      totalDuration
    };
  }
  onPostResolved() {
    const {
      autoplay = true
    } = this.options;
    this.play();
    if (this.pendingPlayState === "paused" || !autoplay) {
      this.pause();
    } else {
      this.state = this.pendingPlayState;
    }
  }
  tick(timestamp, sample = false) {
    const {
      resolved
    } = this;
    // If the animations has failed to resolve, return the final keyframe.
    if (!resolved) {
      const {
        keyframes
      } = this.options;
      return {
        done: true,
        value: keyframes[keyframes.length - 1]
      };
    }
    const {
      finalKeyframe,
      generator,
      mirroredGenerator,
      mapPercentToKeyframes,
      keyframes,
      calculatedDuration,
      totalDuration,
      resolvedDuration
    } = resolved;
    if (this.startTime === null) return generator.next(0);
    const {
      delay,
      repeat,
      repeatType,
      repeatDelay,
      onUpdate
    } = this.options;
    /**
     * requestAnimationFrame timestamps can come through as lower than
     * the startTime as set by performance.now(). Here we prevent this,
     * though in the future it could be possible to make setting startTime
     * a pending operation that gets resolved here.
     */
    if (this.speed > 0) {
      this.startTime = Math.min(this.startTime, timestamp);
    } else if (this.speed < 0) {
      this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
    }
    // Update currentTime
    if (sample) {
      this.currentTime = timestamp;
    } else if (this.holdTime !== null) {
      this.currentTime = this.holdTime;
    } else {
      // Rounding the time because floating point arithmetic is not always accurate, e.g. 3000.367 - 1000.367 =
      // 2000.0000000000002. This is a problem when we are comparing the currentTime with the duration, for
      // example.
      this.currentTime = Math.round(timestamp - this.startTime) * this.speed;
    }
    // Rebase on delay
    const timeWithoutDelay = this.currentTime - delay * (this.speed >= 0 ? 1 : -1);
    const isInDelayPhase = this.speed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
    this.currentTime = Math.max(timeWithoutDelay, 0);
    // If this animation has finished, set the current time  to the total duration.
    if (this.state === "finished" && this.holdTime === null) {
      this.currentTime = totalDuration;
    }
    let elapsed = this.currentTime;
    let frameGenerator = generator;
    if (repeat) {
      /**
       * Get the current progress (0-1) of the animation. If t is >
       * than duration we'll get values like 2.5 (midway through the
       * third iteration)
       */
      const progress = Math.min(this.currentTime, totalDuration) / resolvedDuration;
      /**
       * Get the current iteration (0 indexed). For instance the floor of
       * 2.5 is 2.
       */
      let currentIteration = Math.floor(progress);
      /**
       * Get the current progress of the iteration by taking the remainder
       * so 2.5 is 0.5 through iteration 2
       */
      let iterationProgress = progress % 1.0;
      /**
       * If iteration progress is 1 we count that as the end
       * of the previous iteration.
       */
      if (!iterationProgress && progress >= 1) {
        iterationProgress = 1;
      }
      iterationProgress === 1 && currentIteration--;
      currentIteration = Math.min(currentIteration, repeat + 1);
      /**
       * Reverse progress if we're not running in "normal" direction
       */
      const isOddIteration = Boolean(currentIteration % 2);
      if (isOddIteration) {
        if (repeatType === "reverse") {
          iterationProgress = 1 - iterationProgress;
          if (repeatDelay) {
            iterationProgress -= repeatDelay / resolvedDuration;
          }
        } else if (repeatType === "mirror") {
          frameGenerator = mirroredGenerator;
        }
      }
      elapsed = (0, _clamp.clamp)(0, 1, iterationProgress) * resolvedDuration;
    }
    /**
     * If we're in negative time, set state as the initial keyframe.
     * This prevents delay: x, duration: 0 animations from finishing
     * instantly.
     */
    const state = isInDelayPhase ? {
      done: false,
      value: keyframes[0]
    } : frameGenerator.next(elapsed);
    if (mapPercentToKeyframes) {
      state.value = mapPercentToKeyframes(state.value);
    }
    let {
      done
    } = state;
    if (!isInDelayPhase && calculatedDuration !== null) {
      done = this.speed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
    }
    const isAnimationFinished = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
    if (isAnimationFinished && finalKeyframe !== undefined) {
      state.value = (0, _getFinalKeyframe.getFinalKeyframe)(keyframes, this.options, finalKeyframe);
    }
    if (onUpdate) {
      onUpdate(state.value);
    }
    if (isAnimationFinished) {
      this.finish();
    }
    return state;
  }
  get duration() {
    const {
      resolved
    } = this;
    return resolved ? (0, _timeConversion.millisecondsToSeconds)(resolved.calculatedDuration) : 0;
  }
  get time() {
    return (0, _timeConversion.millisecondsToSeconds)(this.currentTime);
  }
  set time(newTime) {
    newTime = (0, _timeConversion.secondsToMilliseconds)(newTime);
    this.currentTime = newTime;
    if (this.holdTime !== null || this.speed === 0) {
      this.holdTime = newTime;
    } else if (this.driver) {
      this.startTime = this.driver.now() - newTime / this.speed;
    }
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(newSpeed) {
    const hasChanged = this.playbackSpeed !== newSpeed;
    this.playbackSpeed = newSpeed;
    if (hasChanged) {
      this.time = (0, _timeConversion.millisecondsToSeconds)(this.currentTime);
    }
  }
  play() {
    if (!this.resolver.isScheduled) {
      this.resolver.resume();
    }
    if (!this._resolved) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped) return;
    const {
      driver = _driverFrameloop.frameloopDriver,
      onPlay,
      startTime
    } = this.options;
    if (!this.driver) {
      this.driver = driver(timestamp => this.tick(timestamp));
    }
    onPlay && onPlay();
    const now = this.driver.now();
    if (this.holdTime !== null) {
      this.startTime = now - this.holdTime;
    } else if (!this.startTime) {
      this.startTime = startTime !== null && startTime !== void 0 ? startTime : this.calcStartTime();
    } else if (this.state === "finished") {
      this.startTime = now;
    }
    if (this.state === "finished") {
      this.updateFinishedPromise();
    }
    this.cancelTime = this.startTime;
    this.holdTime = null;
    /**
     * Set playState to running only after we've used it in
     * the previous logic.
     */
    this.state = "running";
    this.driver.start();
  }
  pause() {
    var _a;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return;
    }
    this.state = "paused";
    this.holdTime = (_a = this.currentTime) !== null && _a !== void 0 ? _a : 0;
  }
  complete() {
    if (this.state !== "running") {
      this.play();
    }
    this.pendingPlayState = this.state = "finished";
    this.holdTime = null;
  }
  finish() {
    this.teardown();
    this.state = "finished";
    const {
      onComplete
    } = this.options;
    onComplete && onComplete();
  }
  cancel() {
    if (this.cancelTime !== null) {
      this.tick(this.cancelTime);
    }
    this.teardown();
    this.updateFinishedPromise();
  }
  teardown() {
    this.state = "idle";
    this.stopDriver();
    this.resolveFinishedPromise();
    this.updateFinishedPromise();
    this.startTime = this.cancelTime = null;
    this.resolver.cancel();
  }
  stopDriver() {
    if (!this.driver) return;
    this.driver.stop();
    this.driver = undefined;
  }
  sample(time) {
    this.startTime = 0;
    return this.tick(time, true);
  }
}
// Legacy interface
exports.MainThreadAnimation = MainThreadAnimation;
function animateValue(options) {
  return new MainThreadAnimation(options);
}
},{"../../render/utils/KeyframesResolver.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/KeyframesResolver.mjs","../generators/spring/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/spring/index.mjs","../generators/inertia.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/inertia.mjs","../generators/keyframes.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/keyframes.mjs","./BaseAnimation.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/BaseAnimation.mjs","../../utils/pipe.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/pipe.mjs","../../utils/mix/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/index.mjs","../generators/utils/calc-duration.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/utils/calc-duration.mjs","../../utils/time-conversion.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/time-conversion.mjs","../../utils/clamp.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/clamp.mjs","../../utils/errors.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/errors.mjs","./drivers/driver-frameloop.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/drivers/driver-frameloop.mjs","./waapi/utils/get-final-keyframe.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs","../generators/utils/is-generator.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/utils/is-generator.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/utils/accelerated-values.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acceleratedValues = void 0;
/**
 * A list of values that can be hardware-accelerated.
 */
const acceleratedValues = exports.acceleratedValues = new Set(["opacity", "clipPath", "filter", "transform"
// TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
// or until we implement support for linear() easing.
// "background-color"
]);
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/linear.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateLinearEasing = void 0;
var _progress = require("../../../../utils/progress.mjs");
// Create a linear easing point for every 10 ms
const resolution = 10;
const generateLinearEasing = (easing, duration // as milliseconds
) => {
  let points = "";
  const numPoints = Math.max(Math.round(duration / resolution), 2);
  for (let i = 0; i < numPoints; i++) {
    points += easing((0, _progress.progress)(0, numPoints - 1, i)) + ", ";
  }
  return `linear(${points.substring(0, points.length - 2)})`;
};
exports.generateLinearEasing = generateLinearEasing;
},{"../../../../utils/progress.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/progress.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/supports-flags.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportsFlags = void 0;
/**
 * Add the ability for test suites to manually set support flags
 * to better test more environments.
 */
const supportsFlags = exports.supportsFlags = {
  linearEasing: undefined
};
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/memo-supports.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoSupports = memoSupports;
var _memo = require("../../../../utils/memo.mjs");
var _supportsFlags = require("./supports-flags.mjs");
function memoSupports(callback, supportsFlag) {
  const memoized = (0, _memo.memo)(callback);
  return () => {
    var _a;
    return (_a = _supportsFlags.supportsFlags[supportsFlag]) !== null && _a !== void 0 ? _a : memoized();
  };
}
},{"../../../../utils/memo.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/memo.mjs","./supports-flags.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/supports-flags.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/supports-linear-easing.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportsLinearEasing = void 0;
var _memoSupports = require("./memo-supports.mjs");
const supportsLinearEasing = exports.supportsLinearEasing = /*@__PURE__*/(0, _memoSupports.memoSupports)(() => {
  try {
    document.createElement("div").animate({
      opacity: 0
    }, {
      easing: "linear(0, 1)"
    });
  } catch (e) {
    return false;
  }
  return true;
}, "linearEasing");
},{"./memo-supports.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/memo-supports.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/easing.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cubicBezierAsString = void 0;
exports.isWaapiSupportedEasing = isWaapiSupportedEasing;
exports.mapEasingToNativeEasing = mapEasingToNativeEasing;
exports.supportedWaapiEasing = void 0;
var _isBezierDefinition = require("../../../easing/utils/is-bezier-definition.mjs");
var _linear = require("./utils/linear.mjs");
var _supportsLinearEasing = require("./utils/supports-linear-easing.mjs");
function isWaapiSupportedEasing(easing) {
  return Boolean(typeof easing === "function" && (0, _supportsLinearEasing.supportsLinearEasing)() || !easing || typeof easing === "string" && (easing in supportedWaapiEasing || (0, _supportsLinearEasing.supportsLinearEasing)()) || (0, _isBezierDefinition.isBezierDefinition)(easing) || Array.isArray(easing) && easing.every(isWaapiSupportedEasing));
}
const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
exports.cubicBezierAsString = cubicBezierAsString;
const supportedWaapiEasing = exports.supportedWaapiEasing = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /*@__PURE__*/cubicBezierAsString([0, 0.65, 0.55, 1]),
  circOut: /*@__PURE__*/cubicBezierAsString([0.55, 0, 1, 0.45]),
  backIn: /*@__PURE__*/cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
  backOut: /*@__PURE__*/cubicBezierAsString([0.33, 1.53, 0.69, 0.99])
};
function mapEasingToNativeEasing(easing, duration) {
  if (!easing) {
    return undefined;
  } else if (typeof easing === "function" && (0, _supportsLinearEasing.supportsLinearEasing)()) {
    return (0, _linear.generateLinearEasing)(easing, duration);
  } else if ((0, _isBezierDefinition.isBezierDefinition)(easing)) {
    return cubicBezierAsString(easing);
  } else if (Array.isArray(easing)) {
    return easing.map(segmentEasing => mapEasingToNativeEasing(segmentEasing, duration) || supportedWaapiEasing.easeOut);
  } else {
    return supportedWaapiEasing[easing];
  }
}
},{"../../../easing/utils/is-bezier-definition.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/utils/is-bezier-definition.mjs","./utils/linear.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/linear.mjs","./utils/supports-linear-easing.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/supports-linear-easing.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startWaapiAnimation = startWaapiAnimation;
var _easing = require("./easing.mjs");
function startWaapiAnimation(element, valueName, keyframes, {
  delay = 0,
  duration = 300,
  repeat = 0,
  repeatType = "loop",
  ease = "easeInOut",
  times
} = {}) {
  const keyframeOptions = {
    [valueName]: keyframes
  };
  if (times) keyframeOptions.offset = times;
  const easing = (0, _easing.mapEasingToNativeEasing)(ease, duration);
  /**
   * If this is an easing array, apply to keyframes, not animation as a whole
   */
  if (Array.isArray(easing)) keyframeOptions.easing = easing;
  return element.animate(keyframeOptions, {
    delay,
    duration,
    easing: !Array.isArray(easing) ? easing : "linear",
    fill: "both",
    iterations: repeat + 1,
    direction: repeatType === "reverse" ? "alternate" : "normal"
  });
}
},{"./easing.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/easing.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/attach-timeline.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attachTimeline = attachTimeline;
function attachTimeline(animation, timeline) {
  animation.timeline = timeline;
  animation.onfinish = null;
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/supports-waapi.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportsWaapi = void 0;
var _memo = require("../../../../utils/memo.mjs");
const supportsWaapi = exports.supportsWaapi = /*@__PURE__*/(0, _memo.memo)(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
},{"../../../../utils/memo.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/memo.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/AcceleratedAnimation.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AcceleratedAnimation = void 0;
var _anticipate = require("../../easing/anticipate.mjs");
var _back = require("../../easing/back.mjs");
var _circ = require("../../easing/circ.mjs");
var _DOMKeyframesResolver = require("../../render/dom/DOMKeyframesResolver.mjs");
var _noop = require("../../utils/noop.mjs");
var _timeConversion = require("../../utils/time-conversion.mjs");
var _isGenerator = require("../generators/utils/is-generator.mjs");
var _BaseAnimation = require("./BaseAnimation.mjs");
var _MainThreadAnimation = require("./MainThreadAnimation.mjs");
var _acceleratedValues = require("./utils/accelerated-values.mjs");
var _index = require("./waapi/index.mjs");
var _easing = require("./waapi/easing.mjs");
var _attachTimeline = require("./waapi/utils/attach-timeline.mjs");
var _getFinalKeyframe = require("./waapi/utils/get-final-keyframe.mjs");
var _supportsLinearEasing = require("./waapi/utils/supports-linear-easing.mjs");
var _supportsWaapi = require("./waapi/utils/supports-waapi.mjs");
/**
 * 10ms is chosen here as it strikes a balance between smooth
 * results (more than one keyframe per frame at 60fps) and
 * keyframe quantity.
 */
const sampleDelta = 10; //ms
/**
 * Implement a practical max duration for keyframe generation
 * to prevent infinite loops
 */
const maxDuration = 20000;
/**
 * Check if an animation can run natively via WAAPI or requires pregenerated keyframes.
 * WAAPI doesn't support spring or function easings so we run these as JS animation before
 * handing off.
 */
function requiresPregeneratedKeyframes(options) {
  return (0, _isGenerator.isGenerator)(options.type) || options.type === "spring" || !(0, _easing.isWaapiSupportedEasing)(options.ease);
}
function pregenerateKeyframes(keyframes, options) {
  /**
   * Create a main-thread animation to pregenerate keyframes.
   * We sample this at regular intervals to generate keyframes that we then
   * linearly interpolate between.
   */
  const sampleAnimation = new _MainThreadAnimation.MainThreadAnimation({
    ...options,
    keyframes,
    repeat: 0,
    delay: 0,
    isGenerator: true
  });
  let state = {
    done: false,
    value: keyframes[0]
  };
  const pregeneratedKeyframes = [];
  /**
   * Bail after 20 seconds of pre-generated keyframes as it's likely
   * we're heading for an infinite loop.
   */
  let t = 0;
  while (!state.done && t < maxDuration) {
    state = sampleAnimation.sample(t);
    pregeneratedKeyframes.push(state.value);
    t += sampleDelta;
  }
  return {
    times: undefined,
    keyframes: pregeneratedKeyframes,
    duration: t - sampleDelta,
    ease: "linear"
  };
}
const unsupportedEasingFunctions = {
  anticipate: _anticipate.anticipate,
  backInOut: _back.backInOut,
  circInOut: _circ.circInOut
};
function isUnsupportedEase(key) {
  return key in unsupportedEasingFunctions;
}
class AcceleratedAnimation extends _BaseAnimation.BaseAnimation {
  constructor(options) {
    super(options);
    const {
      name,
      motionValue,
      element,
      keyframes
    } = this.options;
    this.resolver = new _DOMKeyframesResolver.DOMKeyframesResolver(keyframes, (resolvedKeyframes, finalKeyframe) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe), name, motionValue, element);
    this.resolver.scheduleResolve();
  }
  initPlayback(keyframes, finalKeyframe) {
    var _a;
    let {
      duration = 300,
      times,
      ease,
      type,
      motionValue,
      name,
      startTime
    } = this.options;
    /**
     * If element has since been unmounted, return false to indicate
     * the animation failed to initialised.
     */
    if (!((_a = motionValue.owner) === null || _a === void 0 ? void 0 : _a.current)) {
      return false;
    }
    /**
     * If the user has provided an easing function name that isn't supported
     * by WAAPI (like "anticipate"), we need to provide the corressponding
     * function. This will later get converted to a linear() easing function.
     */
    if (typeof ease === "string" && (0, _supportsLinearEasing.supportsLinearEasing)() && isUnsupportedEase(ease)) {
      ease = unsupportedEasingFunctions[ease];
    }
    /**
     * If this animation needs pre-generated keyframes then generate.
     */
    if (requiresPregeneratedKeyframes(this.options)) {
      const {
        onComplete,
        onUpdate,
        motionValue,
        element,
        ...options
      } = this.options;
      const pregeneratedAnimation = pregenerateKeyframes(keyframes, options);
      keyframes = pregeneratedAnimation.keyframes;
      // If this is a very short animation, ensure we have
      // at least two keyframes to animate between as older browsers
      // can't animate between a single keyframe.
      if (keyframes.length === 1) {
        keyframes[1] = keyframes[0];
      }
      duration = pregeneratedAnimation.duration;
      times = pregeneratedAnimation.times;
      ease = pregeneratedAnimation.ease;
      type = "keyframes";
    }
    const animation = (0, _index.startWaapiAnimation)(motionValue.owner.current, name, keyframes, {
      ...this.options,
      duration,
      times,
      ease
    });
    // Override the browser calculated startTime with one synchronised to other JS
    // and WAAPI animations starting this event loop.
    animation.startTime = startTime !== null && startTime !== void 0 ? startTime : this.calcStartTime();
    if (this.pendingTimeline) {
      (0, _attachTimeline.attachTimeline)(animation, this.pendingTimeline);
      this.pendingTimeline = undefined;
    } else {
      /**
       * Prefer the `onfinish` prop as it's more widely supported than
       * the `finished` promise.
       *
       * Here, we synchronously set the provided MotionValue to the end
       * keyframe. If we didn't, when the WAAPI animation is finished it would
       * be removed from the element which would then revert to its old styles.
       */
      animation.onfinish = () => {
        const {
          onComplete
        } = this.options;
        motionValue.set((0, _getFinalKeyframe.getFinalKeyframe)(keyframes, this.options, finalKeyframe));
        onComplete && onComplete();
        this.cancel();
        this.resolveFinishedPromise();
      };
    }
    return {
      animation,
      duration,
      times,
      type,
      ease,
      keyframes: keyframes
    };
  }
  get duration() {
    const {
      resolved
    } = this;
    if (!resolved) return 0;
    const {
      duration
    } = resolved;
    return (0, _timeConversion.millisecondsToSeconds)(duration);
  }
  get time() {
    const {
      resolved
    } = this;
    if (!resolved) return 0;
    const {
      animation
    } = resolved;
    return (0, _timeConversion.millisecondsToSeconds)(animation.currentTime || 0);
  }
  set time(newTime) {
    const {
      resolved
    } = this;
    if (!resolved) return;
    const {
      animation
    } = resolved;
    animation.currentTime = (0, _timeConversion.secondsToMilliseconds)(newTime);
  }
  get speed() {
    const {
      resolved
    } = this;
    if (!resolved) return 1;
    const {
      animation
    } = resolved;
    return animation.playbackRate;
  }
  set speed(newSpeed) {
    const {
      resolved
    } = this;
    if (!resolved) return;
    const {
      animation
    } = resolved;
    animation.playbackRate = newSpeed;
  }
  get state() {
    const {
      resolved
    } = this;
    if (!resolved) return "idle";
    const {
      animation
    } = resolved;
    return animation.playState;
  }
  get startTime() {
    const {
      resolved
    } = this;
    if (!resolved) return null;
    const {
      animation
    } = resolved;
    // Coerce to number as TypeScript incorrectly types this
    // as CSSNumberish
    return animation.startTime;
  }
  /**
   * Replace the default DocumentTimeline with another AnimationTimeline.
   * Currently used for scroll animations.
   */
  attachTimeline(timeline) {
    if (!this._resolved) {
      this.pendingTimeline = timeline;
    } else {
      const {
        resolved
      } = this;
      if (!resolved) return _noop.noop;
      const {
        animation
      } = resolved;
      (0, _attachTimeline.attachTimeline)(animation, timeline);
    }
    return _noop.noop;
  }
  play() {
    if (this.isStopped) return;
    const {
      resolved
    } = this;
    if (!resolved) return;
    const {
      animation
    } = resolved;
    if (animation.playState === "finished") {
      this.updateFinishedPromise();
    }
    animation.play();
  }
  pause() {
    const {
      resolved
    } = this;
    if (!resolved) return;
    const {
      animation
    } = resolved;
    animation.pause();
  }
  stop() {
    this.resolver.cancel();
    this.isStopped = true;
    if (this.state === "idle") return;
    this.resolveFinishedPromise();
    this.updateFinishedPromise();
    const {
      resolved
    } = this;
    if (!resolved) return;
    const {
      animation,
      keyframes,
      duration,
      type,
      ease,
      times
    } = resolved;
    if (animation.playState === "idle" || animation.playState === "finished") {
      return;
    }
    /**
     * WAAPI doesn't natively have any interruption capabilities.
     *
     * Rather than read commited styles back out of the DOM, we can
     * create a renderless JS animation and sample it twice to calculate
     * its current value, "previous" value, and therefore allow
     * Motion to calculate velocity for any subsequent animation.
     */
    if (this.time) {
      const {
        motionValue,
        onUpdate,
        onComplete,
        element,
        ...options
      } = this.options;
      const sampleAnimation = new _MainThreadAnimation.MainThreadAnimation({
        ...options,
        keyframes,
        duration,
        type,
        ease,
        times,
        isGenerator: true
      });
      const sampleTime = (0, _timeConversion.secondsToMilliseconds)(this.time);
      motionValue.setWithVelocity(sampleAnimation.sample(sampleTime - sampleDelta).value, sampleAnimation.sample(sampleTime).value, sampleDelta);
    }
    const {
      onStop
    } = this.options;
    onStop && onStop();
    this.cancel();
  }
  complete() {
    const {
      resolved
    } = this;
    if (!resolved) return;
    resolved.animation.finish();
  }
  cancel() {
    const {
      resolved
    } = this;
    if (!resolved) return;
    resolved.animation.cancel();
  }
  static supports(options) {
    const {
      motionValue,
      name,
      repeatDelay,
      repeatType,
      damping,
      type
    } = options;
    return (0, _supportsWaapi.supportsWaapi)() && name && _acceleratedValues.acceleratedValues.has(name) && motionValue && motionValue.owner && motionValue.owner.current instanceof HTMLElement &&
    /**
     * If we're outputting values to onUpdate then we can't use WAAPI as there's
     * no way to read the value from WAAPI every frame.
     */
    !motionValue.owner.getProps().onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
  }
}
exports.AcceleratedAnimation = AcceleratedAnimation;
},{"../../easing/anticipate.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/anticipate.mjs","../../easing/back.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/back.mjs","../../easing/circ.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/circ.mjs","../../render/dom/DOMKeyframesResolver.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/DOMKeyframesResolver.mjs","../../utils/noop.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/noop.mjs","../../utils/time-conversion.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/time-conversion.mjs","../generators/utils/is-generator.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/utils/is-generator.mjs","./BaseAnimation.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/BaseAnimation.mjs","./MainThreadAnimation.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/MainThreadAnimation.mjs","./utils/accelerated-values.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/utils/accelerated-values.mjs","./waapi/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/index.mjs","./waapi/easing.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/easing.mjs","./waapi/utils/attach-timeline.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/attach-timeline.mjs","./waapi/utils/get-final-keyframe.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs","./waapi/utils/supports-linear-easing.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/supports-linear-easing.mjs","./waapi/utils/supports-waapi.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/supports-waapi.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/is-transition-defined.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTransitionDefined = isTransitionDefined;
/**
 * Decide whether a transition is defined on a given Transition.
 * This filters out orchestration options and returns true
 * if any options are left.
 */
function isTransitionDefined({
  when,
  delay: _delay,
  delayChildren,
  staggerChildren,
  staggerDirection,
  repeat,
  repeatType,
  repeatDelay,
  from,
  elapsed,
  ...transition
}) {
  return !!Object.keys(transition).length;
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/interfaces/motion-value.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateMotionValue = void 0;
var _timeConversion = require("../../utils/time-conversion.mjs");
var _defaultTransitions = require("../utils/default-transitions.mjs");
var _getValueTransition = require("../utils/get-value-transition.mjs");
var _GlobalConfig = require("../../utils/GlobalConfig.mjs");
var _useInstantTransitionState = require("../../utils/use-instant-transition-state.mjs");
var _getFinalKeyframe = require("../animators/waapi/utils/get-final-keyframe.mjs");
var _frame = require("../../frameloop/frame.mjs");
var _AcceleratedAnimation = require("../animators/AcceleratedAnimation.mjs");
var _MainThreadAnimation = require("../animators/MainThreadAnimation.mjs");
var _GroupPlaybackControls = require("../GroupPlaybackControls.mjs");
var _isTransitionDefined = require("../utils/is-transition-defined.mjs");
const animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => onComplete => {
  const valueTransition = (0, _getValueTransition.getValueTransition)(transition, name) || {};
  /**
   * Most transition values are currently completely overwritten by value-specific
   * transitions. In the future it'd be nicer to blend these transitions. But for now
   * delay actually does inherit from the root transition if not value-specific.
   */
  const delay = valueTransition.delay || transition.delay || 0;
  /**
   * Elapsed isn't a public transition option but can be passed through from
   * optimized appear effects in milliseconds.
   */
  let {
    elapsed = 0
  } = transition;
  elapsed = elapsed - (0, _timeConversion.secondsToMilliseconds)(delay);
  let options = {
    keyframes: Array.isArray(target) ? target : [null, target],
    ease: "easeOut",
    velocity: value.getVelocity(),
    ...valueTransition,
    delay: -elapsed,
    onUpdate: v => {
      value.set(v);
      valueTransition.onUpdate && valueTransition.onUpdate(v);
    },
    onComplete: () => {
      onComplete();
      valueTransition.onComplete && valueTransition.onComplete();
    },
    name,
    motionValue: value,
    element: isHandoff ? undefined : element
  };
  /**
   * If there's no transition defined for this value, we can generate
   * unqiue transition settings for this value.
   */
  if (!(0, _isTransitionDefined.isTransitionDefined)(valueTransition)) {
    options = {
      ...options,
      ...(0, _defaultTransitions.getDefaultTransition)(name, options)
    };
  }
  /**
   * Both WAAPI and our internal animation functions use durations
   * as defined by milliseconds, while our external API defines them
   * as seconds.
   */
  if (options.duration) {
    options.duration = (0, _timeConversion.secondsToMilliseconds)(options.duration);
  }
  if (options.repeatDelay) {
    options.repeatDelay = (0, _timeConversion.secondsToMilliseconds)(options.repeatDelay);
  }
  if (options.from !== undefined) {
    options.keyframes[0] = options.from;
  }
  let shouldSkip = false;
  if (options.type === false || options.duration === 0 && !options.repeatDelay) {
    options.duration = 0;
    if (options.delay === 0) {
      shouldSkip = true;
    }
  }
  if (_useInstantTransitionState.instantAnimationState.current || _GlobalConfig.MotionGlobalConfig.skipAnimations) {
    shouldSkip = true;
    options.duration = 0;
    options.delay = 0;
  }
  /**
   * If we can or must skip creating the animation, and apply only
   * the final keyframe, do so. We also check once keyframes are resolved but
   * this early check prevents the need to create an animation at all.
   */
  if (shouldSkip && !isHandoff && value.get() !== undefined) {
    const finalKeyframe = (0, _getFinalKeyframe.getFinalKeyframe)(options.keyframes, valueTransition);
    if (finalKeyframe !== undefined) {
      _frame.frame.update(() => {
        options.onUpdate(finalKeyframe);
        options.onComplete();
      });
      // We still want to return some animation controls here rather
      // than returning undefined
      return new _GroupPlaybackControls.GroupPlaybackControls([]);
    }
  }
  /**
   * Animate via WAAPI if possible. If this is a handoff animation, the optimised animation will be running via
   * WAAPI. Therefore, this animation must be JS to ensure it runs "under" the
   * optimised animation.
   */
  if (!isHandoff && _AcceleratedAnimation.AcceleratedAnimation.supports(options)) {
    return new _AcceleratedAnimation.AcceleratedAnimation(options);
  } else {
    return new _MainThreadAnimation.MainThreadAnimation(options);
  }
};
exports.animateMotionValue = animateMotionValue;
},{"../../utils/time-conversion.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/time-conversion.mjs","../utils/default-transitions.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/default-transitions.mjs","../utils/get-value-transition.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/get-value-transition.mjs","../../utils/GlobalConfig.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/GlobalConfig.mjs","../../utils/use-instant-transition-state.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/use-instant-transition-state.mjs","../animators/waapi/utils/get-final-keyframe.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs","../../frameloop/frame.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/frame.mjs","../animators/AcceleratedAnimation.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/AcceleratedAnimation.mjs","../animators/MainThreadAnimation.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/MainThreadAnimation.mjs","../GroupPlaybackControls.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/GroupPlaybackControls.mjs","../utils/is-transition-defined.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/is-transition-defined.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isKeyframesTarget = void 0;
const isKeyframesTarget = v => {
  return Array.isArray(v);
};
exports.isKeyframesTarget = isKeyframesTarget;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/resolve-value.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveFinalValueInKeyframes = exports.isCustomValue = void 0;
var _isKeyframesTarget = require("../animation/utils/is-keyframes-target.mjs");
const isCustomValue = v => {
  return Boolean(v && typeof v === "object" && v.mix && v.toValue);
};
exports.isCustomValue = isCustomValue;
const resolveFinalValueInKeyframes = v => {
  // TODO maybe throw if v.length - 1 is placeholder token?
  return (0, _isKeyframesTarget.isKeyframesTarget)(v) ? v[v.length - 1] || 0 : v;
};
exports.resolveFinalValueInKeyframes = resolveFinalValueInKeyframes;
},{"../animation/utils/is-keyframes-target.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/resolve-variants.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveVariantFromProps = resolveVariantFromProps;
function getValueState(visualElement) {
  const state = [{}, {}];
  visualElement === null || visualElement === void 0 ? void 0 : visualElement.values.forEach((value, key) => {
    state[0][key] = value.get();
    state[1][key] = value.getVelocity();
  });
  return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
  /**
   * If the variant definition is a function, resolve.
   */
  if (typeof definition === "function") {
    const [current, velocity] = getValueState(visualElement);
    definition = definition(custom !== undefined ? custom : props.custom, current, velocity);
  }
  /**
   * If the variant definition is a variant label, or
   * the function returned a variant label, resolve.
   */
  if (typeof definition === "string") {
    definition = props.variants && props.variants[definition];
  }
  /**
   * At this point we've resolved both functions and variant labels,
   * but the resolved variant label might itself have been a function.
   * If so, resolve. This can only have returned a valid target object.
   */
  if (typeof definition === "function") {
    const [current, velocity] = getValueState(visualElement);
    definition = definition(custom !== undefined ? custom : props.custom, current, velocity);
  }
  return definition;
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveVariant = resolveVariant;
var _resolveVariants = require("./resolve-variants.mjs");
function resolveVariant(visualElement, definition, custom) {
  const props = visualElement.getProps();
  return (0, _resolveVariants.resolveVariantFromProps)(props, definition, custom !== undefined ? custom : props.custom, visualElement);
}
},{"./resolve-variants.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/resolve-variants.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/setters.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTarget = setTarget;
var _resolveValue = require("../../utils/resolve-value.mjs");
var _index = require("../../value/index.mjs");
var _resolveDynamicVariants = require("./resolve-dynamic-variants.mjs");
/**
 * Set VisualElement's MotionValue, creating a new MotionValue for it if
 * it doesn't exist.
 */
function setMotionValue(visualElement, key, value) {
  if (visualElement.hasValue(key)) {
    visualElement.getValue(key).set(value);
  } else {
    visualElement.addValue(key, (0, _index.motionValue)(value));
  }
}
function setTarget(visualElement, definition) {
  const resolved = (0, _resolveDynamicVariants.resolveVariant)(visualElement, definition);
  let {
    transitionEnd = {},
    transition = {},
    ...target
  } = resolved || {};
  target = {
    ...target,
    ...transitionEnd
  };
  for (const key in target) {
    const value = (0, _resolveValue.resolveFinalValueInKeyframes)(target[key]);
    setMotionValue(visualElement, key, value);
  }
}
},{"../../utils/resolve-value.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/resolve-value.mjs","../../value/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/index.mjs","./resolve-dynamic-variants.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.camelToDash = void 0;
/**
 * Convert camelCase to dash-case properties.
 */
const camelToDash = str => str.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase();
exports.camelToDash = camelToDash;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/optimized-appear/data-id.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optimizedAppearDataId = exports.optimizedAppearDataAttribute = void 0;
var _camelToDash = require("../../render/dom/utils/camel-to-dash.mjs");
const optimizedAppearDataId = exports.optimizedAppearDataId = "framerAppearId";
const optimizedAppearDataAttribute = exports.optimizedAppearDataAttribute = "data-" + (0, _camelToDash.camelToDash)(optimizedAppearDataId);
},{"../../render/dom/utils/camel-to-dash.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/optimized-appear/get-appear-id.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOptimisedAppearId = getOptimisedAppearId;
var _dataId = require("./data-id.mjs");
function getOptimisedAppearId(visualElement) {
  return visualElement.props[_dataId.optimizedAppearDataAttribute];
}
},{"./data-id.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/optimized-appear/data-id.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/use-will-change/is.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWillChangeMotionValue = isWillChangeMotionValue;
var _isMotionValue = require("../utils/is-motion-value.mjs");
function isWillChangeMotionValue(value) {
  return Boolean((0, _isMotionValue.isMotionValue)(value) && value.add);
}
},{"../utils/is-motion-value.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/utils/is-motion-value.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/value/use-will-change/add-will-change.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addValueToWillChange = addValueToWillChange;
var _is = require("./is.mjs");
function addValueToWillChange(visualElement, key) {
  const willChange = visualElement.getValue("willChange");
  /**
   * It could be that a user has set willChange to a regular MotionValue,
   * in which case we can't add the value to it.
   */
  if ((0, _is.isWillChangeMotionValue)(willChange)) {
    return willChange.add(key);
  }
}
},{"./is.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/use-will-change/is.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/interfaces/visual-element-target.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateTarget = animateTarget;
var _transform = require("../../render/html/utils/transform.mjs");
var _motionValue = require("./motion-value.mjs");
var _setters = require("../../render/utils/setters.mjs");
var _getValueTransition = require("../utils/get-value-transition.mjs");
var _getAppearId = require("../optimized-appear/get-appear-id.mjs");
var _addWillChange = require("../../value/use-will-change/add-will-change.mjs");
var _frame = require("../../frameloop/frame.mjs");
/**
 * Decide whether we should block this animation. Previously, we achieved this
 * just by checking whether the key was listed in protectedKeys, but this
 * posed problems if an animation was triggered by afterChildren and protectedKeys
 * had been set to true in the meantime.
 */
function shouldBlockAnimation({
  protectedKeys,
  needsAnimating
}, key) {
  const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, {
  delay = 0,
  transitionOverride,
  type
} = {}) {
  var _a;
  let {
    transition = visualElement.getDefaultTransition(),
    transitionEnd,
    ...target
  } = targetAndTransition;
  if (transitionOverride) transition = transitionOverride;
  const animations = [];
  const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
  for (const key in target) {
    const value = visualElement.getValue(key, (_a = visualElement.latestValues[key]) !== null && _a !== void 0 ? _a : null);
    const valueTarget = target[key];
    if (valueTarget === undefined || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    const valueTransition = {
      delay,
      ...(0, _getValueTransition.getValueTransition)(transition || {}, key)
    };
    /**
     * If this is the first time a value is being animated, check
     * to see if we're handling off from an existing animation.
     */
    let isHandoff = false;
    if (window.MotionHandoffAnimation) {
      const appearId = (0, _getAppearId.getOptimisedAppearId)(visualElement);
      if (appearId) {
        const startTime = window.MotionHandoffAnimation(appearId, key, _frame.frame);
        if (startTime !== null) {
          valueTransition.startTime = startTime;
          isHandoff = true;
        }
      }
    }
    (0, _addWillChange.addValueToWillChange)(visualElement, key);
    value.start((0, _motionValue.animateMotionValue)(key, value, valueTarget, visualElement.shouldReduceMotion && _transform.transformProps.has(key) ? {
      type: false
    } : valueTransition, visualElement, isHandoff));
    const animation = value.animation;
    if (animation) {
      animations.push(animation);
    }
  }
  if (transitionEnd) {
    Promise.all(animations).then(() => {
      _frame.frame.update(() => {
        transitionEnd && (0, _setters.setTarget)(visualElement, transitionEnd);
      });
    });
  }
  return animations;
}
},{"../../render/html/utils/transform.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/transform.mjs","./motion-value.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/interfaces/motion-value.mjs","../../render/utils/setters.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/setters.mjs","../utils/get-value-transition.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/get-value-transition.mjs","../optimized-appear/get-appear-id.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/optimized-appear/get-appear-id.mjs","../../value/use-will-change/add-will-change.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/use-will-change/add-will-change.mjs","../../frameloop/frame.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/frame.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/is-svg-element.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSVGElement = isSVGElement;
function isSVGElement(element) {
  return element instanceof SVGElement && element.tagName !== "svg";
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/projection/styles/scale-correction.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addScaleCorrector = addScaleCorrector;
exports.scaleCorrectors = void 0;
const scaleCorrectors = exports.scaleCorrectors = {};
function addScaleCorrector(correctors) {
  Object.assign(scaleCorrectors, correctors);
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isForcedMotionValue = isForcedMotionValue;
var _scaleCorrection = require("../../projection/styles/scale-correction.mjs");
var _transform = require("../../render/html/utils/transform.mjs");
function isForcedMotionValue(key, {
  layout,
  layoutId
}) {
  return _transform.transformProps.has(key) || key.startsWith("origin") || (layout || layoutId !== undefined) && (!!_scaleCorrection.scaleCorrectors[key] || key === "opacity");
}
},{"../../projection/styles/scale-correction.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/projection/styles/scale-correction.mjs","../../render/html/utils/transform.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/transform.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrapeMotionValuesFromProps = scrapeMotionValuesFromProps;
var _isForcedMotionValue = require("../../../motion/utils/is-forced-motion-value.mjs");
var _isMotionValue = require("../../../value/utils/is-motion-value.mjs");
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
  var _a;
  const {
    style
  } = props;
  const newValues = {};
  for (const key in style) {
    if ((0, _isMotionValue.isMotionValue)(style[key]) || prevProps.style && (0, _isMotionValue.isMotionValue)(prevProps.style[key]) || (0, _isForcedMotionValue.isForcedMotionValue)(key, props) || ((_a = visualElement === null || visualElement === void 0 ? void 0 : visualElement.getValue(key)) === null || _a === void 0 ? void 0 : _a.liveStyle) !== undefined) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}
},{"../../../motion/utils/is-forced-motion-value.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs","../../../value/utils/is-motion-value.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/utils/is-motion-value.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrapeMotionValuesFromProps = scrapeMotionValuesFromProps;
var _isMotionValue = require("../../../value/utils/is-motion-value.mjs");
var _scrapeMotionValues = require("../../html/utils/scrape-motion-values.mjs");
var _transform = require("../../html/utils/transform.mjs");
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
  const newValues = (0, _scrapeMotionValues.scrapeMotionValuesFromProps)(props, prevProps, visualElement);
  for (const key in props) {
    if ((0, _isMotionValue.isMotionValue)(props[key]) || (0, _isMotionValue.isMotionValue)(prevProps[key])) {
      const targetKey = _transform.transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}
},{"../../../value/utils/is-motion-value.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/utils/is-motion-value.mjs","../../html/utils/scrape-motion-values.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs","../../html/utils/transform.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/transform.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/is-browser.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBrowser = void 0;
const isBrowser = exports.isBrowser = typeof window !== "undefined";
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/reduced-motion/state.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefersReducedMotion = exports.hasReducedMotionListener = void 0;
// Does this device prefer reduced motion? Returns `null` server-side.
const prefersReducedMotion = exports.prefersReducedMotion = {
  current: null
};
const hasReducedMotionListener = exports.hasReducedMotionListener = {
  current: false
};
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/reduced-motion/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPrefersReducedMotion = initPrefersReducedMotion;
var _isBrowser = require("../is-browser.mjs");
var _state = require("./state.mjs");
function initPrefersReducedMotion() {
  _state.hasReducedMotionListener.current = true;
  if (!_isBrowser.isBrowser) return;
  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const setReducedMotionPreferences = () => _state.prefersReducedMotion.current = motionMediaQuery.matches;
    motionMediaQuery.addListener(setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    _state.prefersReducedMotion.current = false;
  }
}
},{"../is-browser.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/is-browser.mjs","./state.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/reduced-motion/state.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/is-animation-controls.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAnimationControls = isAnimationControls;
function isAnimationControls(v) {
  return v !== null && typeof v === "object" && typeof v.start === "function";
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/is-variant-label.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isVariantLabel = isVariantLabel;
/**
 * Decides if the supplied variable is variant label
 */
function isVariantLabel(v) {
  return typeof v === "string" || Array.isArray(v);
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/variant-props.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.variantProps = exports.variantPriorityOrder = void 0;
const variantPriorityOrder = exports.variantPriorityOrder = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"];
const variantProps = exports.variantProps = ["initial", ...variantPriorityOrder];
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/is-controlling-variants.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isControllingVariants = isControllingVariants;
exports.isVariantNode = isVariantNode;
var _isAnimationControls = require("../../animation/utils/is-animation-controls.mjs");
var _isVariantLabel = require("./is-variant-label.mjs");
var _variantProps = require("./variant-props.mjs");
function isControllingVariants(props) {
  return (0, _isAnimationControls.isAnimationControls)(props.animate) || _variantProps.variantProps.some(name => (0, _isVariantLabel.isVariantLabel)(props[name]));
}
function isVariantNode(props) {
  return Boolean(isControllingVariants(props) || props.variants);
}
},{"../../animation/utils/is-animation-controls.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/is-animation-controls.mjs","./is-variant-label.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/is-variant-label.mjs","./variant-props.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/variant-props.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/motion-values.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMotionValuesFromProps = updateMotionValuesFromProps;
var _warnOnce = require("../../utils/warn-once.mjs");
var _index = require("../../value/index.mjs");
var _isMotionValue = require("../../value/utils/is-motion-value.mjs");
function updateMotionValuesFromProps(element, next, prev) {
  for (const key in next) {
    const nextValue = next[key];
    const prevValue = prev[key];
    if ((0, _isMotionValue.isMotionValue)(nextValue)) {
      /**
       * If this is a motion value found in props or style, we want to add it
       * to our visual element's motion value map.
       */
      element.addValue(key, nextValue);
      /**
       * Check the version of the incoming motion value with this version
       * and warn against mismatches.
       */
      if ("development" === "development") {
        (0, _warnOnce.warnOnce)(nextValue.version === "11.11.17", `Attempting to mix Motion versions ${nextValue.version} with 11.11.17 may not work as expected.`);
      }
    } else if ((0, _isMotionValue.isMotionValue)(prevValue)) {
      /**
       * If we're swapping from a motion value to a static value,
       * create a new motion value from that
       */
      element.addValue(key, (0, _index.motionValue)(nextValue, {
        owner: element
      }));
    } else if (prevValue !== nextValue) {
      /**
       * If this is a flat value that has changed, update the motion value
       * or create one if it doesn't exist. We only want to do this if we're
       * not handling the value with our animation state.
       */
      if (element.hasValue(key)) {
        const existingValue = element.getValue(key);
        if (existingValue.liveStyle === true) {
          existingValue.jump(nextValue);
        } else if (!existingValue.hasAnimated) {
          existingValue.set(nextValue);
        }
      } else {
        const latestValue = element.getStaticValue(key);
        element.addValue(key, (0, _index.motionValue)(latestValue !== undefined ? latestValue : nextValue, {
          owner: element
        }));
      }
    }
  }
  // Handle removed values
  for (const key in prev) {
    if (next[key] === undefined) element.removeValue(key);
  }
  return next;
}
},{"../../utils/warn-once.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/warn-once.mjs","../../value/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/index.mjs","../../value/utils/is-motion-value.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/utils/is-motion-value.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/motion/features/definitions.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.featureDefinitions = void 0;
const featureProps = {
  animation: ["animate", "variants", "whileHover", "whileTap", "exit", "whileInView", "whileFocus", "whileDrag"],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
const featureDefinitions = exports.featureDefinitions = {};
for (const key in featureProps) {
  featureDefinitions[key] = {
    isEnabled: props => featureProps[key].some(name => !!props[name])
  };
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/find.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findValueType = void 0;
var _index = require("../../../value/types/color/index.mjs");
var _index2 = require("../../../value/types/complex/index.mjs");
var _dimensions = require("./dimensions.mjs");
var _test = require("./test.mjs");
/**
 * A list of all ValueTypes
 */
const valueTypes = [..._dimensions.dimensionValueTypes, _index.color, _index2.complex];
/**
 * Tests a value against the list of ValueTypes
 */
const findValueType = v => valueTypes.find((0, _test.testValueType)(v));
exports.findValueType = findValueType;
},{"../../../value/types/color/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/color/index.mjs","../../../value/types/complex/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/complex/index.mjs","./dimensions.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/dimensions.mjs","./test.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/test.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/projection/geometry/models.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDelta = exports.createBox = exports.createAxisDelta = exports.createAxis = void 0;
const createAxisDelta = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
});
exports.createAxisDelta = createAxisDelta;
const createDelta = () => ({
  x: createAxisDelta(),
  y: createAxisDelta()
});
exports.createDelta = createDelta;
const createAxis = () => ({
  min: 0,
  max: 0
});
exports.createAxis = createAxis;
const createBox = () => ({
  x: createAxis(),
  y: createAxis()
});
exports.createBox = createBox;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/VisualElement.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualElement = void 0;
var _index = require("../utils/reduced-motion/index.mjs");
var _state = require("../utils/reduced-motion/state.mjs");
var _subscriptionManager = require("../utils/subscription-manager.mjs");
var _index2 = require("../value/index.mjs");
var _isMotionValue = require("../value/utils/is-motion-value.mjs");
var _transform = require("./html/utils/transform.mjs");
var _isControllingVariants = require("./utils/is-controlling-variants.mjs");
var _motionValues = require("./utils/motion-values.mjs");
var _resolveVariants = require("./utils/resolve-variants.mjs");
var _warnOnce = require("../utils/warn-once.mjs");
var _definitions = require("../motion/features/definitions.mjs");
var _store = require("./store.mjs");
var _KeyframesResolver = require("./utils/KeyframesResolver.mjs");
var _isNumericalString = require("../utils/is-numerical-string.mjs");
var _isZeroValueString = require("../utils/is-zero-value-string.mjs");
var _find = require("./dom/value-types/find.mjs");
var _index3 = require("../value/types/complex/index.mjs");
var _animatableNone = require("./dom/value-types/animatable-none.mjs");
var _models = require("../projection/geometry/models.mjs");
var _syncTime = require("../frameloop/sync-time.mjs");
var _frame = require("../frameloop/frame.mjs");
const propEventHandlers = ["AnimationStart", "AnimationComplete", "Update", "BeforeLayoutMeasure", "LayoutMeasure", "LayoutAnimationStart", "LayoutAnimationComplete"];
/**
 * A VisualElement is an imperative abstraction around UI elements such as
 * HTMLElement, SVGElement, Three.Object3D etc.
 */
class VisualElement {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
    return {};
  }
  constructor({
    parent,
    props,
    presenceContext,
    reducedMotionConfig,
    blockInitialAnimation,
    visualState
  }, options = {}) {
    /**
     * A reference to the current underlying Instance, e.g. a HTMLElement
     * or Three.Mesh etc.
     */
    this.current = null;
    /**
     * A set containing references to this VisualElement's children.
     */
    this.children = new Set();
    /**
     * Determine what role this visual element should take in the variant tree.
     */
    this.isVariantNode = false;
    this.isControllingVariants = false;
    /**
     * Decides whether this VisualElement should animate in reduced motion
     * mode.
     *
     * TODO: This is currently set on every individual VisualElement but feels
     * like it could be set globally.
     */
    this.shouldReduceMotion = null;
    /**
     * A map of all motion values attached to this visual element. Motion
     * values are source of truth for any given animated value. A motion
     * value might be provided externally by the component via props.
     */
    this.values = new Map();
    this.KeyframeResolver = _KeyframesResolver.KeyframeResolver;
    /**
     * Cleanup functions for active features (hover/tap/exit etc)
     */
    this.features = {};
    /**
     * A map of every subscription that binds the provided or generated
     * motion values onChange listeners to this visual element.
     */
    this.valueSubscriptions = new Map();
    /**
     * A reference to the previously-provided motion values as returned
     * from scrapeMotionValuesFromProps. We use the keys in here to determine
     * if any motion values need to be removed after props are updated.
     */
    this.prevMotionValues = {};
    /**
     * An object containing a SubscriptionManager for each active event.
     */
    this.events = {};
    /**
     * An object containing an unsubscribe function for each prop event subscription.
     * For example, every "Update" event can have multiple subscribers via
     * VisualElement.on(), but only one of those can be defined via the onUpdate prop.
     */
    this.propEventSubscriptions = {};
    this.notifyUpdate = () => this.notify("Update", this.latestValues);
    this.render = () => {
      if (!this.current) return;
      this.triggerBuild();
      this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
    };
    this.renderScheduledAt = 0.0;
    this.scheduleRender = () => {
      const now = _syncTime.time.now();
      if (this.renderScheduledAt < now) {
        this.renderScheduledAt = now;
        _frame.frame.render(this.render, false, true);
      }
    };
    const {
      latestValues,
      renderState
    } = visualState;
    this.latestValues = latestValues;
    this.baseTarget = {
      ...latestValues
    };
    this.initialValues = props.initial ? {
      ...latestValues
    } : {};
    this.renderState = renderState;
    this.parent = parent;
    this.props = props;
    this.presenceContext = presenceContext;
    this.depth = parent ? parent.depth + 1 : 0;
    this.reducedMotionConfig = reducedMotionConfig;
    this.options = options;
    this.blockInitialAnimation = Boolean(blockInitialAnimation);
    this.isControllingVariants = (0, _isControllingVariants.isControllingVariants)(props);
    this.isVariantNode = (0, _isControllingVariants.isVariantNode)(props);
    if (this.isVariantNode) {
      this.variantChildren = new Set();
    }
    this.manuallyAnimateOnMount = Boolean(parent && parent.current);
    /**
     * Any motion values that are provided to the element when created
     * aren't yet bound to the element, as this would technically be impure.
     * However, we iterate through the motion values and set them to the
     * initial values for this component.
     *
     * TODO: This is impure and we should look at changing this to run on mount.
     * Doing so will break some tests but this isn't necessarily a breaking change,
     * more a reflection of the test.
     */
    const {
      willChange,
      ...initialMotionValues
    } = this.scrapeMotionValuesFromProps(props, {}, this);
    for (const key in initialMotionValues) {
      const value = initialMotionValues[key];
      if (latestValues[key] !== undefined && (0, _isMotionValue.isMotionValue)(value)) {
        value.set(latestValues[key], false);
      }
    }
  }
  mount(instance) {
    this.current = instance;
    _store.visualElementStore.set(instance, this);
    if (this.projection && !this.projection.instance) {
      this.projection.mount(instance);
    }
    if (this.parent && this.isVariantNode && !this.isControllingVariants) {
      this.removeFromVariantTree = this.parent.addVariantChild(this);
    }
    this.values.forEach((value, key) => this.bindToMotionValue(key, value));
    if (!_state.hasReducedMotionListener.current) {
      (0, _index.initPrefersReducedMotion)();
    }
    this.shouldReduceMotion = this.reducedMotionConfig === "never" ? false : this.reducedMotionConfig === "always" ? true : _state.prefersReducedMotion.current;
    if ("development" !== "production") {
      (0, _warnOnce.warnOnce)(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.");
    }
    if (this.parent) this.parent.children.add(this);
    this.update(this.props, this.presenceContext);
  }
  unmount() {
    _store.visualElementStore.delete(this.current);
    this.projection && this.projection.unmount();
    (0, _frame.cancelFrame)(this.notifyUpdate);
    (0, _frame.cancelFrame)(this.render);
    this.valueSubscriptions.forEach(remove => remove());
    this.valueSubscriptions.clear();
    this.removeFromVariantTree && this.removeFromVariantTree();
    this.parent && this.parent.children.delete(this);
    for (const key in this.events) {
      this.events[key].clear();
    }
    for (const key in this.features) {
      const feature = this.features[key];
      if (feature) {
        feature.unmount();
        feature.isMounted = false;
      }
    }
    this.current = null;
  }
  bindToMotionValue(key, value) {
    if (this.valueSubscriptions.has(key)) {
      this.valueSubscriptions.get(key)();
    }
    const valueIsTransform = _transform.transformProps.has(key);
    const removeOnChange = value.on("change", latestValue => {
      this.latestValues[key] = latestValue;
      this.props.onUpdate && _frame.frame.preRender(this.notifyUpdate);
      if (valueIsTransform && this.projection) {
        this.projection.isTransformDirty = true;
      }
    });
    const removeOnRenderRequest = value.on("renderRequest", this.scheduleRender);
    let removeSyncCheck;
    if (window.MotionCheckAppearSync) {
      removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
    }
    this.valueSubscriptions.set(key, () => {
      removeOnChange();
      removeOnRenderRequest();
      if (removeSyncCheck) removeSyncCheck();
      if (value.owner) value.stop();
    });
  }
  sortNodePosition(other) {
    /**
     * If these nodes aren't even of the same type we can't compare their depth.
     */
    if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
      return 0;
    }
    return this.sortInstanceNodePosition(this.current, other.current);
  }
  updateFeatures() {
    let key = "animation";
    for (key in _definitions.featureDefinitions) {
      const featureDefinition = _definitions.featureDefinitions[key];
      if (!featureDefinition) continue;
      const {
        isEnabled,
        Feature: FeatureConstructor
      } = featureDefinition;
      /**
       * If this feature is enabled but not active, make a new instance.
       */
      if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) {
        this.features[key] = new FeatureConstructor(this);
      }
      /**
       * If we have a feature, mount or update it.
       */
      if (this.features[key]) {
        const feature = this.features[key];
        if (feature.isMounted) {
          feature.update();
        } else {
          feature.mount();
          feature.isMounted = true;
        }
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : (0, _models.createBox)();
  }
  getStaticValue(key) {
    return this.latestValues[key];
  }
  setStaticValue(key, value) {
    this.latestValues[key] = value;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(props, presenceContext) {
    if (props.transformTemplate || this.props.transformTemplate) {
      this.scheduleRender();
    }
    this.prevProps = this.props;
    this.props = props;
    this.prevPresenceContext = this.presenceContext;
    this.presenceContext = presenceContext;
    /**
     * Update prop event handlers ie onAnimationStart, onAnimationComplete
     */
    for (let i = 0; i < propEventHandlers.length; i++) {
      const key = propEventHandlers[i];
      if (this.propEventSubscriptions[key]) {
        this.propEventSubscriptions[key]();
        delete this.propEventSubscriptions[key];
      }
      const listenerName = "on" + key;
      const listener = props[listenerName];
      if (listener) {
        this.propEventSubscriptions[key] = this.on(key, listener);
      }
    }
    this.prevMotionValues = (0, _motionValues.updateMotionValuesFromProps)(this, this.scrapeMotionValuesFromProps(props, this.prevProps, this), this.prevMotionValues);
    if (this.handleChildMotionValue) {
      this.handleChildMotionValue();
    }
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(name) {
    return this.props.variants ? this.props.variants[name] : undefined;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : undefined;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(child) {
    const closestVariantNode = this.getClosestVariantNode();
    if (closestVariantNode) {
      closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
      return () => closestVariantNode.variantChildren.delete(child);
    }
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(key, value) {
    // Remove existing value if it exists
    const existingValue = this.values.get(key);
    if (value !== existingValue) {
      if (existingValue) this.removeValue(key);
      this.bindToMotionValue(key, value);
      this.values.set(key, value);
      this.latestValues[key] = value.get();
    }
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(key) {
    this.values.delete(key);
    const unsubscribe = this.valueSubscriptions.get(key);
    if (unsubscribe) {
      unsubscribe();
      this.valueSubscriptions.delete(key);
    }
    delete this.latestValues[key];
    this.removeValueFromRenderState(key, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(key) {
    return this.values.has(key);
  }
  getValue(key, defaultValue) {
    if (this.props.values && this.props.values[key]) {
      return this.props.values[key];
    }
    let value = this.values.get(key);
    if (value === undefined && defaultValue !== undefined) {
      value = (0, _index2.motionValue)(defaultValue === null ? undefined : defaultValue, {
        owner: this
      });
      this.addValue(key, value);
    }
    return value;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(key, target) {
    var _a;
    let value = this.latestValues[key] !== undefined || !this.current ? this.latestValues[key] : (_a = this.getBaseTargetFromProps(this.props, key)) !== null && _a !== void 0 ? _a : this.readValueFromInstance(this.current, key, this.options);
    if (value !== undefined && value !== null) {
      if (typeof value === "string" && ((0, _isNumericalString.isNumericalString)(value) || (0, _isZeroValueString.isZeroValueString)(value))) {
        // If this is a number read as a string, ie "0" or "200", convert it to a number
        value = parseFloat(value);
      } else if (!(0, _find.findValueType)(value) && _index3.complex.test(target)) {
        value = (0, _animatableNone.getAnimatableNone)(key, target);
      }
      this.setBaseTarget(key, (0, _isMotionValue.isMotionValue)(value) ? value.get() : value);
    }
    return (0, _isMotionValue.isMotionValue)(value) ? value.get() : value;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(key, value) {
    this.baseTarget[key] = value;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(key) {
    var _a;
    const {
      initial
    } = this.props;
    let valueFromInitial;
    if (typeof initial === "string" || typeof initial === "object") {
      const variant = (0, _resolveVariants.resolveVariantFromProps)(this.props, initial, (_a = this.presenceContext) === null || _a === void 0 ? void 0 : _a.custom);
      if (variant) {
        valueFromInitial = variant[key];
      }
    }
    /**
     * If this value still exists in the current initial variant, read that.
     */
    if (initial && valueFromInitial !== undefined) {
      return valueFromInitial;
    }
    /**
     * Alternatively, if this VisualElement config has defined a getBaseTarget
     * so we can read the value from an alternative source, try that.
     */
    const target = this.getBaseTargetFromProps(this.props, key);
    if (target !== undefined && !(0, _isMotionValue.isMotionValue)(target)) return target;
    /**
     * If the value was initially defined on initial, but it doesn't any more,
     * return undefined. Otherwise return the value as initially read from the DOM.
     */
    return this.initialValues[key] !== undefined && valueFromInitial === undefined ? undefined : this.baseTarget[key];
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new _subscriptionManager.SubscriptionManager();
    }
    return this.events[eventName].add(callback);
  }
  notify(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].notify(...args);
    }
  }
}
exports.VisualElement = VisualElement;
},{"../utils/reduced-motion/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/reduced-motion/index.mjs","../utils/reduced-motion/state.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/reduced-motion/state.mjs","../utils/subscription-manager.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/subscription-manager.mjs","../value/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/index.mjs","../value/utils/is-motion-value.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/utils/is-motion-value.mjs","./html/utils/transform.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/transform.mjs","./utils/is-controlling-variants.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/is-controlling-variants.mjs","./utils/motion-values.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/motion-values.mjs","./utils/resolve-variants.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/resolve-variants.mjs","../utils/warn-once.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/warn-once.mjs","../motion/features/definitions.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/motion/features/definitions.mjs","./store.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/store.mjs","./utils/KeyframesResolver.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/utils/KeyframesResolver.mjs","../utils/is-numerical-string.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/is-numerical-string.mjs","../utils/is-zero-value-string.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/is-zero-value-string.mjs","./dom/value-types/find.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/find.mjs","../value/types/complex/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/complex/index.mjs","./dom/value-types/animatable-none.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs","../projection/geometry/models.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/projection/geometry/models.mjs","../frameloop/sync-time.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/sync-time.mjs","../frameloop/frame.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/frame.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/DOMVisualElement.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOMVisualElement = void 0;
var _VisualElement = require("../VisualElement.mjs");
var _DOMKeyframesResolver = require("./DOMKeyframesResolver.mjs");
class DOMVisualElement extends _VisualElement.VisualElement {
  constructor() {
    super(...arguments);
    this.KeyframeResolver = _DOMKeyframesResolver.DOMKeyframesResolver;
  }
  sortInstanceNodePosition(a, b) {
    /**
     * compareDocumentPosition returns a bitmask, by using the bitwise &
     * we're returning true if 2 in that bitmask is set to true. 2 is set
     * to true if b preceeds a.
     */
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(props, key) {
    return props.style ? props.style[key] : undefined;
  }
  removeValueFromRenderState(key, {
    vars,
    style
  }) {
    delete vars[key];
    delete style[key];
  }
}
exports.DOMVisualElement = DOMVisualElement;
},{"../VisualElement.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/VisualElement.mjs","./DOMKeyframesResolver.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/DOMKeyframesResolver.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/get-as-type.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValueAsType = void 0;
/**
 * Provided a value and a ValueType, returns the value as that value type.
 */
const getValueAsType = (value, type) => {
  return type && typeof value === "number" ? type.transform(value) : value;
};
exports.getValueAsType = getValueAsType;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/build-transform.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildTransform = buildTransform;
var _transform = require("./transform.mjs");
var _getAsType = require("../../dom/value-types/get-as-type.mjs");
var _number = require("../../dom/value-types/number.mjs");
const translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
const numTransforms = _transform.transformPropOrder.length;
/**
 * Build a CSS transform style from individual x/y/scale etc properties.
 *
 * This outputs with a default order of transforms/scales/rotations, this can be customised by
 * providing a transformTemplate function.
 */
function buildTransform(latestValues, transform, transformTemplate) {
  // The transform string we're going to build into.
  let transformString = "";
  let transformIsDefault = true;
  /**
   * Loop over all possible transforms in order, adding the ones that
   * are present to the transform string.
   */
  for (let i = 0; i < numTransforms; i++) {
    const key = _transform.transformPropOrder[i];
    const value = latestValues[key];
    if (value === undefined) continue;
    let valueIsDefault = true;
    if (typeof value === "number") {
      valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
    } else {
      valueIsDefault = parseFloat(value) === 0;
    }
    if (!valueIsDefault || transformTemplate) {
      const valueAsType = (0, _getAsType.getValueAsType)(value, _number.numberValueTypes[key]);
      if (!valueIsDefault) {
        transformIsDefault = false;
        const transformName = translateAlias[key] || key;
        transformString += `${transformName}(${valueAsType}) `;
      }
      if (transformTemplate) {
        transform[key] = valueAsType;
      }
    }
  }
  transformString = transformString.trim();
  // If we have a custom `transform` template, pass our transform values and
  // generated transformString to that before returning
  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}
},{"./transform.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/transform.mjs","../../dom/value-types/get-as-type.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/get-as-type.mjs","../../dom/value-types/number.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/number.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/build-styles.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildHTMLStyles = buildHTMLStyles;
var _buildTransform = require("./build-transform.mjs");
var _isCssVariable = require("../../dom/utils/is-css-variable.mjs");
var _transform = require("./transform.mjs");
var _getAsType = require("../../dom/value-types/get-as-type.mjs");
var _number = require("../../dom/value-types/number.mjs");
function buildHTMLStyles(state, latestValues, transformTemplate) {
  const {
    style,
    vars,
    transformOrigin
  } = state;
  // Track whether we encounter any transform or transformOrigin values.
  let hasTransform = false;
  let hasTransformOrigin = false;
  /**
   * Loop over all our latest animated values and decide whether to handle them
   * as a style or CSS variable.
   *
   * Transforms and transform origins are kept separately for further processing.
   */
  for (const key in latestValues) {
    const value = latestValues[key];
    if (_transform.transformProps.has(key)) {
      // If this is a transform, flag to enable further transform processing
      hasTransform = true;
      continue;
    } else if ((0, _isCssVariable.isCSSVariableName)(key)) {
      vars[key] = value;
      continue;
    } else {
      // Convert the value to its default value type, ie 0 -> "0px"
      const valueAsType = (0, _getAsType.getValueAsType)(value, _number.numberValueTypes[key]);
      if (key.startsWith("origin")) {
        // If this is a transform origin, flag and enable further transform-origin processing
        hasTransformOrigin = true;
        transformOrigin[key] = valueAsType;
      } else {
        style[key] = valueAsType;
      }
    }
  }
  if (!latestValues.transform) {
    if (hasTransform || transformTemplate) {
      style.transform = (0, _buildTransform.buildTransform)(latestValues, state.transform, transformTemplate);
    } else if (style.transform) {
      /**
       * If we have previously created a transform but currently don't have any,
       * reset transform style to none.
       */
      style.transform = "none";
    }
  }
  /**
   * Build a transformOrigin style. Uses the same defaults as the browser for
   * undefined origins.
   */
  if (hasTransformOrigin) {
    const {
      originX = "50%",
      originY = "50%",
      originZ = 0
    } = transformOrigin;
    style.transformOrigin = `${originX} ${originY} ${originZ}`;
  }
}
},{"./build-transform.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/build-transform.mjs","../../dom/utils/is-css-variable.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs","./transform.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/transform.mjs","../../dom/value-types/get-as-type.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/get-as-type.mjs","../../dom/value-types/number.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/number.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/transform-origin.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcSVGTransformOrigin = calcSVGTransformOrigin;
var _units = require("../../../value/types/numbers/units.mjs");
function calcOrigin(origin, offset, size) {
  return typeof origin === "string" ? origin : _units.px.transform(offset + size * origin);
}
/**
 * The SVG transform origin defaults are different to CSS and is less intuitive,
 * so we use the measured dimensions of the SVG to reconcile these.
 */
function calcSVGTransformOrigin(dimensions, originX, originY) {
  const pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
  const pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
  return `${pxOriginX} ${pxOriginY}`;
}
},{"../../../value/types/numbers/units.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/numbers/units.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/path.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSVGPath = buildSVGPath;
var _units = require("../../../value/types/numbers/units.mjs");
const dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
const camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
/**
 * Build SVG path properties. Uses the path's measured length to convert
 * our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
 * and stroke-dasharray attributes.
 *
 * This function is mutative to reduce per-frame GC.
 */
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
  // Normalise path length by setting SVG attribute pathLength to 1
  attrs.pathLength = 1;
  // We use dash case when setting attributes directly to the DOM node and camel case
  // when defining props on a React component.
  const keys = useDashCase ? dashKeys : camelKeys;
  // Build the dash offset
  attrs[keys.offset] = _units.px.transform(-offset);
  // Build the dash array
  const pathLength = _units.px.transform(length);
  const pathSpacing = _units.px.transform(spacing);
  attrs[keys.array] = `${pathLength} ${pathSpacing}`;
}
},{"../../../value/types/numbers/units.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/types/numbers/units.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/build-attrs.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSVGAttrs = buildSVGAttrs;
var _buildStyles = require("../../html/utils/build-styles.mjs");
var _transformOrigin = require("./transform-origin.mjs");
var _path = require("./path.mjs");
/**
 * Build SVG visual attrbutes, like cx and style.transform
 */
function buildSVGAttrs(state, {
  attrX,
  attrY,
  attrScale,
  originX,
  originY,
  pathLength,
  pathSpacing = 1,
  pathOffset = 0,
  // This is object creation, which we try to avoid per-frame.
  ...latest
}, isSVGTag, transformTemplate) {
  (0, _buildStyles.buildHTMLStyles)(state, latest, transformTemplate);
  /**
   * For svg tags we just want to make sure viewBox is animatable and treat all the styles
   * as normal HTML tags.
   */
  if (isSVGTag) {
    if (state.style.viewBox) {
      state.attrs.viewBox = state.style.viewBox;
    }
    return;
  }
  state.attrs = state.style;
  state.style = {};
  const {
    attrs,
    style,
    dimensions
  } = state;
  /**
   * However, we apply transforms as CSS transforms. So if we detect a transform we take it from attrs
   * and copy it into style.
   */
  if (attrs.transform) {
    if (dimensions) style.transform = attrs.transform;
    delete attrs.transform;
  }
  // Parse transformOrigin
  if (dimensions && (originX !== undefined || originY !== undefined || style.transform)) {
    style.transformOrigin = (0, _transformOrigin.calcSVGTransformOrigin)(dimensions, originX !== undefined ? originX : 0.5, originY !== undefined ? originY : 0.5);
  }
  // Render attrX/attrY/attrScale as attributes
  if (attrX !== undefined) attrs.x = attrX;
  if (attrY !== undefined) attrs.y = attrY;
  if (attrScale !== undefined) attrs.scale = attrScale;
  // Build SVG path if one has been defined
  if (pathLength !== undefined) {
    (0, _path.buildSVGPath)(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}
},{"../../html/utils/build-styles.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/build-styles.mjs","./transform-origin.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/transform-origin.mjs","./path.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/path.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.camelCaseAttributes = void 0;
/**
 * A set of attribute names that are always read/written as camel case.
 */
const camelCaseAttributes = exports.camelCaseAttributes = new Set(["baseFrequency", "diffuseConstant", "kernelMatrix", "kernelUnitLength", "keySplines", "keyTimes", "limitingConeAngle", "markerHeight", "markerWidth", "numOctaves", "targetX", "targetY", "surfaceScale", "specularConstant", "specularExponent", "stdDeviation", "tableValues", "viewBox", "gradientTransform", "pathLength", "startOffset", "textLength", "lengthAdjust"]);
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/render.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderHTML = renderHTML;
function renderHTML(element, {
  style,
  vars
}, styleProp, projection) {
  Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
  // Loop over any CSS variables and assign those.
  for (const key in vars) {
    element.style.setProperty(key, vars[key]);
  }
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/render.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSVG = renderSVG;
var _camelToDash = require("../../dom/utils/camel-to-dash.mjs");
var _render = require("../../html/utils/render.mjs");
var _camelCaseAttrs = require("./camel-case-attrs.mjs");
function renderSVG(element, renderState, _styleProp, projection) {
  (0, _render.renderHTML)(element, renderState, undefined, projection);
  for (const key in renderState.attrs) {
    element.setAttribute(!_camelCaseAttrs.camelCaseAttributes.has(key) ? (0, _camelToDash.camelToDash)(key) : key, renderState.attrs[key]);
  }
}
},{"../../dom/utils/camel-to-dash.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs","../../html/utils/render.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/render.mjs","./camel-case-attrs.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSVGTag = void 0;
const isSVGTag = tag => typeof tag === "string" && tag.toLowerCase() === "svg";
exports.isSVGTag = isSVGTag;
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/svg/SVGVisualElement.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVGVisualElement = void 0;
var _scrapeMotionValues = require("./utils/scrape-motion-values.mjs");
var _DOMVisualElement = require("../dom/DOMVisualElement.mjs");
var _buildAttrs = require("./utils/build-attrs.mjs");
var _camelToDash = require("../dom/utils/camel-to-dash.mjs");
var _camelCaseAttrs = require("./utils/camel-case-attrs.mjs");
var _transform = require("../html/utils/transform.mjs");
var _render = require("./utils/render.mjs");
var _defaults = require("../dom/value-types/defaults.mjs");
var _models = require("../../projection/geometry/models.mjs");
var _isSvgTag = require("./utils/is-svg-tag.mjs");
class SVGVisualElement extends _DOMVisualElement.DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "svg";
    this.isSVGTag = false;
    this.measureInstanceViewportBox = _models.createBox;
  }
  getBaseTargetFromProps(props, key) {
    return props[key];
  }
  readValueFromInstance(instance, key) {
    if (_transform.transformProps.has(key)) {
      const defaultType = (0, _defaults.getDefaultValueType)(key);
      return defaultType ? defaultType.default || 0 : 0;
    }
    key = !_camelCaseAttrs.camelCaseAttributes.has(key) ? (0, _camelToDash.camelToDash)(key) : key;
    return instance.getAttribute(key);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return (0, _scrapeMotionValues.scrapeMotionValuesFromProps)(props, prevProps, visualElement);
  }
  build(renderState, latestValues, props) {
    (0, _buildAttrs.buildSVGAttrs)(renderState, latestValues, this.isSVGTag, props.transformTemplate);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    (0, _render.renderSVG)(instance, renderState, styleProp, projection);
  }
  mount(instance) {
    this.isSVGTag = (0, _isSvgTag.isSVGTag)(instance.tagName);
    super.mount(instance);
  }
}
exports.SVGVisualElement = SVGVisualElement;
},{"./utils/scrape-motion-values.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs","../dom/DOMVisualElement.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/DOMVisualElement.mjs","./utils/build-attrs.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/build-attrs.mjs","../dom/utils/camel-to-dash.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs","./utils/camel-case-attrs.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs","../html/utils/transform.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/transform.mjs","./utils/render.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/render.mjs","../dom/value-types/defaults.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/defaults.mjs","../../projection/geometry/models.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/projection/geometry/models.mjs","./utils/is-svg-tag.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/projection/geometry/conversion.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertBoundingBoxToBox = convertBoundingBoxToBox;
exports.convertBoxToBoundingBox = convertBoxToBoundingBox;
exports.transformBoxPoints = transformBoxPoints;
/**
 * Bounding boxes tend to be defined as top, left, right, bottom. For various operations
 * it's easier to consider each axis individually. This function returns a bounding box
 * as a map of single-axis min/max values.
 */
function convertBoundingBoxToBox({
  top,
  left,
  right,
  bottom
}) {
  return {
    x: {
      min: left,
      max: right
    },
    y: {
      min: top,
      max: bottom
    }
  };
}
function convertBoxToBoundingBox({
  x,
  y
}) {
  return {
    top: y.min,
    right: x.max,
    bottom: y.max,
    left: x.min
  };
}
/**
 * Applies a TransformPoint function to a bounding box. TransformPoint is usually a function
 * provided by Framer to allow measured points to be corrected for device scaling. This is used
 * when measuring DOM elements and DOM event points.
 */
function transformBoxPoints(point, transformPoint) {
  if (!transformPoint) return point;
  const topLeft = transformPoint({
    x: point.left,
    y: point.top
  });
  const bottomRight = transformPoint({
    x: point.right,
    y: point.bottom
  });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/projection/utils/has-transform.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.has2DTranslate = has2DTranslate;
exports.hasScale = hasScale;
exports.hasTransform = hasTransform;
function isIdentityScale(scale) {
  return scale === undefined || scale === 1;
}
function hasScale({
  scale,
  scaleX,
  scaleY
}) {
  return !isIdentityScale(scale) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
function hasTransform(values) {
  return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY || values.skewX || values.skewY;
}
function has2DTranslate(values) {
  return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
  return value && value !== "0%";
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/projection/geometry/delta-apply.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyAxisDelta = applyAxisDelta;
exports.applyBoxDelta = applyBoxDelta;
exports.applyPointDelta = applyPointDelta;
exports.applyTreeDeltas = applyTreeDeltas;
exports.scalePoint = scalePoint;
exports.transformAxis = transformAxis;
exports.transformBox = transformBox;
exports.translateAxis = translateAxis;
var _number = require("../../utils/mix/number.mjs");
var _hasTransform = require("../utils/has-transform.mjs");
/**
 * Scales a point based on a factor and an originPoint
 */
function scalePoint(point, scale, originPoint) {
  const distanceFromOrigin = point - originPoint;
  const scaled = scale * distanceFromOrigin;
  return originPoint + scaled;
}
/**
 * Applies a translate/scale delta to a point
 */
function applyPointDelta(point, translate, scale, originPoint, boxScale) {
  if (boxScale !== undefined) {
    point = scalePoint(point, boxScale, originPoint);
  }
  return scalePoint(point, scale, originPoint) + translate;
}
/**
 * Applies a translate/scale delta to an axis
 */
function applyAxisDelta(axis, translate = 0, scale = 1, originPoint, boxScale) {
  axis.min = applyPointDelta(axis.min, translate, scale, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Applies a translate/scale delta to a box
 */
function applyBoxDelta(box, {
  x,
  y
}) {
  applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
  applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
const TREE_SCALE_SNAP_MIN = 0.999999999999;
const TREE_SCALE_SNAP_MAX = 1.0000000000001;
/**
 * Apply a tree of deltas to a box. We do this to calculate the effect of all the transforms
 * in a tree upon our box before then calculating how to project it into our desired viewport-relative box
 *
 * This is the final nested loop within updateLayoutDelta for future refactoring
 */
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
  const treeLength = treePath.length;
  if (!treeLength) return;
  // Reset the treeScale
  treeScale.x = treeScale.y = 1;
  let node;
  let delta;
  for (let i = 0; i < treeLength; i++) {
    node = treePath[i];
    delta = node.projectionDelta;
    /**
     * TODO: Prefer to remove this, but currently we have motion components with
     * display: contents in Framer.
     */
    const {
      visualElement
    } = node.options;
    if (visualElement && visualElement.props.style && visualElement.props.style.display === "contents") {
      continue;
    }
    if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
      transformBox(box, {
        x: -node.scroll.offset.x,
        y: -node.scroll.offset.y
      });
    }
    if (delta) {
      // Incoporate each ancestor's scale into a culmulative treeScale for this component
      treeScale.x *= delta.x.scale;
      treeScale.y *= delta.y.scale;
      // Apply each ancestor's calculated delta into this component's recorded layout box
      applyBoxDelta(box, delta);
    }
    if (isSharedTransition && (0, _hasTransform.hasTransform)(node.latestValues)) {
      transformBox(box, node.latestValues);
    }
  }
  /**
   * Snap tree scale back to 1 if it's within a non-perceivable threshold.
   * This will help reduce useless scales getting rendered.
   */
  if (treeScale.x < TREE_SCALE_SNAP_MAX && treeScale.x > TREE_SCALE_SNAP_MIN) {
    treeScale.x = 1.0;
  }
  if (treeScale.y < TREE_SCALE_SNAP_MAX && treeScale.y > TREE_SCALE_SNAP_MIN) {
    treeScale.y = 1.0;
  }
}
function translateAxis(axis, distance) {
  axis.min = axis.min + distance;
  axis.max = axis.max + distance;
}
/**
 * Apply a transform to an axis from the latest resolved motion values.
 * This function basically acts as a bridge between a flat motion value map
 * and applyAxisDelta
 */
function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = 0.5) {
  const originPoint = (0, _number.mixNumber)(axis.min, axis.max, axisOrigin);
  // Apply the axis delta to the final axis
  applyAxisDelta(axis, axisTranslate, axisScale, originPoint, boxScale);
}
/**
 * Apply a transform to a box from the latest resolved motion values.
 */
function transformBox(box, transform) {
  transformAxis(box.x, transform.x, transform.scaleX, transform.scale, transform.originX);
  transformAxis(box.y, transform.y, transform.scaleY, transform.scale, transform.originY);
}
},{"../../utils/mix/number.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/number.mjs","../utils/has-transform.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/projection/utils/has-transform.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/projection/utils/measure.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.measurePageBox = measurePageBox;
exports.measureViewportBox = measureViewportBox;
var _conversion = require("../geometry/conversion.mjs");
var _deltaApply = require("../geometry/delta-apply.mjs");
function measureViewportBox(instance, transformPoint) {
  return (0, _conversion.convertBoundingBoxToBox)((0, _conversion.transformBoxPoints)(instance.getBoundingClientRect(), transformPoint));
}
function measurePageBox(element, rootProjectionNode, transformPagePoint) {
  const viewportBox = measureViewportBox(element, transformPagePoint);
  const {
    scroll
  } = rootProjectionNode;
  if (scroll) {
    (0, _deltaApply.translateAxis)(viewportBox.x, scroll.offset.x);
    (0, _deltaApply.translateAxis)(viewportBox.y, scroll.offset.y);
  }
  return viewportBox;
}
},{"../geometry/conversion.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/projection/geometry/conversion.mjs","../geometry/delta-apply.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/projection/geometry/delta-apply.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/HTMLVisualElement.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTMLVisualElement = void 0;
exports.getComputedStyle = getComputedStyle;
var _buildStyles = require("./utils/build-styles.mjs");
var _isCssVariable = require("../dom/utils/is-css-variable.mjs");
var _transform = require("./utils/transform.mjs");
var _scrapeMotionValues = require("./utils/scrape-motion-values.mjs");
var _render = require("./utils/render.mjs");
var _defaults = require("../dom/value-types/defaults.mjs");
var _measure = require("../../projection/utils/measure.mjs");
var _DOMVisualElement = require("../dom/DOMVisualElement.mjs");
var _isMotionValue = require("../../value/utils/is-motion-value.mjs");
function getComputedStyle(element) {
  return window.getComputedStyle(element);
}
class HTMLVisualElement extends _DOMVisualElement.DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "html";
    this.renderInstance = _render.renderHTML;
  }
  readValueFromInstance(instance, key) {
    if (_transform.transformProps.has(key)) {
      const defaultType = (0, _defaults.getDefaultValueType)(key);
      return defaultType ? defaultType.default || 0 : 0;
    } else {
      const computedStyle = getComputedStyle(instance);
      const value = ((0, _isCssVariable.isCSSVariableName)(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value === "string" ? value.trim() : value;
    }
  }
  measureInstanceViewportBox(instance, {
    transformPagePoint
  }) {
    return (0, _measure.measureViewportBox)(instance, transformPagePoint);
  }
  build(renderState, latestValues, props) {
    (0, _buildStyles.buildHTMLStyles)(renderState, latestValues, props.transformTemplate);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return (0, _scrapeMotionValues.scrapeMotionValuesFromProps)(props, prevProps, visualElement);
  }
  handleChildMotionValue() {
    if (this.childSubscription) {
      this.childSubscription();
      delete this.childSubscription;
    }
    const {
      children
    } = this.props;
    if ((0, _isMotionValue.isMotionValue)(children)) {
      this.childSubscription = children.on("change", latest => {
        if (this.current) this.current.textContent = `${latest}`;
      });
    }
  }
}
exports.HTMLVisualElement = HTMLVisualElement;
},{"./utils/build-styles.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/build-styles.mjs","../dom/utils/is-css-variable.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs","./utils/transform.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/transform.mjs","./utils/scrape-motion-values.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs","./utils/render.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/render.mjs","../dom/value-types/defaults.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/defaults.mjs","../../projection/utils/measure.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/projection/utils/measure.mjs","../dom/DOMVisualElement.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/DOMVisualElement.mjs","../../value/utils/is-motion-value.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/utils/is-motion-value.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/object/ObjectVisualElement.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectVisualElement = void 0;
var _models = require("../../projection/geometry/models.mjs");
var _VisualElement = require("../VisualElement.mjs");
function isObjectKey(key, object) {
  return key in object;
}
class ObjectVisualElement extends _VisualElement.VisualElement {
  constructor() {
    super(...arguments);
    this.type = "object";
  }
  readValueFromInstance(instance, key) {
    if (isObjectKey(key, instance)) {
      const value = instance[key];
      if (typeof value === "string" || typeof value === "number") {
        return value;
      }
    }
    return undefined;
  }
  getBaseTargetFromProps() {
    return undefined;
  }
  removeValueFromRenderState(key, renderState) {
    delete renderState.output[key];
  }
  measureInstanceViewportBox() {
    return (0, _models.createBox)();
  }
  build(renderState, latestValues) {
    Object.assign(renderState.output, latestValues);
  }
  renderInstance(instance, {
    output
  }) {
    Object.assign(instance, output);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
exports.ObjectVisualElement = ObjectVisualElement;
},{"../../projection/geometry/models.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/projection/geometry/models.mjs","../VisualElement.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/VisualElement.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/create-visual-element.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDOMVisualElement = createDOMVisualElement;
exports.createObjectVisualElement = createObjectVisualElement;
var _isSvgElement = require("../../render/dom/utils/is-svg-element.mjs");
var _SVGVisualElement = require("../../render/svg/SVGVisualElement.mjs");
var _HTMLVisualElement = require("../../render/html/HTMLVisualElement.mjs");
var _store = require("../../render/store.mjs");
var _ObjectVisualElement = require("../../render/object/ObjectVisualElement.mjs");
function createDOMVisualElement(element) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  };
  const node = (0, _isSvgElement.isSVGElement)(element) ? new _SVGVisualElement.SVGVisualElement(options) : new _HTMLVisualElement.HTMLVisualElement(options);
  node.mount(element);
  _store.visualElementStore.set(element, node);
}
function createObjectVisualElement(subject) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  };
  const node = new _ObjectVisualElement.ObjectVisualElement(options);
  node.mount(subject);
  _store.visualElementStore.set(subject, node);
}
},{"../../render/dom/utils/is-svg-element.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/is-svg-element.mjs","../../render/svg/SVGVisualElement.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/svg/SVGVisualElement.mjs","../../render/html/HTMLVisualElement.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/html/HTMLVisualElement.mjs","../../render/store.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/store.mjs","../../render/object/ObjectVisualElement.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/object/ObjectVisualElement.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animate/single-value.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateSingleValue = animateSingleValue;
var _motionValue = require("../interfaces/motion-value.mjs");
var _index = require("../../value/index.mjs");
var _isMotionValue = require("../../value/utils/is-motion-value.mjs");
function animateSingleValue(value, keyframes, options) {
  const motionValue$1 = (0, _isMotionValue.isMotionValue)(value) ? value : (0, _index.motionValue)(value);
  motionValue$1.start((0, _motionValue.animateMotionValue)("", motionValue$1, keyframes, options));
  return motionValue$1.animation;
}
},{"../interfaces/motion-value.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/interfaces/motion-value.mjs","../../value/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/index.mjs","../../value/utils/is-motion-value.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/utils/is-motion-value.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animate/subject.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateSubject = animateSubject;
var _store = require("../../render/store.mjs");
var _errors = require("../../utils/errors.mjs");
var _isMotionValue = require("../../value/utils/is-motion-value.mjs");
var _visualElementTarget = require("../interfaces/visual-element-target.mjs");
var _createVisualElement = require("../utils/create-visual-element.mjs");
var _isDomKeyframes = require("../utils/is-dom-keyframes.mjs");
var _resolveSubjects = require("./resolve-subjects.mjs");
var _singleValue = require("./single-value.mjs");
function isSingleValue(subject, keyframes) {
  return (0, _isMotionValue.isMotionValue)(subject) || typeof subject === "number" || typeof subject === "string" && !(0, _isDomKeyframes.isDOMKeyframes)(keyframes);
}
/**
 * Implementation
 */
function animateSubject(subject, keyframes, options, scope) {
  const animations = [];
  if (isSingleValue(subject, keyframes)) {
    animations.push((0, _singleValue.animateSingleValue)(subject, (0, _isDomKeyframes.isDOMKeyframes)(keyframes) ? keyframes.default || keyframes : keyframes, options ? options.default || options : options));
  } else {
    const subjects = (0, _resolveSubjects.resolveSubjects)(subject, keyframes, scope);
    const numSubjects = subjects.length;
    (0, _errors.invariant)(Boolean(numSubjects), "No valid elements provided.");
    for (let i = 0; i < numSubjects; i++) {
      const thisSubject = subjects[i];
      const createVisualElement = thisSubject instanceof Element ? _createVisualElement.createDOMVisualElement : _createVisualElement.createObjectVisualElement;
      if (!_store.visualElementStore.has(thisSubject)) {
        createVisualElement(thisSubject);
      }
      const visualElement = _store.visualElementStore.get(thisSubject);
      const transition = {
        ...options
      };
      /**
       * Resolve stagger function if provided.
       */
      if ("delay" in transition && typeof transition.delay === "function") {
        transition.delay = transition.delay(i, numSubjects);
      }
      animations.push(...(0, _visualElementTarget.animateTarget)(visualElement, {
        ...keyframes,
        transition
      }, {}));
    }
  }
  return animations;
}
},{"../../render/store.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/store.mjs","../../utils/errors.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/errors.mjs","../../value/utils/is-motion-value.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/utils/is-motion-value.mjs","../interfaces/visual-element-target.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/interfaces/visual-element-target.mjs","../utils/create-visual-element.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/create-visual-element.mjs","../utils/is-dom-keyframes.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs","./resolve-subjects.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animate/resolve-subjects.mjs","./single-value.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animate/single-value.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animate/sequence.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateSequence = animateSequence;
var _index = require("../generators/spring/index.mjs");
var _create = require("../sequence/create.mjs");
var _subject = require("./subject.mjs");
function animateSequence(sequence, options, scope) {
  const animations = [];
  const animationDefinitions = (0, _create.createAnimationsFromSequence)(sequence, options, scope, {
    spring: _index.spring
  });
  animationDefinitions.forEach(({
    keyframes,
    transition
  }, subject) => {
    animations.push(...(0, _subject.animateSubject)(subject, keyframes, transition));
  });
  return animations;
}
},{"../generators/spring/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/spring/index.mjs","../sequence/create.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/sequence/create.mjs","./subject.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animate/subject.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animate/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animate = void 0;
exports.createScopedAnimate = createScopedAnimate;
var _GroupPlaybackControls = require("../GroupPlaybackControls.mjs");
var _sequence = require("./sequence.mjs");
var _subject = require("./subject.mjs");
function isSequence(value) {
  return Array.isArray(value) && Array.isArray(value[0]);
}
/**
 * Creates an animation function that is optionally scoped
 * to a specific element.
 */
function createScopedAnimate(scope) {
  /**
   * Implementation
   */
  function scopedAnimate(subjectOrSequence, optionsOrKeyframes, options) {
    let animations = [];
    if (isSequence(subjectOrSequence)) {
      animations = (0, _sequence.animateSequence)(subjectOrSequence, optionsOrKeyframes, scope);
    } else {
      animations = (0, _subject.animateSubject)(subjectOrSequence, optionsOrKeyframes, options, scope);
    }
    const animation = new _GroupPlaybackControls.GroupPlaybackControls(animations);
    if (scope) {
      scope.animations.push(animation);
    }
    return animation;
  }
  return scopedAnimate;
}
const animate = exports.animate = createScopedAnimate();
},{"../GroupPlaybackControls.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/GroupPlaybackControls.mjs","./sequence.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animate/sequence.mjs","./subject.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animate/subject.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/style.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCSSVar = setCSSVar;
exports.setStyle = setStyle;
function setCSSVar(element, name, value) {
  element.style.setProperty(`--${name}`, value);
}
function setStyle(element, name, value) {
  element.style[name] = value;
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/supports-partial-keyframes.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportsPartialKeyframes = void 0;
var _memo = require("../../../../utils/memo.mjs");
const supportsPartialKeyframes = exports.supportsPartialKeyframes = /*@__PURE__*/(0, _memo.memo)(() => {
  try {
    document.createElement("div").animate({
      opacity: [1]
    });
  } catch (e) {
    return false;
  }
  return true;
});
},{"../../../../utils/memo.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/memo.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/NativeAnimation.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NativeAnimation = void 0;
var _index = require("./index.mjs");
var _createGeneratorEasing = require("../../../easing/utils/create-generator-easing.mjs");
var _numberBrowser = require("../../../render/dom/value-types/number-browser.mjs");
var _errors = require("../../../utils/errors.mjs");
var _noop = require("../../../utils/noop.mjs");
var _timeConversion = require("../../../utils/time-conversion.mjs");
var _isGenerator = require("../../generators/utils/is-generator.mjs");
var _attachTimeline = require("./utils/attach-timeline.mjs");
var _getFinalKeyframe = require("./utils/get-final-keyframe.mjs");
var _style = require("./utils/style.mjs");
var _supportsLinearEasing = require("./utils/supports-linear-easing.mjs");
var _supportsPartialKeyframes = require("./utils/supports-partial-keyframes.mjs");
var _supportsWaapi = require("./utils/supports-waapi.mjs");
const state = new WeakMap();
function hydrateKeyframes(valueName, keyframes, read) {
  for (let i = 0; i < keyframes.length; i++) {
    if (keyframes[i] === null) {
      keyframes[i] = i === 0 ? read() : keyframes[i - 1];
    }
    if (typeof keyframes[i] === "number" && _numberBrowser.browserNumberValueTypes[valueName]) {
      keyframes[i] = _numberBrowser.browserNumberValueTypes[valueName].transform(keyframes[i]);
    }
  }
  if (!(0, _supportsPartialKeyframes.supportsPartialKeyframes)() && keyframes.length < 2) {
    keyframes.unshift(read());
  }
}
const defaultEasing = "easeOut";
function getElementAnimationState(element) {
  const animationState = state.get(element) || new Map();
  state.set(element, animationState);
  return state.get(element);
}
class NativeAnimation {
  constructor(element, valueName, valueKeyframes, options) {
    const isCSSVar = valueName.startsWith("--");
    this.setValue = isCSSVar ? _style.setCSSVar : _style.setStyle;
    this.options = options;
    this.updateFinishedPromise();
    (0, _errors.invariant)(typeof options.type !== "string", `animateMini doesn't support "type" as a string. Did you mean to import { spring } from "framer-motion"?`);
    const existingAnimation = getElementAnimationState(element).get(valueName);
    existingAnimation && existingAnimation.stop();
    const readInitialKeyframe = () => {
      return valueName.startsWith("--") ? element.style.getPropertyValue(valueName) : window.getComputedStyle(element)[valueName];
    };
    if (!Array.isArray(valueKeyframes)) {
      valueKeyframes = [valueKeyframes];
    }
    hydrateKeyframes(valueName, valueKeyframes, readInitialKeyframe);
    if ((0, _isGenerator.isGenerator)(options.type)) {
      const generatorOptions = (0, _createGeneratorEasing.createGeneratorEasing)(options, 100, options.type);
      options.ease = (0, _supportsLinearEasing.supportsLinearEasing)() ? generatorOptions.ease : defaultEasing;
      options.duration = (0, _timeConversion.secondsToMilliseconds)(generatorOptions.duration);
      options.type = "keyframes";
    } else {
      options.ease = options.ease || defaultEasing;
    }
    this.removeAnimation = () => {
      var _a;
      return (_a = state.get(element)) === null || _a === void 0 ? void 0 : _a.delete(valueName);
    };
    const onFinish = () => {
      this.setValue(element, valueName, (0, _getFinalKeyframe.getFinalKeyframe)(valueKeyframes, this.options));
      this.cancel();
      this.resolveFinishedPromise();
    };
    if (!(0, _supportsWaapi.supportsWaapi)()) {
      onFinish();
    } else {
      this.animation = (0, _index.startWaapiAnimation)(element, valueName, valueKeyframes, options);
      if (options.autoplay === false) {
        this.animation.pause();
      }
      this.animation.onfinish = onFinish;
      if (this.pendingTimeline) {
        (0, _attachTimeline.attachTimeline)(this.animation, this.pendingTimeline);
      }
      getElementAnimationState(element).set(valueName, this);
    }
  }
  get duration() {
    return (0, _timeConversion.millisecondsToSeconds)(this.options.duration || 300);
  }
  get time() {
    var _a;
    if (this.animation) {
      return (0, _timeConversion.millisecondsToSeconds)(((_a = this.animation) === null || _a === void 0 ? void 0 : _a.currentTime) || 0);
    }
    return 0;
  }
  set time(newTime) {
    if (this.animation) {
      this.animation.currentTime = (0, _timeConversion.secondsToMilliseconds)(newTime);
    }
  }
  get speed() {
    return this.animation ? this.animation.playbackRate : 1;
  }
  set speed(newSpeed) {
    if (this.animation) {
      this.animation.playbackRate = newSpeed;
    }
  }
  get state() {
    return this.animation ? this.animation.playState : "finished";
  }
  get startTime() {
    return this.animation ? this.animation.startTime : null;
  }
  flatten() {
    var _a;
    if (!this.animation) return;
    (_a = this.animation.effect) === null || _a === void 0 ? void 0 : _a.updateTiming({
      easing: "linear"
    });
  }
  play() {
    if (this.state === "finished") {
      this.updateFinishedPromise();
    }
    this.animation && this.animation.play();
  }
  pause() {
    this.animation && this.animation.pause();
  }
  stop() {
    if (!this.animation || this.state === "idle" || this.state === "finished") {
      return;
    }
    if (this.animation.commitStyles) {
      this.animation.commitStyles();
    }
    this.cancel();
  }
  complete() {
    this.animation && this.animation.finish();
  }
  cancel() {
    this.removeAnimation();
    try {
      this.animation && this.animation.cancel();
    } catch (e) {}
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(resolve, reject) {
    return this.currentFinishedPromise.then(resolve, reject);
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise(resolve => {
      this.resolveFinishedPromise = resolve;
    });
  }
  attachTimeline(timeline) {
    if (!this.animation) {
      this.pendingTimeline = timeline;
    } else {
      (0, _attachTimeline.attachTimeline)(this.animation, timeline);
    }
    return _noop.noop;
  }
}
exports.NativeAnimation = NativeAnimation;
},{"./index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/index.mjs","../../../easing/utils/create-generator-easing.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/utils/create-generator-easing.mjs","../../../render/dom/value-types/number-browser.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/value-types/number-browser.mjs","../../../utils/errors.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/errors.mjs","../../../utils/noop.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/noop.mjs","../../../utils/time-conversion.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/time-conversion.mjs","../../generators/utils/is-generator.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/utils/is-generator.mjs","./utils/attach-timeline.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/attach-timeline.mjs","./utils/get-final-keyframe.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs","./utils/style.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/style.mjs","./utils/supports-linear-easing.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/supports-linear-easing.mjs","./utils/supports-partial-keyframes.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/supports-partial-keyframes.mjs","./utils/supports-waapi.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/supports-waapi.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/animate-elements.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateElements = animateElements;
var _resolveElement = require("../../../render/dom/utils/resolve-element.mjs");
var _errors = require("../../../utils/errors.mjs");
var _timeConversion = require("../../../utils/time-conversion.mjs");
var _getValueTransition = require("../../utils/get-value-transition.mjs");
var _NativeAnimation = require("./NativeAnimation.mjs");
function animateElements(elementOrSelector, keyframes, options, scope) {
  const elements = (0, _resolveElement.resolveElements)(elementOrSelector, scope);
  const numElements = elements.length;
  (0, _errors.invariant)(Boolean(numElements), "No valid element provided.");
  const animations = [];
  for (let i = 0; i < numElements; i++) {
    const element = elements[i];
    const elementTransition = {
      ...options
    };
    /**
     * Resolve stagger function if provided.
     */
    if (typeof elementTransition.delay === "function") {
      elementTransition.delay = elementTransition.delay(i, numElements);
    }
    for (const valueName in keyframes) {
      const valueKeyframes = keyframes[valueName];
      const valueOptions = {
        ...(0, _getValueTransition.getValueTransition)(elementTransition, valueName)
      };
      valueOptions.duration = valueOptions.duration ? (0, _timeConversion.secondsToMilliseconds)(valueOptions.duration) : valueOptions.duration;
      valueOptions.delay = (0, _timeConversion.secondsToMilliseconds)(valueOptions.delay || 0);
      animations.push(new _NativeAnimation.NativeAnimation(element, valueName, valueKeyframes, valueOptions));
    }
  }
  return animations;
}
},{"../../../render/dom/utils/resolve-element.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/resolve-element.mjs","../../../utils/errors.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/errors.mjs","../../../utils/time-conversion.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/time-conversion.mjs","../../utils/get-value-transition.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/get-value-transition.mjs","./NativeAnimation.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/NativeAnimation.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/animate-style.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createScopedWaapiAnimate = exports.animateMini = void 0;
var _GroupPlaybackControls = require("../../GroupPlaybackControls.mjs");
var _animateElements = require("./animate-elements.mjs");
const createScopedWaapiAnimate = scope => {
  function scopedAnimate(elementOrSelector, keyframes, options) {
    return new _GroupPlaybackControls.GroupPlaybackControls((0, _animateElements.animateElements)(elementOrSelector, keyframes, options, scope));
  }
  return scopedAnimate;
};
exports.createScopedWaapiAnimate = createScopedWaapiAnimate;
const animateMini = exports.animateMini = /*@__PURE__*/createScopedWaapiAnimate();
},{"../../GroupPlaybackControls.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/GroupPlaybackControls.mjs","./animate-elements.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/animate-elements.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/resize/handle-element.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resizeElement = resizeElement;
var _resolveElement = require("../utils/resolve-element.mjs");
const resizeHandlers = new WeakMap();
let observer;
function getElementSize(target, borderBoxSize) {
  if (borderBoxSize) {
    const {
      inlineSize,
      blockSize
    } = borderBoxSize[0];
    return {
      width: inlineSize,
      height: blockSize
    };
  } else if (target instanceof SVGElement && "getBBox" in target) {
    return target.getBBox();
  } else {
    return {
      width: target.offsetWidth,
      height: target.offsetHeight
    };
  }
}
function notifyTarget({
  target,
  contentRect,
  borderBoxSize
}) {
  var _a;
  (_a = resizeHandlers.get(target)) === null || _a === void 0 ? void 0 : _a.forEach(handler => {
    handler({
      target,
      contentSize: contentRect,
      get size() {
        return getElementSize(target, borderBoxSize);
      }
    });
  });
}
function notifyAll(entries) {
  entries.forEach(notifyTarget);
}
function createResizeObserver() {
  if (typeof ResizeObserver === "undefined") return;
  observer = new ResizeObserver(notifyAll);
}
function resizeElement(target, handler) {
  if (!observer) createResizeObserver();
  const elements = (0, _resolveElement.resolveElements)(target);
  elements.forEach(element => {
    let elementHandlers = resizeHandlers.get(element);
    if (!elementHandlers) {
      elementHandlers = new Set();
      resizeHandlers.set(element, elementHandlers);
    }
    elementHandlers.add(handler);
    observer === null || observer === void 0 ? void 0 : observer.observe(element);
  });
  return () => {
    elements.forEach(element => {
      const elementHandlers = resizeHandlers.get(element);
      elementHandlers === null || elementHandlers === void 0 ? void 0 : elementHandlers.delete(handler);
      if (!(elementHandlers === null || elementHandlers === void 0 ? void 0 : elementHandlers.size)) {
        observer === null || observer === void 0 ? void 0 : observer.unobserve(element);
      }
    });
  };
}
},{"../utils/resolve-element.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/resolve-element.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/resize/handle-window.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resizeWindow = resizeWindow;
const windowCallbacks = new Set();
let windowResizeHandler;
function createWindowResizeHandler() {
  windowResizeHandler = () => {
    const size = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    const info = {
      target: window,
      size,
      contentSize: size
    };
    windowCallbacks.forEach(callback => callback(info));
  };
  window.addEventListener("resize", windowResizeHandler);
}
function resizeWindow(callback) {
  windowCallbacks.add(callback);
  if (!windowResizeHandler) createWindowResizeHandler();
  return () => {
    windowCallbacks.delete(callback);
    if (!windowCallbacks.size && windowResizeHandler) {
      windowResizeHandler = undefined;
    }
  };
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/resize/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resize = resize;
var _handleElement = require("./handle-element.mjs");
var _handleWindow = require("./handle-window.mjs");
function resize(a, b) {
  return typeof a === "function" ? (0, _handleWindow.resizeWindow)(a) : (0, _handleElement.resizeElement)(a, b);
}
},{"./handle-element.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/resize/handle-element.mjs","./handle-window.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/resize/handle-window.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/info.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createScrollInfo = void 0;
exports.updateScrollInfo = updateScrollInfo;
var _progress = require("../../../utils/progress.mjs");
var _velocityPerSecond = require("../../../utils/velocity-per-second.mjs");
/**
 * A time in milliseconds, beyond which we consider the scroll velocity to be 0.
 */
const maxElapsed = 50;
const createAxisInfo = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
});
const createScrollInfo = () => ({
  time: 0,
  x: createAxisInfo(),
  y: createAxisInfo()
});
exports.createScrollInfo = createScrollInfo;
const keys = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function updateAxisInfo(element, axisName, info, time) {
  const axis = info[axisName];
  const {
    length,
    position
  } = keys[axisName];
  const prev = axis.current;
  const prevTime = info.time;
  axis.current = element[`scroll${position}`];
  axis.scrollLength = element[`scroll${length}`] - element[`client${length}`];
  axis.offset.length = 0;
  axis.offset[0] = 0;
  axis.offset[1] = axis.scrollLength;
  axis.progress = (0, _progress.progress)(0, axis.scrollLength, axis.current);
  const elapsed = time - prevTime;
  axis.velocity = elapsed > maxElapsed ? 0 : (0, _velocityPerSecond.velocityPerSecond)(axis.current - prev, elapsed);
}
function updateScrollInfo(element, info, time) {
  updateAxisInfo(element, "x", info, time);
  updateAxisInfo(element, "y", info, time);
  info.time = time;
}
},{"../../../utils/progress.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/progress.mjs","../../../utils/velocity-per-second.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/velocity-per-second.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/offsets/inset.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcInset = calcInset;
function calcInset(element, container) {
  const inset = {
    x: 0,
    y: 0
  };
  let current = element;
  while (current && current !== container) {
    if (current instanceof HTMLElement) {
      inset.x += current.offsetLeft;
      inset.y += current.offsetTop;
      current = current.offsetParent;
    } else if (current.tagName === "svg") {
      /**
       * This isn't an ideal approach to measuring the offset of <svg /> tags.
       * It would be preferable, given they behave like HTMLElements in most ways
       * to use offsetLeft/Top. But these don't exist on <svg />. Likewise we
       * can't use .getBBox() like most SVG elements as these provide the offset
       * relative to the SVG itself, which for <svg /> is usually 0x0.
       */
      const svgBoundingBox = current.getBoundingClientRect();
      current = current.parentElement;
      const parentBoundingBox = current.getBoundingClientRect();
      inset.x += svgBoundingBox.left - parentBoundingBox.left;
      inset.y += svgBoundingBox.top - parentBoundingBox.top;
    } else if (current instanceof SVGGraphicsElement) {
      const {
        x,
        y
      } = current.getBBox();
      inset.x += x;
      inset.y += y;
      let svg = null;
      let parent = current.parentNode;
      while (!svg) {
        if (parent.tagName === "svg") {
          svg = parent;
        }
        parent = current.parentNode;
      }
      current = svg;
    } else {
      break;
    }
  }
  return inset;
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/offsets/presets.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollOffset = void 0;
const ScrollOffset = exports.ScrollOffset = {
  Enter: [[0, 1], [1, 1]],
  Exit: [[0, 0], [1, 0]],
  Any: [[1, 0], [0, 1]],
  All: [[0, 0], [1, 1]]
};
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/offsets/edge.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.namedEdges = void 0;
exports.resolveEdge = resolveEdge;
const namedEdges = exports.namedEdges = {
  start: 0,
  center: 0.5,
  end: 1
};
function resolveEdge(edge, length, inset = 0) {
  let delta = 0;
  /**
   * If we have this edge defined as a preset, replace the definition
   * with the numerical value.
   */
  if (edge in namedEdges) {
    edge = namedEdges[edge];
  }
  /**
   * Handle unit values
   */
  if (typeof edge === "string") {
    const asNumber = parseFloat(edge);
    if (edge.endsWith("px")) {
      delta = asNumber;
    } else if (edge.endsWith("%")) {
      edge = asNumber / 100;
    } else if (edge.endsWith("vw")) {
      delta = asNumber / 100 * document.documentElement.clientWidth;
    } else if (edge.endsWith("vh")) {
      delta = asNumber / 100 * document.documentElement.clientHeight;
    } else {
      edge = asNumber;
    }
  }
  /**
   * If the edge is defined as a number, handle as a progress value.
   */
  if (typeof edge === "number") {
    delta = length * edge;
  }
  return inset + delta;
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/offsets/offset.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveOffset = resolveOffset;
var _edge = require("./edge.mjs");
const defaultOffset = [0, 0];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
  let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset;
  let targetPoint = 0;
  let containerPoint = 0;
  if (typeof offset === "number") {
    /**
     * If we're provided offset: [0, 0.5, 1] then each number x should become
     * [x, x], so we default to the behaviour of mapping 0 => 0 of both target
     * and container etc.
     */
    offsetDefinition = [offset, offset];
  } else if (typeof offset === "string") {
    offset = offset.trim();
    if (offset.includes(" ")) {
      offsetDefinition = offset.split(" ");
    } else {
      /**
       * If we're provided a definition like "100px" then we want to apply
       * that only to the top of the target point, leaving the container at 0.
       * Whereas a named offset like "end" should be applied to both.
       */
      offsetDefinition = [offset, _edge.namedEdges[offset] ? offset : `0`];
    }
  }
  targetPoint = (0, _edge.resolveEdge)(offsetDefinition[0], targetLength, targetInset);
  containerPoint = (0, _edge.resolveEdge)(offsetDefinition[1], containerLength);
  return targetPoint - containerPoint;
}
},{"./edge.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/offsets/edge.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/offsets/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveOffsets = resolveOffsets;
var _inset = require("./inset.mjs");
var _presets = require("./presets.mjs");
var _offset = require("./offset.mjs");
var _interpolate = require("../../../../utils/interpolate.mjs");
var _default = require("../../../../utils/offsets/default.mjs");
const point = {
  x: 0,
  y: 0
};
function getTargetSize(target) {
  return "getBBox" in target && target.tagName !== "svg" ? target.getBBox() : {
    width: target.clientWidth,
    height: target.clientHeight
  };
}
function resolveOffsets(container, info, options) {
  const {
    offset: offsetDefinition = _presets.ScrollOffset.All
  } = options;
  const {
    target = container,
    axis = "y"
  } = options;
  const lengthLabel = axis === "y" ? "height" : "width";
  const inset = target !== container ? (0, _inset.calcInset)(target, container) : point;
  /**
   * Measure the target and container. If they're the same thing then we
   * use the container's scrollWidth/Height as the target, from there
   * all other calculations can remain the same.
   */
  const targetSize = target === container ? {
    width: container.scrollWidth,
    height: container.scrollHeight
  } : getTargetSize(target);
  const containerSize = {
    width: container.clientWidth,
    height: container.clientHeight
  };
  /**
   * Reset the length of the resolved offset array rather than creating a new one.
   * TODO: More reusable data structures for targetSize/containerSize would also be good.
   */
  info[axis].offset.length = 0;
  /**
   * Populate the offset array by resolving the user's offset definition into
   * a list of pixel scroll offets.
   */
  let hasChanged = !info[axis].interpolate;
  const numOffsets = offsetDefinition.length;
  for (let i = 0; i < numOffsets; i++) {
    const offset = (0, _offset.resolveOffset)(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
    if (!hasChanged && offset !== info[axis].interpolatorOffsets[i]) {
      hasChanged = true;
    }
    info[axis].offset[i] = offset;
  }
  /**
   * If the pixel scroll offsets have changed, create a new interpolator function
   * to map scroll value into a progress.
   */
  if (hasChanged) {
    info[axis].interpolate = (0, _interpolate.interpolate)(info[axis].offset, (0, _default.defaultOffset)(offsetDefinition));
    info[axis].interpolatorOffsets = [...info[axis].offset];
  }
  info[axis].progress = info[axis].interpolate(info[axis].current);
}
},{"./inset.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/offsets/inset.mjs","./presets.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/offsets/presets.mjs","./offset.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/offsets/offset.mjs","../../../../utils/interpolate.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/interpolate.mjs","../../../../utils/offsets/default.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/offsets/default.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/on-scroll-handler.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOnScrollHandler = createOnScrollHandler;
var _warnOnce = require("../../../utils/warn-once.mjs");
var _info = require("./info.mjs");
var _index = require("./offsets/index.mjs");
function measure(container, target = container, info) {
  /**
   * Find inset of target within scrollable container
   */
  info.x.targetOffset = 0;
  info.y.targetOffset = 0;
  if (target !== container) {
    let node = target;
    while (node && node !== container) {
      info.x.targetOffset += node.offsetLeft;
      info.y.targetOffset += node.offsetTop;
      node = node.offsetParent;
    }
  }
  info.x.targetLength = target === container ? target.scrollWidth : target.clientWidth;
  info.y.targetLength = target === container ? target.scrollHeight : target.clientHeight;
  info.x.containerLength = container.clientWidth;
  info.y.containerLength = container.clientHeight;
  /**
   * In development mode ensure scroll containers aren't position: static as this makes
   * it difficult to measure their relative positions.
   */
  if ("development" !== "production") {
    if (container && target && target !== container) {
      (0, _warnOnce.warnOnce)(getComputedStyle(container).position !== "static", "Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly.");
    }
  }
}
function createOnScrollHandler(element, onScroll, info, options = {}) {
  return {
    measure: () => measure(element, options.target, info),
    update: time => {
      (0, _info.updateScrollInfo)(element, info, time);
      if (options.offset || options.target) {
        (0, _index.resolveOffsets)(element, info, options);
      }
    },
    notify: () => onScroll(info)
  };
}
},{"../../../utils/warn-once.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/warn-once.mjs","./info.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/info.mjs","./offsets/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/offsets/index.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/track.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollInfo = scrollInfo;
var _index = require("../resize/index.mjs");
var _info = require("./info.mjs");
var _onScrollHandler = require("./on-scroll-handler.mjs");
var _frame = require("../../../frameloop/frame.mjs");
const scrollListeners = new WeakMap();
const resizeListeners = new WeakMap();
const onScrollHandlers = new WeakMap();
const getEventTarget = element => element === document.documentElement ? window : element;
function scrollInfo(onScroll, {
  container = document.documentElement,
  ...options
} = {}) {
  let containerHandlers = onScrollHandlers.get(container);
  /**
   * Get the onScroll handlers for this container.
   * If one isn't found, create a new one.
   */
  if (!containerHandlers) {
    containerHandlers = new Set();
    onScrollHandlers.set(container, containerHandlers);
  }
  /**
   * Create a new onScroll handler for the provided callback.
   */
  const info = (0, _info.createScrollInfo)();
  const containerHandler = (0, _onScrollHandler.createOnScrollHandler)(container, onScroll, info, options);
  containerHandlers.add(containerHandler);
  /**
   * Check if there's a scroll event listener for this container.
   * If not, create one.
   */
  if (!scrollListeners.has(container)) {
    const measureAll = () => {
      for (const handler of containerHandlers) handler.measure();
    };
    const updateAll = () => {
      for (const handler of containerHandlers) {
        handler.update(_frame.frameData.timestamp);
      }
    };
    const notifyAll = () => {
      for (const handler of containerHandlers) handler.notify();
    };
    const listener = () => {
      _frame.frame.read(measureAll, false, true);
      _frame.frame.read(updateAll, false, true);
      _frame.frame.update(notifyAll, false, true);
    };
    scrollListeners.set(container, listener);
    const target = getEventTarget(container);
    window.addEventListener("resize", listener, {
      passive: true
    });
    if (container !== document.documentElement) {
      resizeListeners.set(container, (0, _index.resize)(container, listener));
    }
    target.addEventListener("scroll", listener, {
      passive: true
    });
  }
  const listener = scrollListeners.get(container);
  _frame.frame.read(listener, false, true);
  return () => {
    var _a;
    (0, _frame.cancelFrame)(listener);
    /**
     * Check if we even have any handlers for this container.
     */
    const currentHandlers = onScrollHandlers.get(container);
    if (!currentHandlers) return;
    currentHandlers.delete(containerHandler);
    if (currentHandlers.size) return;
    /**
     * If no more handlers, remove the scroll listener too.
     */
    const scrollListener = scrollListeners.get(container);
    scrollListeners.delete(container);
    if (scrollListener) {
      getEventTarget(container).removeEventListener("scroll", scrollListener);
      (_a = resizeListeners.get(container)) === null || _a === void 0 ? void 0 : _a();
      window.removeEventListener("resize", scrollListener);
    }
  };
}
},{"../resize/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/resize/index.mjs","./info.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/info.mjs","./on-scroll-handler.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/on-scroll-handler.mjs","../../../frameloop/frame.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/frame.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/observe.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observeTimeline = observeTimeline;
var _frame = require("../../../frameloop/frame.mjs");
function observeTimeline(update, timeline) {
  let prevProgress;
  const onFrame = () => {
    const {
      currentTime
    } = timeline;
    const percentage = currentTime === null ? 0 : currentTime.value;
    const progress = percentage / 100;
    if (prevProgress !== progress) {
      update(progress);
    }
    prevProgress = progress;
  };
  _frame.frame.update(onFrame, true);
  return () => (0, _frame.cancelFrame)(onFrame);
}
},{"../../../frameloop/frame.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/frame.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scroll = scroll;
var _track = require("./track.mjs");
var _observe = require("./observe.mjs");
var _supports = require("./supports.mjs");
var _noop = require("../../../utils/noop.mjs");
function scrollTimelineFallback({
  source,
  container,
  axis = "y"
}) {
  // Support legacy source argument. Deprecate later.
  if (source) container = source;
  // ScrollTimeline records progress as a percentage CSSUnitValue
  const currentTime = {
    value: 0
  };
  const cancel = (0, _track.scrollInfo)(info => {
    currentTime.value = info[axis].progress * 100;
  }, {
    container,
    axis
  });
  return {
    currentTime,
    cancel
  };
}
const timelineCache = new Map();
function getTimeline({
  source,
  container = document.documentElement,
  axis = "y"
} = {}) {
  // Support legacy source argument. Deprecate later.
  if (source) container = source;
  if (!timelineCache.has(container)) {
    timelineCache.set(container, {});
  }
  const elementCache = timelineCache.get(container);
  if (!elementCache[axis]) {
    elementCache[axis] = (0, _supports.supportsScrollTimeline)() ? new ScrollTimeline({
      source: container,
      axis
    }) : scrollTimelineFallback({
      source: container,
      axis
    });
  }
  return elementCache[axis];
}
/**
 * If the onScroll function has two arguments, it's expecting
 * more specific information about the scroll from scrollInfo.
 */
function isOnScrollWithInfo(onScroll) {
  return onScroll.length === 2;
}
/**
 * Currently, we only support element tracking with `scrollInfo`, though in
 * the future we can also offer ViewTimeline support.
 */
function needsElementTracking(options) {
  return options && (options.target || options.offset);
}
function scrollFunction(onScroll, options) {
  if (isOnScrollWithInfo(onScroll) || needsElementTracking(options)) {
    return (0, _track.scrollInfo)(info => {
      onScroll(info[options.axis].progress, info);
    }, options);
  } else {
    return (0, _observe.observeTimeline)(onScroll, getTimeline(options));
  }
}
function scrollAnimation(animation, options) {
  animation.flatten();
  if (needsElementTracking(options)) {
    animation.pause();
    return (0, _track.scrollInfo)(info => {
      animation.time = animation.duration * info[options.axis].progress;
    }, options);
  } else {
    const timeline = getTimeline(options);
    if (animation.attachTimeline) {
      return animation.attachTimeline(timeline, valueAnimation => {
        valueAnimation.pause();
        return (0, _observe.observeTimeline)(progress => {
          valueAnimation.time = valueAnimation.duration * progress;
        }, timeline);
      });
    } else {
      return _noop.noop;
    }
  }
}
function scroll(onScroll, {
  axis = "y",
  ...options
} = {}) {
  const optionsWithDefaults = {
    axis,
    ...options
  };
  return typeof onScroll === "function" ? scrollFunction(onScroll, optionsWithDefaults) : scrollAnimation(onScroll, optionsWithDefaults);
}
},{"./track.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/track.mjs","./observe.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/observe.mjs","./supports.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/supports.mjs","../../../utils/noop.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/noop.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/viewport/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inView = inView;
var _resolveElement = require("../utils/resolve-element.mjs");
const thresholds = {
  some: 0,
  all: 1
};
function inView(elementOrSelector, onStart, {
  root,
  margin: rootMargin,
  amount = "some"
} = {}) {
  const elements = (0, _resolveElement.resolveElements)(elementOrSelector);
  const activeIntersections = new WeakMap();
  const onIntersectionChange = entries => {
    entries.forEach(entry => {
      const onEnd = activeIntersections.get(entry.target);
      /**
       * If there's no change to the intersection, we don't need to
       * do anything here.
       */
      if (entry.isIntersecting === Boolean(onEnd)) return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry);
        if (typeof newOnEnd === "function") {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer.unobserve(entry.target);
        }
      } else if (onEnd) {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach(element => observer.observe(element));
  return () => observer.disconnect();
}
},{"../utils/resolve-element.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/resolve-element.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/steps.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.steps = steps;
var _clamp = require("../utils/clamp.mjs");
function steps(numSteps, direction = "end") {
  return progress => {
    progress = direction === "end" ? Math.min(progress, 0.999) : Math.max(progress, 0.001);
    const expanded = progress * numSteps;
    const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
    return (0, _clamp.clamp)(0, 1, rounded / numSteps);
  };
}
},{"../utils/clamp.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/clamp.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/stagger.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOriginIndex = getOriginIndex;
exports.stagger = stagger;
var _map = require("../../easing/utils/map.mjs");
function getOriginIndex(from, total) {
  if (from === "first") {
    return 0;
  } else {
    const lastIndex = total - 1;
    return from === "last" ? lastIndex : lastIndex / 2;
  }
}
function stagger(duration = 0.1, {
  startDelay = 0,
  from = 0,
  ease
} = {}) {
  return (i, total) => {
    const fromIndex = typeof from === "number" ? from : getOriginIndex(from, total);
    const distance = Math.abs(fromIndex - i);
    let delay = duration * distance;
    if (ease) {
      const maxDelay = total * duration;
      const easingFunction = (0, _map.easingDefinitionToFunction)(ease);
      delay = easingFunction(delay / maxDelay) * maxDelay;
    }
    return startDelay + delay;
  };
}
},{"../../easing/utils/map.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/utils/map.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/transform.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = transform;
var _interpolate = require("./interpolate.mjs");
const isCustomValueType = v => {
  return v && typeof v === "object" && v.mix;
};
const getMixer = v => isCustomValueType(v) ? v.mix : undefined;
function transform(...args) {
  const useImmediate = !Array.isArray(args[0]);
  const argOffset = useImmediate ? 0 : -1;
  const inputValue = args[0 + argOffset];
  const inputRange = args[1 + argOffset];
  const outputRange = args[2 + argOffset];
  const options = args[3 + argOffset];
  const interpolator = (0, _interpolate.interpolate)(inputRange, outputRange, {
    mixer: getMixer(outputRange[0]),
    ...options
  });
  return useImmediate ? interpolator(inputValue) : interpolator;
}
},{"./interpolate.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/interpolate.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/delay.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delay = delay;
exports.delayInSeconds = delayInSeconds;
var _syncTime = require("../frameloop/sync-time.mjs");
var _timeConversion = require("./time-conversion.mjs");
var _frame = require("../frameloop/frame.mjs");
/**
 * Timeout defined in ms
 */
function delay(callback, timeout) {
  const start = _syncTime.time.now();
  const checkElapsed = ({
    timestamp
  }) => {
    const elapsed = timestamp - start;
    if (elapsed >= timeout) {
      (0, _frame.cancelFrame)(checkElapsed);
      callback(elapsed - timeout);
    }
  };
  _frame.frame.read(checkElapsed, true);
  return () => (0, _frame.cancelFrame)(checkElapsed);
}
function delayInSeconds(callback, timeout) {
  return delay(callback, (0, _timeConversion.secondsToMilliseconds)(timeout));
}
},{"../frameloop/sync-time.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/sync-time.mjs","./time-conversion.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/time-conversion.mjs","../frameloop/frame.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/frame.mjs"}],"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/distance.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distance = void 0;
exports.distance2D = distance2D;
const distance = (a, b) => Math.abs(a - b);
exports.distance = distance;
function distance2D(a, b) {
  // Multi-dimensional
  const xDelta = distance(a.x, b.x);
  const yDelta = distance(a.y, b.y);
  return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}
},{}],"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/index-legacy.mjs":[function(require,module,exports) {
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sync = exports.cancelSync = void 0;
var _batcher = require("./batcher.mjs");
var _frame = require("./frame.mjs");
/**
 * @deprecated
 *
 * Import as `frame` instead.
 */
const sync = exports.sync = _frame.frame;
/**
 * @deprecated
 *
 * Use cancelFrame(callback) instead.
 */
const cancelSync = exports.cancelSync = _batcher.stepsOrder.reduce((acc, key) => {
  acc[key] = process => (0, _frame.cancelFrame)(process);
  return acc;
}, {});
},{"./batcher.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/batcher.mjs","./frame.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/frame.mjs","process":"../../.nvm/versions/node/v22.11.0/lib/node_modules/parcel-bundler/node_modules/process/browser.js"}],"../../node_modules/motion/dist/es/motion/lib/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MotionValue", {
  enumerable: true,
  get: function () {
    return _index.MotionValue;
  }
});
Object.defineProperty(exports, "animate", {
  enumerable: true,
  get: function () {
    return _index2.animate;
  }
});
Object.defineProperty(exports, "animateMini", {
  enumerable: true,
  get: function () {
    return _animateStyle.animateMini;
  }
});
Object.defineProperty(exports, "anticipate", {
  enumerable: true,
  get: function () {
    return _anticipate.anticipate;
  }
});
Object.defineProperty(exports, "backIn", {
  enumerable: true,
  get: function () {
    return _back.backIn;
  }
});
Object.defineProperty(exports, "backInOut", {
  enumerable: true,
  get: function () {
    return _back.backInOut;
  }
});
Object.defineProperty(exports, "backOut", {
  enumerable: true,
  get: function () {
    return _back.backOut;
  }
});
Object.defineProperty(exports, "cancelFrame", {
  enumerable: true,
  get: function () {
    return _frame.cancelFrame;
  }
});
Object.defineProperty(exports, "cancelSync", {
  enumerable: true,
  get: function () {
    return _indexLegacy.cancelSync;
  }
});
Object.defineProperty(exports, "circIn", {
  enumerable: true,
  get: function () {
    return _circ.circIn;
  }
});
Object.defineProperty(exports, "circInOut", {
  enumerable: true,
  get: function () {
    return _circ.circInOut;
  }
});
Object.defineProperty(exports, "circOut", {
  enumerable: true,
  get: function () {
    return _circ.circOut;
  }
});
Object.defineProperty(exports, "clamp", {
  enumerable: true,
  get: function () {
    return _clamp.clamp;
  }
});
Object.defineProperty(exports, "createScopedAnimate", {
  enumerable: true,
  get: function () {
    return _index2.createScopedAnimate;
  }
});
Object.defineProperty(exports, "cubicBezier", {
  enumerable: true,
  get: function () {
    return _cubicBezier.cubicBezier;
  }
});
Object.defineProperty(exports, "delay", {
  enumerable: true,
  get: function () {
    return _delay.delayInSeconds;
  }
});
Object.defineProperty(exports, "distance", {
  enumerable: true,
  get: function () {
    return _distance.distance;
  }
});
Object.defineProperty(exports, "distance2D", {
  enumerable: true,
  get: function () {
    return _distance.distance2D;
  }
});
Object.defineProperty(exports, "easeIn", {
  enumerable: true,
  get: function () {
    return _ease.easeIn;
  }
});
Object.defineProperty(exports, "easeInOut", {
  enumerable: true,
  get: function () {
    return _ease.easeInOut;
  }
});
Object.defineProperty(exports, "easeOut", {
  enumerable: true,
  get: function () {
    return _ease.easeOut;
  }
});
Object.defineProperty(exports, "frame", {
  enumerable: true,
  get: function () {
    return _frame.frame;
  }
});
Object.defineProperty(exports, "frameData", {
  enumerable: true,
  get: function () {
    return _frame.frameData;
  }
});
Object.defineProperty(exports, "frameSteps", {
  enumerable: true,
  get: function () {
    return _frame.frameSteps;
  }
});
Object.defineProperty(exports, "inView", {
  enumerable: true,
  get: function () {
    return _index4.inView;
  }
});
Object.defineProperty(exports, "inertia", {
  enumerable: true,
  get: function () {
    return _inertia.inertia;
  }
});
Object.defineProperty(exports, "interpolate", {
  enumerable: true,
  get: function () {
    return _interpolate.interpolate;
  }
});
Object.defineProperty(exports, "invariant", {
  enumerable: true,
  get: function () {
    return _errors.invariant;
  }
});
Object.defineProperty(exports, "keyframes", {
  enumerable: true,
  get: function () {
    return _keyframes.keyframes;
  }
});
Object.defineProperty(exports, "mirrorEasing", {
  enumerable: true,
  get: function () {
    return _mirror.mirrorEasing;
  }
});
Object.defineProperty(exports, "mix", {
  enumerable: true,
  get: function () {
    return _index6.mix;
  }
});
Object.defineProperty(exports, "motionValue", {
  enumerable: true,
  get: function () {
    return _index.motionValue;
  }
});
Object.defineProperty(exports, "pipe", {
  enumerable: true,
  get: function () {
    return _pipe.pipe;
  }
});
Object.defineProperty(exports, "progress", {
  enumerable: true,
  get: function () {
    return _progress.progress;
  }
});
Object.defineProperty(exports, "reverseEasing", {
  enumerable: true,
  get: function () {
    return _reverse.reverseEasing;
  }
});
Object.defineProperty(exports, "scroll", {
  enumerable: true,
  get: function () {
    return _index3.scroll;
  }
});
Object.defineProperty(exports, "scrollInfo", {
  enumerable: true,
  get: function () {
    return _track.scrollInfo;
  }
});
Object.defineProperty(exports, "spring", {
  enumerable: true,
  get: function () {
    return _index5.spring;
  }
});
Object.defineProperty(exports, "stagger", {
  enumerable: true,
  get: function () {
    return _stagger.stagger;
  }
});
Object.defineProperty(exports, "steps", {
  enumerable: true,
  get: function () {
    return _steps.steps;
  }
});
Object.defineProperty(exports, "sync", {
  enumerable: true,
  get: function () {
    return _indexLegacy.sync;
  }
});
Object.defineProperty(exports, "transform", {
  enumerable: true,
  get: function () {
    return _transform.transform;
  }
});
Object.defineProperty(exports, "warning", {
  enumerable: true,
  get: function () {
    return _errors.warning;
  }
});
Object.defineProperty(exports, "wrap", {
  enumerable: true,
  get: function () {
    return _wrap.wrap;
  }
});
var _index = require("../../framer-motion/dist/es/value/index.mjs");
var _index2 = require("../../framer-motion/dist/es/animation/animate/index.mjs");
var _animateStyle = require("../../framer-motion/dist/es/animation/animators/waapi/animate-style.mjs");
var _index3 = require("../../framer-motion/dist/es/render/dom/scroll/index.mjs");
var _track = require("../../framer-motion/dist/es/render/dom/scroll/track.mjs");
var _index4 = require("../../framer-motion/dist/es/render/dom/viewport/index.mjs");
var _anticipate = require("../../framer-motion/dist/es/easing/anticipate.mjs");
var _back = require("../../framer-motion/dist/es/easing/back.mjs");
var _circ = require("../../framer-motion/dist/es/easing/circ.mjs");
var _ease = require("../../framer-motion/dist/es/easing/ease.mjs");
var _cubicBezier = require("../../framer-motion/dist/es/easing/cubic-bezier.mjs");
var _steps = require("../../framer-motion/dist/es/easing/steps.mjs");
var _mirror = require("../../framer-motion/dist/es/easing/modifiers/mirror.mjs");
var _reverse = require("../../framer-motion/dist/es/easing/modifiers/reverse.mjs");
var _index5 = require("../../framer-motion/dist/es/animation/generators/spring/index.mjs");
var _inertia = require("../../framer-motion/dist/es/animation/generators/inertia.mjs");
var _keyframes = require("../../framer-motion/dist/es/animation/generators/keyframes.mjs");
var _stagger = require("../../framer-motion/dist/es/animation/utils/stagger.mjs");
var _transform = require("../../framer-motion/dist/es/utils/transform.mjs");
var _clamp = require("../../framer-motion/dist/es/utils/clamp.mjs");
var _delay = require("../../framer-motion/dist/es/utils/delay.mjs");
var _distance = require("../../framer-motion/dist/es/utils/distance.mjs");
var _errors = require("../../framer-motion/dist/es/utils/errors.mjs");
var _interpolate = require("../../framer-motion/dist/es/utils/interpolate.mjs");
var _index6 = require("../../framer-motion/dist/es/utils/mix/index.mjs");
var _pipe = require("../../framer-motion/dist/es/utils/pipe.mjs");
var _progress = require("../../framer-motion/dist/es/utils/progress.mjs");
var _wrap = require("../../framer-motion/dist/es/utils/wrap.mjs");
var _indexLegacy = require("../../framer-motion/dist/es/frameloop/index-legacy.mjs");
var _frame = require("../../framer-motion/dist/es/frameloop/frame.mjs");
},{"../../framer-motion/dist/es/value/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/value/index.mjs","../../framer-motion/dist/es/animation/animate/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animate/index.mjs","../../framer-motion/dist/es/animation/animators/waapi/animate-style.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/animate-style.mjs","../../framer-motion/dist/es/render/dom/scroll/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/index.mjs","../../framer-motion/dist/es/render/dom/scroll/track.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/scroll/track.mjs","../../framer-motion/dist/es/render/dom/viewport/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/render/dom/viewport/index.mjs","../../framer-motion/dist/es/easing/anticipate.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/anticipate.mjs","../../framer-motion/dist/es/easing/back.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/back.mjs","../../framer-motion/dist/es/easing/circ.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/circ.mjs","../../framer-motion/dist/es/easing/ease.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/ease.mjs","../../framer-motion/dist/es/easing/cubic-bezier.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/cubic-bezier.mjs","../../framer-motion/dist/es/easing/steps.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/steps.mjs","../../framer-motion/dist/es/easing/modifiers/mirror.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/modifiers/mirror.mjs","../../framer-motion/dist/es/easing/modifiers/reverse.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/easing/modifiers/reverse.mjs","../../framer-motion/dist/es/animation/generators/spring/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/spring/index.mjs","../../framer-motion/dist/es/animation/generators/inertia.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/inertia.mjs","../../framer-motion/dist/es/animation/generators/keyframes.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/generators/keyframes.mjs","../../framer-motion/dist/es/animation/utils/stagger.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/stagger.mjs","../../framer-motion/dist/es/utils/transform.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/transform.mjs","../../framer-motion/dist/es/utils/clamp.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/clamp.mjs","../../framer-motion/dist/es/utils/delay.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/delay.mjs","../../framer-motion/dist/es/utils/distance.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/distance.mjs","../../framer-motion/dist/es/utils/errors.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/errors.mjs","../../framer-motion/dist/es/utils/interpolate.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/interpolate.mjs","../../framer-motion/dist/es/utils/mix/index.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/mix/index.mjs","../../framer-motion/dist/es/utils/pipe.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/pipe.mjs","../../framer-motion/dist/es/utils/progress.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/progress.mjs","../../framer-motion/dist/es/utils/wrap.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/utils/wrap.mjs","../../framer-motion/dist/es/frameloop/index-legacy.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/index-legacy.mjs","../../framer-motion/dist/es/frameloop/frame.mjs":"../../node_modules/motion/dist/es/framer-motion/dist/es/frameloop/frame.mjs"}],"script.js":[function(require,module,exports) {
"use strict";

var _motion = require("motion");
//import {animate} from "https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm";

var buttons = document.querySelectorAll("button");
var screen = document.querySelector(".screen");
var numberOfItems = 0;
var totalOfItems = 0;
var totalOperators = 0;
var lastOperator = '';
var lastButton = '';
var lastDot = 0;
buttons.forEach(function (btn) {
  // animations
  btn.addEventListener("mouseover", function () {
    btn.classList.add("mouseover");
    (0, _motion.animate)(btn, {
      scale: 1.1
    });
  });
  btn.addEventListener("mouseout", function () {
    btn.classList.remove("mouseover");
    btn.classList.remove("mousedown");
    (0, _motion.animate)(btn, {
      scale: 1.0
    });
  });
  btn.addEventListener("mousedown", function () {
    btn.classList.add("mousedown");
  });
  btn.addEventListener("mouseup", function () {
    btn.classList.remove("mousedown");
  });

  // clear
  if (btn.id == "clear") {
    btn.addEventListener("click", function () {
      clearAll();
    });
  }

  // numbers
  else if (btn.id != "op") {
    btn.addEventListener("click", function () {
      if (btn.id == "num" && lastDot == 0) lastDot++;else if (btn.id == "num" && lastDot == 1) return;
      if (numberOfItems > 6) return;
      var number = btn.innerText;
      var screenNumber = document.createElement("p");
      screenNumber.setAttribute("id", "num");
      screenNumber.innerText = number;
      screen.appendChild(screenNumber);
      totalOfItems++;
      lastButton = btn.innerText;
    });
  }

  // operators
  else {
    btn.addEventListener("click", function () {
      var number = btn.innerText;
      if (lastButton == "+" || lastButton == "-" || lastButton == "/" || lastButton == "*" || totalOfItems == 0) return;
      // 0 operators doesnt show =
      if (totalOperators == 0 && btn.innerText == "=") return;
      totalOperators++;
      // only 2 sets of numbers can be dealt with a time, if more than 1 operator, operates and then adds the next operator
      if (totalOperators > 1 && btn.innerText != "=") {
        concatNumbers(lastOperator);
        totalOperators++;
      }
      // if generic operation (x+x=), computes normally
      else if (totalOperators > 1 && btn.innerText == "=") concatNumbers(lastOperator);

      // adds operator to screen
      if (btn.innerText != "=") {
        var screenNumber = document.createElement("p");
        screenNumber.innerText = number;
        screen.appendChild(screenNumber);
        lastOperator = btn.innerText;
        lastButton = lastOperator;
        lastDot--;
      }
    });
  }
});

// clear the screen
function clearAll() {
  totalOfItems = 0;
  lastOperator = '';
  lastButton = '';
  lastDot = 0;
  var allNumbers = document.querySelectorAll("p");
  allNumbers.forEach(function (item) {
    (0, _motion.animate)(item, {
      y: [0, -100]
    }, {
      ease: "easeOut"
    });
    (0, _motion.animate)(item, {
      opacity: 0
    });
    setTimeout(function () {
      return item.outerHTML = "";
    }, 300);
  });
}

// gets the numbers and calculate them
function concatNumbers(operator) {
  var allNumbers = document.querySelectorAll("p");
  var num1 = '';
  var num2 = '';
  var i = 0;
  var x = 0;

  // put numbers on a string
  allNumbers.forEach(function (item) {
    if (item.id != "num") i++;
    x++;
    if (i == 0) num1 = num1.concat(item.innerText);else if (x > 1 && i > 0) num2 = num2.concat(item.innerText);
  });
  // replace all operators
  num2 = num2.replace("+", "").replace("-", "").replace("*", "").replace("/", "");

  // remove count of operators
  totalOperators = 0;

  // calculate
  var totalCount = operate(Number(num1), operator, Number(num2));
  // round if it has decimals
  if (totalCount - Math.floor(totalCount) !== 0) totalCount = totalCount.toFixed(2);
  clearAll();

  // add it to the screen
  var newNum = document.createElement("p");
  newNum.setAttribute("id", "num");
  newNum.innerText = totalCount;
  screen.appendChild(newNum);
}
function operate(num1, operator, num2) {
  if (operator == "+") return num1 + num2;
  if (operator == "-") return num1 - num2;
  if (operator == "*") return num1 * num2;
  if (operator == "/") return num1 / num2;else return 0;
}
},{"motion":"../../node_modules/motion/dist/es/motion/lib/index.mjs"}],"../../.nvm/versions/node/v22.11.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34155" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../.nvm/versions/node/v22.11.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map