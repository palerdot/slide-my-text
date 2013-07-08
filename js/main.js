
//S => global object for the app

var S = {

	app : 0,
	theme : 0,
	content : new String(),
	keynote_mode : false,
	text_file_added : false

};

// Slide Show App object

function App(content){

	//contains the individual slide objects
	
	var slides = []; 
	
	//contains total slides in the app
	
	var total_slides = 0;
	
	// contains the current active slide index
	
	var curr_slide = 0;
	
	//contains total points of curr slide
	
	var total_points = 0;
	
	// contains currently active point if in keynote mode
	
	var curr_point = 0;
	
	var t = new String(); t = content; t = $.trim(t); t.replace(/\r\n/g, "\n"); t = t + '\n';
	
	 var temp_slides = [];
	
	//total slide count
	
	var total_slides = 0;
	
	//regex tools for processing content
	
	//var slide_splitter = /(?:\s*)[*|-]{4,}(?:\s*\n)+/g;
	
	var slide_splitter = /(?:\s*)[*|-]{4,}(?:\s*\n)+/g;
			
	//var empty_slide = /^(?:(?:\s*)\n+)*$/;
	
	var title_div = $('#slide_title_holder');
	var content_div = $('#slide_content_holder');
	
	var prev_button = $('#prev_button');
	var next_button = $('#next_button');
	
	var first_button = $('#show_first_button');
	var last_button = $('#show_last_button');
	
	var slide_list_body = $('#slide_list_modal_body'); 
	
	//App methods
	
	this.init = function(){
		// initializes the app
		
		//split the incoming text into slides
		
		slide_list_body.html('');
	
		temp_slides = t.split(slide_splitter);
		
		for(var i = 0; i < temp_slides.length; i++){
			
				if($.trim(temp_slides[i]) == ''){
					continue;
				}else{
					
					// create new slide objects which contains slide content
					
					slides[total_slides] = new Slide(temp_slides[i], total_slides);
					content_div.append(slides[total_slides].get_slide_data());
					total_slides++;
					
				}
				
			
		}
		
		
		
		if(S.keynote_mode){
			curr_point = 0;
		}else{
			curr_point = slides[curr_slide].get_total_points();
		}
		
	};
	
	this.get_total_slides = function(){
		return total_slides;
	};
	
	
	this.manage_keynote_mode = function(mode){
	
		if(mode){
			
			//curr_point = slides[curr_slide].get_total_points();
			if(curr_point == slides[curr_slide].get_total_points()-1)
				curr_point++;
			
			
		}else{
		
			//keynote deactivated halfway. show the remaining slides
			var total = slides[curr_slide].get_total_points();
			var ts = '#slide_'+curr_slide;
			var point = '#point_';
			var cp = curr_point;
			
			console.log(total);
			console.log(cp);
			
			if(curr_point < total){
			
				for(var i = cp; i < total; i++){
					point = '#point_'+i;
					$(ts).children(point).fadeIn();
					curr_point++;
				}
			
			}else{
				curr_point = slides[curr_slide].get_total_points();
			}
		
		}
	
	};
	
	this.display = function(slide_no){
		
		//initial display
		//displays first slide
		
		var ts = '#slide_'+curr_slide;
		
		if(slide_no == 0 || typeof(slide_no) == 'undefined'){
		
			$(ts).hide('fast');
		
			curr_slide = 0;
			
			ts = '#slide_'+curr_slide;
			
			if(!S.keynote_mode){
			
				title_div.text(slides[curr_slide].get_slide_title());
			
				$(ts).fadeIn('slow');
			
			}else{
			
				//display just the first point
				
				$(ts).children('.point').hide(); $(ts).show();
				
				curr_point = 0;
					
				title_div.text(slides[curr_slide].get_slide_title());
							
				var point = '#point_'+curr_point;
					
				$(ts).children(point).fadeIn('slow');
					
				curr_point++;
				
			}
		
			
		
			prev_button.addClass('icon_inactive');
			first_button.addClass('icon_inactive');
		
				if(total_slides > 1){
					next_button.removeClass('icon_inactive');
					last_button.removeClass('icon_inactive');
				}
				
		
		}else{
		
			$(ts).hide('fast');
		
			curr_slide = slide_no;
			
			ts = '#slide_'+curr_slide;
			
			
			if(!S.keynote_mode){
			
				title_div.text(slides[slide_no].get_slide_title());
			
				$(ts).fadeIn('slow');
			
			}else{
			
				//display just the first point
				
				$(ts).children('.point').hide(); $(ts).show();
				
				curr_point = 0;
					
				title_div.text(slides[curr_slide].get_slide_title());
							
				var point = '#point_'+curr_point;
					
				$(ts).children(point).fadeIn('slow');
					
				curr_point++;
			}
			
			if(slide_no == total_slides - 1){
				last_button.addClass('icon_inactive');
				next_button.addClass('icon_inactive');
				prev_button.removeClass('icon_inactive');
				first_button.removeClass('icon_inactive');
				}
			else if(slide_no == 0){
				first_button.addClass('icon_inactive');
				prev_button.addClass('icon_inactive');
				next_button.removeClass('icon_inactive');
				last_button.removeClass('icon_inactive');
				}
			else{
				first_button.removeClass('icon_inactive');
				next_button.removeClass('icon_inactive');
				prev_button.removeClass('icon_inactive');
				last_button.removeClass('icon_inactive');
			}
		
		}
		
	};
	
	this.next = function(){
	
	var ts = '#slide_'+curr_slide;
	
		if(!S.keynote_mode){
	
			if(curr_slide != total_slides - 1){
		
				if(curr_slide == 0){
					first_button.removeClass('icon_inactive');
					prev_button.removeClass('icon_inactive');
					}
				
				$(ts).hide('fast');	
		
				curr_slide++;
				
				ts = '#slide_'+curr_slide;
			
				title_div.text(slides[curr_slide].get_slide_title());
				
				$(ts).delay('300').fadeIn('slow');
			
				if(curr_slide == total_slides - 1){
					next_button.addClass('icon_inactive');
					last_button.addClass('icon_inactive');
					}
	
			}
		
		}else{
		
				if(curr_point == slides[curr_slide].get_total_points() && curr_slide != total_slides - 1){
				
					//end of this slide . . . have to move to next slide
					
					$(ts).hide('fast');
					
					if(curr_slide == 0){
						first_button.removeClass('icon_inactive');
						prev_button.removeClass('icon_inactive');
					}
					
					curr_slide++;
					
					ts = '#slide_'+curr_slide;
					
					$(ts).children('.point').hide();
					
					curr_point = 0;
					
					title_div.text(slides[curr_slide].get_slide_title());
					
					$(ts).delay('300').fadeIn();
					
					var point = '#point_'+curr_point;
					
					$(ts).children(point).fadeIn();
					
					//$(point).fadeIn();
					
					curr_point++;
					
					if(curr_slide == total_slides - 1 && curr_point == slides[curr_slide].get_total_points()){
						next_button.addClass('icon_inactive');
						last_button.addClass('icon_inactive');
					}
					
					
					//slide moved to next
				
				}else{
				
					ts = '#slide_'+curr_slide;

					//have to display the corresponding point
					var point = '#point_'+curr_point;
					
					var ruler = '#ruler_'+curr_point;
					
					$(ts).children(point).fadeIn();
					
					console.log($(point).position().top);
					
					var scroll_to = $(point).position().top + content_div.scrollTop(); var height = $(point).height();
					
					if(scroll_to > 0)
						content_div.animate({scrollTop: scroll_to + height + '50'});
					
					curr_point++;
					
					if(curr_slide == total_slides - 1 && curr_point == slides[curr_slide].get_total_points()){
						next_button.addClass('icon_inactive');
						last_button.addClass('icon_inactive');
					}
				
				}
		
		
		}
	};
	
	this.prev = function(){
	
	var ts = '#slide_'+curr_slide;
	
	//var curr_point;
	
		if(!S.keynote_mode){
	
			if(curr_slide != 0){
		
				if(curr_slide == total_slides - 1){
					next_button.removeClass('icon_inactive');
					last_button.removeClass('icon_inactive');
					}
					
				$(ts).hide('fast');	
		
				curr_slide--;
				
				ts = '#slide_'+curr_slide;
				
				$(ts).delay('300').fadeIn('slow');
			
				title_div.text(slides[curr_slide].get_slide_title());
			
				if(curr_slide == 0){
					prev_button.addClass('icon_inactive');
					first_button.addClass('icon_inactive');
					}
	
			}
		
		}else{
		
			//just show the first point of previous slide
			
			if(curr_slide != 0){
			
			
					if(curr_slide == total_slides - 1){
							next_button.removeClass('icon_inactive');
							last_button.removeClass('icon_inactive');
					}
					
					$(ts).hide('fast');
			
					curr_slide--;
					
					ts = '#slide_'+curr_slide;
					
					$(ts).children('.point').hide(); $(ts).show();
			
					if(curr_slide == 0){
							prev_button.addClass('icon_inactive');
							first_button.addClass('icon_inactive');
					}
			
					curr_point = 0;
					
					title_div.text(slides[curr_slide].get_slide_title());
							
					var point = '#point_'+curr_point;
					
					$(ts).children(point).fadeIn('slow');
					
					curr_point++;
					
			}		
		
		}
	
	};
	
	
	
	
	
	
	//Slide object
	
	function Slide(content, id){
	
		var points = [];
	
		// total points in the slide
		
		var total_points = 0;
		
		//var current active point
		
		var curr_point = 0;
		
		//title of the slide
		
		var title = '';
		
		//contains the final slide data
		
		var slide_data = $('<div></div>');
		slide_data.addClass('slide');
		var slide_id = 'slide_'+id;
		slide_data.attr("id", slide_id);
		
		//getter for current active point
		
		this.get_curr_point = function(){
			return this.curr_point;
		};
		
		
		// getter for total points
		
		this.get_total_points = function(){
			return curr_point;
		};
		
		this.get_slide_title = function(){
			return title;
		};
		
		this.get_slide_data = function(){
			return slide_data;
		};
		
		content = $.trim(content);
		
		content = content + '\n';
		
		//now split the slides into points seperated by empty new line
			
				var slide_content_splitter = /(?:\s*\n){2,}/g;
				
				var slide_contents = [];
				
				slide_contents = content.split(slide_content_splitter);
				
				//console.log(slide_contents);
		
		// **********************************************************************************
		
				var slide_list_body = $('#slide_list_modal_body'); 
		
			for(var i = 0; i < slide_contents.length; i++){
				
					//split unwanted whitespace and newlines in the points
				
					slide_contents[i].replace(/^(?:\s*\n)*|(?:\s*\n)*$/g, '');
					
					//console.log(slide_contents[i]);
					
					var img;
					var content_span;
					var slide_list = $('<span class = "btn btn-primary btn-large slide_list_button"></span');
					slide_list.attr("slide_no", id);
					
					
					if(i == 0 && slide_contents[0].match(/^(?:\s*)\*([\w | \s]*)\*(?:\s*)$/)){
						
							// this slide has a title
							title = $.trim(slide_contents[0].match(/^(?:\s*)\*([\w | \s]*)\*(?:\s*)$/)[1]);
							slide_list.text(title);
							slide_list_body.append(slide_list);
							
							continue;
							
					}else if(i == 0){
						slide_list.text("[No Title . . . .]");
						slide_list_body.append(slide_list);
					}
					
					if(slide_contents[i].match(/^(?:\s*)-(?:\s*)([\w | \s]*)$/)){
					
						slide_contents[i] = $.trim(slide_contents[i].match(/^(?:\s*)-(?:\s*)([\w | \s]*)$/)[1]);
						
						points[curr_point] = $('<div></div>');
						points[curr_point].attr("id", 'point_'+curr_point);
						points[curr_point].addClass('slide_bullet_point point');
						points[curr_point].text(slide_contents[i]);
						img = $('<img src = "icons/icon-bullets.png" class = "slide_point_icon" />');
						points[curr_point].prepend(img);
						
						//var ruler = $('<div class = "ruler"></div>');
						//var ruler_id = '#ruler_'+curr_point;
						//ruler.attr("id", ruler_id);
						
						//points[curr_point].append(ruler);
						
						
						
						slide_data.append(points[curr_point]);
						//console.log(points[curr_point]);
						curr_point++;
						
						continue;
						
					}
					else if(slide_contents[i].match(/^(?:\s*)--(?:\s*)([\w | \s]*)$/)){
					
						
						slide_contents[i] = $.trim(slide_contents[i].match(/^(?:\s*)--(?:\s*)([\w | \s]*)$/)[1]);
						
						points[curr_point] = $('<div></div>');
						points[curr_point].attr("id", 'point_'+curr_point);
						points[curr_point].addClass('slide_highlight point');
						points[curr_point].text(slide_contents[i]);
						
						
						//var ruler = $('<div class = "ruler"></div>');
						//var ruler_id = '#ruler_'+curr_point;
						//ruler.attr("id", ruler_id);
						
						//points[curr_point].append(ruler);
						
						
						slide_data.append(points[curr_point]);
						//console.log(points[curr_point]);
						curr_point++;
						
						continue;
						
					}
					else{
						//normal point
						
						
						points[curr_point] = $('<div></div>');
						points[curr_point].attr("id", 'point_'+curr_point);
						points[curr_point].addClass('slide_normal_point point');
						points[curr_point].text(slide_contents[i]);
						img = $('<img src = "icons/icon-snowflake.png" class = "slide_point_icon" />');
						points[curr_point].prepend(img);
						
						//var ruler = $('<div class = "ruler"></div>');
						//var ruler_id = '#ruler_'+curr_point;
						//ruler.attr("id", ruler_id);
						
						//points[curr_point].append(ruler);
						
						
						slide_data.append(points[curr_point]);
						//console.log(points[curr_point]);
						curr_point++;
						
						continue;
					}
					
					
						
					
				}
		
		// ***********************************************************************************
		
		
	}// end of Slide()

}//end of App()


