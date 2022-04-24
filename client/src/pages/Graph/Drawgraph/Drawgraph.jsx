import React, { useEffect, useState } from 'react';
import style from './drawgraph.module.scss';
import cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';

//import classNames from 'classnames'
cytoscape.use( popper );

const Drawgraph = ({graphsel}) => {
/* 	console.log("graphsel");
console.log(graphsel); */
const [nodetemp,setNodeTemp]=useState([])
/* useEffect(()=>{

},[])
 */



useEffect(() => {


/* 	
добавить стрелки dashed где из 0 или в 0 уходит


"isMeasured": true,  если измеряемый - то задник зелёный, если нет - красный 

это в отдельное поле div вывести слева наверху
  "calculationTime": 0.0203991,
  "disbalanceOriginal": 0.29433993952571247,
  "disbalance": 1.4390135079995448e-15,
	
	
	справа внизу убирающуюся стрелкой - легенду(карту знаков) - */
/* 	const nods=[
				{ data: { id: 'a'} },
				{ data: { id: 'b', name:'1'} },
				{ data: { id: 'd',name:'4'} },
				{ data: { id: 'e',nod:'true', label:'X1',background:'red'},grabbable: false, },
				{ data: { id: 'c',
				data:"name: X1,\n measured: 10.005,\n correction: 0,\n 	technologicUpperBound: 1000.0,\n technologicLowerBound: 0.0,\n	tolerance: 0.2, \n value: 3.0144745895183522, ",

				 type: "cut-rectangle",parent: "e"  },grabbable: false,},
	],edgs=[
		{ data: { id: 'ab', source: 'a', target: 'b' , arrow:"triangle",lineStyle:"dashed" } },
		{ data: { id: 'bd', source: 'b', target: 'd', arrow:"triangle",lineStyle:"solid" } },

	]; */

/* 	
			"id": "00000000-0000-0000-0000-000000000001", 
			"sourceId": "NULL", 
			"destinationId": "00000000-0000-0000-0000-000000000001", 
			"name": "X1", 
			"measured": 10.005, 
			"correction": 0, 
			"metrologicUpperBound": 1000.0,
			"metrologicLowerBound": 0.0,
			"technologicUpperBound": 1000.0,
			"technologicLowerBound": 0.0,
			"tolerance": 0.2, 
			"isMeasured": true, 
			"isExcluded": false 

*/
const chetchik=((a)=>{
	const pos = a.lastIndexOf('-');
	const znach = a.slice(pos+1)
	const chislo = Number(znach);
	return chislo;
})
/* console.log(graphsel) */

const nods=[],edgs=[];
if(graphsel!==null){
graphsel.calculation_input.BalanceInputVariables.forEach((item,index)=>{
	const isMeasured = item.isMeasured?"green":"red";
		if(item.destinationId!=="NULL" && item.sourceId!=="NULL")
		{

		edgs.push({data: { id: `0-${item.id}`, source: item.sourceId, target: item.destinationId,arrow:"triangle",lineStyle:"solid" } });
		const a= item.sourceId;
		const aa= nods.find(item =>item.data.id ===a);
		if(aa===undefined)
		{
	
		nods.push({data: { id: `${a}`, name: chetchik(a) }});
		}
		const b= item.destinationId;
		const bb= nods.find(item =>item.data.id ===b);
		if(bb===undefined)
		{
		nods.push({data: { id: `${b}`, name: chetchik(b)  }});
		}
		

		nods.push({data: { id: `${nods.length}`, nod:'true',label:`${item.name}`,background: `${isMeasured}`  },grabbable: false});
		nods.push({data: { id: `${nods.length}`, type:'cut-rectangle',parent:`${nods.length-1}`, data:`id:${item.id}\nsourceId:${item.sourceId}\ndestinationId:${item.destinationId}\nmeasured:${item.measured}\ncorrection:${item.correction}\ntechnologicUpperBound:${item.technologicUpperBound}\ntechnologicLowerBound:${item.technologicLowerBound}\ntolerance:${item.tolerance}\nvalue:${graphsel.calculation_output.balanceOutputVariables[index].value}` },grabbable: false});



		}
		else{
			if(item.destinationId==="NULL")
			{
				
				edgs.push({data: { id: `0-${item.id}`, source: item.sourceId, target: `${nods.length}`, arrow:"triangle",lineStyle:"dashed"} });
				nods.push({data: { id: nods.length}});

				nods.push({data: { id: `${nods.length}`, nod:'true',label:`${item.name}`,background: `${isMeasured}`  },grabbable: false});
				nods.push({data: { id: `${nods.length}`, type:'cut-rectangle',parent:`${nods.length-1}`, data:`id:${item.id}\nsourceId:${item.sourceId}\ndestinationId:${item.destinationId}\nmeasured:${item.measured}\ncorrection:${item.correction}\ntechnologicUpperBound:${item.technologicUpperBound}\ntechnologicLowerBound:${item.technologicLowerBound}\ntolerance:${item.tolerance}\nvalue:${graphsel.calculation_output.balanceOutputVariables[index].value}` },grabbable: false});
				
			}
			if(item.sourceId==="NULL")
			{
				
				edgs.push({data: { id: `0-${item.id}`, source: `${nods.length}`, target: item.destinationId, arrow:"triangle",lineStyle:"dashed"} });
				nods.push({data: { id: nods.length}});
				
				nods.push({data: { id: `${nods.length}`, nod:'true',label:`${item.name}`,background: `${isMeasured}`  },grabbable: false});
				nods.push({data: { id: `${nods.length}`, type:'cut-rectangle',parent:`${nods.length-1}`, data:`id:${item.id}\nsourceId:${item.sourceId}\ndestinationId:${item.destinationId}\nmeasured:${item.measured}\ncorrection:${item.correction}\ntechnologicUpperBound:${item.technologicUpperBound}\ntechnologicLowerBound:${item.technologicLowerBound}\ntolerance:${item.tolerance}\nvalue:${graphsel.calculation_output.balanceOutputVariables[index].value}` },grabbable: false});
			}
		}

	}) 
}
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

				})
				.selector('edge[arrow][lineStyle]')
				.css({

					"curve-style": "straight",
 					'width': 3,
					'line-color': '#369',
					'target-arrow-color': '#369',
					'target-arrow-shape': 'data(arrow)',
					'font-size': '14px',
					'color': '#777' ,
					'text-margin-y': -15,
					"line-style" : 'data(lineStyle)',
					"z-compound-depth":'bottom', 

				})

			.selector('node')
				.css({
					'background-color': 'white' 
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
					"border-width": 1.25,
					"border-color": "#555555",
				})

				.selector('node[nod][label][background]')
				.css({
					'background-color': 'data(background)', 
					'label': 'data(label)',
					"shape": "barrel",
					"border-width": 1.25,
					"border-color": "#555555",
				})

				.selector('node[data][type]')
				.css({
					"width":450,
					"height":180,
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

/* const updateAB = function (source,target){
	let pos1 = cy.$(`#${source}`).position();
	let pos2 = cy.$(`#${target}`).position();
	
	let x= pos2.x-(pos2.x-pos1.x)/2;
let y= pos2.y-(pos2.y-pos1.y)/2;
let coords={x:x,y:y};
cy.$(`#${arr[iter].data.id}`).position(coords);
};
const arr=nods.filter(item=>item.data.nod==='true');

let iter=0;
edgs.forEach((item)=>{

	cy.$(`#${item.data.id}`).connectedNodes().on('position', updateAB(item.data.source,item.data.target));
	cy.on('pan zoom resize', updateAB(item.data.source,item.data.target));
	iter++;
}) */


const aaa=(()=>{
	console.log("позиция");
	var pos1 = cy.$(`#${nodetemp.data.source}`).position();
	var pos2 = cy.$(`#${nodetemp.data.target}`).position();
	let x= pos2.x-(pos2.x-pos1.x)/2;
let y= pos2.y-(pos2.y-pos1.y)/2;
let coords={x:x,y:y};
console.log(pos1);
console.log(pos2);
console.log(coords);
cy.$(arr[chet].data.id).position(coords);
chet++;
})
var updateABC = function (){
	aaa();
};
/* 
cy.$('#0-00000000-0000-0000-0000-000000000003').connectedNodes().on('position', updateABC);
cy.on('pan zoom resize', updateABC);  */
let chet=0;
const arr=nods.filter(item=>item.data.nod==='true');
console.log(arr);
console.log(edgs);
console.log(nods);
edgs.forEach(item=>{
	setNodeTemp(item);
	cy.$(`#${item.data.id}`).connectedNodes().on('position', updateABC);
	cy.on('pan zoom resize', updateABC);
}
)
	


/* console.log(nods)
console.log(edgs)
const arr=nods.filter(item=>item.data.nod==='true');
var updateABC = function(){
	const a=nods[16].data.id;
const b=nods[9].data.id;
	console.log("позиция");
	var pos1 = cy.$(`#${a}`).position();
	var pos2 = cy.$(`#${b}`).position();
	let x= pos2.x-(pos2.x-pos1.x)/2;
let y= pos2.y-(pos2.y-pos1.y)/2;
let coords={x:x,y:y};
console.log(pos1);
console.log(pos2);
console.log(coords);
cy.$(`#${arr[0].data.id}`).position(coords);
};
cy.$(`#${edgs[5]}`).connectedNodes().on('position', updateABC);
cy.on('pan zoom resize', updateABC); 
 */

/* console.log(nods)
console.log(edgs)
const arr=nods.filter(item=>item.data.nod==='true');
var updateABC = function(){
	const a=nods[16].data.id;
const b=nods[9].data.id;
	console.log("позиция");
	var pos1 = cy.$(`#${a}`).position();
	var pos2 = cy.$(`#${b}`).position();
	let x= pos2.x-(pos2.x-pos1.x)/2;
let y= pos2.y-(pos2.y-pos1.y)/2;
let coords={x:x,y:y};
console.log(pos1);
console.log(pos2);
console.log(coords);
cy.$(`#${arr[0].data.id}`).position(coords);
};
cy.$(`#${edgs[5]}`).connectedNodes().on('position', updateABC);
cy.on('pan zoom resize', updateABC);  */

/* //работает
 console.log(nods)
console.log(edgs)
const arr=nods.filter(item=>item.data.nod==='true');
var updateABC = function(){
	console.log("позиция");
	var pos1 = cy.$(`#${nods[16].data.id}`).position();
	var pos2 = cy.$(`#${nods[9].data.id}`).position();
	let x= pos2.x-(pos2.x-pos1.x)/2;
let y= pos2.y-(pos2.y-pos1.y)/2;
let coords={x:x,y:y};
console.log(pos1);
console.log(pos2);
console.log(coords);
cy.$(`#${arr[0].data.id}`).position(coords);
};
cy.$(`#${edgs[5]}`).connectedNodes().on('position', updateABC);
cy.on('pan zoom resize', updateABC);  */


/* var updateABC = function(){
	console.log("позиция");
	var pos1 = cy.$('#00000000-0000-0000-0000-000000000001').position();
	var pos2 = cy.$('#00000000-0000-0000-0000-000000000002').position();
	let x= pos2.x-(pos2.x-pos1.x)/2;
let y= pos2.y-(pos2.y-pos1.y)/2;
let coords={x:x,y:y};
console.log(pos1);
console.log(pos2);
console.log(coords);
cy.$('#1').position(coords);
};
cy.$('#0-00000000-0000-0000-0000-000000000003').connectedNodes().on('position', updateABC);
cy.on('pan zoom resize', updateABC); 
 */
/* var updateAB = function(){
	var pos1 = cy.$('#b').position();
	var pos2 = cy.$('#d').position();
	let x= pos2.x-(pos2.x-pos1.x)/2;
let y= pos2.y-(pos2.y-pos1.y)/2;
let coords={x:x,y:y};
cy.$('#e').position(coords);
};

cy.$('#bd').connectedNodes().on('position', updateAB);
cy.on('pan zoom resize', updateAB); */

/* 
let updateAB = function(){
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

}, [graphsel]); 


	
    return (
			<div id="divWrapper" className={style.divWrapper}>
				<div id="cy" className={style.cy}></div>
				</div>
			
		);
};

export default Drawgraph;
