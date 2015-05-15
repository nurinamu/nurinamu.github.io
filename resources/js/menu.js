function FeedMenu() {}
FeedMenu.constructor = FeedMenu;
FeedMenu.prototype = {
	view: null,
	selected: null,
	selectedIndex: 0,
	value: null,
	items: [],
	data: null,
	columnCount: 3,
	select: function (index)
	{
		if (this.selected != null)
			this.selected.className = this.selected.className.replace(" selected", "");
        
        if (index >= this.data.length)
        	index = 0;
		
		if (index < 0)
        	index = this.data.length - 1;
    	
    	this.selectedIndex = index;
  
    	this.selected = this.items[this.selectedIndex];
    	this.selected.className += " selected";
		
		this.value = this.data[this.selectedIndex];
	},
	create: function (view, data, isFeed)
	{
		this.view = view;
		this.data = data;
		this.view.innerHTML = ""; 

		if (typeof data[0] == "string")
	    {
		    this.load(data);
		    return;
	    }

		var item, i, xhr;

		for (i = 0; i < this.data.length; i++)
    	{
    		item = this.data[i];

    		if (isFeed)
    		{
    			item = this.transform(item);
    		}

    		this.add(i, item);
    	}
    	this.select(0);
	},
	load: function (feeds)
	{
		var items 	= [],
			index 	= -1,
			menu	= this;
			
	    function loadFeed(url)
	    {
			akamai.amp.utils.Utils.getJson(url, function (feed) 
		    {
				items.push(feed);
				nextFeed();
				
			},
			function (error)
			{
				nextFeed();
			});
		}
		
		function nextFeed()
		{
			++index;
			
			if (index >= feeds.length)
			{
				menu.create(menu.view, items, true);
			}
			else
			{
				loadFeed(feeds[index]);
			}
		}
		
		nextFeed();
	},
	add: function (index, item)
	{
		var element = document.createElement("a"),
		    c = (index % this.columnCount) + 1,
		    r = Math.floor(index / this.columnCount) + 1;

		element.className = "sample-menu-item sample-menu-r" + r + " sample-menu-c" + c;
		element.setAttribute("onclick", "loadVideo("+index+")");
		element.innerHTML = '<img class="sample-item-thumb" src="'+item.poster+'" />'+
			            	'<div class="sample-item-title">'+item.title+'</div>';
		          	
		this.view.appendChild(element);
		this.items.splice(index, 0, element);
		
		cn 		= this.view.className;
		rows	= "rows-"+r;
		regexp 	= new RegExp(rows);
		
		if (!regexp.test(cn))
		{
			cn = cn.replace(/ rows-\d/, "");
			this.view.className = cn + " " + rows;
		}
	},
	transform: function (feed)
	{
		var item, thumb;

		item = (feed.channel.item.length > 0) ? feed.channel.item[0] : feed.channel.item;
		thumb = item["media-thumbnail"] || item["media-group"]["media-thumbnail"];
		if (thumb && thumb["@attributes"])
			thumb = thumb["@attributes"].url;
		
		return {
			title: item.title,
			poster: thumb
		};
	}
};