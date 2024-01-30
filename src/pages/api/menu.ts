import { promises as fs } from 'fs';
import { usersRepo } from '@/services/users';
import { NextApiRequest, NextApiResponse } from 'next';
// export default async function handler(req:any, res:any) {

//    const file = await fs.readFile(process.cwd() + '/src/app/data.json', 'utf8');
//     res.status(200).json(file);
//   }



  export default function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
      case 'POST':
        console.log("n", req.body)
      // usersRepo.create({firstName:req.body.firstName, lastName: req.body.lastName})
      
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