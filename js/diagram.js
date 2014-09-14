(function(global) {

	function Diagram(s) {
		var self = this;
		this.snap = s;
		this.base = this.snap.group();
	    var base_rect = this.snap.rect(0, 0, 1024, 900);
	    this.base.append(base_rect);
	    var gui_group = this.snap.group();
	    base_rect.attr({
	    	visibility : "hidden",
	    	"pointer-events" : "fill"
	    });
	    this.selector = new Selector(s, gui_group);
	    this.connection_selector = new ConnectionSelector(s, gui_group);
	    base_rect.mousedown(function() {
	    	self.selector.clear();
	    	self.connection_selector.clear();
	    });

	    this.listeners = {
	    	nodeupdate : [],
	    	conupdate : []
	    };
	    this.nodes = {};
	    this.connections = {};

	    this.selector.on("changed", function(node) {
	    	self.fireOnNodeUpdate(node);
	    });
	    this.connection_selector.on("changed", function(con) {
	    	self.fireOnConUpdate(con);
	    });
	}

	Diagram.prototype.addNode = function(id, type, bound) {
		var self = this;
		var node = new Node(id, this.snap, this, bound, type);
		node.onclick(function() {
			self.selector.setTarget(node);
    	});
    	this.nodes[id] = node;
	}

	Diagram.prototype.updateNode = function(id, bound) {
		var self = this;
		this.nodes[id].setPos(bound.x, bound.y);
		this.nodes[id].setSize(bound.w, bound.h);
	}

	Diagram.prototype.addConnection = function(id, start, end) {
		var self = this;
		var con = new Connection(id, this.snap, this, start, end);
		con.onclick(function() {
			self.connection_selector.setTarget(con);
    	});
    	this.connections[id] = con;
	}

	Diagram.prototype.updateConnection = function(id, start, end) {
		var self = this;
		this.connections[id].setStartPos(start.x, start.y);
		this.connections[id].setEndPos(end.x, end.y);
	}

	Diagram.prototype.on = function(event, cb) {
		this.listeners[event].push(cb);
	}

	Diagram.prototype.fireOnNodeUpdate = function(e) {
		this.listeners["nodeupdate"].forEach(function(l) {
			l(e);
		});
	}

	Diagram.prototype.fireOnConUpdate = function(e) {
		this.listeners["conupdate"].forEach(function(l) {
			l(e);
		});
	}

	global.Diagram = Diagram;

}(window))
