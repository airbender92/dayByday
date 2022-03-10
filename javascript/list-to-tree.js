 const createDataTree = dataset => {
    const hashTable = Object.create(null);
    dataset.forEach(aData => hashTable[aData.id] = { ...aData, children: [] });
    const dataTree: any[] = [];
    dataset.forEach(aData => {
      if (aData.parentId) hashTable[aData.parentId].children.push(hashTable[aData.id])
      else dataTree.push(hashTable[aData.id])
    });
    return dataTree;
  };