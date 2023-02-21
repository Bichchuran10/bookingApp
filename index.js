const saveToCrudCrud=async(event)=>
{
    try{
    event.preventDefault()
    const first=event.target.firstName.value
    const last=event.target.lastName.value
    const emailId=event.target.email.value
    const phoneNumber=event.target.number.value
    const slot=event.target.dateandtime.value


    const user={
        first,
        last,
        emailId,
        phoneNumber,
        slot
    }

    const response=await axios.post('https://crudcrud.com/api/88ed0609a27f477399fed608fb136805/appointmentData',user)
    showNewUserOnScreen(response.data)
    await totalUsers()
}
catch(e)
{
    console.log(e)
}

};

async function totalUsers(){
    try{
        let response=await axios.get('https://crudcrud.com/api/88ed0609a27f477399fed608fb136805/appointmentData')
        let count=0;
        for(let i=0;i<response.data.length;i++)
            {
                if(response.data)
                {
                count=count+1;
                }
            }
        showTotalUsers(count);
    }
    catch(e)
    {
        console.log(e)
    }
};

window.addEventListener('DOMContentLoaded',async()=>{
    try{
        let response=await axios.get('https://crudcrud.com/api/88ed0609a27f477399fed608fb136805/appointmentData')
        for(let i=0;i<response.data.length;i++)
        {
            showNewUserOnScreen(response.data[i])
        }
       await totalUsers()
    }
    catch(e){
        console.log(e)
    }
});


const showTotalUsers=async(count)=>{

    try{
        const parentNode=document.getElementById('total')
        const childHTML=`<li> Number of bookings today=${count}</li>`
        parentNode.innerHTML=childHTML;
    }
    catch(e)
    {
        console.log(e)
    }
}

const showNewUserOnScreen=async(user)=>{
    try{
        const parentNode=document.getElementById('listOfUsers');
        const childHTML=`<li id=${user._id}> Name: ${user.first} ${user.last} Email: ${user.emailId} Phone: ${user.phoneNumber} Slot : ${user.slot}
        <button onclick=deleteUser('${user._id}')>Delete</button>
        <button onclick=editUser('${user.first}','${user.last}','${user.emailId}','${user.phoneNumber}','${user.slot}','${user._id}')>Edit</button></li>`;
        parentNode.innerHTML=parentNode.innerHTML+childHTML;
    }
    catch(e)
    {
        console.log(e)
    }
};

const deleteUser=async(id)=>{
    try{
            response=await axios.delete(`https://crudcrud.com/api/88ed0609a27f477399fed608fb136805/appointmentData/${id}`)
            deleteUserFromScreen(id)
            await totalUsers()

    }
    catch(e)
    {
        console.log(e)
    }
};

const deleteUserFromScreen=async(id)=>
{
    try{
        const parentNode=document.getElementById('listOfUsers')
        const nodeToBeDeleted=document.getElementById(id)

        parentNode.removeChild(nodeToBeDeleted)

    }
    catch(e)
    {
        console.log(e)
    }

};

const editUser=(first,last,emailId,phoneNumber,slot,id)=>{
    try{
        document.getElementById('fName').value=first;
        document.getElementById('lName').value=last;
        document.getElementById('mail').value=emailId;
        document.getElementById('phone').value=phoneNumber;
        document.getElementById('appointment').value=slot;

        deleteUser(id)
    }
    catch(e){
        console.log(e)
    }

}

