export default function randomID(){
    const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits="0123456789";
    let id=letters[Math.floor(Math.random()*100)%26]+letters[Math.floor(Math.random()*100)%26];
    for(let i=0;i<4;i++)
    id+=digits[Math.floor(Math.random()*100)%10];
    return id;
}