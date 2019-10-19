// import { shallowMount, RouterLinkStub } from '@vue/test-utils';
// import Header from '@/components/organisms/Header.vue';
// import { Container, Image } from 'semantic-ui-vue';

// describe('Header', () => {
//     it('redirect to home when unloginned', () => {
//         const wrapper = shallowMount(Header, {
//             propsData: {
//                 profile: { picture: null },
//             },
//             stubs: {
//                 RouterLink: RouterLinkStub,
//                 suiContainer: Container,
//              },
//         });
//         const button = wrapper.find('.header-link');
//         window.location.assign = jest.fn();
//         button.trigger('click');
//         expect(window.location.assign).toHaveBeenLastCalledWith('/');
//     });
// });

import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';


describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const hoge = 'hoge';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
