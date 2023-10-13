import React, { useState, useEffect } from 'react'
import axios from "axios"

function Home() {


    ///async 함수 안에다가 try catch 블록 만들어주기 

    // useEffect(async() => {
    //     try {
    //         const data = (await axios.get('API endpoint')).data
    // 이걸로 get request 할 수 있음. 현재로서는 만들어진 route get endpoint 가 없음
    //         console.log(data)
    //     } catch (error){
    //         console.log(error)
    //     }

    // } , [])

    return (
        <div>Home</div>
    )
}

export default Home