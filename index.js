const Discord = require("discord.js"); //디스코드 모듈을 불러옵니다. 정식으로 베포된 버전에는 이미 모듈이 설치되어 있습니다.
const client = new Discord.Client(); //client 를 정의합니다.
const { token } = require("./config.json"); //token 을 같은 위치에 있는 config.json 에서 불러옵니다.
const fs = require("fs"); //nodeJS 에 기본적으로 탑재되어있는 fs 모듈을 불러옵니다.
let lvdata = JSON.parse(fs.readFileSync("./lvdata.json")); //lvdata(레벨 데이터)를 같은 위치에 있는 lvdata.json 에서 불러옵니다

client.on("ready", () => {
  //클라이언트가 준비가 되면,
  console.log("준비완료!"); //"준비완료" 라는 말을 콘솔에 출력합니다.
});

client.on("message", (message) => {
  //클라이언트 준비가 되면,
  if (message.author.bot) return; //만약 메시지 작성자가 봇이라면 무시합니다.
  if (!lvdata[message.author.id])
    //만약 등록되지 않은 사용자라면
    lvdata[message.author.id] = {
      //등록합니다.
      xp: 0,
      lv: 0,
    };
  lvdata[message.author.id].xp = //메시지를 입력하면 기존에 있던 경험치와 새로운 경험치(1~10 까지 랜덤)을 더해 경험치로 기록합니다.
    lvdata[message.author.id].xp + Math.floor(Math.random() * 10) + 1; //위와 같습니다.
  let userdata = lvdata[message.author.id]; //userdata라는 변수를 lvdata에 기록되어있는 작성자를 대입해 만듭니다.
  if (userdata.xp > 100) {
    //만약 경험치가 100보다 크다면
    userdata.lv++; //레벨을 "1" 올립니다.
    userdata.xp = 0; //경험치를 0으로 초기화합니다.
    message.reply(
      //레벨업 메시지를 보냅니다.
      "축하합니다! 당신의 레벨은 이제 " + userdata.lv + " 레벨 입니다!" //위와 같습니다.
    ); //괄호를 닫습니다.
  } //괄호를 닫습니다.
  fs.writeFile("./lvdata.json", JSON.stringify(lvdata), (x) => {
    //경험치, 레벨 등을 lvdata.json 이라는 파일에 저장합니다.
    if (x) console.log(x); //위와 같습니다.
  }); //괄호를 닫습니다.
}); //괄호를 닫습니다.
