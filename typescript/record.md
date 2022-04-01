Can someone give a simple definition of what Record is?
A Record<K, T> is an object type whose property keys are K and whose property values are T. That is, keyof Record<K, T> is equivalent to K, and Record<K, T>[K] is (basically) equivalent to T.

Is Record<K,T> merely a way of saying "all properties on this object will have type T"? Probably not all objects, since K has some purpose...
As you note, K has a purpose... to limit the property keys to particular values. If you want to accept all possible string-valued keys, you could do something like Record<string, T>, but the idiomatic way of doing that is to use an index signature like { [k: string]: T }.

Does the K generic forbid additional keys on the object that are not K, or does it allow them and just indicate that their properties are not transformed to T?
It doesn't exactly "forbid" additional keys: after all, a value is generally allowed to have properties not explicitly mentioned in its type... but it wouldn't recognize that such properties exist:

declare const x: Record<"a", string>;
x.b; // error, Property 'b' does not exist on type 'Record<"a", string>'
and it would treat them as excess properties which are sometimes rejected:

declare function acceptR(x: Record<"a", string>): void;
acceptR({a: "hey", b: "you"}); // error, Object literal may only specify known properties
and sometimes accepted:

const y = {a: "hey", b: "you"};
acceptR(y); // okay
With the given example:

type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>
Is it exactly the same as this?:

type ThreeStringProps = {prop1: string, prop2: string, prop3: string}
Yes!

Hope that helps. Good luck!