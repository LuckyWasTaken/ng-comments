const loki = require('lokijs');
const RandomTextGenerator = require('random-text-generator');
const nicknames = require('nicknames');
const {v4: uuid} = require('uuid');

const START_DATE = new Date(2000, 1, 1);
const END_DATE = new Date();

const textGenerator = new RandomTextGenerator({splitter: " "});

const textGeneratorLearn = `Nineteen Eighty-Four: A Novel, often published as 1984, is a dystopian novel by English novelist George Orwell. It was published in June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime. The story was mostly written at Barnhill, a farmhouse on the Scottish island of Jura, at times while Orwell suffered from severe tuberculosis. Thematically, Nineteen Eighty-Four centres on the consequences of government over-reach, totalitarianism, and repressive regimentation of all persons and behaviours within society. The story takes place in an imagined future, the year 1984, when much of the world has fallen victim to perpetual war, omnipresent government surveillance, historical negationism and propaganda. Great Britain, known as Airstrip One, has become a province of a superstate named Oceania that is ruled by the Party who employ the Thought Police to persecute individuality and independent thinking. Big Brother, the leader of the Party, enjoys an intense cult of personality despite the fact that he may not even exist. The protagonist, Winston Smith, is a diligent and skilful rank-and-file worker and Party member who secretly hates the Party and dreams of rebellion. He enters a forbidden relationship with a co-worker, Julia. Nineteen Eighty-Four has become a classic literary example of political and dystopian fiction. Many terms used in the novel have entered common usage, including Big Brother, doublethink, thoughtcrime, Newspeak, Room 101, telescreen, 2 + 2 = 5, prole, and memory hole. Nineteen Eighty-Four also popularised the adjective "Orwellian", connoting things such as official deception, secret surveillance, brazenly misleading terminology, and manipulation of recorded history by a totalitarian or authoritarian state. Time included it on its one hundred best English-language novels from 1923 to 2005. It was placed on the Modern Library's 100 Best Novels, reaching No. 13 on the editors' list and No. 6 on the readers' list. In 2003, the novel was listed at No. 8 on The Big Read survey by the BBC. Parallels have been drawn between the novel's subject matter and real life instances of totalitarianism, mass surveillance, and violations of freedom of expression among other themes.`;
textGenerator.learn(textGeneratorLearn.split(" "));

const db = new loki('comments');
const commentsCollection = db.addCollection('comments', {indices: ['id']});

function insert(comment) {
    commentsCollection.insert(comment);
}

function randomDate() {
    return new Date(START_DATE.getTime() + Math.random() * (END_DATE.getTime() - START_DATE.getTime()))
}

function generateComment(parent_id) {
    const body = textGenerator.generate();
    const author_name = nicknames.allRandom();
    const datetime = randomDate();
    const id = uuid();

    insert({body, author_name, datetime, id, parent_id});

    if (Math.random() > 0.4) {
        generateComment(id);
    }
}

for (let i = 0; i < 100; i++) {
    generateComment(null);
}

db.saveDatabase();