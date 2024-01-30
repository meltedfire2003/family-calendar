import { promises as fs } from 'fs';
import { usersRepo } from '@/services/users';
import { NextApiRequest, NextApiResponse } from 'next';
 


  export default function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
      case 'POST':
        console.log("n", req.body)
      // usersRepo.create({firstName:req.body.firstName, lastName: req.body.lastName})
      usersRepo.create();
      
        res.status(200).json('')

      
       
        break;
      case 'GET':
        let users = usersRepo.getAll()
        res.status(200).json(users)
        break;
      case 'DELETE':
        usersRepo.delete(req.body.id)
        res.status(200).json('');
        break;
      
    }

 
     
  }