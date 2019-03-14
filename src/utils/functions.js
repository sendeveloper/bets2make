import React from 'react';
import { TreeNode } from 'rc-tree';

export const loopTreeData = data => {
  const str = data.split('|');
  return str.map(item => {
    const itemArray = item.split(';');
    return (
      <TreeNode key={itemArray[0]} title={itemArray[0]}>
        {itemArray.map((each, index) => {
          return index === 0 ? null : <TreeNode key={each} title={each} />;
        })}
      </TreeNode>
    );
  });
};
