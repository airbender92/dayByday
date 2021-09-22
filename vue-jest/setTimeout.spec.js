/*
 * @Author: wangyunbo
 * @Date: 2021-09-22 11:30:40
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-22 11:30:41
 * @FilePath: \dayByday\vue-jest\setTimeout.spec.js
 * @Description: file content
 */
import { shallowMount } from "@vue/test-utils";
import TimeoutExample from "@/components/TimeoutExample.vue";

describe("TimeoutExample.vue", () => {
    it("alerts after 5 seconds", () => {
        // Tell jest to use fake timers
        jest.useFakeTimers();

        // Spy on the window.alert() function
        const spy = jest.spyOn(window, 'alert').mockImplementation(() => { });

        // Mount the TimeoutExample component
        const wrapper = shallowMount(TimeoutExample);

        // Call the method we are testing
        wrapper.vm.delayedAlert();

        // Advance timers by 5 seconds
        jest.advanceTimersByTime(5000);

        // Check that alert has been called
        expect(spy).toBeCalledWith('Hello!');
    });
});