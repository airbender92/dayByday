/*
 * @Author: wangyunbo
 * @Date: 2021-05-27 11:23:20
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-27 11:23:21
 * @Description: file content
 * @FilePath: \dayByday\vue-jest\g6.spec.js
 */
import G6 from '@antv/g6'

const container = document.createElement('div');
container.id = 'global-spec';
document.body.appendChild(container);

describe('graph', () => {
  const globalGraph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    modes: {
      default: ['drag-node']
    }
  });

  it('invalid container', ()  => {
    expect(() => { new G6.Graph({}) }).toThrowError('invalid container')
  })
  
  it('new & destroy graph', () => {
    const inst = new G6.Graph({
      container,
      width: 500,
      height: 500,
      modes: {
        default: ['drag-node']
      }
    });
    const length = div.childNodes.length;

    expect(inst).not.toBe(undefined)
    expect(inst instanceof G6.Graph).toBe(true);
    expect(length > 1).toBe(true);

    expect(inst.get('canvas')).not.toBe(undefined)
    expect(inst.get('group')).not.toBe(undefined)

    expect(inst.get('group').get('className')).toEqual('root-container');
    expect(inst.get('group').get('id').endsWith('-root')).toBe(true);

    const children = inst.get('group').get('children');
    expect(children.length).toBe(4);
    expect(children[1].get('className')).toEqual('edge-container');
    expect(children[0].get('className')).toEqual('custom-group-container');

    const nodes = inst.getNodes();
    expect(nodes).not.toBe(undefined)
    expect(nodes.length).toBe(0);

    const edges = inst.getEdges();
    expect(edges).not.toBe(undefined)
    expect(edges.length).toBe(0);

    const canvas = inst.get('canvas');
    inst.destroy();

    expect(inst.destroyed).toBe(true)
    expect(canvas.destroyed).toBe(true);
    expect(length - div.childNodes.length).toBe(1);
  });
)}