
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
   
  
    getRangeMinWrapper(tree, index, lIndex, rIndex, start, end) {
        // case1: Total overlap
        if( start <= lIndex && end >= rIndex ){
            return tree[index];
        }
        // case 2: No overlap
        if( rIndex < start || lIndex > end  ) {
            return 2147483647;
        }
        // case 3: overlap
        const left = this.left(index);
        const right = this.right(index);
        const mid = lIndex + Math.floor((rIndex - lIndex)/2);
        
        // const leftResult =  this.getRangeMinWrapper(tree, left, lIndex, mid, start, end);
        // const rightResult = this.getRangeMinWrapper(tree, right, mid + 1, rIndex, start, end);
        const result =  Math.min(this.getRangeMinWrapper(tree, left, lIndex, mid, start, end) , 
        this.getRangeMinWrapper(tree, right, mid + 1, rIndex, start, end));
        
        return result;
    }
    getRangeMin(start, end) {
        return this.getRangeMinWrapper(this.tree, 0, 0, this.nums.length - 1, start, end);
    }
    buildSegmentTreeWrapper(tree, index, nums, start, end){
        
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
		tree[index] = Math.min(this.buildSegmentTreeWrapper(tree, left, nums, start, mid),
        this.buildSegmentTreeWrapper(tree, right, nums, mid + 1, end))

        return tree[index];        
    }
    buildSegmentTree() {
      this.buildSegmentTreeWrapper(this.tree, 0, this.nums, 0, this.nums.length - 1); 
	  return this.tree;
    }

         
}