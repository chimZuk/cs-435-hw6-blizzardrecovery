const input0 = `7
Newark
Montclair
Livingston
Caldwell
Fairfield
Belleville
Roseland
9
Newark, Livingston, 80
Newark, Roseland, 10
Newark, Belleville, 20
Livingston, Fairfield, 15
Livingston, Montclair, 30
Fairfield, Montclair, 45
Caldwell, Belleville, 25
Caldwell, Fairfield, 15
Belleville, Fairfield, 10`;

let input1 = `14
Greensboro
Bennington
Brattleboro
Shelbourne
Putney
Manchester
Warren
Moretown
Fayston
Duxbury
Middlesex
Ripton
Shaftsbury
Pawlet
18
Greensboro, Bennington, 10
Bennington, Shelbourne, 9
Greensboro, Shelbourne, 60
Bennington, Middlesex, 40
Bennington, Manchester, 17
Manchester, Putney, 18
Putney, Brattleboro, 65
Brattleboro, Manchester, 20
Middlesex, Duxbury, 16
Middlesex, Ripton, 49
Ripton, Shaftsbury, 3
Ripton, Pawlet, 24
Duxbury, Manchester, 25
Warren, Moretown, 38
Moretown, Fayston, 19
Fayston, Warren, 7
Pawlet, Shaftsbury, 15
Shaftsbury, Fayston, 50`;

function processData(input) {
    var data = input.split("\n");

    var vertices_count = Number(data[0]) + 1;
    var edges_count = Number(data[vertices_count]);
    var edges_index = vertices_count + 1;
    var vertices = data.slice(1, vertices_count);
    var edges = data.slice(edges_index, edges_index + edges_count).map(x => x.split(",").map(y => y.trim()));


    var rec = new Recovery(vertices, edges);
}

class Recovery {
    constructor(v, e) {
        this.graph = v.map(x => []);
        this.edges = e.map(x => x.splice(",").map(x => x.trim())).sort(this.compare);

        console.log(this.get_mst(v, this.edges));
    }

    get_mst(v, e) {
        var minimum_spanning_tree = [];
        var edges = copy_array_2d(e);
        while (minimum_spanning_tree != v.length - 1 && edges.length != 0) {
            if (!this.forms_cycle(v, edges[0])) {
                minimum_spanning_tree.push(edges[0]);
                this.graph[v.indexOf(edges[0][0])].push(v.indexOf(edges[0][1]));
                this.graph[v.indexOf(edges[0][1])].push(v.indexOf(edges[0][0]));
                edges.splice(0, 1);
            } else {
                edges.splice(0, 1);
            }
        }

        var sum = 0;
        for (var i = 0; i < minimum_spanning_tree.length; i++) {
            sum += Number(minimum_spanning_tree[i][2]);
        }
        return sum;
    }

    forms_cycle(v, e) {
        var graph = copy_array_2d(this.graph);
        var visited = [];
        if (graph[v.indexOf(e[0])].indexOf(v.indexOf(e[1])) == -1) {
            graph[v.indexOf(e[0])].push(v.indexOf(e[1]));
            graph[v.indexOf(e[1])].push(v.indexOf(e[0]));
        } else {
            return true;
        }

        visited.push(v.indexOf(e[0]));

        for (var i = 0; i < graph[v.indexOf(e[0])].length; i++) {
            if (this.forms_cycle_helper(v, graph[v.indexOf(e[0])][i], copy_array_2d(graph), copy_array_1d(visited), v.indexOf(e[0]))) {
                return true;
            }
        }

        return false;
    }

    forms_cycle_helper(v, e, graph, visited, prev) {
        if (visited.indexOf(e) > -1) {
            return true;
        }

        visited.push(e);

        for (var i = 0; i < graph[e].length; i++) {
            if (graph[e][i] != prev) {
                if (this.forms_cycle_helper(v, graph[e][i], copy_array_2d(graph), copy_array_1d(visited), e)) {
                    return true;
                }
            }
        }
        return false;
    }

    compare(a, b) {
        if (Number(a[2]) < Number(b[2]))
            return -1;
        if (Number(a[2]) > Number(b[2]))
            return 1;
        return 0;
    }
}

function copy_array_1d(arr1) {
    return arr1.slice();
}

function copy_array_2d(arr1) {
    return arr1.map(x => x.slice()).slice();
}

processData(input1);