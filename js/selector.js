!function(t){function r(t,e){function s(){}function o(){i.fireOnChanged(i.target),i.setTarget(i.target)}var i=this;this.pos={x:0,y:0},this.target=null,this.listeners={changed:[],removed:[]},this.group=t.group(),e.append(this.group),this.cursor={n:t.circle(50,0,r.CursorRange),s:t.circle(50,100,r.CursorRange),w:t.circle(0,50,r.CursorRange),e:t.circle(100,50,r.CursorRange),nw:t.circle(0,0,r.CursorRange),ne:t.circle(100,0,r.CursorRange),sw:t.circle(0,100,r.CursorRange),se:t.circle(100,100,r.CursorRange),remove:t.circle(120,50,r.CursorRange)};for(var n in this.cursor)this.cursor[n].attr({fill:"#3030ff",stroke:"#fff",strokeWidth:3}),this.group.append(this.cursor[n]);this.cursor.n.drag(function(t,r){i.target.setPos(i.target_bound.x,i.target_bound.y+r),i.target.setSize(i.target_bound.w,i.target_bound.h-r),i.refresh()},s,o),this.cursor.s.drag(function(t,r){i.target.setSize(i.target_bound.w,i.target_bound.h+r),i.refresh()},s,o),this.cursor.w.drag(function(t){i.target.setPos(i.target_bound.x+t,i.target_bound.y),i.target.setSize(i.target_bound.w-t,i.target_bound.h),i.refresh()},s,o),this.cursor.e.drag(function(t){i.target.setSize(i.target_bound.w+t,i.target_bound.h),i.refresh()},s,o),this.cursor.nw.drag(function(t,r){i.target.setPos(i.target_bound.x+t,i.target_bound.y+r),i.target.setSize(i.target_bound.w-t,i.target_bound.h-r),i.refresh()},s,o),this.cursor.ne.drag(function(t,r){i.target.setPos(i.target_bound.x,i.target_bound.y+r),i.target.setSize(i.target_bound.w+t,i.target_bound.h-r),i.refresh()},s,o),this.cursor.sw.drag(function(t,r){i.target.setPos(i.target_bound.x+t,i.target_bound.y),i.target.setSize(i.target_bound.w-t,i.target_bound.h+r),i.refresh()},s,o),this.cursor.se.drag(function(t,r){i.target.setSize(i.target_bound.w+t,i.target_bound.h+r),i.refresh()},s,o),this.cursor.remove.click(function(){i.fireOnRemoved(i.target),i.clear()},s,o)}function e(t,e){function s(){}function o(){i.fireOnChanged(i.target),i.setTarget(i.target)}var i=this;this.pos={x:0,y:0},this.target=null,this.listeners={changed:[]},this.group=t.group(),e.append(this.group),this.cursor={start:t.circle(50,0,r.CursorRange),end:t.circle(50,100,r.CursorRange)};for(var n in this.cursor)this.cursor[n].attr({fill:"#3030ff",stroke:"#fff",strokeWidth:3}),this.group.append(this.cursor[n]);this.cursor.start.drag(function(t,r){i.target.setStartPos(i.target_start.x+t,i.target_start.y+r),i.refresh()},s,o),this.cursor.end.drag(function(t,r){i.target.setEndPos(i.target_end.x+t,i.target_end.y+r),i.refresh()},s,o)}r.CursorRange=6,r.CursorOffset=10,r.prototype.on=function(t,r){this.listeners[t].push(r)},r.prototype.fireOnChanged=function(t){this.listeners.changed.forEach(function(r){r(t)})},r.prototype.fireOnRemoved=function(t){this.listeners.removed.forEach(function(r){r(t)})},r.prototype.clear=function(){this.target=null,this.group.attr({visibility:"hidden"})},r.prototype.setTarget=function(t){var r=this;this.group.attr({visibility:"visible"}),this.target&&this.target.off("onmove"),this.target=t,r.target_bound={x:this.target.getBound().x,y:this.target.getBound().y,w:this.target.getBound().w,h:this.target.getBound().h},this.pos.x=t.getX(),this.pos.y=t.getY(),this.refresh(),this.target.onmove(function(){r.refresh()})},r.prototype.refresh=function(){this.target&&(this.group.transform("translate("+this.target.getBound().x+","+this.target.getBound().y+")"),this.cursor.n.attr({cx:this.target.getBound().w/2,cy:-r.CursorOffset}),this.cursor.s.attr({cx:this.target.getBound().w/2,cy:this.target.getBound().h+r.CursorOffset}),this.cursor.w.attr({cx:-r.CursorOffset,cy:this.target.getBound().h/2}),this.cursor.e.attr({cx:this.target.getBound().w+r.CursorOffset,cy:this.target.getBound().h/2}),this.cursor.nw.attr({cx:-r.CursorOffset,cy:-r.CursorOffset}),this.cursor.ne.attr({cx:this.target.getBound().w+r.CursorOffset,cy:-r.CursorOffset}),this.cursor.sw.attr({cx:-r.CursorOffset,cy:this.target.getBound().h+r.CursorOffset}),this.cursor.se.attr({cx:this.target.getBound().w+r.CursorOffset,cy:this.target.getBound().h+r.CursorOffset}))},e.prototype.clear=function(){this.target=null,this.group.attr({visibility:"hidden"})},e.prototype.setTarget=function(t){var r=this;this.group.attr({visibility:"visible"}),this.target&&this.target.off("onmove"),this.target=t,r.target_start={x:this.target.getStartPos().x,y:this.target.getStartPos().y},r.target_end={x:this.target.getEndPos().x,y:this.target.getEndPos().y},this.refresh(),this.target.onmove(function(){r.refresh()})},e.prototype.on=function(t,r){this.listeners[t].push(r)},e.prototype.fireOnChanged=function(t){this.listeners.changed.forEach(function(r){r(t)})},e.prototype.refresh=function(){this.target&&(this.cursor.start.attr({cx:this.target.getStartPos().x,cy:this.target.getStartPos().y}),this.cursor.end.attr({cx:this.target.getEndPos().x,cy:this.target.getEndPos().y}))},t.Selector=r,t.ConnectionSelector=e}(window);