const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const express = require('express');
const app = express();
const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({histoires: [], xp: []})
    .write()

//DEBUT PARAMETRE HERO
app.set('port' ,(process.env.PORT || 5000))

app.listen(app.get('port'), function(){
    console.log(`Bot en fonctionnement sur le port ${app.get('port')}`)});


var bot = new Discord.Client();
var prefix = ("/");
var randnum = 0;
var storynumber = db.get('histoires').size().value();
bot.on('ready', () => {
    bot.user.setPresence ({ game: { name: 'Etre programmer par Satan', type: 0 }});
    console.log("Bot ready");
    })

bot.login('NDY4MjI2NzE1MDA1NDg1MDc2.Di2Fvg.PDYUJ52GK4EKQJO0h2WV8mKonRM');

bot.on ('message', message => {

    var msgauthor = message.author.id;

    if(message.author.bot)return;

    if (message.content === prefix + "ping" ){
       message.reply("pong"); 
       console.log('ping pong');
    }


    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");
   
    switch (args[0].toLowerCase()){
   
     case "newstory":
     var value = message.content.substr(10);
     var author = message.author.username.toString();
     var number = db.get('story').map('id').value();
    // var storyid = number + 1;
    console.log(value);
     message.reply("Ajout de l'histoire a la base de données")
      
   
        db.get('histoires')
        .push({ id: number, story_value: value, story_author: author})
        .write();
   
     break;

     case "tellstory" :
     story_random();
     console.log(randnum)
    
     var story = db.get(`histoires[${randnum}].story_value`).toString().value();
     var author_story = db.get(`histoires[${randnum}].story_author`).toString().value();
     console.log(story);

     message.channel.send(`Voici lhistoire : ${story} {histoire de ${author_story})`)

     break;
   
    }
       
        if (message.content === prefix + "help"){
            var help_embed = new Discord.RichEmbed()
            .setColor('#1A79A8')
            .addField("Intercation" , "ping ,newstory ,tellstory")
            .setFooter("Je ne sais pas quoi écrire")
            message.channel.sendEmbed(help_embed);
            //message.channel.sendMessage ("Voici les commandes :\n -/help pour afficher les commandes")
            console.log("Commandes help demandée !");
        
        }

        if (message.content === "Comment vas tu Zerra"){
            random();
             if (randnum == 1) {
                 message.reply("Je vais bien")
                 console.log(randnum);
             }
            
             if (randnum == 2 ) {
                 message.reply("Laisse moi tranquille fdp")
                 console.log(randnum);
             }
            
             if (randnum == 3) {
                message.reply("Je vais mal #depression")
                console.log(randnum);
            }
    
            if (randnum == 4) {
                message.reply("Je ne sais pas")
                console.log(randnum);
            }
    
            if (randnum == 5) {
                message.reply("pas très bien, j'ai faim")
                console.log(randnum);
            }
    
        }
      
    });
    
    function story_random(min, max) {
        min = Math.ceil(1);
        max = Math.floor(storynumber);
        randnum = Math.floor(Math.random() * (max - min +1) + min);
       }


    function random(min, max) {
     min = Math.ceil(0);
     max = Math.floor(5);
     randnum = Math.floor(Math.random() * (max - min +1) + min);
    }
