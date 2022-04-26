const day = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function round(num , dec){
  // This funtion takes a number and returns the number rounded down
  // to number of digits after the decimal point (by dec value)
  return Math.floor(num * Math.pow(10,dec)) / Math.pow(10,dec);
}
class stage {
  constructor(name, location, day, startTime, imageLink) {
    this.Name = name;
    this.Location = location;
    this.Day = day;
    this.startTime = startTime;
    this.Img = imageLink;
    this.rank = 0;
    this.rev = 0;
  }

  updateRank(rank){
    // The rank of a stage is the sum of all the ranks every given
    // divided by the amount of people that ranked

    this.rev = this.rev + 1 ;
    this.rank = this.rank + rank;

    // returning the current rank for the stage up to a number after
    // the decimal point
    return round(this.rank / this.rev , 3)
  }

}


const stagesList = [];

// stagesList.push(new stage('name','location','day','startTime','imgURL'));

// Sunday
{

  stagesList.push(new stage('לונה', 'רחובות', day[0], '20:00', 'data:image/jpeg;base64,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'));

  stagesList.push(new stage("Leganski", "נתניה", day[0], "Null", 'https://eventbuzz.s3.amazonaws.com/b87475b7c48007da728caeed87f1480fd228765bf09ec313f2c5aa569d107cced119d2840a5b61c4d762a06dd0447fef32eda832aea5b76a150deeafbe4dbc77.jpg'));
  stagesList.push(new stage("עשן הזמן", "באר שבע", day[0], "Null", 'data:image/jpeg;base64,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'));


  stagesList.push(new stage('Norman-Bar', 'תל אביב', day[0], 'Null', 'data:image/jpeg;base64,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'));

  stagesList.push(new stage('הקרפיון השיכור', 'קיבוץ עמיר', day[0], 'Null', 'https://fastly.4sqi.net/img/general/600x600/22363611_5gw7l2El6Cc1xA0f7voJeik7Hawd41CeNNXSnXIk4NY.jpg'));

}


// monday
stagesList.push(new stage("Napopo_bar", "אשדוד", day[1], "23:30", 'https://media.easy.co.il/images/UserThumbs/1696389_1553542655024.jpg'));
stagesList.push(new stage("Rebel", "תל אביב", day[1], "21:00", 'https://media.easy.co.il/images/UserThumbs/22354673_1522674100707.jpg'));

// Tuesday
stagesList.push(new stage("Jack", "אשקלון", day[2], "23:30", 'https://media-cdn.tripadvisor.com/media/photo-s/12/9d/9f/17/jack-weekend.jpg'));




exports.stages = stagesList;
