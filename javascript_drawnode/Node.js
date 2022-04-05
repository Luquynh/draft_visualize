class Node{
    static leftPosition = 0;
    static fontSize = 30;
    static valueSize = 0;
    static c=1;
    constructor(
        value,
        id, //
        x = 0,
        y = 0,
        radius = 40,
        color = 'black',
        background = 'white'
    )
    {
        this.value = value;
        this.id = id;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.background = background;
        this.left = null;
        this.right = null;
        this.level = 0;
        this.childrenLeft = 0;
        this.childrenRight = 0;
        if (this.value.length > Node.valueSize) {
            Node.valueSize = value.length;
            textSize(Node.fontSize);
            while (
                textWidth(this.value) > this.radius * 2 *0.65 &&
                Node.fontSize > 2
            )
            {
                Node.fontSize--;
                textSize(Node.fontSize);
            }
        }
    }
    draw(redraw = false)
    {
        if(!redraw) {
            this.x = Node.leftPosition * this.radius * 2 * 0.4 + 50;
            this.y = this.level * this.radius * 2 * 1.4 + 80;
        }
        strokeWeight(2);
        stroke('orange');
        fill('white');
        circle(this.x, this.y, this.radius * 2 + 4);
        //No NEED
        // stroke('blue');
        // fill(this.background);
        // circle(this.x, this.y, this.radius * 2);

        //text of node 
        stroke(this.color);
        strokeWeight(0.1);
        
        
        textSize(Node.fontSize);
        fill(this.color);
        textAlign(CENTER, CENTER);
        text('?', this.x, this.y);
        
        
        //node signs

        stroke('red');
        fill('red');
        textSize(15);
        
        text(''+ (this.id+1),this.x,this.y+(this.radius*2)/2+25);

        if(!redraw) {
            Node.leftPosition++;
        }
    }
    
}