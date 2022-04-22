import React, { useEffect, useState } from 'react';
import style from './drawgraph.module.scss';
import cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';

//import classNames from 'classnames'
cytoscape.use( popper );

const Drawgraph = ({graphsel}) => {
	console.log("graphsel");
console.log(graphsel);

	const [balance, setBalance] = useState([]);



useEffect(() => {
	if(graphsel!==null){
		setBalance(graphsel.calculation_output.balanceOutputVariables)
	}
/* 	
добавить стрелки dashed где из 0 или в 0 уходит


"isMeasured": true,  если измеряемый - то задник зелёный, если нет - красный 

это в отдельное поле div вывести слева наверху
  "calculationTime": 0.0203991,
  "disbalanceOriginal": 0.29433993952571247,
  "disbalance": 1.4390135079995448e-15,
	
	
	справа внизу убирающуюся стрелкой - легенду(карту знаков) - */
	const nods=[
				{ data: { id: 'a'} },
				{ data: { id: 'b', name:'1'} },
				{ data: { id: 'd',name:'4' , type: "cut-rectangle" } },
				{ data: { id: 'e',nod:'true'  },grabbable: false, },
				{ data: { id: 'c',
				data:"name: X1,\n measured: 10.005,\n correction: 0,\n 	technologicUpperBound: 1000.0,\n technologicLowerBound: 0.0,\n	tolerance: 0.2, \n value: 3.0144745895183522, ",

				 type: "cut-rectangle",parent: "e"  },grabbable: false,},
	],edgs=[
		{ data: { id: 'ab', source: 'a', target: 'b'} },
		{ data: { id: 'bd', source: 'b', target: 'd', arrow:"triangle" } },

	];
	let chetchik=1;
/* 	balanceOutputVariables.forEach((item)=>{
		if(item.target!=="NULL" && item.source!=="NULL")
		{

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

	}) */
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
					'font-size': '14px',
					'color': '#777' ,
					'text-margin-y': -15,
					"z-index-compare": "manual",
					"z-index": 11
				})
				.selector('edge[arrow]')
				.css({

					"curve-style": "straight",
 					'width': 3,
					'line-color': '#369',
					'target-arrow-color': '#369',
					'target-arrow-shape': 'data(arrow)',
					'font-size': '14px',
					'color': '#777' ,
					'text-margin-y': -15,
					/* "line-style" : "dashed" */
					"z-index-compare": "manual",
					"z-index": 11
				})

			.selector('node')
				.css({
					'background-color': 'white' 
				})
				.selector('node[nod]')
				.css({
					'background-color': '#369', 
					'label': 'X1',
					"shape": "barrel",
					"z-index-compare": "manual",
					"z-index": 111
				})

/* 					.selector(':parent')
					.css({
						'text-valign': 'top',
						'text-halign': 'center',
					}) */

				.selector('node[name]')
				.css({
				"text-valign": "center",//высота надписи по вертикали
    		"text-halign": "center", // надписи по горизонтали
				"width":50,
				"height":50,
				'label': 'data(name)',
					'color': 'white',
					'text-outline-width': 1,
					'text-outline-color': '#888',
					'background-color': '#888',
					"z-index-compare": "manual",
					"z-index": 111
				})
				.selector('node[data][type]')
				.css({
					"width":300,
					"height":150,
				"text-valign": "center",//высота надписи по вертикали
    		"text-halign": "center", // надписи по горизонтали
				"shape": "data(type)",
				'label': 'data(data)',
				"text-wrap": "wrap",
				"text-justification":"left",
				"font-style": "normal",
				"font-weight": "normal",
					'color': 'white',
					'text-outline-width': 2,
					'text-outline-color': '#888',
					"background-color": "#f4a582",
					"border-width": 1.25,
					"border-color": "#555555",
					"z-index-compare": "manual",
					"z-index": 111
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
					'text-outline-color': 'black',
					"z-index-compare": "manual",
					"z-index": 111
				}),



		elements: {
			nodes: nods,
			edges: edgs,
		},



		layout: {
			name: 'breadthfirst',

		}
		
	});

/* 	let e= cy.getElementById('e'); */

/* let coords=Math.sqrt(Math.pow(pos2.x-pos1.x,2)+Math.pow(pos2.y-pos1.y,2)); */


/* 	console.log(pos1)
console.log(pos2)
console.log(coords) */




var updateAB = function(){
	var pos1 = cy.$('#b').position();
	var pos2 = cy.$('#d').position();
	let x= pos2.x-(pos2.x-pos1.x)/2;
let y= pos2.y-(pos2.y-pos1.y)/2;
let coords={x:x,y:y};
cy.$('#e').position(coords);
};

cy.$('#bd').connectedNodes().on('position', updateAB);
cy.on('pan zoom resize', updateAB);

/* let updateAB = function(){
	popperAB.update();
};

variable.connectedNodes().on('position', updateAB);
cy.on('pan zoom resize', updateAB); */


/* 
var ab = cy.getElementById('bd');

var makeDiv = function(text){
	var div = document.createElement('div');

	div.classList.add('popper-div');

	div.innerHTML = text;

	document.body.appendChild( div );

	return div;
};
			var popperAB = ab.popper({
				content: function(){ return makeDiv('Sticky position div'); }
			});

			var updateAB = function(){
				popperAB.update();
			};

			ab.connectedNodes().on('position', updateAB);
			cy.on('pan zoom resize', updateAB);



 */







/* 	let variable= cy.getElementById('bd');
	let updateAB = function(){
		e.update();
	};

	variable.connectedNodes().('position', updateAB);
	cy.on('pan zoom resize', updateAB); */

/* 	let x = cy.$('#a').position('x');
console.log(x)
let y = cy.$('#a').position('y'); */

/* 
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
	
	
	}) */

}, [graphsel,balance]); 


	
    return (
			<div id="divWrapper" className={style.divWrapper}>
				<div id="cy" className={style.cy}></div>
				</div>
			
		);
};

export default Drawgraph;
