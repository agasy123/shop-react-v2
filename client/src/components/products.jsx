import React from 'react';
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

function Products(){
	const [filter, setFilter]=useState("default");
	const [data, setData]=useState();
    const apiGet=()=>{
		axios.get("http://agasy.shop:5000/data")
		.then(data => setData(data.data))
		.catch(error =>console.log(error))
	};
	useEffect(()=>{
   		apiGet();
	},[])
	const [searchTerm, setSearchTerm]=useState('');
	function check_price(x,y) {
		if (x) {
			return  <div>
					<h2>{x} $</h2>
					<h2 id='old-price'>{y} $</h2>
				</div>;
		}else {
			return <h2>{y} $</h2>
		}
	}
	function compare(a, b) {
		if (filter=="increases") {
			return a.price-b.price;
		}else if (filter=="decreases") {
			return b.price-a.price;
		}else if(filter=="default"){
			if (a.name<b.name) return -1;
			return 1;
		}
	}
    return(
        <div className='main'>
			
				<form>
				<input type={"radio"} name={"filter"} onChange={()=>{
					setFilter("default")
				}}></input> <label>default</label><br />
				<input type={"radio"} name={"filter"} onChange={()=>{
					setFilter("increases")
				}}></input> <label>Price increases</label><br />
				<input type={"radio"} name={"filter"} onChange={()=>{
					setFilter("decreases")
				}}></input> <label>Price decreases</label>
				</form>
				<input 
				className='search'
				type={"text"} 
				placeholder={"Search"} 
				onChange={event =>{
					setSearchTerm(event.target.value)
				}}></input>
			<div className='prodPage'>
        	{ 
			()=>{if(data){console.log(data);}else{return<h1>There is no data now</h1>}}}{
			data?.sort(compare).filter((val)=>{
				if (searchTerm=="") {
					return val;
				} else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
					return val;
				}
			}).map((item)=>{
			return <article className='product' key={item.id}>
				<h1>{item.name}</h1>
				<div className='product'>
					<img src={item.image} alt="not found"></img>
					{check_price(item.sale_price,item.price)}
					<Link to={`/single/${item.id}`}>Show More</Link>
				</div>
				</article>
			})
			}
			</div>
	    </div>
    )
}

export default Products;
