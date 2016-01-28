var graph = {
	DirectedGraph : function(){
		this.dGraph = {};
	},
	UndirectedGraph : function(){
		this.unGraph = {};
	}		
}

graph.UndirectedGraph.prototype = {
	addVertex : function(vertex){
		this.unGraph[vertex] = [];
	},
	addEdge : function(from,to){
		this.unGraph[from].push(to);
		this.unGraph[to].push(from);
	},
	hasEdgeBetween : function(from,to){
		return this.unGraph[from].indexOf(to)>=0;
	},
	order : function(){
		return (Object.keys(this.unGraph)).length;
	},
	size : function(){
		var graph=this.unGraph;
		return Object.keys(graph).reduce(function(size,vertex){
			return size+(graph[vertex].length)/2;
		},0);
	},
	pathBetween : function(from,to,visited){
		visited = visited || [];
		if(from==to){
			return visited.concat(from);
		}
		for(var index in this.unGraph[from]){
			var vertex=this.unGraph[from][index];
			if(visited.indexOf(vertex)>=0){
				vertex = this.unGraph[from][index+1];
			}
			var path = this.pathBetween(vertex,to,visited.concat(from));
			if(path.length)
				return path;
		}
		return [];
	},
	farthestVertex : function(from){
		var vertex = from;
		var length = 0;
		vertices = Object.keys(this.unGraph);
		for(i=0;i<vertices.length;i++){
			v=vertices[i];
			farthestlength = this.pathBetween(vertex,v).length
			if(length<farthestlength){
				length=farthestlength;
				var farthestVertex = v
			}
		}
		return farthestVertex;
	},
	allPaths : function(from,to,visited,allPaths){
		var visited = visited || [];
		var allPaths = allPaths || [];
		if(from==to){
			return visited.concat(from);
		}
		for(var index in this.unGraph[from]){
			var vertex=this.unGraph[from][index];
			if(visited.indexOf(vertex)<0){
				var path = this.allPaths(vertex,to,visited.concat(from),allPaths);
				if(path[path.length-1]==to)
					allPaths.push(path);
			}
		}
		return allPaths;
	}
};

//==============================================================================================================//

graph.DirectedGraph.prototype = {
	addVertex : function(vertex){
		this.dGraph[vertex] = [];
	},
	addEdge : function(from,to){
		this.dGraph[from].push(to);
	},
	hasEdgeBetween : function(from,to){
		return this.dGraph[from].indexOf(to)>=0;
	},
	order : function(){
		return (Object.keys(this.dGraph)).length;
	},
	size : function(){
		var graph=this.dGraph;
		return Object.keys(graph).reduce(function(size,vertex){
			return size+(graph[vertex].length);
		},0);
	},
	pathBetween : function(from,to,visited){
		visited = visited || [];
		if(from==to){
			return visited.concat(from);
		}
		for(var index in this.dGraph[from]){
			var vertex=this.dGraph[from][index];
			if(visited.indexOf(vertex)>=0){
				vertex = this.dGraph[from][index+1];
			}
			var path = this.pathBetween(vertex,to,visited.concat(from));
			if(path.length)
				return path;
		}
		return [];
	},
	farthestVertex : function(from){
		var vertex = from;
		var length = 0;
		vertices = Object.keys(this.dGraph);
		for(i=0;i<vertices.length;i++){
			v=vertices[i];
			farthestlength = this.pathBetween(vertex,v).length
			if(length<farthestlength){
				length=farthestlength;
				var farthestVertex = v
			}
		}
		return farthestVertex;
	},
	allPaths : function(from,to,visited,allPaths){
		var visited = visited || [];
		var allPaths = allPaths || [];
		if(from==to){
			return visited.concat(from);
		}
		for(var index in this.dGraph[from]){
			var vertex=this.dGraph[from][index];
			if(visited.indexOf(vertex)<0){
				var path = this.allPaths(vertex,to,visited.concat(from),allPaths);
				if(path[path.length-1]==to)
					allPaths.push(path);
			}
		}
		return allPaths;
	}
};


module.exports = graph;