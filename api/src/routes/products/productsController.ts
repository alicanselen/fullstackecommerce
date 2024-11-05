import { Request, Response } from "express"

export function listProducts (req:Request , res :Response){
    res.send('Urun listesi')
  }

  export function getProductById (req:Request , res :Response){
    res.send('Urunlerden biri')
  }

  export function createProduct (req:Request , res :Response){
    console.log(req.body);
    res.send('yeni urun olustur');
  }

  export function updateProduct (req:Request , res :Response){
    res.send('urunu guncelle')
  }

  export function deleteProduct (req:Request , res :Response){
    res.send('urunu sil')
  }