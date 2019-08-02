'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var useImmer = require('use-immer');
var reactUse = require('react-use');
var reactRedux = require('react-redux');
var redux = require('redux');
var React = require('react');
var React__default = _interopDefault(React);
var useReactRouter = _interopDefault(require('use-react-router'));
var useEvents = require('use-events');
var lodashEs = require('lodash-es');
var axios = require('axios');
var axios__default = _interopDefault(axios);
var reduxStarterKit = require('redux-starter-kit');
var Fuse = _interopDefault(require('fuse.js'));
var copy = _interopDefault(require('copy-to-clipboard'));

function useShallowEqualSelector(selector) {
  return reactRedux.useSelector(selector, reactRedux.shallowEqual);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function useActions(actions, deps) {
  var dispatch = reactRedux.useDispatch();
  return React.useMemo(function () {
    if (Array.isArray(actions)) {
      return actions.map(function (a) {
        return redux.bindActionCreators(a, dispatch);
      });
    }

    return redux.bindActionCreators(actions, dispatch);
  }, deps ? [dispatch].concat(_toConsumableArray(deps)) : [dispatch]);
}

var defaultOptions = {};

function useInput() {
  var initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;

  var _useState = React.useState(initialValue),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var onChange = React.useCallback(function (e) {
    var newValue = e.target.value;
    var shouldUpdate = true;

    if (lodashEs.isFunction(opts.validate)) {
      shouldUpdate = opts.validate(newValue, value);
    }

    if (shouldUpdate) {
      setValue(newValue);
    }
  }, []);
  return Object.assign([value, onChange], {
    value: value,
    hasValue: value !== undefined && value !== null && (!lodashEs.isNumber(value) ? value.trim && value.trim() !== "" : true),
    onChange: onChange,
    setValue: setValue,
    clear: React.useCallback(function () {
      return setValue('');
    }, []),
    bind: {
      onChange: onChange,
      value: value
    }
  });
}

var fetchInit = reduxStarterKit.createAction('FETCH_INIT'),
    fetchSuccess = reduxStarterKit.createAction('FETCH_SUCCESS'),
    fetchFailure = reduxStarterKit.createAction('FETCH_FAILURE');
var initialState = {
  isLoading: false,
  data: null,
  error: null
};

function fetchData(_x, _x2) {
  return _fetchData.apply(this, arguments);
} // function useFetch(config) {
//     if (isString(config)) {
//         config = {
//             url: config
//         }
//     }
//
//     const [state, dispatch] = useImmerReducer(reducer, initialState)
//
//     useLayoutEffect(() => {
//         let didCancel = false;
//         fetchData({...config, didCancel}, dispatch)
//         return () => {
//             dispatch({type: 'RESET'})
//             didCancel = true
//         }
//     }, [JSON.stringify(config)])
//
//     const reset = () => dispatch({type: 'RESET'})
//
//     return  [
//         state,
//         reset
//     ]
// }


function _fetchData() {
  _fetchData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref2, dispatch) {
    var onSuccess, config, _ref4, data;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            onSuccess = _ref2.onSuccess, config = _objectWithoutProperties(_ref2, ["onSuccess"]);
            _context.prev = 1;
            dispatch(fetchInit());
            _context.next = 5;
            return axios__default(config);

          case 5:
            _ref4 = _context.sent;
            data = _ref4.data;
            dispatch(fetchSuccess(data));
            if (onSuccess) onSuccess(data);
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);
            dispatch(fetchFailure(_context.t0));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 11]]);
  }));
  return _fetchData.apply(this, arguments);
}

var dataFetchReducer = function dataFetchReducer(state, _ref3) {
  var type = _ref3.type,
      payload = _ref3.payload;

  switch (type) {
    case 'FETCH_INIT':
      return {
        data: null,
        isLoading: true,
        isError: false
      };

    case 'FETCH_SUCCESS':
      return _objectSpread2({}, state, {
        isLoading: false,
        isError: false,
        data: payload
      });

    case 'FETCH_FAILURE':
      return _objectSpread2({}, state, {
        isLoading: false,
        isError: true
      });

    default:
      throw new Error();
  }
};

