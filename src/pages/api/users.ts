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
       // usersRepo.create({id:1, dateCreated:'2', dateUpdated:'2'})
       usersRepo.create({id:0,dateCreated:'',dateUpdated:''}).then(() => {
        console.log('here')
        res.status(200).json('')

       })
       
        break;
      case 'GET':
        let users = usersRepo.getAll()
        res.status(200).json(users)
        break;
      
    }

 
     
  }