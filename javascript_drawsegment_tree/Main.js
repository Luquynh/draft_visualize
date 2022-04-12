let width;
let height;
let tree;
let tree_query;
let nums;
let c=1;
let qs = 1; // Bắt đầu đoạn truy vấn 
let qe = 5;
let i=1;
function setup() {
    width = windowWidth - 30;
    height = windowHeight - 50;
    createCanvas(width, height);
    frameRate(1);
   
    nums = [7,8,1,5,9,11];
    let i;
    for( i=0;nums[i]!=null;i++){
        
    }
    
    segTree = new SegmentTree(nums);
    segTree1 = segTree.buildSegmentTree();
    tree = new Tree(nums.length);
    for (let i = 0; i < segTree1.length; i++)
    {
        a = Number(segTree1[i]);
        tree.insert(a,i);
        // tree.insert();
    }
     
}

function draw() {
    background('white');
    // tree.getquery(segTree,qs,qe,segTree.length);
    tree.draw();
    tree.draw_number_node(nums);
    noLoop();
    tree.draw_build();
    
}

function randomNumber(a,b) {
    return Math.floor(Math.random() * (b - a) + a);
}