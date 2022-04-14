import { Link,useMatch } from "react-router-dom";

const CustomLink=({children,to, linkcolor,colordefault,bgcolor,...props})=>{
	const match=useMatch(to);
	let def= (colordefault? colordefault : 'var(--color-auf)');

	return(
		<Link
		to={to}
		style={{
			color: match? ((linkcolor===undefined)? 'var(--color-active)':linkcolor) :def,
			backgroundColor: match? ((bgcolor===undefined)? undefined :bgcolor) :undefined,
			textDecoration:'none',
		}}
		{...props}
		>
			{children}
		</Link>
	)
}
export{CustomLink}