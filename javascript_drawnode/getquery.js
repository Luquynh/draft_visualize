class SegmentTreeRMQ {
    constructor() {
      this.st = []; //Mảng để lưu trữ cây phân đoạn
    }

    // Hàm để lấy số nhỏ hơn 
    minVal(x, y) {
      return x < y ? x : y;
    }

    //  Hàm để phân đoạn 
    getMid(s, e) {
      return parseInt(s + (e - s) / 2);
    }

    /* A recursive function to get
        the minimum value in a given
        range of array indexes.
        The following are parameters for
        this function.
 
        st --> con trỏ của cây segment tree 
        index --> chỉ số hiện tại của node 
        segment tree. Initially 0 is passed
        as root is always at index 0
        ss & se --> Starting and ending indexes of the segment
                    represented by current node, i.e., st[index]
        qs & qe --> Starting and ending indexes of query range */
    RMQUtil(ss, se, qs, qe, index) {
      // If segment of this node is a
      // part of given range, then
      // return the min of the segment
      if (qs <= ss && qe >= se) return this.st[index];

      // If segment of this node
      // is outside the given range
      if (se < qs || ss > qe) return 2147483647;

      // If a part of this segment
      // overlaps with the given range
      var mid = this.getMid(ss, se);
      return this.minVal(
        this.RMQUtil(ss, mid, qs, qe, 2 * index + 1),
        this.RMQUtil(mid + 1, se, qs, qe, 2 * index + 2)
      );
    }

    // Return minimum of elements
    // in range from index qs (query
    // start) to qe (query end).
    // It mainly uses RMQUtil()
    RMQ(n, qs, qe) {
      // Check for erroneous input values
      if (qs < 0 || qe > n - 1 || qs > qe) {
        return -1;
      }

      return this.RMQUtil(0, n - 1, qs, qe, 0);
    }

    // A recursive function that
    // constructs Segment Tree for
    // array[ss..se]. si is index
    // of current node in segment tree st
    constructSTUtil(arr, ss, se, si) {
      // If there is one element in array,
      // store it in current node of
      // segment tree and return
      if (ss == se) {
        this.st[si] = arr[ss];
        return arr[ss];
      }

      // If there are more than one elements,
      // then recur for left and right subtrees
      // and store the minimum of two values in this node
      var mid = this.getMid(ss, se);
      this.st[si] = this.minVal(
        this.constructSTUtil(arr, ss, mid, si * 2 + 1),
        this.constructSTUtil(arr, mid + 1, se, si * 2 + 2)
      );
      return this.st[si];
    }

    /* Function to construct segment
    tree from given array. This function
    allocates memory for segment tree
    and calls constructSTUtil() to
    fill the allocated memory */
    constructST(arr, n) {
      //Cấp phát bộ nhớ cho cây 

      // Chiều cao của cây phân đoạn 
      var x = parseInt(Math.ceil(Math.log(n) / Math.log(2)));

      // Tính kích thước lớn nhất của cây 
      var max_size = 2 * parseInt(Math.pow(2, x) - 1);
      this.st = new Array(max_size).fill(0); // Cấp phát bộ nhớ trong trường hợp lớn nhất 

      // Dùng vùng nhớ đã được cấp phát gọi hàm constructSTUtil để tạo cây 
      this.constructSTUtil(arr, 0, n - 1, 0);
    }
  }