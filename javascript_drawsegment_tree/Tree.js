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
            // console.log(this.node_list[i]);
            if(this.node_list[i].value){
                let id_node=this.node_list[i].id;
                if(id_node%2==1){
                    //Node trái 
                    s=this.node_list[(id_node-1)/2].L;
                    e=this.node_list[(id_node-1)/2].R;
                    mid=((s+e)-(s+e)%2)/2;
                    this.node_list[i].L=s;
                    this.node_list[i].R=mid;
                    
                }
                else{
                    //Node phải
                    s=this.node_list[(id_node-2)/2].L;
                    e=this.node_list[(id_node-2)/2].R;
                    mid=((s+e)-(s+e)%2)/2;
                    this.node_list[i].L=mid+1;
                    this.node_list[i].R=e;
                    
                }
                
            }

        }
        for(i=0;i<=this.id_max;i++){
            if(this.node_list[i].value && this.check_node_index(i)==true){
            stroke('red');
            fill('red');
            textSize(15);
            
            text( (this.node_list[i].id)+': '+'['+this.node_list[i].L+','+this.node_list[i].R+']',
            this.node_list[i].x,this.node_list[i].y+(this.node_list[i].radius*2)/2+25);
            }
            

        }
}
    create_nodelist(){
        for(let i=0;i<=this.id_max;i++){
            this.node_list[i]=new Node(0,i);
        }
        // console.log('id:'+this.id_max);
    }
    check_node_index(i){
        if(i%2==1){
            if(this.node_list[i].R==0 && this.node_list[(i-1)/2].R!=1 )
                return false;

        }
        else
        {
            if(this.node_list[i].R==0 && this.node_list[(i-2)/2].R!=1)
                return false;
        }
        return true;
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
            }
        if(this.node_n==this.id_max +1 ){
                this.draw_index_node();
                
            }
        if(this.node_n==this.id_max-1 ){
                this.draw_index_node();
                
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
        
        if(nodeA && nodeB && isNaN(nodeA.value)==false && isNaN(nodeB.value)==false) {
            // console.log(nodeB.id);
            stroke('orange');
            strokeWeight(1.5);
            let ax=nodeA.x,ay=nodeA.y + nodeB.radius + 2;
            let bx=nodeB.x,by=nodeB.y - nodeB.radius - 2;
            line(ax,ay,(ax+bx)/2,(ay+by)/2);
            stroke('orange');
            strokeWeight(1.5);
            setTimeout(() => {line(ax,ay,bx,by);}, 400);
        }
    }
    drawLine(nodeA, nodeB){
        // console.log(nodeB.id);
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
        strokeWeight(0.5);
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
              }, 100);
        
        setTimeout(() => {
            this.draw_text_node(node);
          }, 1500);
    }
    draw_show_node2(node,node_cha){
        // console.log(node.id);
        setTimeout(() => {
                this.draw_recursive(node_cha,node,-1);
              }, 100);
            
        setTimeout(()=>{
            this.drawLine(node_cha,node);
        },1000);
        setTimeout(() => {
            this.draw_text_node(node);
          }, 1500);
    }
    
    draw_build(){
        let time=0;
        let i_max=0;
        let time_dequy=700,time_show=1500;
        //Hiện đệ quy của nhánh trái 
            for(let  i=0, n=1;this.node_list[i].childrenLeft!=0;i=i*2+1,n++){
                setTimeout(() => {
                    this.draw_recursive(this.node_list[i],this.node_list[i].left,1);
                }, time_dequy*n+time);
                time+=time_dequy;
                i_max=i;
                if(this.node_list[i*2+1].childrenLeft==0){
                    setTimeout(() => {
                        //dành riêng cho node cuối cùng chỉ đổi màu node 
                        this.draw_recursive(this.node_list[i*2+1],this.node_list[i].left,0);
                    }, time_dequy*(n+1)+time);
                    time+=time_dequy;
                }
            }
        console.log(time);
        i_max=2*i_max+1;
        //hiển thị hết các node nằm bên trái 
        
            for(let j=i_max,k=1;j>=1;j=(j-1)/2,k++){
                //Hiện các node trái của nhánh trái
                if(j!=1){
                    setTimeout(() => {
                        this.draw_show_node1(this.node_list[(j-1)/2].left,this.node_list[(j-1)/2]);
                    }, time_show*(k)+time);
                    time+=time_show;
                }
                else{
                    setTimeout(() => {
                        this.draw_show_node1(this.node_list[(j-1)/2].left,this.node_list[(j-1)/2]);
                    }, time_dequy*(k)+time);
                    time+=time_dequy;
                }
                //Hiển thị node phải của nhánh trái   
                        if(j+1!=2){
                            if(this.node_list[j+1].left!=null){ 
                                let index=j+1,cha_index=(j-1)/2;
                                //vẽ tiếp đệ quy node trái của nhánh phải 
                                    setTimeout(() => {
                                        this.draw_recursive(this.node_list[index],this.node_list[index].left,1);
                                    }, time_dequy*k+time);
                                    time+=time_dequy;
                                    k++;
                                //node cuối cùng 
                                    setTimeout(() => {
                                        this.draw_recursive(this.node_list[j+1].left,this.node_list[j+1].left,0);
                                    }, time_dequy*k+time);
                                    time+=time_dequy;
                                    k++;
                                //Show node con của node phải 
                                    setTimeout(() => {
                                    this.draw_show_node2(this.node_list[index].left,this.node_list[index]);
                                    }, time_dequy*k+time);
                                    time+=time_dequy;
                                    k++;
                                    setTimeout(() => {
                                        this.draw_show_node2(this.node_list[index].right,this.node_list[index]);
                                        }, time_dequy*k+time);
                                    time+=time_dequy;
                                    k++;
                                //Show node phải 
                                setTimeout(() => {
                                    this.draw_show_node2(this.node_list[cha_index].right,this.node_list[cha_index]);
                                    }, time_dequy*k+time);
                                time+=time_dequy;
                                
            
                            }
                            else{
                                setTimeout(() => {
                                    this.draw_show_node2(this.node_list[(j-1)/2].right,this.node_list[(j-1)/2]);
                                    }, time_dequy*k+time);
                                time+=time_dequy;
                            }
                        }  
                       
                
            }
        console.log(time);
        //Hiển thị đệ quy nhánh phải 
            let j_max;
            setTimeout(() => {
                this.draw_recursive(this.node_list[0],this.node_list[2],1);
            }, time_dequy*3+time);
            time+=time_dequy*3;
            for(let  i=2, n=1;this.node_list[i].childrenLeft!=0;i=i*2+1,n++){
                setTimeout(() => {
                    this.draw_recursive(this.node_list[i],this.node_list[i].left,1);
                }, time_dequy*n+time);
                time+=time_dequy;
                j_max=i;
                if(this.node_list[i*2+1].childrenLeft==0){
                    setTimeout(() => {
                        //dành riêng cho node cuối cùng chỉ đổi màu node 
                        this.draw_recursive(this.node_list[i*2+1],this.node_list[i].left,0);
                    }, time_dequy*(n+1)+time);
                    time+=time_dequy;
                }
            }
            console.log(j_max);
            j_max=2*j_max+1;
        //Hiển thị các node nhánh phải 
        for(let j=j_max,k=1;j>=1;j=(j-1)/2,k++){
            //Hiện các node trái của nhánh phải
            if(j!=2){
                setTimeout(() => {
                    this.draw_show_node1(this.node_list[(j-1)/2].left,this.node_list[(j-1)/2]);
                }, time_show*(k)+time);
                time+=time_show;
            }
            else{
                setTimeout(() => {
                    this.draw_show_node1(this.node_list[0].right,this.node_list[0]);
                }, time_dequy*(k)+time);
                time+=time_dequy;
            }
                    
                    
            //Hiển thị node phải của nhánh phải    
                    if(j+1!=3){
                        if(this.node_list[j+1].left!=null){ 
                            let index=j+1,cha_index=(j-1)/2;
                            //vẽ tiếp đệ quy node trái của nhánh phải 
                                setTimeout(() => {
                                    this.draw_recursive(this.node_list[index],this.node_list[index].left,1);
                                }, time_dequy*k+time);
                                time+=time_dequy;
                                k++;
                            //node cuối cùng 
                                setTimeout(() => {
                                    this.draw_recursive(this.node_list[j+1].left,this.node_list[j+1].left,0);
                                }, time_dequy*k+time);
                                time+=time_dequy;
                                k++;
                            //Show node con của node phải 
                                setTimeout(() => {
                                this.draw_show_node2(this.node_list[index].left,this.node_list[index]);
                                }, time_dequy*k+time);
                                time+=time_dequy;
                                k++;
                                setTimeout(() => {
                                    this.draw_show_node2(this.node_list[index].right,this.node_list[index]);
                                    }, time_dequy*k+time);
                                time+=time_dequy;
                                k++;
                            //Show node phải 
                            setTimeout(() => {
                                this.draw_show_node2(this.node_list[cha_index].right,this.node_list[cha_index]);
                                }, time_dequy+time);
                            time+=time_dequy;
                            
        
                        }
                        else{
                            setTimeout(() => {
                                this.draw_show_node2(this.node_list[(j-1)/2].right,this.node_list[(j-1)/2]);
                                }, time_dequy*k+time);
                            time+=time_dequy;
                        }
                    }    
            
        }
            //Hiển thị node gốc 
            setTimeout(()=>{
                this.drawLine(this.node_list[0],this.node_list[2]);
            },time_dequy+time);
            time+=time_dequy;
            setTimeout(() => {
                this.draw_text_node(this.node_list[0]);
              }, time_show*4+time);
            time+=time_show*4;
            console.log(time);
    }
    draw_build_imd(){
        for(let i=0;i<=this.id_max;i++){
            if(this.node_list[i].value!=0){
                this.draw_text_node(this.node_list[i]);
                if(this.node_list[i].left)
                    this.drawLine(this.node_list[i],this.node_list[i].left);
                if(this.node_list[i].right)
                    this.drawLine(this.node_list[i],this.node_list[i].right);
            }
            
        }
    }
    draw_getquery(){

    }
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