function useFetch(config) {
  if (lodashEs.isString(config)) {
    config = {
      url: config
    };
  }

  var _config = config,
      customHandler = _config.customHandler,
      trigger = _config.trigger,
      conf = _objectWithoutProperties(_config, ["customHandler", "trigger"]);

  var _useState = React.useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      innerTrigger = _useState2[0],
      setInnerTrigger = _useState2[1];

  var _useReducer = React.useReducer(dataFetchReducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var outerTrigger;

  try {
    outerTrigger = JSON.stringify(_objectSpread2({}, trigger, {
      url: conf.url
    }));
  } catch (err) {//
  }

  React.useEffect(function () {
    if (!conf.url) return;
    var source = axios.CancelToken.source();
    fetchData(_objectSpread2({}, conf, {
      cancelToken: source.token
    }), dispatch);
    return function () {
      source.cancel();
    };
  }, [outerTrigger, innerTrigger]);
  return _objectSpread2({}, state, {
    isShown: !state.isLoading && state.data,
    refresh: function refresh() {
      setInnerTrigger(+new Date());
    }
  });
}

function useDidMount(f) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(function () {
    return typeof f === "function" && f();
  }, []);
}

function useDidUpdate(f, conditions) {
  var didMoutRef = React.useRef(false);
  React.useEffect(function () {
    if (!didMoutRef.current) {
      didMoutRef.current = true;
      return;
    } // Cleanup effects when f returns a function


    return f && f();
  }, conditions);
}

function useWillMount(f) {
  var _useState = React.useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      willMount = _useState2[0],
      setWillMount = _useState2[1];

  useDidMount(function () {
    return setWillMount(false);
  });
  typeof f === "function" && willMount && f();
}

function useWillUnmount(f) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(function () {
    return function () {
      return typeof f === "function" && f();
    };
  }, []);
}

function useFuse(text, documents) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _useState = React.useState(documents),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = React.useState(text),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var prev = usePrevious({
    text: text,
    documents: documents
  });
  var onChange = React.useCallback(function (e) {
    return setValue(e.target.value.trim());
  }, []);
  React.useEffect(function () {
    if (!prev) return;

    if (!lodashEs.isEqual(prev.text, text)) {
      setValue(text);
    }

    if (!lodashEs.isEqual(prev.documents, documents)) {
      setData(documents);
    }
  });
  React.useEffect(function () {
    if (value.length > 0) {
      var fuse = new Fuse(data, options);
      setData(fuse.search(value));
    } else {
      setData(documents);
    }
  }, [value]);
  return Object.assign([value, data, onChange], {
    input: value,
    filtered: data,
    onChange: onChange,
    bind: {
      onChange: onChange,
      value: value
    }
  });
}

var ModalContext = React.createContext();
var ModalProvider = function ModalProvider(_ref) {
  var children = _ref.children;

  var _useImmer = useImmer.useImmer({}),
      _useImmer2 = _slicedToArray(_useImmer, 2),
      modals = _useImmer2[0],
      setModals = _useImmer2[1];

  var timeoutHack;
  var onShow = React.useCallback(function (key, component, data) {
    setModals(function (state) {
      state[key] = {
        isOpen: true,
        isVisible: true,
        component: component,
        data: data
      };
    });
  }, [modals, setModals]);
  var onHide = React.useCallback(function (key, onClose) {
    timeoutHack = setTimeout(function () {
      setModals(function (state) {
        delete state[key];
      });
      clearTimeout(timeoutHack);
    }, 500);
    setModals(function (state) {
      state[key].isOpen = false;
    });
    if (onClose) onClose();
  }, [modals, setModals]);
  var contextValue = React.useMemo(function () {
    return {
      onShow: onShow,
      onHide: onHide
    };
  }, [onShow, onHide]);
  return React__default.createElement(ModalContext.Provider, {
    value: contextValue
  }, children, lodashEs.map(modals, function (_ref2, key) {
    var component = _ref2.component,
        isOpen = _ref2.isOpen,
        data = _ref2.data;
    return component && React.createElement(component, _objectSpread2({
      key: key,
      isOpen: isOpen,
      onClose: function onClose() {
        return onHide(key);
      }
    }, data));
  }));
};

