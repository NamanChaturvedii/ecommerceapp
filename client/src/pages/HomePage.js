import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/Authjs'
import axios from "axios";
import { Checkbox, Radio } from "antd"
import { Prices } from "../components/Prices.js"
// import { set } from 'mongoose';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart.js';
import  toast  from 'react-hot-toast';

const HomePage = () => {
    const navigate = useNavigate()
    const [cart ,setCart] = useCart()
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);



    // get cat
    const getAllCat = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        getAllCat();
        getTotal();
    }, [])

    // get products

    const getAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
            setLoading(false)
            setProducts(data.products);
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    };


    // get total count
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);


    // load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    // fileter by cat
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };


    useEffect(() => {
        if (!checked.length || radio.length) getAllProducts();

    }, [checked.length, radio.length])

    useEffect(() => {
        if (checked.length || radio.length) filterProduct()
    }, [checked, radio])

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <Layout title={"Home - All products"}>
            <div  className='row mt-3'>
                <div   className='col-md-2'>
                    <h4 className='text-center' style={{fontStyle:"italic",paddingLeft:"10px"}}>Filter By category</h4>  
                    <div className='d-flex flex-column'>
                        {categories?.map(c => (
                            <Checkbox style={{paddingLeft:"10px",fontSize:"17px"}} key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    {/* filete by prices */}
                    <h4 className='text-center mt-4'style={{fontStyle:"italic",}}>Filter By Prices</h4>
                    <div className='d-flex flex-column'>
                        <Radio.Group style={{paddingLeft:"10px",fontSize:"17px"}} onChange={e => setRadio(e.target.value)}>
                            {Prices?.map(p => (
                                <div key={p._id}>
                                    <Radio value={p.array} >{p.name}</Radio>
                                </div>

                            ))}
                        </Radio.Group>
                    </div>
                    <div style={{paddingTop:"14px"}} className='d-flex flex-column'>
                        <button className='btn btn-danger' onClick={() => window.location.reload()}>Reset Filters</button>
                    </div>

                </div>
                
                <div className='col-md-9'>

                    <h1 className='text-center' style={{fontStyle:"italic"}}>All Products</h1>
                    <div className='d-flex flex-wrap'style={{paddingLeft:"20px",justifyContent:"space-evenly"}}>
                        {products?.map((p) => (

                            <div className="card m-2 " style={{  width: "18rem",borderRadius:"20px",borderWidth:"4px",borderColor:"grey" }}>
                                <img style={{ height: "100%", width: "100%" }}
                                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text">RS {p.price}</p>
                                    <button className='btn btn-primary ms-1' onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button className='btn btn-secondary ms-1' onClick={()=>{setCart([...cart,p]);localStorage.setItem("cart",JSON.stringify([...cart,p]));toast.success("Item added to cart.")}
                                    }>Add To Cart</button>
                                </div>
                            </div>

                        ))}
                    </div>
                    <div className='m-2 p-3 '>
                        {products && products.length < total && (
                            <button className='btn btn-warning' onClick={(e) => {
                                e.preventDefault()
                                setPage(page + 1)
                            }}>
                                {loading ? "Loading ..." : "Loadmore"}
                            </button>
                        )}
                    </div>
                </div>
            </div>


        </Layout>
    )
}

export default HomePage