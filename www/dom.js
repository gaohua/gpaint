class QLineStyle{
    constructor(width,color){
        this.width = width
        this.color = color
    }
}

class QPath{
    constructor(points,close,lineStyle){
        this.points = points
        this.close = close
        this.lineStyle = lineStyle
    }

    onpaint(ctx){
        let lineStyle = this.lineStyle
        let points = this.points
        ctx.lineWidth = lineStyle.width
        ctx.strokeStyle = lineStyle.color
        ctx.beginPath()
        ctx.moveTo(points[0].x,points[0].y)
        for(let i = 1; i < points.length; i++){
            ctx.lineTo(points[i].x,points[i].y)
        }
        if(this.close){
            ctx.closePath()
        }
        ctx.stroke()
    }
}

class QPaintDoc{
    constructor(){
        this.shapes = []
    }

    addShape(shape){
        if(shape != null){
            this.shapes.push(shape)
        }
    }

    onpaint(ctx){
        let shapes = this.shapes
        for(let i in shapes){
            shapes[i].onpaint(ctx)
        }
    }
}