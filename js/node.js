!function(){function t(t,e,o,n,i){var s=this;this.id=t,("number"!=typeof n.w||n.w<=1)&&(n.w=2),("number"!=typeof n.h||n.h<=1)&&(n.h=2),this.bound={x:n.x,y:n.y,w:n.w,h:n.h},this.color="#fff",this.type=i,this.elem="rect"==i?e.rect(0,0,this.bound.w,this.bound.h):"ellipse"==i?e.ellipse(this.bound.w/2,this.bound.h/2,this.bound.w/2,this.bound.h/2):"rectangle"==i?e.rect(0,0,this.bound.w,this.bound.h,5,5):e.ellipse(0,0,this.bound.w,this.bound.h),o.getGroup().append(this.elem),this.start_pos={x:0,y:0},this.listeners={onclick:null,onmove:null},this.elem.drag(function(t,e){s.setPos(s.start_pos.x+t,s.start_pos.y+e),s.listeners.onmove&&s.listeners.onmove()},function(){s.start_pos.x=s.bound.x,s.start_pos.y=s.bound.y},function(){o.fireOnNodeUpdate(s)}),this.elem.click(function(){s.listeners.onclick()}),this.init()}window.Node=t,t.prototype.init=function(){this.elem.attr({fill:this.color,stroke:"#000",strokeWidth:1}),this.elem.addClass("node"),this.refresh()},t.prototype.remove=function(){},t.prototype.onclick=function(t){this.listeners.onclick=t},t.prototype.onmove=function(t){this.listeners.onmove=t},t.prototype.off=function(t){this.listeners[t]=null},t.prototype.setPos=function(t,e){this.bound.x=t,this.bound.y=e,this.refresh()},t.prototype.getBound=function(){return this.bound},t.prototype.getX=function(){return this.bound.x},t.prototype.getY=function(){return this.bound.y},t.prototype.setSize=function(t,e){("number"!=typeof t||1>=t)&&(t=2),("number"!=typeof e||1>=e)&&(e=2),this.bound.w=t,this.bound.h=e,this.refresh()},t.prototype.setW=function(t){("number"!=typeof t||1>=t)&&(t=2),this.bound.w=t,this.refresh()},t.prototype.setH=function(t){("number"!=typeof t||1>=t)&&(t=2),this.bound.h=t,this.refresh()},t.prototype.refresh=function(){this.elem.transform("translate("+this.bound.x+","+this.bound.y+")"),"rect"==this.type||"rectangle"==this.type?this.elem.attr({width:this.bound.w,height:this.bound.h}):"ellipse"==this.type&&this.elem.attr({cx:this.bound.w/2,cy:this.bound.h/2,rx:this.bound.w/2,ry:this.bound.h/2})}}();