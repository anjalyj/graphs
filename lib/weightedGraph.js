var graph = {
	WeightedGraph : function(){
		this.vertices = [];
		this.edges = {};
	},
	Edge : function(edge,from,to,weight){
		this.edgeName = edge;
		this.from = from;
		this.to = to;
		this.weight = weight; 
	}	
}

var createDistance = function(from,vertices){
	var distance = {};
	vertices.forEach(function(vertex){
		distance[vertex] = Infinity;
	});
	distance[from] = 0;
	return distance;
}

var createParent = function(from,vertices){
	var parent = {};
	vertices.forEach(function(vertex){
		parent[vertex] = null;
	});
	parent[from] = from;
	return parent;
}

var selectVertex = function(vertices,sortedDistance){
	for(var index in sortedDistance){
		if (vertices.indexOf(sortedDistance[index])>=0)
			return sortedDistance[index];
	}
}

var deleteVertex = function(vertexToDelete,vertices){
	return vertices.filter(function(vertex){
		if(vertexToDelete != vertex)
			return vertex;
	});
}

var findPath = function(from,to,parent,path){
	var path = path || [];
		if(parent[to]==to)
			return path.reverse(); 
		path.push(parent[to]);
		return findPath(from,parent[to].from,parent,path);
}

graph.WeightedGraph.prototype =  {
	addVertex : function(vertex){
		this.vertices.push(vertex);
	},
	addEdge : function(edge){
		this.edges[edge.from] = this.edges[edge.from] || [];
		this.edges[edge.from].push(edge);
	},
	shortestPath : function(from,to){
		var vertices = this.vertices;
		var edges = this.edges;
		var distance = createDistance(from,vertices);
		var parent = createParent(from,vertices);
		for(var i=0;i<vertices.length;i++){
			var sortedDistance = Object.keys(distance).sort(function(a,b){return distance[a]-distance[b]});
			var preferedVertex = selectVertex(vertices,sortedDistance);
			edges[preferedVertex].forEach(function(edge){
				var newDistance = distance[preferedVertex]+edge.weight;
				if(distance[edge.to] > newDistance){
					distance[edge.to] = newDistance;
					parent[edge.to] = edge
				}
			});
			vertices = deleteVertex(preferedVertex,vertices);		
		} 
		var path = findPath(from,to,parent);
		return path;
	}
};

module.exports = graph;