function copy_file_contents(evt){

	var files = evt.target.files;
	
	var t_alert_pane = $("#text_file_alert_pane");
	var t_alert = $("#text_file_alert");
	var fn = $("#file_name");
	var error_div = $('#error_msg');
	
	var f = files[0];
	
	if(f.type == 'text/plain'){
		readBlob(f);
		fn.text(f.name);
		error_div.html('');
		t_alert_pane.hide();
	}else{
		t_alert.html('This is not a text file');
		fn.text("No text file");
		t_alert_pane.show();
	}
	
	

}

function readBlob(file){

	S.text_file_added = true;

	var reader = new FileReader();
	
	var start = 0; var stop = file.size - 1;
	
	var blob = file.slice(start, stop + 1);
	
	reader.readAsText(blob);
	
	
		//event listener to check for file read completion
		
		reader.onloadend = function(evt){
		
			//if finished reading
			if(evt.target.readyState == FileReader.DONE){
				S.content = evt.target.result;
				//console.log(S.content);
			}
		
		};

}


function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {

  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  	var t_alert_pane = $("#text_file_alert_pane");
	var t_alert = $("#text_file_alert");
	var fn = $("#file_name");
	var error_div = $('#error_msg');
	
	if(files.length == 1){
	
		var f = files[0];
	
		console.log(f.type);
	
		if(f.type == 'text/plain'){
			readBlob(f);
			fn.text(f.name);
			t_alert_pane.hide();
			error_div.html('');
		}else{
			t_alert.html('This is not a text file');
			fn.text("No text file");
			t_alert_pane.show();
		}
	
	}else if(files.length > 1){
		t_alert.html('Multiple files not allowed. Add a single text file . . .');
		t_alert_pane.show();
	}
  
}


