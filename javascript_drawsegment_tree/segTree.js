
class SegmentTree {
    constructor(nums){
        this.nums = nums;
        const n =  nums.length;
        if(n === 0) {
            this.tree = [];
        } else {
            this.tree = new Array(2 * n -1).fill(0);
        } 
    }
    
    left(i) {
        //console.log(i);
        return 2*i + 1;
        
    }
    right(i) {
        //console.log(i);
        return 2*i + 2;
        
    }
    
    build_minSegmentTreeWrapper(tree, index, nums, start, end){
        
        if(nums.length === 0) {
            return 0;
        }
        // base case: leaf node
        if(start === end) {
            tree[index] = nums[start];
            return nums[start];
            
        }
        const mid = start + Math.floor((end - start)/2);
        
        // call recursively
        const left = this.left(index);
        const right = this.right(index);
        // tree[index] = this.buildSegmentTreeWrapper(tree, left, nums, start, mid) + 
        // this.buildSegmentTreeWrapper(tree, right, nums, mid + 1, end);
		tree[index] = Math.min(this.build_minSegmentTreeWrapper(tree, left, nums, start, mid),
        this.build_minSegmentTreeWrapper(tree, right, nums, mid + 1, end))

        return tree[index];        
    }
    build_minSegmentTree() {
      this.build_minSegmentTreeWrapper(this.tree, 0, this.nums, 0, this.nums.length - 1); 
	  return this.tree;
    }
    build_maxSegmentTreeWrapper(tree, index, nums, start, end){
        
        if(nums.length === 0) {
            return 0;
        }
        // base case: leaf node
        if(start === end) {
            tree[index] = nums[start];
            return nums[start];
            
        }
        const mid = start + Math.floor((end - start)/2);
        
        // call recursively
        const left = this.left(index);
        const right = this.right(index);
        // tree[index] = this.buildSegmentTreeWrapper(tree, left, nums, start, mid) + 
        // this.buildSegmentTreeWrapper(tree, right, nums, mid + 1, end);
		tree[index] = Math.max(this.build_maxSegmentTreeWrapper(tree, left, nums, start, mid),
        this.build_maxSegmentTreeWrapper(tree, right, nums, mid + 1, end))

        return tree[index];        
    }
    build_maxSegmentTree() {
      this.build_maxSegmentTreeWrapper(this.tree, 0, this.nums, 0, this.nums.length - 1); 
	  return this.tree;
    }
    build_sumSegmentTreeWrapper(tree, index, nums, start, end){
        
        if(nums.length === 0) {
            return 0;
        }
        // base case: leaf node
        if(start === end) {
            tree[index] = nums[start];
            return nums[start];
            
        }
        const mid = start + Math.floor((end - start)/2);
        
        // call recursively
        const left = this.left(index);
        const right = this.right(index);
        // tree[index] = this.buildSegmentTreeWrapper(tree, left, nums, start, mid) + 
        // this.buildSegmentTreeWrapper(tree, right, nums, mid + 1, end);
		tree[index] = this.build_sumSegmentTreeWrapper(tree, left, nums, start, mid)+
        this.build_sumSegmentTreeWrapper(tree, right, nums, mid + 1, end);

        return tree[index];        
    }
    build_sumSegmentTree() {
      this.build_sumSegmentTreeWrapper(this.tree, 0, this.nums, 0, this.nums.length - 1); 
	  return this.tree;
    }


         
}