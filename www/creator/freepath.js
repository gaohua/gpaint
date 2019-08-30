class QFreePathCreator{
    constructor(){
        this.points = []
        this.started = false
        this.fromPos = {x:0,y:0}
        let ctrl = this
        qview.onmousedown = function(event){ctrl.onmousedown(event)}
        qview.onmousemove = function(event){ctrl.onmousemove(event)}
        qview.onmouseup = function(event){ctrl.onmouseup(event)}
    }
    onmousedown(event){
        this.fromPos = qview.getMousePos(event)
        this.started = true
    }
    onmousemove(event){
        if(this.started){
            this.points.push(qview.getMousePos(event))
            invalidate(null)
        }
    }
    onmouseup(event){
        if(this.started){
            qview.doc.addShape(this.buildShape())
            this.reset()
            invalidate()
        }
    }
    stop(){
        qview.onmousedown = null
        qview.onmousemove = null
        qview.onmouseup = null
    }
    reset(){
        this.points = []
        this.started = false
    }
    buildShape(){
        let points = [{x:this.fromPos.x,y:this.fromPos.y}]
        for(let i in this.points){
            points.push(this.points[i])
        }
        return new QPath(points,false,qview.lineStyle)
    }
    onpaint(ctx){
        ctx.lineWidth = qview.lineStyle.width
        ctx.strokeStyle = qview.lineStyle.color
        ctx.beginPath()
        ctx.moveTo(this.fromPos.x, this.fromPos.y)
        for(let i in this.points){
            ctx.lineTo(this.points[i].x, this.points[i].y)
        }
        ctx.stroke()
    }
}

qview.registerController("FreePathCreator",function(){return new QFreePathCreator()})