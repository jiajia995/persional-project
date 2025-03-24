// 1、数组转树
function arrToTree(arr, parentId = null) {
    const tree = []
    for (const item of arr) {
        if(item.parentId === parentId) {
            const children = arrToTree(arr, item.id)
            if(children.length) {
                item.children = children
            }
            tree.push(item)
        }
    }
    return tree
}
// 示例数据
const data = [
    { id: 1, parentId: null, name: 'Root' },
    { id: 2, parentId: 1, name: 'Child 1' },
    { id: 3, parentId: 1, name: 'Child 2' },
    { id: 4, parentId: 2, name: 'Grandchild 1' }
];

// 2、树转数组
function treeToArr(tree) {
    const result = []

    function traverse(node) {
        result.push({
            id: node.id,
            name: node.name
        })
        if(node.children && node.children.length) {
            for (const item of node.children) {
                traverse(item)
            }
        }
    }

    if(Array.isArray(tree)) {
        for (const item of tree) {
            traverse(item)
        }
    } else {
        traverse(item)
    }

    return result
}
// 示例树结构
const tree = [
    {
        id: 1,
        name: 'Root',
        children: [
            {
                id: 2,
                name: 'Child 1',
                children: [
                    {
                        id: 4,
                        name: 'Grandchild 1'
                    }
                ]
            },
            {
                id: 3,
                name: 'Child 2'
            }
        ]
    }
];

const array = treeToArr(tree);
console.log(array);