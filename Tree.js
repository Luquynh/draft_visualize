class Tree {
    
    constructor(length_n){
        this.size = 0;
        this.root = null;
        this.node_list=[];//mảng lưu các node được vẽ trên cây
        this.nums_list=[];//mảng lưu các số được vẽ ở dưới 
        this.node_n=0;
        this.solan_node=0;
        this.id_max=0;
        this.length_n=length_n;
        this.time_build=0;
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
    create_nodelist(a,op){
        // a là số phần tử của mảng node op là lựa chọn thôi 
        if(op==1){
            for(let i=0;i<=a;i++){
                this.node_list[i]=new Node(0,i);
            } 
        }
        else{
            let x_mu = parseInt(Math.ceil(Math.log(a) / Math.log(2)));
        //Maximum size of segment tree
            let max_size = 2 * parseInt(Math.pow(2, x_mu) )-1;
            for(let i=0;i<max_size;i++){
                this.nums_list[i]=new Node(0,i);
            }
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
            this.create_nodelist(this.id_max,1);
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
    //Dùng cho node ở dưới
    draw_number_text(node,value){
        
            fill('orange');
            stroke('grey');
            strokeWeight(1);
            circle(node.x,node.y,(node.radius-10)*2);
            //text
            stroke('white');
            strokeWeight(0.7);
            textSize(20);
            fill('white');
            textAlign(CENTER, CENTER);
            
            text(value,node.x,node.y);
    
    }
    draw_light_node(node,op){
        
        fill('white');
        stroke('blue');
        strokeWeight(1);
        circle(node.x,node.y,(node.radius-10)*2);
        //text
        stroke('white');
        strokeWeight(1);
        textSize(15);
        fill('white');
        textAlign(CENTER, CENTER);
        if(op!=-1)
            text(node.value,node.x,node.y);
        if(op==1 ||op==-1){
            stroke('red');
            fill('red');
            strokeWeight(0.4);
            textSize(15);
            text(node.id,node.x,node.y+((node.radius-10)*2)/2+25);
        }
        
    }
    //Dùng cho query
    draw_light_node1(node,op){
        
        fill('orange');
        stroke('grey');
        strokeWeight(1);
        circle(node.x,node.y,node.radius*2+4);
        //text
        stroke('white');
        strokeWeight(0.5);
        textSize(30);
        fill('white');
        textAlign(CENTER, CENTER);
        text(node.value,node.x,node.y);
        if(op==1){
            stroke('red');
            fill('red');
            strokeWeight(0.4);
            textSize(15);
            text(node.id,node.x,node.y+(node.radius*2)/2+25);
        }
        
    }
    draw_number_text1(node){
        fill('white');
        strokeWeight(1);
        stroke('blue');
        circle(node.x,node.y,node.radius*2+4);
        //text
        stroke(node.color);
        textSize(30);
        fill(node.color);
        textAlign(CENTER, CENTER);
        text(node.value,node.x,node.y);  

    }
    draw_getquery(answer,qs,qe,op){
        //text style
        // console.log(this.size);
        textSize(20);
        fill('black');
        stroke('black');
        strokeWeight(0.05);
        textAlign(CENTER, CENTER);
        // write text 
        if(op==1){
            alert('Giá trị nhỏ nhất trong đoạn từ ['+ 
            qs +
            ", " +
            qe + "] là: " +answer,   1200, 250);
            text('Giá trị nhỏ nhất trong đoạn từ ['+ 
            qs +
            ", " +
            qe + "] là: " +answer,   1200, 250);
        }
        else if(op==2){
            alert('Giá trị lớn nhất trong đoạn từ ['+ 
            qs +
            ", " +
            qe + "] là: " +answer,  1200, 250);
            text('Giá trị lớn nhất trong đoạn từ ['+ 
            qs +
            ", " +
            qe + "] là: " +answer,   1200, 250);
        }
        else{
            alert('Tổng giá trị trong đoạn từ ['+ 
            qs +
            ", " +
            qe + "] là: " +answer,  1200, 250);
            text('Tổng giá trị trong đoạn từ ['+ 
            qs +
            ", " +
            qe + "] là: " +answer,  1200, 250);
        }
           
    }
    draw_query_light(node_con,time,op,qs,qe){
        setTimeout(()=>{this.draw_light_node1(node_con,0);},time);
        if(op==1){
            setTimeout(()=>{this.draw_number_text1(node_con);},time+1500);
            
        }
        if(op==3){
            // setTimeout(()=>{this.draw_getquery(qs,qe)},time+1500);
        }
    }
   
    draw_number_node(nums,op){
        //Tạo mảng dãy số nhập vào 
        this.create_nodelist(nums.length,0);
        //Vẽ dãy số nhập vào 
        let x_max=35;
        let y_max=this.node_list[this.id_max].y+150;
        let radius_max=this.node_list[this.id_max].radius;
        let x_mu = parseInt(Math.ceil(Math.log(nums.length) / Math.log(2)));
        //Maximum size of segment tree
        let max_size = 2 * parseInt(Math.pow(2, x_mu) )-1;
        for (let i=0;i<max_size;i++){
            let x_node=x_max+radius_max*i*2+4*i;
            this.nums_list[i].x=x_node;
            this.nums_list[i].y=y_max;
            this.nums_list[i].id=i;
            //Hiện thị node number 
            this.draw_light_node(this.nums_list[i],-1);
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
    reset(){
        this.draw();
    }
    draw_light_annimation(node,time,value){
        //vẽ node nền cam chữ trang
        node.value=value;
        setTimeout(()=>{this.draw_number_text(node,node.value)},time);
    }
    draw_build(){
        let time=0;
        let i_max=0;
        let time_dequy=700*1.25,time_show=1500*1.25;
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
        i_max=2*i_max+1; //node đệ quy cuối cùng bên node trái 
        //hiển thị hết các node nằm bên trái 
        let them_node=1;
            for(let j=i_max,k=1;j>=1;j=(j-1)/2,k++){
                //Hiện các node trái của nhánh trái
                if(j!=1){
                    setTimeout(() => {
                        this.draw_show_node1(this.node_list[(j-1)/2].left,this.node_list[(j-1)/2]);
                    }, time_show*(k)+time);
                    time+=time_show;
                    console.log('j'+this.node_list[j].value);

                    
                    //VẼ NODE bên trái dưới mảng 
                     {   
            
                        this.draw_light_annimation(this.nums_list[this.node_list[j].id],time+time_dequy*them_node,this.node_list[j].value);
                        them_node++;
                    }
                                   
                        
                }
                else{
                    setTimeout(() => {
                        this.draw_show_node1(this.node_list[(j-1)/2].left,this.node_list[(j-1)/2]);
                    }, time_dequy*(k)+time);
                    time+=time_dequy;
                   
                        {
                            this.draw_light_annimation(this.nums_list[this.node_list[1].id],time+time_dequy*them_node,this.node_list[1].value);
                            them_node++;
                        }
                }
                //Hiển thị node phải của nhánh trái   
                        if(j+1!=2){
                            if(this.node_list[j+1].left!=null){ 
                                let index=j+1,cha_index=(j-1)/2,con_index=(2*(j+1)+1);
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
                                    //Hiện node đã được thêm vào cây 
                                    
                                        {
                                            this.draw_light_annimation(this.nums_list[this.node_list[con_index].id],time+time_dequy*them_node,this.node_list[con_index].value);
                                                them_node++;
                                        }
                                    setTimeout(() => {
                                        this.draw_show_node2(this.node_list[index].right,this.node_list[index]);
                                        }, time_dequy*k+time);
                                    time+=time_dequy;
                                    k++;
                                    //Hiện node đã được thêm vào cây 
                                        
                                        {
                                        this.draw_light_annimation(this.nums_list[this.node_list[con_index+1].id],time+time_dequy*them_node,this.node_list[con_index+1].value);
                                        them_node++;
                                        }
                                //Show node phải 
                                setTimeout(() => {
                                    this.draw_show_node2(this.node_list[cha_index].right,this.node_list[cha_index]);
                                    }, time_dequy*k+time);
                                time+=time_dequy;
                                
                                //Hiện node đã được thêm vào cây
                        
                                    {
                                    this.draw_light_annimation(this.nums_list[this.node_list[index].id],time+time_dequy*them_node,this.node_list[index].value);
                                    them_node++;
                                    }
                
                            }
                            else{
                                setTimeout(() => {
                                    this.draw_show_node2(this.node_list[(j-1)/2].right,this.node_list[(j-1)/2]);
                                    }, time_dequy*k+time);
                                time+=time_dequy;
                                //Hiện node đã được thêm vào cây
                                {
                                this.draw_light_annimation(this.nums_list[this.node_list[j+1].id],time+time_dequy*them_node,this.node_list[j+1].value);
                                them_node++;
                                }
            
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
            //Hiển thị node 2 ơ trong mảng
            {
                this.draw_light_annimation(this.nums_list[this.node_list[2].id],time+time_dequy*2*them_node,this.node_list[2].value);
                //them_node++;
            }
            for(let  i=2, n=1;this.node_list[i].childrenLeft!=0;i=i*2+1,n++){
                setTimeout(() => {
                    this.draw_recursive(this.node_list[i],this.node_list[i].left,1);
                }, time_dequy*n+time);
                time+=time_dequy;
                //Hiện node đã được thêm vào cây
                
                j_max=i;
                if(this.node_list[i*2+1].childrenLeft==0){
                    setTimeout(() => {
                        //dành riêng cho node cuối cùng chỉ đổi màu node 
                        this.draw_recursive(this.node_list[i*2+1],this.node_list[i].left,0);
                    }, time_dequy*(n+1)+time);
                    time+=time_dequy;
                }
            }
            them_node=1; //Khởi tạo lại để thêm node khớp với khởi tạo 
            j_max=2*j_max+1;// node đệ quy cuối cùng của node trái 
        //Hiển thị các node nhánh phải 
        for(let j=j_max,k=1;j>=1;j=(j-1)/2,k++){
            //Hiện các node trái của nhánh phải
            if(j!=2){
                setTimeout(() => {
                    this.draw_show_node1(this.node_list[(j-1)/2].left,this.node_list[(j-1)/2]);
                }, time_show*(k)+time);
                time+=time_show;
                //Hiện node đã đc thêm vào cây 
               
                        {
                            this.draw_light_annimation(this.nums_list[this.node_list[j].id],time+time_dequy*them_node,this.node_list[j].value);
                            them_node++;
                        }
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
                            let index=j+1,cha_index=(j-1)/2,con_index=((j+1)*2+1);
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
                                //Hiện node đã đc thêm vào cây 
                                
                                {
                                    this.draw_light_annimation(this.nums_list[this.node_list[con_index].id],time+time_dequy*them_node,this.node_list[con_index].value);
                                    them_node++;
                                }
                                setTimeout(() => {
                                    this.draw_show_node2(this.node_list[index].right,this.node_list[index]);
                                    }, time_dequy*k+time);
                                time+=time_dequy;
                                k++;
                                //Hiện node đã đc thêm vào cây 
                                
                                {
                                    this.draw_light_annimation(this.nums_list[this.node_list[con_index+1].id],time+time_dequy*them_node,this.node_list[con_index+1].value);
                                    them_node++;
                                }
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
                            //Hiện node đã đc thêm vào cây 
                
                            {
                                this.draw_light_annimation(this.nums_list[this.node_list[j+1].id],time+time_dequy*them_node,this.node_list[j+1].value);
                                them_node++;

                            }
                        }
                    }    
            
        }
        //Trường hợp nhánh phải không có node con 
            if(isNaN(j_max)==true){
                setTimeout(() => {
                    this.draw_recursive(this.node_list[2],this.node_list[0],0);
                }, time_dequy+time);
                time+=time_dequy;
                setTimeout(() => {
                    this.draw_show_node1(this.node_list[0].right,this.node_list[0]);
                }, time_dequy*(2)+time);
                time+=time_dequy;
                this.draw_light_annimation(this.nums_list[this.node_list[2].id],time+time_dequy*them_node,this.node_list[2].value);
                                    them_node++;
            }
            //Hiển thị node gốc 
            setTimeout(()=>{
                this.drawLine(this.node_list[0],this.node_list[2]);
            },time_dequy+time);
            time+=time_dequy;
            setTimeout(() => {
                this.draw_text_node(this.node_list[0]);
              }, time_show*3+time);
            //Hiện thị node 0 ở trong mảng 
              {
                this.draw_light_annimation(this.nums_list[this.node_list[0].id],time+time_dequy*(them_node+1),this.node_list[0].value);
                //them_node++;
            }
            time+=time_show*3;
            console.log(time);
            this.time_build=time;
    }

    draw_build_imd(){
        for(let i=0;i<=this.id_max;i++){
            if(this.node_list[i].value!=0){
                this.draw_text_node(this.node_list[i]);
                if(this.node_list[i].left)
                    this.drawLine(this.node_list[i],this.node_list[i].left);
                if(this.node_list[i].right)
                    this.drawLine(this.node_list[i],this.node_list[i].right);
                this.nums_list[this.node_list[i].id].value=this.node_list[i].value;
                this.draw_number_text(this.nums_list[this.node_list[i].id],this.node_list[i].value);
            }
            
        }
        
        
    }
    
    check_query(qs,qe,node){
        let check=0;
        if(qs < 0||qe <0 || qs > qe){
            return -1;
        }
        if(node.L>=qs&& node.R<=qe)
            return 3;//overlap
        if(node.R<qs)//nhỏ hơn đoạn truy vấn
            return 2;
        if(node.L>qe)//lớn hơn đoạn truy vấn
            return 2;
        if(check==2)
            return 2; //không nằm trong đoạn truy vấn 

        return 1; //có một phần thuộc truy vấn 
        
    }
    check_node_con(i,id_cantim){
        let id_con=id_cantim*2+1;
        if(i!=id_con && i!=id_con+1){
            return true;
        }
        return false;
    }
    
   //Tìm truy vấn của cây min segment tree 
    draw_minquery(qs,qe){
        //hiện ra cây luôn 
        this.draw_build_imd();
        //từ đây truy vấn 
        let check,time=0;
        let id_cantim=[-1,-1,-1,-1];
        let ar_check=[-1,-1,-1,-1];
        let time_change=1500;
        for(let i=0;i<=this.id_max;i++){
            if(this.node_list[i].value){
            check=this.check_query(qs,qe,this.node_list[i]);
                if(check==1){
                    this.draw_query_light(this.node_list[i],time,1,qs,qe);
                    if(this.node_list[i].childrenLeft){
                        if(this.check_query(qs,qe,this.node_list[i*2+1])==1||this.check_query(qs,qe,this.node_list[i*2+1])==3)
                            setTimeout(()=>{this.drawLine_r(this.node_list[i],this.node_list[i*2+1]);},time) 
                        if(this.check_query(qs,qe,this.node_list[i*2+2])==1||this.check_query(qs,qe,this.node_list[i*2+2])==3)
                            setTimeout(()=>{this.drawLine_r(this.node_list[i],this.node_list[i*2+2]);},time)    
                    }
                    time+=time_change;
                }
                else if(check==3){
                    
                    //node thứ nhất thuộc đoạn truy vấn 
                    if(id_cantim[0]==-1)
                    {
                        id_cantim[0]=i;
                        ar_check[0]=1;
                    }
                    if(this.node_list[i].L==qs && this.node_list[i].R==qe)
                    {   this.draw_query_light(this.node_list[i],time,3,qs,qe);
                        break;

                    }
                    //node thứ 2 thuộc đoạn truy vấn 
                    
                    if(id_cantim[1]==-1 && id_cantim[0]!=i && ar_check[0]==1){
                       let node_qs=this.node_list[id_cantim[0]].L,node_qe=this.node_list[id_cantim[0]].R;
                        if(this.check_query(node_qs,node_qe,this.node_list[i])!=3){
                            id_cantim[1]=i;
                            ar_check[1]=2;
                        }
                    }
                        
                    //node thứ 3 thuộc đoạn truy vấn 
                    
                    if(id_cantim[2]==-1 && id_cantim[1]!=i && ar_check[1]==2){
                        let check_t=0;
                        for(let j=0;i<4;j++){
                            if(id_cantim[j]!=-1){
                                let node_qs=this.node_list[id_cantim[j]].L,node_qe=this.node_list[id_cantim[j]].R;
                                    if(this.check_query(node_qs,node_qe,this.node_list[i])==3)
                                                check_t++;
                                }
                        }
                            if(check_t){
                                id_cantim[2]=i;
                                ar_check[2]=3;}
                        
                    }
                    //node thứ 4 thuộc đoạn truy vấn 
                    if(id_cantim[3]==-1 && id_cantim[2]!=i && ar_check[2]==3){
                        let check_t=0;
                        for(let j=0;i<4;j++){
                            if(id_cantim[j]!=-1){
                                let node_qs=this.node_list[id_cantim[j]].L,node_qe=this.node_list[id_cantim[j]].R;
                                    if(this.check_query(node_qs,node_qe,this.node_list[i])==3)
                                                check_t++;
                                }
                        }
                        if(check_t!=0){
                            id_cantim[3]=i;
                            ar_check[3]=4;
                        }
                        
                    }
                    if(i==id_cantim[0]||i==id_cantim[1]||i==id_cantim[2]||i==id_cantim[3]){
                        this.draw_query_light(this.node_list[i],time,3,qs,qe);
                        time+=time_change;
                    }
                    
                    
                    
                }
            }
        }
        let ar_min=[],answer;
        for(let i=0;i<id_cantim.length;i++){
            console.log(id_cantim[i]);
            if(id_cantim[i]!=-1){
                ar_min[i]=this.node_list[id_cantim[i]].value;
                if(i==0)
                    answer=ar_min[i];
                // console.log(ar_min[i]);
                if(answer>ar_min[i]){
                    answer=ar_min[i];
                }
            }
              
        }
        setTimeout(()=>{this.draw_getquery(answer,qs,qe,1)},time+time_change);

    }
    //Tìm truy vấn của cây max segment tree 
    draw_maxquery(qs,qe){
        //hiện ra cây luôn 
        this.draw_build_imd();
        //từ đây truy vấn 
        let check,time=0;
        let id_cantim=[-1,-1,-1,-1];
        let ar_check=[-1,-1,-1,-1];
        let time_change=1500;
        for(let i=0;i<=this.id_max;i++){
            if(this.node_list[i].value){
            check=this.check_query(qs,qe,this.node_list[i]);
                if(check==1){
                    this.draw_query_light(this.node_list[i],time,1,qs,qe);
                    if(this.node_list[i].childrenLeft){
                        if(this.check_query(qs,qe,this.node_list[i*2+1])==1||this.check_query(qs,qe,this.node_list[i*2+1])==3)
                            setTimeout(()=>{this.drawLine_r(this.node_list[i],this.node_list[i*2+1]);},time) 
                        if(this.check_query(qs,qe,this.node_list[i*2+2])==1||this.check_query(qs,qe,this.node_list[i*2+2])==3)
                            setTimeout(()=>{this.drawLine_r(this.node_list[i],this.node_list[i*2+2]);},time)    
                    }
                    time+=time_change;
                }
                else if(check==3){
                    
                    //node thứ nhất thuộc đoạn truy vấn 
                    if(id_cantim[0]==-1)
                    {
                        id_cantim[0]=i;
                        ar_check[0]=1;
                    }
                    if(this.node_list[i].L==qs && this.node_list[i].R==qe)
                    {   this.draw_query_light(this.node_list[i],time,3,qs,qe);
                        break;

                    }
                    //node thứ 2 thuộc đoạn truy vấn 
                    
                    if(id_cantim[1]==-1 && id_cantim[0]!=i && ar_check[0]==1){
                       let node_qs=this.node_list[id_cantim[0]].L,node_qe=this.node_list[id_cantim[0]].R;
                        if(this.check_query(node_qs,node_qe,this.node_list[i])!=3){
                            id_cantim[1]=i;
                            ar_check[1]=2;
                        }
                    }
                        
                    //node thứ 3 thuộc đoạn truy vấn 
                    
                    if(id_cantim[2]==-1 && id_cantim[1]!=i && ar_check[1]==2){
                        let check_t=0;
                        for(let j=0;i<4;j++){
                            if(id_cantim[j]!=-1){
                                let node_qs=this.node_list[id_cantim[j]].L,node_qe=this.node_list[id_cantim[j]].R;
                                    if(this.check_query(node_qs,node_qe,this.node_list[i])==3)
                                                check_t++;
                                }
                        }
                            if(check_t){
                                id_cantim[2]=i;
                                ar_check[2]=3;}
                        
                    }
                    //node thứ 4 thuộc đoạn truy vấn 
                    if(id_cantim[3]==-1 && id_cantim[2]!=i && ar_check[2]==3){
                        let check_t=0;
                        for(let j=0;i<4;j++){
                            if(id_cantim[j]!=-1){
                                let node_qs=this.node_list[id_cantim[j]].L,node_qe=this.node_list[id_cantim[j]].R;
                                    if(this.check_query(node_qs,node_qe,this.node_list[i])==3)
                                                check_t++;
                                }
                        }
                        if(check_t!=0){
                            id_cantim[3]=i;
                            ar_check[3]=4;
                        }
                        
                    }
                    if(i==id_cantim[0]||i==id_cantim[1]||i==id_cantim[2]||i==id_cantim[3]){
                        this.draw_query_light(this.node_list[i],time,3,qs,qe);
                        time+=time_change;
                    }
                    
                    
                    
                }
            }
        }
        let ar_min=[],answer;
        for(let i=0;i<id_cantim.length;i++){
            console.log(id_cantim[i]);
            if(id_cantim[i]!=-1){
                ar_min[i]=this.node_list[id_cantim[i]].value;
                if(i==0)
                    answer=ar_min[i];
                // console.log(ar_min[i]);
                if(answer<ar_min[i]){
                    answer=ar_min[i];
                }
            }
              
        }
        setTimeout(()=>{this.draw_getquery(answer,qs,qe,2)},time+time_change);

    }
    draw_sumquery(qs,qe){
        //hiện ra cây luôn 
        this.draw_build_imd();
        //từ đây truy vấn 
        let check,time=0;
        let id_cantim=[-1,-1,-1,-1];
        let ar_check=[-1,-1,-1,-1];
        let time_change=1500;
        for(let i=0;i<=this.id_max;i++){
            if(this.node_list[i].value){
            check=this.check_query(qs,qe,this.node_list[i]);
                if(check==1){
                    this.draw_query_light(this.node_list[i],time,1,qs,qe);
                    if(this.node_list[i].childrenLeft){
                        if(this.check_query(qs,qe,this.node_list[i*2+1])==1||this.check_query(qs,qe,this.node_list[i*2+1])==3)
                            setTimeout(()=>{this.drawLine_r(this.node_list[i],this.node_list[i*2+1]);},time) 
                        if(this.check_query(qs,qe,this.node_list[i*2+2])==1||this.check_query(qs,qe,this.node_list[i*2+2])==3)
                            setTimeout(()=>{this.drawLine_r(this.node_list[i],this.node_list[i*2+2]);},time)    
                    }
                    time+=time_change;
                }
                else if(check==3){
                    
                    //node thứ nhất thuộc đoạn truy vấn 
                    if(id_cantim[0]==-1)
                    {
                        id_cantim[0]=i;
                        ar_check[0]=1;
                    }
                    if(this.node_list[i].L==qs && this.node_list[i].R==qe)
                    {   this.draw_query_light(this.node_list[i],time,3,qs,qe);
                        break;

                    }
                    //node thứ 2 thuộc đoạn truy vấn 
                    
                    if(id_cantim[1]==-1 && id_cantim[0]!=i && ar_check[0]==1){
                       let node_qs=this.node_list[id_cantim[0]].L,node_qe=this.node_list[id_cantim[0]].R;
                        if(this.check_query(node_qs,node_qe,this.node_list[i])!=3){
                            id_cantim[1]=i;
                            ar_check[1]=2;
                        }
                    }
                        
                    //node thứ 3 thuộc đoạn truy vấn 
                    
                    if(id_cantim[2]==-1 && id_cantim[1]!=i && ar_check[1]==2){
                        let check_t=0;
                        for(let j=0;i<4;j++){
                            if(id_cantim[j]!=-1){
                                let node_qs=this.node_list[id_cantim[j]].L,node_qe=this.node_list[id_cantim[j]].R;
                                    if(this.check_query(node_qs,node_qe,this.node_list[i])==3)
                                                check_t++;
                                }
                        }
                            if(check_t){
                                id_cantim[2]=i;
                                ar_check[2]=3;}
                        
                    }
                    //node thứ 4 thuộc đoạn truy vấn 
                    if(id_cantim[3]==-1 && id_cantim[2]!=i && ar_check[2]==3){
                        let check_t=0;
                        for(let j=0;i<4;j++){
                            if(id_cantim[j]!=-1){
                                let node_qs=this.node_list[id_cantim[j]].L,node_qe=this.node_list[id_cantim[j]].R;
                                    if(this.check_query(node_qs,node_qe,this.node_list[i])==3)
                                                check_t++;
                                }
                        }
                        if(check_t!=0){
                            id_cantim[3]=i;
                            ar_check[3]=4;
                        }
                        
                    }
                    if(i==id_cantim[0]||i==id_cantim[1]||i==id_cantim[2]||i==id_cantim[3]){
                        this.draw_query_light(this.node_list[i],time,3,qs,qe);
                        time+=time_change;
                    }
                    
                    
                    
                }
            }
        }
        let ar_min=[],answer=0;
        for(let i=0;i<id_cantim.length;i++){
            console.log(id_cantim[i]);
            if(id_cantim[i]!=-1){
                ar_min[i]=this.node_list[id_cantim[i]].value;
                
                    answer+=ar_min[i];
            }
              
        }
        setTimeout(()=>{this.draw_getquery(answer,qs,qe,3)},time+time_change);

    }
    draw_minupdate(BT,val)
    {
        let time = 0;
        let time_1 = 1000;
        let time_2 = 2000;
        for(let i = 0; i < BT.length; i++)
        {
            setTimeout(() => {
                for(let j = 0; j < this.node_list.length; j++){
                    if(this.node_list[j].id == BT[i])
                    {
                        if(this.node_list[j].left == null && this.node_list[j].right == null)
                        {
                            this.node_list[j].value = val;
                            this.node_list[j].color = 'red';
                            this.node_list[j].draw1();
                            setTimeout(() => {
                                this.node_list[j].draw2();
                            }, time_1);
                            setTimeout(() => {
                                this.check_minupdate(this.node_list[j], BT, time);
                            }, time_2);
                            time += 3000;
                        }
                        else{
                            this.node_list[j].draw1();
                        }
                    }
                }
            }, time);
            time += 3000;
        }
    }
    check_minupdate(node, BT, time)
    {
        let a;
        let parent_node;
        let save_id = null;
        if(node.id % 2 == 0)
            a = (node.id - 2) / 2;
        if(node.id % 2 != 0)
            a = (node.id - 1) / 2;
        for(let i = 0; i < BT.length; i++)
        {
            if(BT[i] == node.id)
                BT[i] = -1;
        }
        for(let i = 0; i < this.node_list.length; i++)
        {
            if(this.node_list[i].id == a)
                parent_node = this.node_list[i];
        }
        for(let i = 0; i < BT.length; i++)
        {
            if(BT[i] != a && BT[i] != node.id)
            {
                if(BT[i] == a * 2 + 1 || BT[i] == a * 2 + 2)
                {
                    return;
                }
                else
                {
                    save_id = 1;
                }
            }
        }
        if(save_id != null)
        {
            parent_node.value = Math.min(parent_node.left.value, parent_node.right.value);
            parent_node.color = 'red';
            parent_node.draw2();
            time += 2000
            setTimeout(() => {
                this.check_minupdate(parent_node,BT);
            }, 2000);
        }
    }
    //Update cây max
    draw_maxupdate(BT,val)
    {
        let time = 0;
        for(let i = 0; i < BT.length; i++)
        {
            setTimeout(() => {
                for(let j = 0; j < this.node_list.length; j++){
                    if(this.node_list[j].id == BT[i])
                    {
                        if(this.node_list[j].left == null && this.node_list[j].right == null)
                        {
                            this.node_list[j].value = val;
                            this.node_list[j].color = 'red';
                            this.node_list[j].draw1();
                            setTimeout(() => {
                                this.node_list[j].draw2();
                            }, 1000);
                            setTimeout(() => {
                                this.check_maxupdate(this.node_list[j], BT, time);
                            }, 2000);
                            time += 3000;
                        }
                        else{
                            this.node_list[j].draw1();
                        }
                    }
                }
            }, time);
            time += 3000;
        }
    }
    check_maxupdate(node, BT, time)
    {
        let a;
        let parent_node;
        let save_id = null;
        if(node.id % 2 == 0)
            a = (node.id - 2) / 2;
        if(node.id % 2 != 0)
            a = (node.id - 1) / 2;
        for(let i = 0; i < BT.length; i++)
        {
            if(BT[i] == node.id)
                BT[i] = -1;
        }
        for(let i = 0; i < this.node_list.length; i++)
        {
            if(this.node_list[i].id == a)
                parent_node = this.node_list[i];
        }
        for(let i = 0; i < BT.length; i++)
        {
            if(BT[i] != a && BT[i] != node.id)
            {
                if(BT[i] == a * 2 + 1 || BT[i] == a * 2 + 2)
                {
                    return;
                }
                else
                {
                    save_id = 1;
                }
            }
        }
        if(save_id != null)
        {
            parent_node.value = Math.max(parent_node.left.value, parent_node.right.value);
            parent_node.color = 'red';
            parent_node.draw2();
            time += 2000
            setTimeout(() => {
                this.check_maxupdate(parent_node,BT);
            }, 2000);
        }
    }

    //Update cây sum
    draw_sumupdate(BT,val)
    {
        let time = 0;
        for(let i = 0; i < BT.length; i++)
        {
            setTimeout(() => {
                for(let j = 0; j < this.node_list.length; j++){
                    if(this.node_list[j].id == BT[i])
                    {
                        if(this.node_list[j].left == null && this.node_list[j].right == null)
                        {
                            this.node_list[j].value = val;
                            this.node_list[j].color = 'red';
                            this.node_list[j].draw1();
                            setTimeout(() => {
                                this.node_list[j].draw2();
                            }, 1000);
                            setTimeout(() => {
                                this.check_sumupdate(this.node_list[j], BT, time);
                            }, 2000);
                            time += 3000;
                        }
                        else{
                            this.node_list[j].draw1();
                        }
                    }
                }
            }, time);
            time += 3000;
        }
    }
    check_sumupdate(node, BT, time)
    {
        let a;
        let parent_node;
        let save_id = null;
        if(node.id % 2 == 0)
            a = (node.id - 2) / 2;
        if(node.id % 2 != 0)
            a = (node.id - 1) / 2;
        for(let i = 0; i < BT.length; i++)
        {
            if(BT[i] == node.id)
                BT[i] = -1;
        }
        for(let i = 0; i < this.node_list.length; i++)
        {
            if(this.node_list[i].id == a)
                parent_node = this.node_list[i];
        }
        for(let i = 0; i < BT.length; i++)
        {
            if(BT[i] != a && BT[i] != node.id)
            {
                if(BT[i] == a * 2 + 1 || BT[i] == a * 2 + 2)
                {
                    return;
                }
                else
                {
                    save_id = 1;
                }
            }
        }
        if(save_id != null)
        {
            parent_node.value = Number(parent_node.left.value) + Number(parent_node.right.value);
            parent_node.color = 'red';
            parent_node.draw2();
            time += 2000
            setTimeout(() => {
                this.check_sumupdate(parent_node,BT);
            }, 2000);
        }
    }
}




// if(op==1){
//     alert('Giá trị nhỏ nhất trong đoạn từ ['+ 
//     qs +
//     ", " +
//     qe + "] là: " +answer,   1200, 250);
//     text('Giá trị nhỏ nhất trong đoạn từ ['+ 
//     qs +
//     ", " +
//     qe + "] là: " +answer,   1200, 250);
// }
// else if(op==2){
//     alert('Giá trị lớn nhất trong đoạn từ ['+ 
//     qs +
//     ", " +
//     qe + "] là: " +answer,  1200, 250);
//     text('Giá trị lớn nhất trong đoạn từ ['+ 
//     qs +
//     ", " +
//     qe + "] là: " +answer,   1200, 250);
// }
// else{
//     alert('Tổng giá trị trong đoạn từ ['+ 
//     qs +
//     ", " +
//     qe + "] là: " +answer,  1200, 250);
//     text('Tổng giá trị trong đoạn từ ['+ 
//     qs +
//     ", " +
//     qe + "] là: " +answer,  1200, 250);
// }