var generateModalKey = function () {
  var count = 0;
  return function () {
    return "".concat(++count);
  };
}();

function useModal(component) {
  var inputs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var onClose = arguments.length > 2 ? arguments[2] : undefined;
  var key = React.useMemo(generateModalKey, []);
  var context = React.useContext(ModalContext);
  var modal = React.useMemo(function () {
    return component;
  }, []);
  var onShow = React.useCallback(function (modalData) {
    context.onShow(key, modal, modalData && modalData.nativeEvent instanceof Event ? inputs : _objectSpread2({}, inputs, {}, modalData));
  }, [context, inputs]);
  var onHide = React.useCallback(function () {
    return context.onHide(key, onClose);
  }, [context]);
  return Object.assign([onShow, onHide], {});
}

/**
 * Hook to load an external script. Returns true once the script has finished loading.
 *
 * @param {string} url The external script to load
 * @return boolean True if the script has been loaded
 * */

function useScript(_ref) {
  var src = _ref.src,
      rest = _objectWithoutProperties(_ref, ["src"]);

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      ready = _useState2[0],
      setReady = _useState2[1];

  React.useEffect(function () {
    function onLoad() {
      // The ready event is fired whenever the resource is loaded, but it doesn't know if it was successful
      setReady(true);
    }

    function onError() {
      // The ready event is fired whenever the resource is loaded, but it doesn't know if it was successful
      setReady(false);
    }

    var script = document.querySelector("script[src=\"".concat(src, "\"]"));

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true; // Add script to document body

      document.body.appendChild(script);

      script.onerror = function () {
        if (script) script.setAttribute('data-failed', 'true');
      };

      script.onload = function () {
        if (script) script.setAttribute('data-loaded', 'true');
      };

      lodashEs.map(rest, function (v, k) {
        script.setAttribute(k, v);
      }); // $(script).attr(rest)
    } else {
      if (script.getAttribute('data-loaded') === 'true') {
        setReady(true); // Already loaded, so we can return early

        return function () {};
      }
    } // Add load event listener


    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);
    return function () {
      if (script) {
        script.removeEventListener('load', onLoad);
        script.removeEventListener('error', onError);
      }
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);
  return ready;
}

function useSetState() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _useImmer = useImmer.useImmer(initialState),
      _useImmer2 = _slicedToArray(_useImmer, 2),
      state = _useImmer2[0],
      set = _useImmer2[1];

  var setState = React.useCallback(function (path) {
    lodashEs.isFunction(path) ? set(path) : set(function (draft) {
      draft = Object.assign({}, state, path);
    });
  }, []);
  return [state, setState];
}

function useCopyClipboard(config) {
  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isCopied = _useState2[0],
      setIsCopied = _useState2[1];

  if (lodashEs.isString(config)) {
    config = {
      text: config
    };
  }

  var _config = config,
      text = _config.text,
      options = _config.options,
      onCopy = _config.onCopy;
  var onClick = React.useCallback(function () {
    var result = copy(text, options);
    setIsCopied(result);
    if (onCopy) onCopy(text, result);
  }, [config.text]);
  return [isCopied, onClick];
}

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  var ref = React.useRef(); // Store current value in ref

  React.useEffect(function () {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)

  return ref.current;
}

