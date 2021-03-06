function loadTabLis(){

WeDeploy.data('https://database-musicv.wedeploy.io')
  .where('state', '=', 1)
  .orderBy('id', 'asc')
  .limit(24)
  .get('youtubeLinks')
	.then(function(response) {
		appendTasks(response);
	})
	.catch(function(error) {
		console.log(error);
	});

	
}



function appendTasks(tasks) {
	var list = document.querySelector('.listSaved');
	var taskList = '<div class="mdl-grid portfolio-max-width">';

	tasks.forEach(function(task) {
		var videoCode = task.url;

    var descp = task.description;
    if(descp){
      descp = descp.substring(0, 34);
    } else{
      descp = "No Description";
    }

    var title = task.title;
    if(title){
      title = title.substring(0, 40);
    } else{
      title = "No Title";
    }

    var by = task.by;
    if(by){
      by = by.substring(0, 34);
    } else{
      by = "Anonimus";
    }

    var letter = by.substring(0,1);


		taskList +=  '<div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">'+
                    '<div class="mdl-card__media">'+
                    	'<img class="article-image" src="'+task.urlThumbnill+'" border="0" alt="">'+
                      '<span class="mdl-chip mdl-chip--contact">'+
                        '<span id="userNameAbrev" class="mdl-chip__contact mdl-color--teal mdl-color-text--white">'+letter+'</span>'+
                        '<span id="userName" class="mdl-chip__text">'+by+'</span>'+
                    '</span>'+
                    '</div>'+
                    '<div class="mdl-card__title">'+
                        '<h2 class="mdl-card__title-text">'+title+'</h2>'+
                    '</div>'+
                    '<div class="mdl-card__supporting-text">'+
                        descp+
                    '</div>'+
                    '<div class="mdl-card__actions mdl-card--border">'+
                    	'<div class="mdl-grid">'+
                    		'<div class="mdl-cell mdl-cell--10-col">'+
                    			'<a href="https://www.youtube.com/watch?v='+task.url+'" target="_blank" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">'+
							      'Open in Youtube'+
							    '</a>'+
                    		'</div>'+
                    		'<div class="mdl-cell mdl-cell--2-col">'+
                    			'<div class="mdl-badge mdl-badge--overlap" data-badge="'+task.likes+'" style="width: 40px;">'+
							    	'<img  playedDate="'+task.playedDate+'" likes="'+task.likes+'" id="'+task.id+'" by="'+task.by+'" value="'+task.url+'" urlThumbnill="'+task.urlThumbnill+'" title="'+task.title+'" description="'+descp+'" onclick="addLike(this)" class="likeButton" style="width: 38px;cursor:pointer;" src="http://musicv.wedeploy.io/images/like.png" border="0" alt="">'+
							    '</div>'+
                    		'</div>'+
                    	'</div>'+
                    '</div>'+
                '</div>';

	});

	list.innerHTML = taskList+'</div>';
}


function addLike(elm){

	$(elm).parent().attr("data-badge", Number($(elm).attr('likes'))+1);

	var data = WeDeploy.data('https://database-musicv.wedeploy.io');
	            data.update('youtubeLinks/'+$(elm).attr('id'), {url: $(elm).attr('value'),
							 urlThumbnill: $(elm).attr('urlThumbnill'),
							 description: $(elm).attr('description'),
               by: $(elm).attr('by'),
							 state: 1,
							 likes: Number($(elm).attr('likes'))+1,
							 playedDate: $(elm).attr('playedDate'),
							 title: $(elm).attr('title')}).then(function(movie) {
			  
			});    
}