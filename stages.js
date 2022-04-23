

const day = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

class stage {
  constructor(name , location , day , startTime , imageLink){
    this.Name = name;
    this.Location = location;
    this.Day = day;
    this.startTime = startTime;
    this.Img = imageLink;
  }
}


const stagesList = [];
stagesList.push(new stage("Napopo_bar","Ashdod",day[1],"23:30",'https://media.easy.co.il/images/UserThumbs/1696389_1553542655024.jpg'));
stagesList.push(new stage("Jack","Ashkelon",day[2],"23:30",'https://media-cdn.tripadvisor.com/media/photo-s/12/9d/9f/17/jack-weekend.jpg'));
stagesList.push(new stage("Another","Gan Yavne",day[0],"23:30",'https://halayla.co.il/wp-content/uploads/2021/07/IMG-20210712-WA0025.jpg'));
stagesList.push(new stage("Rebel","Tel-Aviv",day[1],"21:00",'https://media.easy.co.il/images/UserThumbs/22354673_1522674100707.jpg'));



exports.stages = stagesList;