$(document).ready(function(){


	//prepare document ready variables and events
	
	// *****************************************************************
	
	//start of variables
	
	var tfs = document.getElementById("text_file_select");
	var tfh = document.getElementById("text_file");
	//var tfh = $('#text_file');
	
	var text_drop_zone = document.getElementById("text_file_drop_area");
	
	var tdz = $("#text_file_drop_message");
	
	var io = $('#intro_overlay');
	var im = $('#intro_modal');
	
	var ic = $('#intro_close');
	var ptc = $('#plain_text_close');
	
	var csmb = $('#create_slide_message_button');
	var settings = $('#settings');
	
	var sptb = $('#show_plain_text_button');
	var spt = $('#show_plain_text');
	
	var cs = $('#create_slide');
	
	var ss = $('#slide_show_pane');
	
	var sch = $('#slide_control_holder');
	var c_pane = $('#control_pane');
	
	var kn = $('#keynote_button');
	var fs = $('#fullscreen_button');
	var stop = $('#stop_button');
	var prev = $('#prev_button');
	var next = $('#next_button');
	var first = $('#show_first_button');
	var last = $('#show_last_button');
	var slide_list = $('#slide_list_button');
	var slide_list_close = $('#slide_list_close');
	var slm = $('#slide_list_modal');
	var slo = $('#slide_list_overlay');
	
	var ilo = $('#image_list_overlay');
	var i_list_button = $('#show_images_button');
	//var i_list_close = 
	
	var slb = $('span.slide_list_button');
	
	var error_div = $('#error_msg');
	var error_span = $('<span class = "alert-yellow"></span>');
	
	//end of variables
	
	// *****************************************************************
	
	show_intro_overlay();
	
	check_file_api();
	
	// *****************************************************************
	
	//start of event listeners
	
	i_list_button.click(function(){
		ilo.fadeIn();
	});
	
	slm.on('click', 'span.slide_list_button', function(){
	
		var slide_no = parseInt($(this).attr("slide_no"));
		
		slm.removeClass('in').delay('300').fadeOut();
		slo.fadeOut();
		S.app.display(slide_no);
	
	});
	
	kn.click(function(){
	
		if(S.keynote_mode){
			S.keynote_mode = false;
			kn.attr("title", "keynote mode disabled");
			kn.removeClass('keynote_active');
		}else{
			S.keynote_mode = true;
			kn.attr("title", "keynote mode activated");
			kn.addClass('keynote_active');
		}
		
		S.app.manage_keynote_mode(S.keynote_mode);
	
	});
	
	fs.click(function(){
		toggle_full_screen();
	});
	
	prev.click(function(){
		S.app.prev();
	});
	
	next.click(function(){
		S.app.next();
	});
	
	first.click(function(){
		S.app.display(0);
	});
	
	last.click(function(){
		var last_slide = S.app.get_total_slides();
		S.app.display(last_slide - 1);
	});
	
	tfs.addEventListener("click", function(){
	
		tfh.click();
	
	}, false);
	
	tfh.addEventListener("change", copy_file_contents, false);
	
	text_drop_zone.addEventListener("dragenter", dragenter, false);
	text_drop_zone.addEventListener("dragover", dragover, false);
	text_drop_zone.addEventListener("drop", drop, false);
	
	
	cs.click(function(){
	
		//initialize app
		
		if(S.text_file_added){
		
			$(this).addClass('disabled');
		
			var text_file_contents = new String();
			text_file_contents = S.content;
		
		
		
			S.app = new App(text_file_contents);
			S.app.init();
			S.app.display();
		
			ss.fadeIn();
		
			$(this).removeClass('disabled');
		
		}else{
			console.log('no text file added');
			error_span.text("No text file added");
			error_div.append(error_span);
		}
		
	});
	
	ic.click(function(){
	
			im.removeClass('in').fadeOut();
			io.fadeOut();
	
	});
	
	ptc.click(function(){
		spt.fadeOut();
	});
	
	csmb.click(function(){
	
		im.removeClass('in').delay('300').fadeOut();
		io.fadeOut();
	
	});
	
	settings.click(function(){
	
		show_intro_overlay();
	
	});
	
	sptb.click(function(){
	
		spt.fadeIn();	
	
	});
	
	sch.mouseenter(function(){
		c_pane.fadeIn('fast');
	});
	
	sch.mouseleave(function(){
		c_pane.fadeOut('slow');
	});
	
	stop.click(function(){
		ss.fadeOut('fast');
	});
	
	slide_list.click(function(){
	
		show_slide_list();
	
	});
	
	slide_list_close.click(function(){
	
		slm.removeClass('in').delay('300').fadeOut();
		slo.fadeOut();
	
	});
	
	//end of event listeners
	
	// *****************************************************************
	
	// start of modules
	
	// show_intro_overlay module
	
	function show_intro_overlay(){

		io.fadeIn();
		im.fadeIn().addClass('in');

	}
	
	function show_slide_list(){
	
		slo.fadeIn();
		slm.fadeIn().addClass('in');
	
	}
	
	function check_file_api(){
		if (window.File && window.FileReader && window.FileList && window.Blob) {
				tdz.html("Drag and Drop your text file here or browse file from below . . ");
		} else {
		  		tdz.html("Drag and Drop not supported. Select file from below . . ");
		}
	}
	
	function toggle_full_screen(){
	
		if (!document.fullscreenElement &&    // alternative standard method
			 !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
		    if (document.documentElement.requestFullscreen) {
			 document.documentElement.requestFullscreen();
			 
		    } else if (document.documentElement.mozRequestFullScreen) {
			 document.documentElement.mozRequestFullScreen();
			
		    } else if (document.documentElement.webkitRequestFullscreen) {
			 document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			 
		    }
		   
		    
		} else {
			
		    if (document.cancelFullScreen) {
			 document.cancelFullScreen();
		    } else if (document.mozCancelFullScreen) {
			 document.mozCancelFullScreen();
		    } else if (document.webkitCancelFullScreen) {
			 document.webkitCancelFullScreen();
		    }
		    
		    
		    
		}
		
	
	}
	
	// end of modules 

});

// end of document ready

// ************************************************************************


