import { Router } from "express";

const router= Router();
router.get('/' , (req , res)=>{
  res.send('Urun listesi')
});

router.get('/:id' , (req , res)=>{
  console.log(req.params);
  res.send('Urunlerden biri');
});

router.post('/', (req, res)=>{
  res.send('Yeni Urun Olusturuldu')
})

export default router;
