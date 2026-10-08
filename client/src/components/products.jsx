import React from 'react';
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import { useTranslation } from "../context/LanguageContext";

function Products(){
	const { t } = useTranslation();
	const [filter, setFilter]=useState("default");
	const [data, setData]=useState();
	const apiGet=()=>{
		axios.get("/data")
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
		if (filter==="increases") {
			return a.price-b.price;
		}else if (filter==="decreases") {
			return b.price-a.price;
		}else if(filter==="default"){
			if (a.name<b.name) return -1;
			return 1;
		}
	}
    return(
        <div className='main'>
				<form>
				<input type={"radio"} name={"filter"} onChange={()=>{
					setFilter("default")
				}}></input> <label>{t("products.filterDefault")}</label><br />
				<input type={"radio"} name={"filter"} onChange={()=>{
					setFilter("increases")
				}}></input> <label>{t("products.filterIncreases")}</label><br />
				<input type={"radio"} name={"filter"} onChange={()=>{
					setFilter("decreases")
				}}></input> <label>{t("products.filterDecreases")}</label>
				</form>
				<input 
				className='search'
				type={"text"} 
				placeholder={t("products.searchPlaceholder")} 
				onChange={event =>{
					setSearchTerm(event.target.value)
				}}></input>
			<div className='prodPage'>
        	{!data ? (
				<div className="loading-skeleton">
					<div className="skeleton-product"></div>
					<div className="skeleton-product"></div>
					<div className="skeleton-product"></div>
				</div>
			) : data.length===0 ?(
				<h1>{t("products.noData")}</h1>
			):(
			data?.sort(compare).filter((val)=>{
				if (searchTerm==="") {
					return true;
				} return val.name.toLowerCase().includes(searchTerm.toLowerCase())
			}).map((item)=>{
			return <article className='product' key={item.id}>
				<h1>{item.name}</h1>
				<div className='product'>
					<img src={item.image} alt="not found" width="200" height="200"></img>
					{check_price(item.sale_price,item.price)}
					<Link to={`/single/${item.name}`}>{t("products.showMore")}</Link>
				</div>
				</article>
			})
			)}
			</div>
	    </div>
    )
}

export default Products;
