const fs = require('fs')
const express = require('express')
const path = require('path');
const app = express()
app.use(express.json())
const tours = JSON.parse(fs.readFileSync(path.join(process.cwd() , 'complete-node-bootcamp/4-natours/starter/dev-data/data/' , 'tours-simple.json')))
app.get('/api/v1/tours' , (req,res)=>{
    res.status(200).json({
        status:'success' , 
        data:{
          data:  tours
        }
    }
    )
})
app.post('/api/v1/tours' , (req , res)=>{
    const newId = tours[tours.length -1].id + 1
    const newTour = Object.assign({id: newId} , req.body)
    tours.push(newTour)
    fs.writeFile(path.join(process.cwd() , 'complete-node-bootcamp/4-natours/starter/dev-data/data/' , 'tours-simple.json') , JSON.stringify(tours) , err=>{
        res.status(201).json({
            status:'success' , 
            data : {
                tour:newTour
            }
        })
    })
    
})

const port =3000
app.listen(port , ()=>{
    console.log(`the server is running on hello helloas the port ${port}`)
})