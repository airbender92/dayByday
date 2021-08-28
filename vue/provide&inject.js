/*
 * @Author: wangyunbo
 * @Date: 2021-08-28 16:45:50
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-08-28 16:45:53
 * @FilePath: \dayByday\vue\provide&inject.js
 * @Description: file content
 */

/**
 * 3

I found the answer after many hours of searching. 
You have to use Object.defineProperty to make it reactive. I'm not sure if this is the best approach, but this is a working example.
 */
export default {
    data() {
        return {
            checkout_info: {},
        }
    },
    provide() {
        const appData = {}

        Object.defineProperty(appData, "checkout_info", {
            enumerable: true,
            get: () => this.checkout_info,
        })

        return {
            updateCheckoutInfo: this.updateCheckoutInfo,
            appData,
        }
    }
}


// SomeComponent.vue
export default {
    inject: ['checkout_info', 'updateCheckoutInfo']
    computed: {
        deliveryAddress: {
            get() { return this.checkout_info.delivery_address }, // <---- Not reactive??
            set(value) { return this.updateCheckoutInfo('delivery_address', value) }
        }
    }
}