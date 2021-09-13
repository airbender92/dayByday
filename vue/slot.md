<!--
 * @Author: wangyunbo
 * @Date: 2021-09-13 17:29:18
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-13 17:29:19
 * @FilePath: \dayByday\vue\slot.md
 * @Description: file content
-->

https://devinduct.com/blogpost/59/vue-tricks-passing-slots-to-child-components


Vue Tricks - Passing Slots to Child Components
Introduction
Being one of the top tree JavaScript frameworks out there, Vue deserves the attention it has. It is super easy to learn, work with and makes you love the way it does things as soon you lay hands on it.

In this article, we are going to talk about a strong feature it has, the slots, and shortly explain what they are and how to use them. In the end, the focus is going to be on passing all slots from the parent component to the child.

This article assumes that you are somewhat familiar with Vue slots and the basics of how they work

Nevertheless, I'm going to provide some short explanations. Ok, let's dive into it.

What are Vue Slots?
We can define them as custom elements, giving us the ability to create custom, dynamic content for our components. They have the reserved name slot, and we can create them as default or named slots. Also, they can be interpreted as predefined components.

Each slot has it's own scope and fallback content. The scope of the slot is the same as the scope of the template where we use the slot, meaning that our slot will not have access to the scope of the component for which it represents the content. In the next section, you can see the example and hopefully the previous sentence will be more clear.

The next thing is the fallback content, the content between the opening and closing tags of our slot, and it represents the default value we want to show in the case when our slot is not provided in the template where our component is used. Basically, we are making sure that something is always displayed on the page, either the slot content or the default value.

How to Use Vue Slots?
In order to enable dynamic content for our component from the outside, all we need to do is to place the slot element within the component template at the place we want the custom content to appear. Check out a quick example component:

The component template:

<template>
  <div>
    <span>Inner Content</span>
    <slot>Default Content</slot> <!-- This is where the maging happens -->
  </div>
</template>
and, outside, somewhere in our app:

<example>
  This text is going to be rendered instead of the element within our example component
</example>
On the other hand, if we use the component like this:

<example />
the fallback is going to be rendered, in our case the Default Content text.

A slot without the name will have this property set to "default" by the Vue framework

How to use Vue Named slots?
Vue named slot is nothing else than a slot element with its name property configured. This is very useful in cases when we want different dynamic content rendered at different positions within our component template. Let's update the example component.

<template>
  <section>
    <header>
      <slot name="title">Title</slot>
    </header>
    <main>
      <slot>Content</slot>
    </main>
  </section>
</template>
and somewhere in our app:

<example>
  <template v-slot:title>
    My Component Title
  </template>
  <p>My Component Content</p>
</example>
As you can assume, everything within the template element will be rendered at the place of the corresponding slot inside our component, and everything outside of it will be rendered at the place of the default slot. We achieved this by using the v-slot directive, followed by the name of the slot to which we want to pass the dynamic content.

How to use Vue Scoped Slots?
In the previous section, I've mentioned that the scope of the slot is the same as the scope of the template where we use it. Sometimes, this is not good enough and in some cases, we want to have the scope from the child component. Thankfully, Vue supports this and gives us the ability to pass on the scope between the components. Let's back up this with an example.

Our component template:

<template>
  <section>
    <slot>{{user.name}}</slot>
  </section>
</template>
and js:

export default {
  name: 'example',
  data() {
    return {
      user: {
        name: 'John',
        surname: 'Doe'
      }
    }
  }
}
And somewhere in our application, we use the component like this:

<example>
  Fallback content
</example>
At this point, our fallback content cannot be based on the user data because the data is defined within the example component and the content for the slot is rendered in the parent component.

This is where the scoped slots come into the picture. To pass on the scope to the parent, we need to change our example component template to look like this:

<template>
  <section>
    <slot v-bind:user="user">{{user.name}}</slot>
  </section>
</template>
With the v-bind directive we are binding the user object to the user property, and now, we are able to use the user data in the parent component template.

<example>
  <template v-slot:default="props">
    {{ props.user.name }} {{props.user.surname }}
  </template>
</example>
In the previous section, I've mentioned that the unnamed slot has the name "default" implicitly and with v-slot directive, we can tell the framework which slot should have the provided fallback content.

Pass the Slots to the Child Component
Ok, this is why we are here for. It is time to show how we can pass on all slots from our parent component to the child component.

As you guessed, we need to create a template with a slot as it's content for each slot we want to pass on from parent to the child, and there are two ways of doing this. The first way is to do it manually, create a template element for each slot, which is OK if we have one or two slots, but what if we had more slots that we want to pass? Are we suppose to have n templates within our parent component? Well, no, this is a very verbose and unpractical solution and in this case, we will use the second way of doing it, and dynamically render the templates with a for...each loop.

You might be wondering through what collection are we going to iterate? Don't worry, Vue has this covered! Each slot we define will be stored in one of the following collections:

$slots
$scopedSlots
Since 2.6.0+ all $slots are now also exposed on $scopedSlots as functions

The text above might be overwhelming, but I hope the following example will help you understand.

Code to pass on the $slots:

<template v-for="(index, name) in $slots" v-slot:[name]>
  <slot :name="name" />
</template>
Code to pass on the $scopedSlots require some more configuration, but it is similar to passing the $slots:

<template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
  <slot :name="name" v-bind="data"></slot>
</template>
By defining the templates like this in our parent component we passing on all the slots defined at the place where we use the parent component. Here is a full example:


As you can see, we've defined a child-slot in the child component and provided the content for it in the application root. The parent component simply passed all the slots to the child, which is what I wanted to show you by writing this article.

You can see this approach in action on the open-source Vue component that I've created. It is called Vue GridMultiselect. Check it out on GitHub.

If you are interested, check out the introduction article I wrote about it:

Vue GridMultiselect
Conclusion
That's it I have for now.

I'm a big fan of the Vue framework, and you should consider including it in your tech stack. It is easy to learn, fun to work with and very flexible in terms of usage in you application.

If you liked this article, please consider supporting me by buying me a coffee. To stay tuned, follow me on twitter or subscribe here on devinduct.

Thank you for reading and see you in the next article!