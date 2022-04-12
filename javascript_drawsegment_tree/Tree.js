class Tree {
    
    constructor(length_n){
        this.size = 0;
        this.root = null;
        this.node_list=[];
        this.node_n=0;
        this.solan_node=0;
        this.id_max=0;
        this.length_n=length_n;
    }

    insertNode(node, newNode) {
        
        if(newNode.id % 2 == 0)
        {
            a = (newNode.id - 2) / 2;
        }
        else{
            a = (newNode.id - 1) / 2;
        }
        if(node.id == a)
        {
            if(newNode.id % 2 != 0)
            {
                newNode.level = node.level + 1;
                node.left = newNode;
                // newNode.parrent=node;
                node.childrenLeft++;
                return;
            }
            else{
                newNode.level = node.level + 1;
                node.right = newNode;
                // newNode.parrent=node;
                node.childrenRight++;
                return;
            }
        }
        if(node.id != a){
            if(2 * node.id + 1 <= a)
            {
                node.childrenLeft++;
                this.insertNode(node.left, newNode);
            }
            if(2 * node.id + 2 <= a)
            {
                node.childrenRight++;
                this.insertNode(node.right, newNode);
            }
            
        }
        
    }
    insert(value,id) {
        //khởi tạo giá trị ban đầu 
        let newNode = new Node(value,id);
        //Lấy giá trị id_max 
        if (newNode.id>this.id_max)
        {
            this.id_max=newNode.id;
        }
        if(newNode.value == 0)
        {
            return;
        }
        //Nếu cây chưa có node nào:
        if(!this.root) {
            this.root = newNode;
        }
        else
        {
            this.insertNode(this.root, newNode);
        }
       
        this.size++;
        
    }
    draw_index_node(){
        let s,e;
        let mid;
        this.node_list[0].L=0;
        this.node_list[0].R=this.length_n-1;

        for(i=1;i<=this.id_max;i++){
            if(this.node_list[i].value!=0){
                let id_node=this.node_list[i].id;
                if(id_node%2==1){
                    //Node trái 
                    s=this.node_list[(id_node-1)/2].L;
                    e=this.node_list[(id_node-1)/2].R;
                    mid=((s+e)-(s+e)%2)/2;
                    this.node_list[i].L=s;
                    this.node_list[i].R=mid;
                    console.log(this.node_list[i]);
                }
                else{
                    //Node phải
                    s=this.node_list[(id_node-2)/2].L;
                    e=this.node_list[(id_node-2)/2].R;
                    mid=((s+e)-(s+e)%2)/2;
                    this.node_list[i].L=mid+1;
                    this.node_list[i].R=e;
                    console.log(this.node_list[i]);
                }
                
            }

        }
        for(i=1;i<=this.id_max;i++){
            if(this.node_list[i].value!=0){
            stroke('red');
            fill('red');
            textSize(15);
            
            text( (this.node_list[i].id)+': '+'['+this.node_list[i].L+','+this.node_list[i].R+']',
            this.node_list[i].x,this.node_list[i].y+(this.node_list[i].radius*2)/2+25);
            }
            

        }
}
    draw() {
        
        if(!this.root){
            return;
        }
        Node.leftPosition = 0;
        this.drawNode(this.root);
        
    }

    drawNode(node){
        
        if(node.left){
            this.drawNode(node.left);
            
        }
        else{
            Node.leftPosition++;
        }
        if(isNaN(node.value)==false){
            node.draw();
        }
        //Khởi tạo node_list 
        if (this.solan_node==0){
            this.create_nodelist();
            this.solan_node++;
        }
        //Tạo các giá trị cho node_list
        if(this.node_n<=this.id_max){
            
            this.node_list[node.id]=node;
            this.node_n++;
            if(this.node_n==this.id_max-1){
                console.log(this.length_n);
                this.draw_index_node();

            }
        }
        
        
        
        // if(this.node_n==this.id_max && this.solan_node==1){
        //     for(let i=0;i<=this.id_max;i++){
        //         console.log(this.node_list[i]);
        //     }
        //     this.solan_node++;
        // }
        // //click mouse to show the value of node 
        // if(dist(mouseX,mouseY,node.x,node.y)<node.radius)
        //     node.c=2;
        // //console.log(node.c);
        // if (node.c==2 && isNaN(node.value)==false){
            
        //     //draw override 
        //     //show Node
        //     //change color
        //     this.draw_text_node(node);
        // }
        if(node.left){
            this.drawLine(node, node.left);
            
        }
        if(node.right){
            this.drawNode(node.right);
            this.drawLine(node, node.right);
        }
        else
        {
            Node.leftPosition++;
        }
    }
   
    drawLine_r(nodeA, nodeB){
        // console.log('draworange:'+nodeB.value);
        if(nodeA && nodeB && isNaN(nodeA.value)==false && isNaN(nodeB.value)==false) {
            stroke('orange');
            strokeWeight(1.5);
            let ax=nodeA.x,ay=nodeA.y + nodeB.radius + 2;
            let bx=nodeB.x,by=nodeB.y - nodeB.radius - 2;
            line(ax,ay,(ax+bx)/2,(ay+by)/2);
            stroke('orange');
            strokeWeight(1.5);
            setTimeout(() => {line(ax,ay,bx,by);}, 500);
        }
    }
    drawLine(nodeA, nodeB){
        if(nodeA && nodeB && isNaN(nodeA.value)==false && isNaN(nodeB.value)==false) {
            stroke('blue');
            strokeWeight(1);
            line(
                nodeA.x,
                nodeA.y + nodeB.radius +2,
                nodeB.x,
                nodeB.y - nodeB.radius -2
            )
        }
    }
    draw_number_text(x_node,y_max,radius_max,value,index){
        fill('white');
        strokeWeight(1);
        stroke('blue');
        circle(x_node,y_max,radius_max*2+4);
        //text
        stroke(this.node_list[this.node_n-1].color);
        textSize(30);
        fill(this.node_list[this.node_n-1].color);
        textAlign(CENTER, CENTER);
        text(value,x_node,y_max);  
        
        //draw array_index
        stroke('red');
        fill('red');
        strokeWeight(0.7);
        textSize(15);
        text(index,x_node,y_max+(radius_max*2)/2+25);
    }
    draw_number_node(nums){
        //Vẽ dãy số nhập vào 
        let x_max=80;
        let y_max=this.node_list[this.id_max].y+150;
        let radius_max=this.node_list[this.id_max].radius;
        for (let i=0;i<nums.length;i++){
            let x_node=x_max+radius_max*i*2+30*i;
            //Hiện thị node number 
            this.draw_number_text(x_node,y_max,radius_max,nums[i],i);
        }
        
    }
    
    create_nodelist(){
        for(let i=0;i<=this.id_max;i++){
            this.node_list[i]=new Node(0,i);
        }
        // console.log('id:'+this.id_max);
    }
    draw_recursive(node,nodeb,op){
        if(op==-1){
        
            fill('orange');
            strokeWeight(1);
            stroke('white');
            circle(nodeb.x,nodeb.y,nodeb.radius*2+4);

            // stroke('white');
            strokeWeight(0.1);
            
            textSize(30);
            fill('white');
            textAlign(CENTER, CENTER);
            text('?', nodeb.x, nodeb.y);  
        }
        else{
            
            fill('orange');
            strokeWeight(1);
            stroke('white');
            circle(node.x,node.y,node.radius*2+4);

            // stroke('white');
            strokeWeight(0.1);
            
            textSize(30);
            fill('white');
            textAlign(CENTER, CENTER);
            text('?', node.x, node.y);}
        if(op==1|| op==-1){
            this.drawLine_r(node,nodeb);
            }
    }
    draw_text_node(node){
        fill('white');
        strokeWeight(1);
        stroke('blue');
        circle(node.x, node.y, node.radius * 2 + 4);
            //show value
        stroke(node.color);
        textSize(30);
        fill(node.color);
        textAlign(CENTER, CENTER);
        text(node.value, node.x, node.y);
    }
    draw_show_node1(node,node_cha){
       //show các node đã được trên dãy đệ quy 
        setTimeout(() => {
                this.drawLine(node_cha,node);
              }, 1000);
        
        setTimeout(() => {
            this.draw_text_node(node);
          }, 2000);
    }
    draw_show_node2(node,node_cha){
        
        setTimeout(() => {
                this.draw_recursive(node_cha,node,-1);
              }, 1000);
            
        
        setTimeout(() => {
            this.draw_text_node(node);
          }, 2000);
    }
    draw_build(){
        
        
        //đổi màu khi gọi đệ quy
        //Hiển thị nhánh bên phải đệ quy 
        let i_max=0;
        for(let  i=0, n=1;this.node_list[i].childrenLeft!=0;i=i*2+1,n++){
            setTimeout(() => {
                this.draw_recursive(this.node_list[i],this.node_list[i].left,1);
              }, 1500*n);
              i_max=i;
              if(this.node_list[i*2+1].childrenLeft==0){
                setTimeout(() => {
                    //dành riêng cho node cuối cùng chỉ đổi màu node 
                    this.draw_recursive(this.node_list[i*2+1],this.node_list[i].left,0);
                  }, 1500*(n+1));
              }
        }
        i_max=2*i_max+1;
        //hiển thị hết các node nằm bên trái 
        for(let j=i_max,k=(i_max-1)/2+1,n=k+1;j>=1;j=(j-1)/2,k++,n++){
            //Hiện các node trái của bên trái
                let langoi=1;
                if(langoi==1){
                    // console.log('trai1:'+langoi);
                    setTimeout(() => {
                        this.draw_show_node1(this.node_list[j],this.node_list[(j-1)/2]);
                    }, 2000*(k));
                    // console.log('trai2:'+langoi);
                    langoi=2;    
                }
            //Hiển thị node phải của nhánh trái 
                if(langoi==2){
                    // console.log('phai1:'+langoi);
                    if(j+1!=2){
                        setTimeout(() => {
                         this.draw_show_node2(this.node_list[(j+1)],this.node_list[(j-1)/2]);
                        }, 2000*n);
                         }
                        //  console.log('phai2:'+langoi);
                    langoi=1;
                }
            
        }
        //Hiển thị nhánh bên phải đệ quy 
        for(let  i=0, n=1;this.node_list[i].childrenLeft!=0;i=i*2+1,n++){
            setTimeout(() => {
                this.draw_recursive(this.node_list[i],this.node_list[i].left,1);
              }, 1500*n);
              i_max=i;
              if(this.node_list[i*2+1].childrenLeft==0){
                setTimeout(() => {
                    //dành riêng cho node cuối cùng chỉ đổi màu node 
                    this.draw_recursive(this.node_list[i*2+1],this.node_list[i].left,0);
                  }, 1500*(n+1));
              }
        }
        i_max=2*i_max+1;

        
        
    }
    
    // draw_getquery(){

    // }
    getquery(segTree,qs,qe,n){
        //text style
        // console.log(this.size);
        textSize(20);
        fill('black');
        stroke('black');
        strokeWeight(0.1);
        textAlign(CENTER, CENTER);
        if (qs < 0 || qe > n-1 || qs > qe) {
            text('Đoạn truy vấn không hợp lệ!',200,600);}
        else{
            text('Giá trị nhỏ nhất trong đoạn từ ['+ 
            qs +
            ", " +
            qe + "] là: " +segTree.getRangeMin(qs,qe),  200, 600);}
    }
}
