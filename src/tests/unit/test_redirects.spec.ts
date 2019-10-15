import { shallowMount } from '@vue/test-utils';
import Header from './src/components/organisms/Header.vue';

describe('HelloWorld.vue', () => {
    it('renders props.msg when passed', () => {
        const wrapper = shallowMount(Header);
        const button = wrapper.find('.header-link');
        window.location.assign = jest.fn();
        button.trigger('click');
        expect(window.location.assign).toHaveBeenLastCalledWith('/');
    });
});
