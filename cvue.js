class CVue {
    constructor(options) {
        // 保存data项
        this.$data = options.data;
        // 执行响应式
        this.observe(this.$data);
    }
    // 主要作用 做遍历
    observe(value) {
        if (!value || typeof(value) !== 'object') {
            return;
        }
        // 遍历data选项
        Object.keys(value).forEach(key => {
            // 为每一个key定义响应式
            this.defineReactive(value, key, value[key]);
        })
    }
    defineReactive(obj, key, val) {
        this.observe(val);
        Object.defineProperty(obj, key, {
            // 是否能出现在对象的可枚举属性
            enumerable: true,
            // 是否可删除
            configurable: true,
            get() {
                return val;
            },
            set(newVal) {
                if (newVal === val) {
                    return;
                }
                // 数据发生变化
                val = newVal;
            }
        });
    }
};


