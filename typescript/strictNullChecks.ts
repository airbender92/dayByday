/*
 * @Author: wangyunbo
 * @Date: 2021-06-11 17:05:12
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-15 08:51:39
 * @Description: file content
 * @FilePath: \dayByday\typescript\strictNullChecks.ts
 */
/**
 * TypeScript 2.0 adds support for strict null checks. If you set --strictNullChecks when running tsc (or set this flag
in your tsconfig.json), then types no longer permit null:
 */
function getId(x: Element) {
  return x.id;
}
getId(null);
// You must permit null values explicitly:
function getId2(x: Element|null) {
  return x?.id;
}
getId2(null);

// ==================Non-null assertions====================
/**
 The non-null assertion operator, !, allows you to assert that an expression isn't null or undefined when the
TypeScript compiler can't infer that automatically
 */
type ListNode = { data: number; next?: ListNode; };

function addNext(node: ListNode) {
  if(node.next === undefined) {
    node.next = {data: 0}
  }
}

function setNextValue(node: ListNode, value: number) {
  addNext(node);
  // Even though we know `node.next` is defined because we just called `addNext`,
 // TypeScript isn't able to infer this in the line of code below:
 // node.next.data = value;GoalKicker.com – TypeScript Notes for Professionals 41
 
 // So, we can use the non-null assertion operator, !,
 // to assert that node.next isn't undefined and silence the compiler warnin
  node.next!.data = value;
}