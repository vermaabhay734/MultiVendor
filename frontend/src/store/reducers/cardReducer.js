import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; 


export const add_to_card = createAsyncThunk(
    'card/add_to_card',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.post('/home/product/add-to-card',info) 
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 


export const get_card_products = createAsyncThunk(
    'card/get_card_products',
    async(userId, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/home/product/get-card-product/${userId}`) 
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method


export const cardReducer = createSlice({
    name: 'card',
    initialState:{
        card_products : [], 
        card_product_count: 0,
        wishlist_count : 0,
        wishlist: [],
        price: 0, 
        errorMessage : '',
        successMessage: '', 
        shipping_fee: 0,
        outofstock_products : []
    },
    
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
 
    },
    extraReducers: (builder) => {
        builder
        .addCase(add_to_card.rejected, (state, { payload }) => {
            state.errorMessage = payload.error; 
        })
        .addCase(add_to_card.fulfilled, (state, { payload }) => { 
            state.successMessage = payload.message; 
            state.card_product_count = state.card_product_count + 1
        })

        .addCase(get_card_products.fulfilled, (state, { payload }) => { 
            state.card_products = payload.card_products; 
            state.price = payload.price
            state.card_product_count = payload.card_product_count
            state.shipping_fee = payload.shipping_fee
            state.outofstock_products = payload.outOfStockProduct
            state.buy_product_item = payload.buy_product_item 
        })

    }
})
export const {messageClear} = cardReducer.actions
export default cardReducer.reducer