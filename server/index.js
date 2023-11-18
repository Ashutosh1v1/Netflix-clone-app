const express = require ('express')
const cors = require ('cors')
const mongoose = require ('mongoose')

const userRoutes = require ('./routes/UserRoutes')

mongoose.connect("mongodb://127.0.0.1:27017/Netflix").then(()=>{
    console.log("mongooose connected successfully");
  })

const port = 80
const app = express()


app.use(cors())
app.use(express.json())

// created a rest api to connect with client side--------------------
app.use("/api/user" , userRoutes)

app.listen(port , ()=>{
    console.log(`server running on port ${port}`);
})