function useTimeout(callback, delay) {
  var callbackRef = React.useRef(callback);
  React.useEffect(function () {
    callbackRef.current = callback;
  }, [callback]);
  React.useEffect(function () {
    if (delay && callback && typeof callback === 'function') {
      var timer = setTimeout(callbackRef.current, delay || 0);
      return function () {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
  }, [callback, delay]);
}

function useDebounce(func, wait, options) {
  return React.useRef(lodashEs.debounce(func, wait, options)).current;
}

var useUpdateEffect = function useUpdateEffect(effect, deps) {
  var isInitialMount = React.useRef(true);
  React.useEffect(isInitialMount.current ? function () {
    isInitialMount.current = false;
  } : effect, deps);
};

Object.defineProperty(exports, 'useImmer', {
    enumerable: true,
    get: function () {
        return useImmer.useImmer;
    }
});
Object.defineProperty(exports, 'useImmerReducer', {
    enumerable: true,
    get: function () {
        return useImmer.useImmerReducer;
    }
});
Object.defineProperty(exports, 'useCss', {
    enumerable: true,
    get: function () {
        return reactUse.useCss;
    }
});
Object.defineProperty(exports, 'useDeepUpdate', {
    enumerable: true,
    get: function () {
        return reactUse.useDeepCompareEffect;
    }
});
Object.defineProperty(exports, 'useFullscreen', {
    enumerable: true,
    get: function () {
        return reactUse.useFullscreen;
    }
});
Object.defineProperty(exports, 'useMedia', {
    enumerable: true,
    get: function () {
        return reactUse.useMedia;
    }
});
Object.defineProperty(exports, 'useObservable', {
    enumerable: true,
    get: function () {
        return reactUse.useObservable;
    }
});
Object.defineProperty(exports, 'usePageLeave', {
    enumerable: true,
    get: function () {
        return reactUse.usePageLeave;
    }
});
Object.defineProperty(exports, 'useSize', {
    enumerable: true,
    get: function () {
        return reactUse.useSize;
    }
});
Object.defineProperty(exports, 'useTitle', {
    enumerable: true,
    get: function () {
        return reactUse.useTitle;
    }
});
Object.defineProperty(exports, 'useToggle', {
    enumerable: true,
    get: function () {
        return reactUse.useToggle;
    }
});
Object.defineProperty(exports, 'useWait', {
    enumerable: true,
    get: function () {
        return reactUse.useWait;
    }
});
Object.defineProperty(exports, 'useWindowScroll', {
    enumerable: true,
    get: function () {
        return reactUse.useWindowScroll;
    }
});
Object.defineProperty(exports, 'useDispatch', {
    enumerable: true,
    get: function () {
        return reactRedux.useDispatch;
    }
});
Object.defineProperty(exports, 'useSelector', {
    enumerable: true,
    get: function () {
        return reactRedux.useSelector;
    }
});
Object.defineProperty(exports, 'useStore', {
    enumerable: true,
    get: function () {
        return reactRedux.useStore;
    }
});
exports.useRouter = useReactRouter;
Object.defineProperty(exports, 'useActive', {
    enumerable: true,
    get: function () {
        return useEvents.useActive;
    }
});
Object.defineProperty(exports, 'useClickOutside', {
    enumerable: true,
    get: function () {
        return useEvents.useClickOutside;
    }
});
Object.defineProperty(exports, 'useFocus', {
    enumerable: true,
    get: function () {
        return useEvents.useFocus;
    }
});
Object.defineProperty(exports, 'useHover', {
    enumerable: true,
    get: function () {
        return useEvents.useHover;
    }
});
Object.defineProperty(exports, 'useResizeObserver', {
    enumerable: true,
    get: function () {
        return useEvents.useResizeObserver;
    }
});
Object.defineProperty(exports, 'useTouch', {
    enumerable: true,
    get: function () {
        return useEvents.useTouch;
    }
});
Object.defineProperty(exports, 'useWindowResize', {
    enumerable: true,
    get: function () {
        return useEvents.useWindowResize;
    }
});
exports.ModalContext = ModalContext;
exports.ModalProvider = ModalProvider;
exports.useActions = useActions;
exports.useCopyClipboard = useCopyClipboard;
exports.useDebounce = useDebounce;
exports.useDidMount = useDidMount;
exports.useDidUpdate = useDidUpdate;
exports.useFetch = useFetch;
exports.useFuse = useFuse;
exports.useInput = useInput;
exports.useModal = useModal;
exports.usePrevious = usePrevious;
exports.useScript = useScript;
exports.useSetState = useSetState;
exports.useShallowEqualSelector = useShallowEqualSelector;
exports.useTimeout = useTimeout;
exports.useUpdateEffect = useUpdateEffect;
exports.useWillMount = useWillMount;
exports.useWillUnmount = useWillUnmount;
//# sourceMappingURL=react-hooks.cjs.js.map
