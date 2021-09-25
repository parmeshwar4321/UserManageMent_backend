const express=require('express')
const router=express.Router()

router.get('/',(req,res)=>{
    res.render('index')
})
router.use('/admin',require('./admin'))
router.use('/user',require('./users'))

module.exports=router