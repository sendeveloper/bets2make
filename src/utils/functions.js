import React from 'react';
import { TreeNode } from 'rc-tree';

export const loopTreeData = data => {
  return data.map(item => {
    if (item.children) {
      return (
        <TreeNode
          key={item.key}
          title={item.title}
          disableCheckbox={item.key === '0-0-0-key'}
        >
          {loopTreeData(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode key={item.key} title={item.title} />;
  });
};
