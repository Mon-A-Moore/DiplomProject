import React, { useEffect } from 'react';
import style from './graph.module.scss';
import cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';
//import classNames from 'classnames'
cytoscape.use( popper );

const Graph = () => {
useEffect(() => {
	var cy = window.cy = cytoscape({
		container: document.getElementById('cy'),

		style: [
			{
				selector: 'node',
				style: {
					'content': 'data(id)'
				}
			},

			{
				selector: 'edge',
				style: {
					'curve-style': 'bezier',
					'target-arrow-shape': 'triangle'
				}
			}
		],

		elements: {
			nodes: [
				{ data: { id: 'a' } },
				{ data: { id: 'b' } }
			],
			edges: [
				{ data: { id: 'ab', source: 'a', target: 'b' } }
			]
		},

		layout: {
			name: 'grid',
			row: 1
		}
	});

	var a = cy.getElementById('a');
	var b = cy.getElementById('b');
	var ab = cy.getElementById('ab');

	var makeDiv = function(text){
		var div = document.createElement('div');

		div.classList.add('popper-div');

		div.innerHTML = text;

		document.body.appendChild( div );

		return div;
	};

	var popperA = a.popper({
		content: function(){ return makeDiv('нода прилипшая'); }
	});

	var updateA = function(){
		popperA.update();
	};

	a.on('position', updateA);
	cy.on('pan zoom resize', updateA);

	var popperB = b.popper({
		content: function(){ return makeDiv('статичный див'); }
	});

	var popperAB = ab.popper({
		content: function(){ return makeDiv('под стрелкой'); }
	});

	var updateAB = function(){
		popperAB.update();
	};

	ab.connectedNodes().on('position', updateAB);
	cy.on('pan zoom resize', updateAB);

/* 	let cy = cytoscape({
		container: document.getElementById('cy'), // container to render in
	
		elements: [	],
	
		style: cytoscape.stylesheet()
		.selector('edge')
				.css({

					"curve-style": "straight",
 					'width': 3,
					'line-color': '#369',
					'target-arrow-color': '#369',
					'target-arrow-shape': 'triangle',
					'label': 'data(label)',
					'font-size': '14px',
					'color': '#777' 
				})
		.selector('edge[arrow]')
				.css({
					"target-arrow-shape": "data(arrow)"
				})
			.selector('node')
				.css({
				"text-valign": "center",//высота надписи по вертикали
    		"text-halign": "center", // надписи по горизонтали
 
				'content': 'data(id)',
					'color': 'white',
					'text-outline-width': 2,
					'text-outline-color': '#888',
					'background-color': '#888' 
				})

				.selector('node[type]')
				.css({
					"label": "data(type)"
				})
			.selector(':selected')
				.css({
 				'background-color': 'black',
					'line-color': 'black',
					'target-arrow-color': 'black',
					'source-arrow-color': 'black',
					'text-outline-color': 'black' 
				}),
	
		layout: {
			name: 'grid',
			row: 1
		}
	
	});

 	cy.add([
			{ group: 'nodes',data: { id: 'n1', name:'n11' },type: "triangle-backcurve", position: { x: 50, y: 200 } },
			{ group: 'nodes',data: { id: 'n2' }, type: "triangle-backcurve", position: { x: 131, y: 226 } },
			{ group: 'nodes',data: { id: 'n3' }, type: "triangle-backcurve", position: { x: 128, y: 143 } },
			{ group: 'nodes',data: { id: 'n4' }, type: "triangle-backcurve", position: { x: 249, y: 142 } },
			{ group: 'nodes',data: { id: 'n5' },  type: "triangle-backcurve",position: { x: 191, y: 62 } },
			{ group: 'nodes',data: { id: 'n6' },  type: "triangle-backcurve",position: { x: 66, y: 83 } },
			{ group: 'edges',data: { id: 'e0', source: 'n1', target: 'n2', arrow: "triangle-backcurve", label: 7 } },
			{ group: 'edges',data: { id: 'e1', source: 'n2', target: 'n3', arrow: "triangle-backcurve",label: 10 } },
			{ group: 'edges',data: { id: 'e2', source: 'n1', target: 'n6', arrow: "triangle-backcurve",label: 14 } },
			{ group: 'edges',data: { id: 'e3', source: 'n1', target: 'n3', arrow: "triangle-backcurve",label: 9 } },
			{ group: 'edges',data: { id: 'e4', source: 'n2', target: 'n4', arrow: "triangle-backcurve",label: 15 } },
			{ group: 'edges',data: { id: 'e5', source: 'n3', target: 'n4', arrow: "triangle-backcurve",label: 11 } },
			{ group: 'edges',data: { id: 'e6', source: 'n3', target: 'n6', arrow: "triangle-backcurve",label: 2 } },
			{ group: 'edges',data: { id: 'e7', source: 'n6', target: 'n5', arrow: "triangle-backcurve",label: 9 } },  
			{ group: 'edges',data: { id: 'e8', source: 'n5', target: 'n4', arrow: "triangle-backcurve",label: 6 } },
	]); 

 */



/* let node = cy.nodes()[1];//id ноды

let popper = node.popper({
  content: () => {
    let div = document.createElement('div');

    div.innerHTML = 'Какой-то контент';

    document.body.appendChild( div );

    return div;
  }
});

let update = () => {
  popper.update();
};

node.on('position', update);

cy.on('pan zoom resize', update);
	 */


}, []); 


	
    return (
			<div id="cy" className={style.cy}></div>
		);
};

export default Graph;
