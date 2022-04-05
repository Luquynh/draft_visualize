let width;
let height;
let tree;
let tree_query;
let nums;
let c=1;
function setup() {
    width = windowWidth - 30;
    height = windowHeight - 50;
    createCanvas(width, height);
    frameRate(1);
    // button =createButton('Click me');
    // button.position(100,40);
    // button.style('color: Blue');
    nums = [7,8,1,5,9,11];
    //nums=[1,3,5,7,9,11]; 
    segTree = new SegmentTree(nums);
    segTree1 = segTree.buildSegmentTree();
    tree = new Tree();
    for (let i = 0; i < segTree1.length; i++)
    {
        a = Number(segTree1[i]);
        tree.insert(a,i);
        // tree.insert();
    }

    
}

function draw() {
    background(255);
    tree.draw();
       
    //noLoop();
}

function randomNumber(a,b) {
    return Math.floor(Math.random() * (b - a) + a);
}