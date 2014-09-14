(function(){
    var s = Snap("#canvas");
    var diagram = new Diagram(s);
    $("#pallet-circle").click(function() {
        drawing.push({
            meta : "node",
            type : "ellipse",
            bound : {
                x : 204,
                y : 80,
                w : 100,
                h : 70                
            }
        });
    });
    $("#pallet-rect").click(function() {
        drawing.push({
            meta : "node",
            type : "rect",
            bound : {
                x : 204,
                y : 80,
                w : 100,
                h : 70                
            }
        });
    });
    $("#pallet-line").click(function() {
        drawing.push({
            meta : "connection",
            start : {
                x : 200,
                y : 150
            },
            end : {
                x : 250,
                y : 100
            }
        });
    });
    
    var milkcocoa = new MilkCocoa("https://io-mi02d8kdu.mlkcca.com:443/");
	var drawing = milkcocoa.dataStore("drawing").child("sheet");
    drawing.query({}).done(function(elems) {
        elems.forEach(function(e) {
            if(e.meta == "node") {
                diagram.addNode(e.id, e.type, e.bound);
            }else if(e.meta == "connection") {
                diagram.addConnection(e.id, e.start, e.end);
            }            
        });
    });
    drawing.on("push", function(e) {
        if(e.value.meta == "node") {
            diagram.addNode(e.id, e.value.type, e.value.bound);
        }else if(e.value.meta == "connection") {
            diagram.addConnection(e.id, e.value.start, e.value.end);
        }
    });

    drawing.on("set", function(e) {
        if(e.value.meta == "node") {
            diagram.updateNode(e.id, e.value.bound);
        }else if(e.value.meta == "connection") {
            diagram.updateConnection(e.id, e.value.start, e.value.end);
        }
    });
    diagram.on("nodeupdate", function(node) {
        drawing.set(node.id, {
            meta : "node",
            bound : node.bound
        });
    });

    diagram.on("conupdate", function(con) {
        drawing.set(con.id, {
            meta : "connection",
            start : con.start,
            end : con.end
        });
    });

}())