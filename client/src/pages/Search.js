import React from "react";
import Layout from "../components/Layout/Layout.js";
import { useCart } from '../context/Cart.js';
import { useNavigate } from 'react-router-dom';

import  toast  from 'react-hot-toast';
import { useSearch } from "../context/Search.js";
const Search = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate()

    const [cart ,setCart] = useCart()

    return (
        <Layout title={"Search results"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Resuts</h1>
                    <h6>
                        {values?.results.length < 1
                            ? "No Products Found"
                            : `Found ${values?.results.length} results`}
                    </h6>
                    <div className="d-flex flex-wrap mt-4">
                        {values?.results.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="card-text"> $ {p.price}</p>
                                    <button class="btn btn-primary ms-1" onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button class="btn btn-secondary ms-1" onClick={()=>{setCart([...cart,p]);localStorage.setItem("cart",JSON.stringify([...cart,p]));toast.success("Item added to cart.")}}>ADD TO CART</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Search;