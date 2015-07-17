(function(){
    var milkcocoa = new MilkCocoa("flagi9edsvtg.mlkcca.com");

    window.edit_diagram = edit_diagram;

    function edit_diagram(name) {
        $("#open-register-modal").click(function() {
            var initmodal = jsmodal("register-modal");
            initmodal.open({
                modal : false
            });
            $("#register-btn").click(function() {
                var name = $("#diagram-name").val();
                if(name == "") return false;
                initmodal.close();
                location.hash = name;
                edit_diagram(name);
                return false;
            });
        });

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
        $("#pallet-rectangle").click(function() {
            drawing.push({
                meta : "node",
                type : "rectangle",
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
        
        var drawing = milkcocoa.dataStore("drawing").child(name);
        drawing.stream().next(function(err, elems) {
            elems.forEach(function(e) {
                if(e.value.meta == "node") {
                    diagram.addNode(e.id, e.value.type, e.value.bound);
                }else if(e.value.meta == "connection") {
                    diagram.addConnection(e.id, e.value.start, e.value.end);
                }            
            });
        });
        drawing.on("push", function(e) {
            if(e.value.meta == "node") {
                diagram.addNode(e.id, e.value.type, e.value.bound);
            }else if(e.value.meta == "connection") {
                diagram.addConnection(e.id, e.value.start, e.value.end);
            }
            update_title();
        });

        drawing.on("set", function(e) {
            if(e.value.meta == "node") {
                diagram.updateNode(e.id, e.value.bound);
            }else if(e.value.meta == "connection") {
                diagram.updateConnection(e.id, e.value.start, e.value.end);
            }
            update_title();
        });

        drawing.on("remove", function(e) {
            diagram.remove(e.id);
            update_title();
        });

        diagram.on("nodeupdate", function(node) {
            drawing.set(node.id, {
                meta : "node",
                bound : node.bound
            });
        });
        diagram.on("noderemove", function(node) {
            drawing.remove(node.id);
        });
        diagram.on("conupdate", function(con) {
            drawing.set(con.id, {
                meta : "connection",
                start : con.start,
                end : con.end
            });
        });  
    }

    function update_title() {
        document.title = "(更新されました)Drawing";
    }

    $(window).focus(function() {
        document.title = "Drawing";
    });
}())