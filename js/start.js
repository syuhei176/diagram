(function(){

	var hash = location.hash;

	if(hash == "" || hash.length < 2) {
		create_diagram();
	}else{
		edit_diagram(hash.substr(1));
	}

	function create_diagram() {
		var initmodal = jsmodal("initmodal");
		initmodal.open({
			modal : true
		});
		$("#create-public-btn").click(function() {
			var name = $("#diagram-name").val();
			if(name == "") return false;
			initmodal.close();
			make_dialog(name);
			return false;
		});
		$("#create-private-btn").click(function() {
			milkcocoa.getCurrentUser(function(err, user) {
				if(err) {
					open_dialog();
				}else{
					var name = $("#diagram-name").val();
					if(name == "") return false;
					initmodal.close();
					make_dialog(name);
				}
			});
        });
	}

	function open_dialog() {
		var initmodal = jsmodal("login-modal");
		initmodal.open({
			modal : true
		});
	}

	function make_dialog(name) {
		location.hash = name;
		edit_diagram(name);
	}

}())