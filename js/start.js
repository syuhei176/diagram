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
		$("#create-btn").click(function() {
			var name = $("#diagram-name").val();
			if(name == "") return false;
			initmodal.close();
			location.hash = name;
			edit_diagram(name);
			return false;
		});
	}

}())