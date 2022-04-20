import React, { useEffect, useState } from 'react';
import style from './drawgraph.module.scss';
import cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';

//import classNames from 'classnames'
cytoscape.use( popper );

const Drawgraph = ({aaa}) => {
	console.log("aaa");
console.log(aaa);
/* 	const [balanceOutputVariables, setState] = useState([]);
	const [kkk, setKkk] = useState([]);
	useEffect(() => {
		if(aaa!==null){
			setKkk(aaa.calculation_output.balanceOutputVariables);
		}
	}, [aaa]); */

	const [balanceOutputVariables, setState] = useState([]);
	useEffect(() => {
		if(aaa!==null){
			setState(aaa.calculation_output.balanceOutputVariables)
		}
	}, [aaa]);

	/* 
const	balanceOutputVariables= [
    {
      id: "00000000-0000-0000-0000-000000000001",
      source: "NULL",
      target: "00000000-0000-0000-0000-000000000001",
      name: "X1",
      value: 10.055612418500504,
      upperBound: 1000,
      lowerBound: 0
    },
    {
      id: "00000000-0000-0000-0000-000000000002",
      source: "00000000-0000-0000-0000-000000000001",
      target: "NULL",
      name: "X2",
      value: 3.0144745895183522,
      upperBound: 1000,
      lowerBound: 0
    },
    {
      id: "00000000-0000-0000-0000-000000000003",
      source: "00000000-0000-0000-0000-000000000001",
      target: "00000000-0000-0000-0000-000000000002",
      name: "X3",
      value: 7.041137828982151,
      upperBound: 1000,
      lowerBound: 0
    },
    {
      id: "00000000-0000-0000-0000-000000000004",
      source: "00000000-0000-0000-0000-000000000002",
      target: "NULL",
      name: "X4",
      value: 1.9822547563048074,
      upperBound: 1000,
      lowerBound: 0
    },
    {
      id: "00000000-0000-0000-0000-000000000005",
      source: "00000000-0000-0000-0000-000000000002",
      target: "00000000-0000-0000-0000-000000000003",
      name: "X5",
      value: 5.058883072677343,
      upperBound: 1000,
      lowerBound: 0
    },
    {
      id: "00000000-0000-0000-0000-000000000006",
      source: "00000000-0000-0000-0000-000000000003",
      target: "NULL",
      name: "X6",
      value: 4.067257698582969,
      upperBound: 1000,
      lowerBound: 0
    },
    {
      id: "00000000-0000-0000-0000-000000000007",
      source: "00000000-0000-0000-0000-000000000003",
      target: "NULL",
      name: "X7",
      value: 0.9916253740943739,
      upperBound: 1000,
      lowerBound: 0
    }
  ]

 */






useEffect(() => {
/* 	setState(kkk); */
	const nods=[],edgs=[];
	let chetchik=1;
	balanceOutputVariables.forEach((item)=>{
		if(item.target!=="NULL" && item.source!=="NULL")
		{
			/* console.log(item) */
		edgs.push({data: { id: `0-${item.id}`, source: item.source, target: item.target,label: item.name } });
		const a= item.source;
		const aa= nods.find(item =>item.data.id ===a);
		if(aa===undefined)
		{
		nods.push({data: { id: `${a}`, name: chetchik }});
		chetchik++;
		}
		const b= item.target;
		const bb= nods.find(item =>item.data.id ===b);
		if(bb===undefined)
		{
		nods.push({data: { id: `${b}`, name: chetchik  }});
		chetchik++;
		}
		}
		else{
			if(item.target==="NULL")
			{
				
				edgs.push({data: { id: `0-${item.id}`, source: item.source, target: `${nods.length}`,label: item.name } });
				nods.push({data: { id: nods.length}, type: "endNode"});
			}
			if(item.source==="NULL")
			{
				
				edgs.push({data: { id: `0-${item.id}`, source: `${nods.length}`, target: item.target, label: item.name } });
				nods.push({data: { id: nods.length}, type: "endNode"});
			}
		}

	})
/* 	console.log(nods)
	console.log('fffffffffff')
	console.log(edgs) */
	let cy = window.cy = cytoscape({
		container: document.getElementById('cy'),
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
					'color': '#777' ,
					'text-margin-y': -15,
				})

			.selector('node')
				.css({
					'background-color': 'white' 
				})
				.selector('node[name]')
				.css({
				"text-valign": "center",//высота надписи по вертикали
    		"text-halign": "center", // надписи по горизонтали
 
				'content': 'data(name)',
					'color': 'white',
					'text-outline-width': 2,
					'text-outline-color': '#888',
					'background-color': '#888' 
				})
/* 				.selector('node[type]')
				.css({
					'background-color': 'black' ,
				}) */

			.selector(':selected')
				.css({
 				'background-color': 'black',
					'line-color': 'black',
					'target-arrow-color': 'black',
					'source-arrow-color': 'black',
					'text-outline-color': 'black' 
				}),



		elements: {
			nodes: nods,
			edges: edgs,
		},

	/* 	elements: {
			nodes: [
				{ data: { id: 'a',name:'1' } },
				{ data: { id: 'b',name:'2' } },
				{ data: { id: 'c',name:'3' } },
				{ data: { id: 'd',name:'4' } },
				{ data: { id: 'e',name:'5' } },
			],
			edges: [
				{ data: { id: 'ab', source: 'a', target: 'b',label: "X1" } },
				{ data: { id: 'bc', source: 'b', target: 'c',label: "X1" } },
				{ data: { id: 'ce', source: 'c', target: 'e',label: "X1" } },
				{ data: { id: 'dd', source: 'a', target: 'd',label: "X1" } },
				
			]
		}, */

		layout: {
			name: 'breadthfirst',
		/* 	name: 'breadthfirst', */
		}
	});

/* 	cy.add([
		{ group: 'nodes',data: { id: 'n1', name:'n11' }},
		{ group: 'nodes',data: { id: 'n2' }},
		{ group: 'nodes',data: { id: 'n3' }},
		{ group: 'nodes',data: { id: 'n4' }},

		{ group: 'edges',data: { id: 'e0', source: 'n1', target: 'n2', arrow: "triangle-backcurve", label: 7 } },
		{ group: 'edges',data: { id: 'e1', source: 'n2', target: 'n3', arrow: "triangle-backcurve",label: 10 } },
		{ group: 'edges',data: { id: 'e2', source: 'n3', target: 'n4', arrow: "triangle-backcurve",label: 11 } },

]);  */


/* 	var a = 
cy.getElementById('a'); */


const makeDiv =(text)=>{
	let div = document.createElement('div');

	div.classList.add(style.popperDiv);

	div.innerHTML = text;

	divWrapper.appendChild( div );

	return div;
};





let divWrapper = document.getElementById('divWrapper');

	edgs.forEach(item=>{
		let variable= cy.getElementById(item.data.id);

		const element = balanceOutputVariables.find(elem =>`0-${elem.id}` === item.data.id);

		let popperAB = variable.popper({
			content:  makeDiv(
				` 'value': ${element.value},
					'upperBound': ${element.upperBound},
					'lowerBound': ${element.lowerBound},`),
		});

		let updateAB = function(){
			popperAB.update();
		};
	
		variable.connectedNodes().on('position', updateAB);
		cy.on('pan zoom resize', updateAB);
	
	
	})














/* 	var popperA = a.popper({
		content: function(){ return makeDiv('div прилипший'); }
	});

	var updateA = function(){
		popperA.update();
	};

	a.on('position', updateA);
	cy.on('pan zoom resize', updateA); */




/* 	var popperB = b.popper({
		content: function(){ return makeDiv('статичный див'); }
	}); */












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


}, [aaa]); 


	
    return (
			<div id="divWrapper" className={style.divWrapper}>
				<div id="cy" className={style.cy}></div>
				</div>
			
		);
};

export default Drawgraph;
