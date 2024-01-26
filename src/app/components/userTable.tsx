import users from "@/pages/api/users";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { GiTrashCan, GiPencil } from "react-icons/gi";
import { DataView } from "primereact/dataview";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await fetch("./api/users");
    const users = await response.json();
    setUsers(users);
  };

  const addNewUser = () => {
    fetch("./api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    }).then(() => {
        getUsers();
        setVisible(false)
        setFirstName('');
        setLastName('')
    });
  };

  const deleteUser = (id:number) => {
    fetch("./api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id:id}),
      }).then(() => {
          getUsers();
      });
  }

  const listTemplate = (users: any) => {
    if (!users || users.length === 0) return null;
    let user = users.map((user: any, index: any) => {
      return (
        <div key={index}>
          <Divider></Divider>
          <div className="flex flex-row items-center gap-4 p-2">
            <p>{user.firstName}</p>
            <p> {user.lastName}</p>
            <Button className="rounded-full p-2">
              <GiTrashCan onClick={() => deleteUser(user.id)} size={24}></GiTrashCan>
            </Button>
            <Button className="rounded-full p-2">
              <GiPencil size={24}></GiPencil>
            </Button>
          </div>
        </div>
      );
    });

    return <div className="grid grid-nogutter">{user}</div>;
  };

  return (
    <>
      <Card>
        <Button onClick={() => setVisible(true)} label={"Add user"}></Button>
        <DataView value={users} listTemplate={listTemplate}></DataView>
      </Card>
      <Dialog header="New User" visible={visible} style={{ width: "50vw" }} onHide={() => setVisible(false)}>
        <div className="flex flex-column gap-2">
          <label htmlFor="firstname">First Name</label>
          <InputText id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div className="flex flex-column gap-2">
          <label htmlFor="lastname">Last Name</label>
          <InputText id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <Button label="Add" onClick={addNewUser}></Button>
      </Dialog>
    </>
  );
}
